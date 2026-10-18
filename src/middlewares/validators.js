import { validationResult } from "express-validator";
import { check } from "express-validator";
import User from "../models/User.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

//funciòn para validar registro
export const registerVlidation = () => [
  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("El usuario ya existe");
      }
    }),
  handleValidationErrors,
];
