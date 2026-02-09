import { registerUser, loginUser } from "./service.js";
import { registerSchema, loginSchema } from "./validation.js";

export const register = async (req, res) => {
  try {
    const validated = registerSchema.parse(req.body);

    const result = await registerUser(validated);

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


export const login = async (req, res) => {
  try {
    const validated = loginSchema.parse(req.body);

    const result = await loginUser(validated);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message
    });
  }
};

