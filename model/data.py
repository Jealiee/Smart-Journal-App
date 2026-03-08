import json
import re

from datasets import Dataset
from transformers import AutoTokenizer


def normalize_input(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    text = text.strip().rstrip(".,;:!?")
    return text


def _generate_long_examples(long_path: str) -> list[dict]:
    """
    Generate context-growing training examples from food_ds_long.json at runtime.
    For each entry, produces one training example per sentence-prefix length,
    with the correct expected output reflecting what foods and quantities are
    known at that point in the text.
    """
    with open(long_path, encoding="utf-8") as f:
        entries = json.load(f)

    examples = []
    for entry in entries:
        sentences = entry["sentences"]
        foods = entry["foods"]
        for k in range(1, len(sentences) + 1):
            text = " ".join(sentences[:k])
            parts = []
            for food in foods:
                if food["name_sentence"] >= k:
                    continue
                final = food.get("final")
                initial = food.get("initial")
                if final and final["sentence"] < k:
                    q = (
                        str(final["quantity"])
                        if final["quantity"] is not None
                        else "null"
                    )
                    u = final["unit"] if final["unit"] is not None else "null"
                elif initial and initial["sentence"] < k:
                    q = (
                        str(initial["quantity"])
                        if initial["quantity"] is not None
                        else "null"
                    )
                    u = initial["unit"] if initial["unit"] is not None else "null"
                else:
                    q, u = "null", "null"
                parts.append(f"food: {food['name']}, quantity: {q}, unit: {u}")
            examples.append({"input": text, "output": "|".join(parts)})

    return examples


def tokenize_dataset(model_name, json_paths, long_path=None):
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    if isinstance(json_paths, str):
        json_paths = [json_paths]

    data = []
    for path in json_paths:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
        # strip // line comments so files can use them for organisation
        clean = re.sub(r"//[^\n]*", "", raw)
        data.extend(json.loads(clean))

    if long_path:
        long_examples = _generate_long_examples(long_path)
        data.extend(long_examples)
        print(f"  + {len(long_examples)} context-growing examples from {long_path}")

    print(f"  Total examples before split: {len(data)}")

    ds = Dataset.from_list(data)

    split_ds = ds.train_test_split(test_size=0.1, seed=42)
    train_ds = split_ds["train"]
    val_ds = split_ds["test"]

    def preprocess(example):
        input_text = "extract_food: " + normalize_input(example["input"])
        inputs = tokenizer(
            input_text, truncation=True, padding="max_length", max_length=512
        )
        labels = tokenizer(
            example["output"], truncation=True, padding="max_length", max_length=256
        )

        labels_ids = [
            token if token != tokenizer.pad_token_id else -100
            for token in labels["input_ids"]
        ]

        inputs["labels"] = labels_ids
        return inputs

    train_ds = train_ds.map(preprocess, batched=False)
    val_ds = val_ds.map(preprocess, batched=False)

    return train_ds, val_ds
