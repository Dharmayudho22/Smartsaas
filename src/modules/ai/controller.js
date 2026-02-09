import { generateProjectWithTasksAI } from "./service.js";
import { z } from "zod";

const generateProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  deadline: z.string().datetime()
});

export const generateProjectWithAI = async (req, res) => {
  try {
    const validated = generateProjectSchema.parse(req.body);

    const result = await generateProjectWithTasksAI({
      user: req.user,
      ...validated
    });

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message
    });
  }
};
