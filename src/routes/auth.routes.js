import Router from "express";
import { getUsers, register } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", getUsers);

router.post("/register", register);

export default router;
