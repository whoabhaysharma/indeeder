import readline from "readline";
import { createReactAgentInstance } from "../agents/reactAgent.js";
import { AIMessage } from "@langchain/core/messages";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("🤖 Gemini Chat — type 'exit' to quit");
rl.prompt();

let conversationHistory = [];

rl.on("line", async (input) => {
  const message = input.trim();
  if (message.toLowerCase() === "exit") {
    rl.close();
    return;
  }

  try {
    const agent = createReactAgentInstance();
    const result = await agent.invoke({
      messages: [
        ...conversationHistory,
        { role: "user", content: message },
      ],
    });

    conversationHistory = result.messages;

    const lastAiMessage = [...result.messages]
      .reverse()
      .find((msg) => msg instanceof AIMessage);

    let finalText = "";
    if (Array.isArray(lastAiMessage?.content)) {
      finalText = lastAiMessage.content
        .filter((part) => typeof part === "string")
        .join("\n");
    } else {
      finalText = lastAiMessage?.content || "";
    }

    console.log(`\nAI: ${finalText}\n`);
  } catch (err) {
    console.error("Error:", err);
  }

  rl.prompt();
}).on("close", () => {
  console.log("\n👋 Chat ended.");
  process.exit(0);
});
