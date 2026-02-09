import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
} from "./controller.js";

import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorizeRoles } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("OWNER"),
  createProject
);

router.get("/", authenticate, getAllProjects);

router.get("/:id", authenticate, getProjectById);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("OWNER"),
  deleteProject
);

export default router;
