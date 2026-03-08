import {
  AutoTokenizer,
  AutoModelForSeq2SeqLM,
  env,
} from "@huggingface/transformers";

env.localModelPath = self.location.origin + "/";
env.allowLocalModels = true;
env.allowRemoteModels = false;

const wasmBase = new URL("/wasm-ort/", self.location.origin).href;
env.backends.onnx.wasm.wasmPaths = wasmBase;
env.backends.onnx.wasm.numThreads = Math.min(
  navigator.hardwareConcurrency ?? 4,
  4,
);

export type FoodItem = {
  name: string;
  quantity: number | null;
  unit: string | null;
};

type InMsg =
  | { type: "load"; modelPath: string }
  | { type: "extract"; text: string };

type OutMsg = { type: "ready" } | { type: "result"; foods: FoodItem[] };

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,;:!?]+$/, "");
}

function parseFoods(output: string): FoodItem[] {
  return output
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const fields: Record<string, string> = {};
      for (const part of segment.split(", ")) {
        const colon = part.indexOf(": ");
        if (colon === -1) continue;
        fields[part.slice(0, colon).trim()] = part.slice(colon + 2).trim();
      }
      const rawQty = fields["quantity"];
      return {
        name: fields["food"] ?? "",
        quantity: !rawQty || rawQty === "null" ? null : Number(rawQty),
        unit:
          !fields["unit"] || fields["unit"] === "null" ? null : fields["unit"],
      };
    });
}

let tokenizer: Awaited<
  ReturnType<typeof AutoTokenizer.from_pretrained>
> | null = null;
let model: Awaited<
  ReturnType<typeof AutoModelForSeq2SeqLM.from_pretrained>
> | null = null;

self.onmessage = async (e: MessageEvent<InMsg>) => {
  const msg = e.data;

  if (msg.type === "load") {
    // Strip leading slash — localModelPath already provides the base URL,
    // so the model ID must be a bare relative path like "models/food".
    const modelId = msg.modelPath.replace(/^\/+/, "");
    console.log(
      "[foodWorker] loading model id",
      modelId,
      "from",
      env.localModelPath,
    );

    [tokenizer, model] = await Promise.all([
      AutoTokenizer.from_pretrained(modelId),
      AutoModelForSeq2SeqLM.from_pretrained(modelId, {
        dtype: "fp32",
        device: "webgpu",
      }),
    ]);

    const device = (model as any).sessions?.model?.config?.device ?? "unknown";
    console.log("[foodWorker] model loaded, device:", device);

    // Warmup: compile WebGPU shaders
    const warmupInput = tokenizer!("warmup", { return_tensors: "pt" });
    await model!.generate({ ...warmupInput, max_new_tokens: 1 });
    console.log("[foodWorker] warmup done");

    self.postMessage({ type: "ready" } satisfies OutMsg);
    return;
  }

  if (msg.type === "extract") {
    if (!tokenizer || !model) {
      console.error("[foodWorker] model not loaded");
      return;
    }
    const t0 = performance.now();
    const input = "extract_food: " + normalize(msg.text);
    const encoded = tokenizer(input, { return_tensors: "pt" });
    const outputIds = await model.generate({
      ...encoded,
      max_new_tokens: 128,
      use_cache: true,
    });
    const decoded = tokenizer.decode(outputIds[0], {
      skip_special_tokens: true,
    });
    const foods = parseFoods(decoded);
    console.log(
      `[foodWorker] prediction took ${(performance.now() - t0).toFixed(1)} ms`,
    );
    self.postMessage({ type: "result", foods } satisfies OutMsg);
  }
};
