import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { search } from "../tools/search";
import { createGeminiModel } from "../models/geminiModel";

export const createReactAgentInstance = () => {
  const model = createGeminiModel();
  return createReactAgent({
    llm: model,
    tools: [search],
  });
};
