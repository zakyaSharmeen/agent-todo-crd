import React, { useEffect, useState } from "react";
import { getTodos, addTask, deleteTask, runAgent } from "./api";

const App: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [task, setTask] = useState("");
  const [agentInput, setAgentInput] = useState("");

  const load = async () => {
    const res = await getTodos();
    setTodos(res.data.todos);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    await addTask(task);
    setTask("");
    load();
  };

  const handleDelete = async (t: string) => {
    await deleteTask(t);
    load();
  };

  const handleAgent = async () => {
    await runAgent(agentInput);
    setAgentInput("");
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧠 AI Agent CRUD App</h2>

      {/* Manual CRUD */}
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => handleDelete(t)}>❌</button>
          </li>
        ))}
      </ul>

      {/* 🤖 Agent */}
      <h3>Agent Control</h3>
      <input
        value={agentInput}
        onChange={(e) => setAgentInput(e.target.value)}
        placeholder="e.g. add buy milk"
      />
      <button onClick={handleAgent}>Run Agent</button>
    </div>
  );
};

export default App;
