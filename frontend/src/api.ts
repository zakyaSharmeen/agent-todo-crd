import axios from "axios";

const API = "http://localhost:5000";

export const getTodos = () => axios.get(`${API}/todos`);
export const addTask = (task: string) => axios.post(`${API}/add`, { task });
export const deleteTask = (task: string) =>
  axios.post(`${API}/delete`, { task });

export const runAgent = (input: string) =>
  axios.post(`${API}/agent`, { input });
