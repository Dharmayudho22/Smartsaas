import express from "express";
import {
  generateTasks,
  generateProjectWithAI
} from "./controller.js";

import { authenticate } from "../../middlewares/authMiddleware.js";
import { authorizeRoles } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/generate-tasks",
  authenticate,
  generateTasks
);

router.post(
  "/generate-project",
  authenticate,
  authorizeRoles("OWNER"),
  generateProjectWithAI
);

export default router;
