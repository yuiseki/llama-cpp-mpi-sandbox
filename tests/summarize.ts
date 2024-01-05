import { LlamaCppServerCompletion } from "../src/llms/llama_cpp_server.ts";
import { loadSummarizationChain } from "langchain/chains";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const loader = new DirectoryLoader(
  "/home/yuiseki/src/github.com/yuiseki/trident-next/tmp/www.undocs.org/en/pdfs/A/RES/77/",
  {
    ".pdf": (path) => new PDFLoader(path, { splitPages: false }),
  }
);
const docs = await loader.load();
console.log(docs.length);

for await (const doc of docs) {
  console.log(JSON.stringify(doc.metadata, null, 2));
  console.log(doc.pageContent);

  const model = new LlamaCppServerCompletion({});
  const chain = loadSummarizationChain(model, { type: "map_reduce" });
  const res = await chain.call({
    input_documents: [doc],
  });
  console.log({ res });
}
