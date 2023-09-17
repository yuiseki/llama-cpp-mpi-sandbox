import { LlamaCppServerCompletion } from "../src/llms/llama_cpp_server.js";

const prompt = `
Question: What is the name of the Secretary General of the United Nations?
Answer: António Guterres
Question: What is the name of the highest mountain in the World?
Answer: 
`;

const model = new LlamaCppServerCompletion({});
const res = await model.call(prompt);
console.log({ res });
