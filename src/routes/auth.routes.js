import Router from "express";
import {
  getUsers,
  register,
  login,
  verifyEmail,
  deleteUser,
  logOut,
  getProfile,
  UpdatePassword,
  resendVerificationCode,
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
router.get("/", authenticate, getUsers);
router.post("/logout", authenticate, logOut);
router.post("/profile", authenticate, getProfile);
router.put(
  "/password",
  loginValidation(),
  ValidationPassword(),
  handleValidationErrors,
  UpdatePassword,
);
router.post("/resend", loginValidation(), resendVerificationCode);
export default router;
