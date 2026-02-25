import { localStorage } from "../storage/localstorage.js";
import type { Todo } from "../types/todo.js";

// Helper functions
const getStoredTodos = (): Todo[] => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
}
const saveTodos = (todos: Todo[]) => {
    localStorage.setItem("todo", JSON.stringify(todos));
}

export { getStoredTodos, saveTodos };