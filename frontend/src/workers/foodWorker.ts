import { AutoTokenizer, env } from "@xenova/transformers";
import wasmInit, { T5Model } from "../wasm/food_wasm.js";

env.allowLocalModels = true;
env.allowRemoteModels = false;
// pathJoin in @xenova/transformers strips the leading "/" from non-first parts,
// so localModelPath must be "/" for absolute paths like "/models/food" to resolve correctly.
env.localModelPath = "/";

export type FoodItem = {
  name: string;
  quantity: number | null;
  unit: string | null;
};

type InMsg =
  | { type: "load"; modelPath: string }
  | { type: "extract"; text: string };

type OutMsg = { type: "ready" } | { type: "result"; foods: FoodItem[] };

let model: T5Model | null = null;
let tokenizer: Awaited<
  ReturnType<typeof AutoTokenizer.from_pretrained>
> | null = null;

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

self.onmessage = async (e: MessageEvent<InMsg>) => {
  const msg = e.data;

  if (msg.type === "load") {
    await wasmInit();
    const [weightsRes, configRes] = await Promise.all([
      fetch(`${msg.modelPath}/model.safetensors`),
      fetch(`${msg.modelPath}/config.json`),
    ]);
    const [weights, config] = await Promise.all([
      weightsRes.arrayBuffer(),
      configRes.arrayBuffer(),
    ]);
    tokenizer = await AutoTokenizer.from_pretrained(msg.modelPath);
    model = new T5Model(new Uint8Array(weights), new Uint8Array(config));
    self.postMessage({ type: "ready" } satisfies OutMsg);
    return;
  }

  if (msg.type === "extract") {
    if (!model || !tokenizer) {
      console.error("[foodWorker] model not loaded");
      return;
    }
    const input = "extract_food: " + normalize(msg.text);
    const encoded = await tokenizer(input, { return_tensors: "np" });
    const inputIds = Uint32Array.from(
      encoded.input_ids.data as BigInt64Array,
      (v) => Number(v)
    );
    const outputIds = model.predict_ids(inputIds, 128);
    const decoded: string = tokenizer.decode(Array.from(outputIds), {
      skip_special_tokens: true,
    });
    const foods = parseFoods(decoded);
    self.postMessage({ type: "result", foods } satisfies OutMsg);
  }
};
