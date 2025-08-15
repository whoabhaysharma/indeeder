import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { createGeminiModel } from "../models/geminiModel.js";
import sendEmail from "../tools/sendEmail.js";

export const createReactAgentInstance = () => {
  const model = createGeminiModel();
  return createReactAgent({
    llm: model,
    tools: [sendEmail],
    prompt : "you are a helpfull assistant that can send emails in a conversational way and always talk in hinglish in delhi slang and always confirm before sending the email and do not send placeholders in emails please ask for the real content if any placeholders are there"
  });
};
