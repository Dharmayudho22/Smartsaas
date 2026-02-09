import prisma from "../../config/database.js";

export const createTaskService = async ({ user, projectId, data }) => {

  // pastikan project milik company user
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      companyId: user.companyId
    }
  });

  if (!project) {
    throw new Error("Project tidak ditemukan");
  }

  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      deadline: new Date(data.deadline),
      priority: data.priority || "MEDIUM",
      projectId: project.id
    }
  });
};

export const getTasksByProjectService = async ({ user, projectId }) => {

  return await prisma.task.findMany({
    where: {
      projectId,
      project: {
        companyId: user.companyId
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const updateTaskStatusService = async ({ user, id, status }) => {

  const task = await prisma.task.findFirst({
    where: {
      id,
      project: {
        companyId: user.companyId
      }
    }
  });

  if (!task) {
    throw new Error("Task tidak ditemukan");
  }

  return await prisma.task.update({
    where: { id },
    data: { status }
  });
};

export const deleteTaskService = async ({ user, id }) => {

  return await prisma.task.deleteMany({
    where: {
      id,
      project: {
        companyId: user.companyId
      }
    }
  });
};
