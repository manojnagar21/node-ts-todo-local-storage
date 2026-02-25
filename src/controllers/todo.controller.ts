import type { Request, Response } from "express";
import { localStorage } from "../storage/localstorage.js";
import type { Todo } from "../types/todo.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    res.status(200).json(getStoredTodos());
}
// Create todo
export const createTodo = (req: Request, res: Response) => {
    const todos = getStoredTodos();

    const newTodo: Todo = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
}