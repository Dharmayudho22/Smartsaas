import {
  createTaskService,
  getTasksByProjectService,
  updateTaskStatusService,
  deleteTaskService
} from "./service.js";

import {
  createTaskSchema,
  updateTaskStatusSchema,
  taskIdSchema
} from "./validation.js";

export const createTask = async (req, res) => {
  try {
    const validated = createTaskSchema.parse(req.body);
    const { projectId } = req.params;

    const task = await createTaskService({
      user: req.user,
      projectId,
      data: validated
    });

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message
    });
  }
};

export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await getTasksByProjectService({
      user: req.user,
      projectId
    });

    res.status(200).json({
      success: true,
      data: tasks
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const validated = updateTaskStatusSchema.parse(req.body);
    const { id } = taskIdSchema.parse(req.params);

    const task = await updateTaskStatusService({
      user: req.user,
      id,
      status: validated.status
    });

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = taskIdSchema.parse(req.params);

    await deleteTaskService({
      user: req.user,
      id
    });

    res.status(200).json({
      success: true,
      message: "Task berhasil dihapus"
    });

  } catch (error) {
    res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message
    });
  }
};
