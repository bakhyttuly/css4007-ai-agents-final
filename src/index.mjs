import { ask } from "./llm.mjs";

const question = process.argv[2] ?? "Hi! Answer in one sentence.";

try {
  console.log(await ask(question));
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
