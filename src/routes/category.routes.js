import Router from "express";
import { check } from "express-validator";
import { authenticate } from "../middlewares/auth.js";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import {
  handleValidationErrors,
  validarCategoriaPorId,
  validarRolAdmin,
} from "../middlewares/validators.js";

const router = Router();

router.get("/", getCategories);
router.post(
  "/",
  [
    authenticate,
    validarRolAdmin,
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    handleValidationErrors,
  ],
  addCategory,
);
router.put(
  "/:id",
  [
    authenticate,
    validarRolAdmin,

    check("id").isMongoId().withMessage("El id debe ser vàlido"),
    check("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    check("id").custom(validarCategoriaPorId),
    handleValidationErrors,
  ],
  updateCategory,
);
router.delete(
  "/:id",
  [
    authenticate,
    validarRolAdmin,

    check("id").isMongoId().withMessage("El id debe ser vàlido"),
    check("id").custom(validarCategoriaPorId),
    handleValidationErrors,
  ],
  deleteCategory,
);

export default router;
