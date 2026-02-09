import prima from '../../config/prisma.js';

export const createProjectService = async ({ user, data }) => {
    return await prisma.project.create({
        data: {
            name: data.name,
            description: data.description,
            deadline: new Date(data.deadline),
            companyId: user.companyId,
            ownerId: user.id
        }
    });
};

export const getAllProjectsService = async ({ user }) => {
    return await prisma.project.findMany({
        where: {
            companyId: user.companyId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const getProjectByIdService = async ({ user, id }) => {
  return await prisma.project.findFirst({
    where: {
      id,
      companyId: user.companyId
    },
    include: {
      tasks: true
    }
  });
};

export const deleteProjectService = async ({ user, id }) => {
  return await prisma.project.deleteMany({
    where: {
      id,
      companyId: user.companyId
    }
  });
};