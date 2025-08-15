import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const createGeminiModel = () => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0.5,
    apiKey: process.env.GOOGLE_API_KEY, // set in terminal before running
  });
};
