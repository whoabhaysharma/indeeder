import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { search } from "../tools/search.js";
import { createGeminiModel } from "../models/geminiModel.js";

export const createReactAgentInstance = () => {
  const model = createGeminiModel();
  return createReactAgent({
    llm: model,
    tools: [search],
  });
};
