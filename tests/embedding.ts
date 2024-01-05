import { LlamaCppServerEmbeddings } from "../src/embeddings/llama_cpp_server.ts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const embeddings = new LlamaCppServerEmbeddings();
const vectorStore = await MemoryVectorStore.fromTexts(
  [
    "Hello world",
    "Bye bye",
    "hello nice world",
    "Intelligence",
    "Artificial Intelligence",
    "Artificial General Intelligence",
    "Geospatial Information System",
    "Quantum Computer",
    "Climate Change",
    "こんにちは",
    "知能",
    "人工知能",
    "汎用人工知能",
    "地理空間情報システム",
    "量子コンピューター",
  ],
  [],
  embeddings
);

const results = await vectorStore.similaritySearch(
  "Artificial Intelligence",
  2
);
console.log(results);
