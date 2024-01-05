import { LlamaCppServerEmbeddings } from "../src/embeddings/llama_cpp_server.ts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const embeddings = new LlamaCppServerEmbeddings();
const vectorStore = await MemoryVectorStore.fromTexts(
  [
    "Hello world",
    "Bye bye",
    "hello nice world",
    "Artificial General Intelligence",
    "Climate Change",
  ],
  [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  embeddings
);

const resultOne = await vectorStore.similaritySearch("人工知能", 1);
console.log(resultOne);
