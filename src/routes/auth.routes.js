import Router from "express";
import {
  getUsers,
  register,
  login,
  verifyEmail,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { registerVlidation } from "../middlewares/validators.js";

const router = Router();

router.get("/", authenticate, getUsers);
router.post("/register", registerVlidation(), register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.delete("/:id", deleteUser);

export default router;
