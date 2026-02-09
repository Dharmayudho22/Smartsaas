import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
