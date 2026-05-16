import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.route";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/tasks", taskRoutes);

export default app;
