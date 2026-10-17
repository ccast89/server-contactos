import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "La autenticación es requerida. Por favor envía un token",
      });
    }

    const decoded = verifyToken(token);

    //Buscar el usuario asociado al token

    const user = await User.findById(decoded.userId).select("-password"); //el - es para q no me traiga el password

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
