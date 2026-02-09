import {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    deleteProjectService
} from "./service.js";

import { createProjectService, projectIdSchema } from "./validation.js";

export const createProject = async (req, res) => {
    try {
        const validated = createProjectSchema.parse(req.body);

        const project = await createProjectService({
            user: req.user,
            data: validated
        });

        res.status(201).json({
            success: true,
            data: project
        });

    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : error.message
        });
    }
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await getAllProjectsService(req.user);

        res.status(200).json({
            success: true,
            data: projects
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { id } = projectIdSchema.parse(req.params);

        const project = await getProjectByIdService({
            user: req.user,
            id: validated.id
        });

        if (!project) {
            return res.status(404).json({ message: "Project tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : error.message
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const validated = projectIdSchema.parse(req.params);

        await deleteProjectService({
            user: req.user,
            id: validated.id
        });

        res.status(200).json({
            success: true,
            message: "Project berhasil dihapus"
        });

    } catch (error) {
        res.status(400).json({
            message: error.errors ? error.errors[0].message : error.message
        });
    }
};
