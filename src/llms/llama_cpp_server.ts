import { LLM, BaseLLMParams } from "langchain/llms/base";

export class LlamaCppServerCompletion extends LLM {
  constructor(fields?: BaseLLMParams) {
    super(fields ?? {});
  }

  async _call(
    prompt: string,
    options: this["ParsedCallOptions"]
  ): Promise<string> {
    return this.caller.call(async () => {
      try {
        const res = await this.callCompletionApi(prompt);
        const resJson = await res.json();
        return resJson.content;
      } catch (e) {
        throw e;
      }
    });
  }

  _llmType(): string {
    return "llama-cpp-server";
  }

  private async callCompletionApi(input: string) {
    return fetch("http://localhost:8080/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        temperature: 0.0,
        n_predict: 128,
        repeat_penalty: 1.2,
        stop: ["\n"],
      }),
    });
  }
}
