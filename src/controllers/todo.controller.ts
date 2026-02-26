import type { Request, Response } from "express";
import { localStorage } from "../storage/localstorage.js";
import type { Todo } from "../types/todo.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";
import { createTodoSchema } from "../validations/todo.validation.js";
import { z } from "zod";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    res.status(200).json(getStoredTodos());
};
// Get todo by id
export const getTodo = (req: Request, res: Response) => {
    const todos = getStoredTodos();
    
    const id = Number(req.params.id);
    const todo = todos.find(t => t.id === id);
    if(!todo) {
        return res.status(404).send({ msg: "Todo not available", data: [] });
    }
    res.status(200).json({ msg: "Todo found", data: todo });
};
// Create todo
export const createTodo = (req: Request, res: Response) => {
    const todos = getStoredTodos();
    try {
        // validate request
        const validated = createTodoSchema.parse(req.body)
        console.log("yes");
        console.log("validated", validated);
        const newTodo: Todo = {
            id: Date.now(),
            title: validated.title,
            completed: false
        };
        todos.push(newTodo);
        saveTodos(todos);
        res.status(201).json(newTodo);
    } catch(error: any) {
        console.log("no");
        // res.status(400).json({
        //     errors: error.errors
        // });   
        // const errorResponse = error.errors ? error.errors : { message: error.message || "Unknown error" };
        // return res.status(400).json({
        //     success: false,
        //     errors: errorResponse
        // });


        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                // .flatten() turns that messy string into a clean object
                errors: error.flatten().fieldErrors 
            });
        }

        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

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
};

// Delete todo
export const deleteTodo = (req: Request, res: Response) => {
    let todos = getStoredTodos();
    const id = Number(req.params.id);
    let todoToDelete = todos.find(t => t.id === id);
    if(!todoToDelete) {
        res.status(404).json({ msg: " Todo not available", data: [] });
    }
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    res.status(200).send({ msg: "Todo deleted", data: todoToDelete });
}


/*
https://www.programiz.com/online-compiler/5kB2JJIh5AV7w
https://www.programiz.com/online-compiler/4J89mmRnN7Dxl
https://www.programiz.com/online-compiler/7ysgPPG7Md3nO
https://www.programiz.com/online-compiler/4qxLQQiaZ5cZk
https://www.programiz.com/online-compiler/69Js00efAi3B3
https://www.programiz.com/online-compiler/1puvqqhJgY9KU
*/