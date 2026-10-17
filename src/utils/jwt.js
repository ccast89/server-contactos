import jwt from "jsonwebtoken";

//Generar token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
//Verificar Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_EXPIRES);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};
