import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask
} from "./controller.js";

import { authenticate } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// create task inside project
router.post("/:projectId", authenticate, createTask);

// get tasks by project
router.get("/:projectId", authenticate, getTasksByProject);

// update task status
router.patch("/status/:id", authenticate, updateTaskStatus);

// delete task
router.delete("/:id", authenticate, deleteTask);

export default router;
