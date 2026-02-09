import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    deadline: z.string().datetime(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional()
});

export const updateTaskSchema = z.object({
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional()
});

export const taskIdSchema = z.object({
    id: z.string().uuid()
});