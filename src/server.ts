import express from "express";
import type { Request, Response, Application } from "express";
import todoRoutes from "./routes/todo.routes.js";

const app: Application = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send(`Todo api is running`);
});

app.use("/api/todos/", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})