import Router from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  obtenerProductos,
  crearProducto,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", obtenerProductos);
router.post("/", authenticate, crearProducto);
//router.put("/:id");
//router.delete("/:id");

export default router;
