import type { Request, Response } from "express";
import { localStorage } from "../storage/localstorage.js";
import type { Todo } from "../types/todo.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";
import { createTodoSchema, idParamSchema, updateTodoSchema } from "../validations/todo.validation.js";
import { z } from "zod";

// Get all todos
export const getTodos = (_req: Request, res: Response) => {
    // try catch
    try {
        res.status(200).json(getStoredTodos());
    } catch (error: any) {
        res.status(500).json({ msg: "Something went wrong", data: [] });
    }
};
// Get todo by id
export const getTodo = (req: Request, res: Response) => {
    // try catch
    try {
        const todos = getStoredTodos();
        const id = Number(req.params.id);
        const todo = todos.find(t => t.id === id);
        if(!todo) {
            return res.status(404).send({ msg: "Todo not available", data: [] });
        }
        res.status(200).json({ msg: "Todo found", data: todo });
    } catch (error: any) {
        res.status(500).json({ msg: "Something went wrong", data: [] });
    }
};
// Create todo
export const createTodo = (req: Request, res: Response) => {
    // try catch
    try {
        // validate request
        const validated = createTodoSchema.safeParse(req.body);
        if(!validated.success) {
            const flattened = z.flattenError(validated.error);
            return res.status(400).json(flattened.fieldErrors);
        }
        const todos = getStoredTodos();
        const data = validated.data;
        const newTodo: Todo = {
            id: Date.now(),
            title: data.title,
            completed: false
        };
        todos.push(newTodo);
        saveTodos(todos);
        res.status(201).json(newTodo);   
    } catch (error: any) {
        res.status(500).json({ msg: "Something went wrong", data: [] });
    }
};

// Toggle completes
export const toggleTodo = (req: Request, res: Response) => {
    // try catch
    try {
        // validate request
        const paramsValidated = idParamSchema.safeParse(req.params);
        console.log(paramsValidated);
        console.log(req.body);
        if(req.body) {
            const reqValidated = updateTodoSchema.safeParse(req.body);
            console.log(reqValidated);
            if(!reqValidated.success) {
                const flattened = z.flattenError(reqValidated.error);
                return res.status(400).json(flattened.fieldErrors);
            }
            const dataReq = reqValidated.data;
        }
        if(!paramsValidated.success) {
            const flattened = z.flattenError(paramsValidated.error);
            return res.status(400).json(flattened.fieldErrors);
        }
        
        const dataId = paramsValidated.data;
        const todos = getStoredTodos();
        const id = Number(dataId.id);
        const todo = todos.find(t => t.id === id);

        if(!todo) {
            return res.status(404).send({ msg: "Task not available" });
        }
        todo.completed = !todo.completed;
        saveTodos(todos);
        res.status(202).json(todo);
    } catch (error: any) {
        res.status(500).json({ msg: "Something went wrong", data: [] });
    }
};

// Delete todo
export const deleteTodo = (req: Request, res: Response) => {
    // try catch
    try {
        // validate request
        const validated = idParamSchema.safeParse(req.params);
        if(!validated.success) {
            const flattened = z.flattenError(validated.error);
            return res.status(400).json(flattened.fieldErrors);
        }
        
        const data = validated.data;
        let todos = getStoredTodos();
        const id = Number(req.params.id);
        let todoToDelete = todos.find(t => t.id === id);
        if(!todoToDelete) {
            return res.status(404).json({ msg: " Todo not available", data: [] });
        }
        todos = todos.filter(t => t.id !== id);
        saveTodos(todos);
        res.status(200).send({ msg: "Todo deleted", data: todoToDelete });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", data: [] });
    }
}


/*
https://www.programiz.com/online-compiler/5kB2JJIh5AV7w
https://www.programiz.com/online-compiler/1udpRzcKDHvz8
https://www.programiz.com/online-compiler/6qxLusxgF599h
https://www.programiz.com/online-compiler/9UzK7nJ9SZY1k
https://www.programiz.com/online-compiler/69Js00efAi3B3
https://www.programiz.com/online-compiler/1puvqqhJgY9KU
*/