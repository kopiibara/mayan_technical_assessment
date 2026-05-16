import { Request, Response } from "express";

import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
  toggleTaskService,
} from "../services/task.service";

import { createTaskSchema } from "../validators/task.validator";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { search, status } = req.query;

    const tasks = await getTasksService(search?.toString(), status?.toString());

    return res.json(tasks);
  } catch (err) {
    console.error("🔥 GET_TASKS_ERROR:", err);

    return res.status(500).json({
      message: "GET tasks failed",
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);

    const task = await createTaskService(validatedData);

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(400).json({
      message: error?.errors?.[0]?.message || "Invalid data",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const validatedData = createTaskSchema.parse(req.body);

    const task = await updateTaskService(id, validatedData);

    return res.json(task);
  } catch {
    return res.status(400).json({
      message: "Update failed",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await deleteTaskService(id);

    return res.json({
      message: "Task deleted",
    });
  } catch {
    return res.status(400).json({
      message: "Delete failed",
    });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const task = await toggleTaskService(id);

    return res.json(task);
  } catch {
    return res.status(400).json({
      message: "Toggle failed",
    });
  }
};
