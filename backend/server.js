// import { client } from "./openai.js";
// import { Agent, run } from "@openai/agents";

// const helloAgent = new Agent({
//   name: "HelloAgent",
//   instructions:
//     "You are a helpful assistant that greets the user with their name and says positive thoughts.",
//   model: "gpt-4o",
// });

// // 👇 pass client explicitly
// async function main(userInput) {
//   const result = await run(helloAgent, userInput, {
//     client,
//   });
//   console.log(
//     "Agent response:::::::::::::::::::::::::::::::::::::::::::",
//     result.finalOutput,
//   );
// }

// main("hii my name is zee zee");

import express from "express";
import cors from "cors";
import { runAgent } from "./agent.js";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// CREATE
app.post("/add", (req, res) => {
  const { task } = req.body;
  todos.push(task);
  res.json({ todos });
});

// READ
app.get("/todos", (req, res) => {
  res.json({ todos });
});

// DELETE
app.post("/delete", (req, res) => {
  const { task } = req.body;
  todos = todos.filter((t) => t !== task);
  res.json({ todos });
});

// 🤖 AGENT ROUTE
app.post("/agent", async (req, res) => {
  const { input } = req.body;

  const decision = await runAgent(input);

  if (decision.action === "ADD") {
    todos.push(decision.task);
  }

  if (decision.action === "DELETE") {
    todos = todos.filter((t) => t !== decision.task);
  }

  res.json({ todos, decision });
});

app.listen(5000, () => {
  console.log("Backend running");
});
