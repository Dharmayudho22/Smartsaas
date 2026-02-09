import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    deadline: z.string().datetime()
});

export const projectIdSchema = z.object({
    id: z.string().uuid()
});