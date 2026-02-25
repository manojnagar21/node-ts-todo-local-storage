import type { Request, Response } from "express";
import { localStorage } from "../storage/localstorage.js";
import type { Todo } from "../types/todo.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    res.status(200).json(getStoredTodos());
}
// Get todo by id
export const getTodo = (req: Request, res: Response) => {
    const todos = getStoredTodos();
    
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
        return res.status(404).send({ msg: "Todo not available" });
    }
    res.status(200).json({ msg: "Todo found", data: todo });
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

// Toggle completes
export const toggleTodo = (req: Request, res: Response) => {
    const todos = getStoredTodos();
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
        return res.status(404).send({ msg: "Task not available" });
    }
    todo.completed = !todo.completed;
    saveTodos(todos);
    res.status(202).json(todo);
}