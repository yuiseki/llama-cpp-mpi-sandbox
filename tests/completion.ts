import { LlamaCppServerCompletion } from "../src/llms/llama_cpp_server.ts";

const prompt = `
Question: What is the name of the Secretary General of the United Nations?
`;

const model = new LlamaCppServerCompletion({
  temperature: 0.0,
  n_predict: 64,
  repeat_penalty: 1.2,
  stop: ["\n"],
});
const res = await model.call(prompt);
console.log({ res });
