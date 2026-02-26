import { z } from "zod";

// Create todo validation
export const createTodoSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be under 100 characters')
        .trim()
});
// Update todo validation
export const updateTodoSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(100)
        .trim()
        .optional(),
    completed: z.boolean().optional()
});

// ID param validation

export const idParamSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, 'ID must be a number')
});

// Pagination validation
export const paginationSchema = z.object({
    page: z
        .string()
        .regex(/^\d+$/)
        .optional(),
    limit: z
        .string()
        .regex(/^\d+$/)
        .optional()
});