import { Router } from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

export default router;
