import torch
from transformers import (
    AutoModelForSeq2SeqLM,
    AutoTokenizer,
    Trainer,
    TrainerCallback,
    TrainingArguments,
)

from model.data import tokenize_dataset

model_name = "t5-small"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
train_ds, val_ds = tokenize_dataset(
    model_name,
    "model/food_ds.json",
    long_path="model/food_ds_long.json",
)
tokenizer = AutoTokenizer.from_pretrained("t5-small")
_sample = val_ds[0]
training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=32,
    per_device_eval_batch_size=4,
    num_train_epochs=20,
    learning_rate=5e-5,
    logging_steps=20,
    save_strategy="epoch",
    weight_decay=0.01,
    warmup_steps=100,
    report_to="none",
)
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_ds,
)
trainer.train()
# Save tokenizer alongside results so the Vite dev server can find it.
tokenizer.save_pretrained("./results")
for example in val_ds.select(range(5)):
    input_text = "extract_food: " + example["input"]
    inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_length=256)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    print("Input:", example["input"])
    print("Target:", example["output"])
    print("Generated:", generated_text)
    print("---")
