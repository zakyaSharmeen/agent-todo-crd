// import { client } from "./openai.js";

import { client } from "./openai.js";

// Agent decides what CRUD action to take
export async function runAgent(userInput) {
  const prompt = `
You are an AI agent for a todo app.

Available actions:
1. ADD task
2. DELETE task
3. UPDATE task

Respond ONLY in JSON format like:
{ "action": "ADD", "task": "buy milk" }

User input:
${userInput}
`;

  const response = await client.responses.create({
    model: "openai/gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output[0].content[0].text;
  console.log("raw text from text coming", text);

  try {
    const parsed = JSON.parse(text);
    console.log("coming from parsed", parsed);

    return parsed;
  } catch {
    return { action: "NONE" };
  }
}
