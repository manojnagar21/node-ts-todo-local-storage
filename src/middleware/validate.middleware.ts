import type { Request, Response, NextFunction, Application } from "express";
import { ZodType, ZodObject } from "zod";

export const validate = (schema: ZodObject | ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query
        })
        if(!result.success) {
            const errors = result.error.issues.map(err => ({
                field: err.path.join("."),
                message: err.message
            }));
            return res.status(400).json({
                status: "error",
                errors: errors
            });
        }
        // attach validation data
        req.body = result.data.body ?? req.body;
        req.params = result.data.params ?? req.params;
        req.query = result.data.query ?? req.query;
        next();
}