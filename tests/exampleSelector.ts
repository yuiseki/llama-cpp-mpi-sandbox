import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  SemanticSimilarityExampleSelector,
  PromptTemplate,
  FewShotPromptTemplate,
} from "langchain/prompts";
import { LlamaCppServerEmbeddings } from "../src/embeddings/llama_cpp_server.ts";
import { LlamaCppServerCompletion } from "../src/llms/llama_cpp_server.ts";

const embeddings = new LlamaCppServerEmbeddings();

const memoryVectorStore = new MemoryVectorStore(embeddings);
const exampleSelector = new SemanticSimilarityExampleSelector({
  vectorStore: memoryVectorStore,
  k: 3,
  inputKeys: ["input"],
});

const exampleList = [
  {
    input: "AreaWithConcern: Sudan, Hospitals",
    output: `
\`\`\`
[out:json][timeout:30000];
area["name"="Sudan"]->.searchArea;
(
  nwr["amenity"="hospital"](area.searchArea);
  nwr["amenity"="doctors"](area.searchArea);
);
out geom;
\`\`\`
`,
  },
  {
    input: "AreaWithConcern: Lebanon, Embassies",
    output: `
\`\`\`
[out:json][timeout:30000];
area["name"="Lebanon"]->.searchArea;
(
nwr["office"="diplomatic"](area.searchArea);
);
out geom;
\`\`\`
`,
  },
  {
    input: "AreaWithConcern: Kyoto, Hotels",
    output: `
\`\`\`
[out:json][timeout:30000];
area["name"="Kyoto"]->.searchArea;
(
  nwr["tourism"="hotel"](area.searchArea);
);
out geom;
\`\`\`
`,
  },
];

const examplePrompt = PromptTemplate.fromTemplate(
  `Input text:
{input}

Output:
{output}
`
);

for (const example of exampleList) {
  await exampleSelector.addExample(example);
}

const dynamicPrompt = new FewShotPromptTemplate({
  exampleSelector: exampleSelector,
  examplePrompt: examplePrompt,
  prefix: `Instruct: You are an expert OpenStreetMap and Overpass API. You output the best Overpass API query based on input text.

You will always output according to the following rules:
- Output valid Overpass API query.
- The query timeout MUST be 30000.
- The query will utilize a area specifier as needed.
- The query will search nwr as needed.
- The query MUST be out geom.
- The query MUST be enclosed by three backticks on new lines, denoting that it is a code block.

### Examples: ###`,
  suffix: `
Input text:
{input}

Output:
`,
  inputVariables: ["input"],
});

const llm = new LlamaCppServerCompletion({
  temperature: 0.0,
  n_predict: 64,
  repeat_penalty: 1.2,
  stop: ["Input text:"],
});

const chain = dynamicPrompt.pipe(llm);

const result = await chain.invoke({
  input: "AreaWithConcern: Sudan, Hotels",
});
console.info(result);
console.info("");
