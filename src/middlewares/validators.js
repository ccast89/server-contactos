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
export const registerValidation = () => [
  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacio")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("El usuario ya existe");
      }
    }),

  check("email")
    .isEmail()
    .withMessage("Ingresar un email válido")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("El email ya está resgistrado");
      }
    })
    .normalizeEmail(),

  //Validar el password - Lo sacamos xq hicimos abajo un validator para el password q se aplique a todos
  // check("password")
  //   .isLength({ min: 6 })
  //   .withMessage("La contraseña debe tener como mínimo 6 caracteres")
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  //   .withMessage("La contraseña debe tener mayúsculas, minúsculas y números"),
];

//Función para validar el login
export const loginValidation = () => [
  check("email")
    .trim()
    .isEmail()
    .withMessage("Ingresar un email válido")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("La constraseña es requerida"),
];

//Verificacion del password tanto para el register como e login
export const ValidationPassword = () => [
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener como mínimo 6 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("La contraseña debe tener mayúsculas, minúsculas y números"),
];

//validación de còdigo de mail
export const verifyEmailValidation = () => [
  check("code")
    .notEmpty()
    .withMessage("El còdigo de verificaiòn es necesario")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("El còdigo debe tener 6 dìgitos")
    .isNumeric()
    .withMessage("El código debe ser un nùmero"),
  check("email")
    .notEmpty()
    .withMessage("El correo es requerido")
    .trim()
    .isEmail()
    .withMessage("Ingrese un email válido")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user.emailVerified) {
        throw new Error("El email ya está verificado");
      }
    })
    .normalizeEmail(),
  handleValidationErrors,
];
