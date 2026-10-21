import Router from "express";
import {
  getUsers,
  register,
  login,
  verifyEmail,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  handleValidationErrors,
  loginValidation,
  registerValidation,
  ValidationPassword,
  verifyEmailValidation,
} from "../middlewares/validators.js";

const router = Router();

router.get("/", authenticate, getUsers);
router.post(
  "/register",
  registerValidation(),
  ValidationPassword(),
  handleValidationErrors,
  register,
);
router.post(
  "/login",
  loginValidation(),
  ValidationPassword(),
  handleValidationErrors,
  login,
);
router.post("/verify-email", verifyEmailValidation(), verifyEmail);
router.delete("/:id", deleteUser);

export default router;
