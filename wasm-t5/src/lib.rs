use candle_core::{DType, Device, Tensor};
use candle_nn::VarBuilder;
use candle_transformers::models::t5::{Config, T5ForConditionalGeneration};
use wasm_bindgen::prelude::*;

fn setup() {
    console_error_panic_hook::set_once();
}

fn js(e: impl std::fmt::Display) -> JsError {
    JsError::new(&e.to_string())
}

/// T5 inference engine — tokenisation is handled by the JavaScript caller.
///
/// Typical JS usage:
/// ```js
/// const model = new T5Model(weightBytes, configBytes);
/// const outputIds = model.predict_ids(inputIds, 128);
/// ```
#[wasm_bindgen]
pub struct T5Model {
    model: T5ForConditionalGeneration,
    eos_token_id: u32,
    decoder_start_token_id: u32,
}

#[wasm_bindgen]
impl T5Model {
    /// Load from raw bytes.
    /// - `weights` — safetensors file
    /// - `config`  — config.json (the HuggingFace model config)
    #[wasm_bindgen(constructor)]
    pub fn new(weights: Vec<u8>, config: Vec<u8>) -> Result<T5Model, JsError> {
        setup();
        let mut cfg: Config = serde_json::from_slice(&config).map_err(js)?;
        cfg.use_cache = true;
        let eos = cfg.eos_token_id as u32;
        let dstart = cfg.decoder_start_token_id.unwrap_or(0) as u32;
        let vb =
            VarBuilder::from_buffered_safetensors(weights, DType::F32, &Device::Cpu).map_err(js)?;
        let model = T5ForConditionalGeneration::load(vb, &cfg).map_err(js)?;
        Ok(T5Model {
            model,
            eos_token_id: eos,
            decoder_start_token_id: dstart,
        })
    }

    /// Run greedy decoding.
    ///
    /// `input_ids`  — tokenised + padded encoder input (Uint32Array from JS)
    /// `max_length` — maximum number of tokens to generate
    ///
    /// Returns a `Uint32Array` of output token IDs (without the leading
    /// decoder-start token; the JS caller decodes them back to text).
    pub fn predict_ids(
        &mut self,
        input_ids: &[u32],
        max_length: usize,
    ) -> Result<Vec<u32>, JsError> {
        let device = Device::Cpu;
        self.model.clear_kv_cache();

        // ── Encode ────────────────────────────────────────────────────────────
        let input_tensor = Tensor::new(input_ids, &device)
            .map_err(js)?
            .unsqueeze(0)
            .map_err(js)?;

        let encoder_out = self.model.encode(&input_tensor).map_err(js)?;

        // ── Autoregressive greedy decode ──────────────────────────────────────
        // With use_cache=true the decoder stores K/V from previous steps, so
        // after step 0 we only feed the single most-recent token.
        let mut dec_ids: Vec<u32> = vec![self.decoder_start_token_id];

        for i in 0..max_length {
            let dec_tensor = if i == 0 {
                Tensor::new(dec_ids.as_slice(), &device)
            } else {
                Tensor::new(&[*dec_ids.last().unwrap()], &device)
            }
            .map_err(js)?
            .unsqueeze(0)
            .map_err(js)?;

            // decode returns [batch=1, vocab_size]; squeeze batch dim then argmax over vocab
            let logits = self.model.decode(&dec_tensor, &encoder_out).map_err(js)?;

            let next = logits
                .squeeze(0) // [1, vocab_size] → [vocab_size]
                .map_err(js)?
                .argmax(0) // argmax over vocab → scalar
                .map_err(js)?
                .to_scalar::<u32>()
                .map_err(js)?;

            if next == self.eos_token_id {
                break;
            }
            dec_ids.push(next);
        }

        // Strip the leading decoder_start_token before returning
        Ok(dec_ids[1..].to_vec())
    }
}
