import Router from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getCategories,
  addCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getCategories);
router.post("/", authenticate, addCategory);
router.put("/:id", authenticate, updateCategory);
//router.delete("/:id");

export default router;
