import Router from "express";
import {
  getUsers,
  register,
  login,
  verifyEmail,
  deleteUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.delete("/:id", deleteUser);

export default router;
