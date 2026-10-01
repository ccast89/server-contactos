import Router from "express";
import {
  getContacts,
  postContact,
  putContact,
  deleteContact,
} from "../controllers/contactControllers.js";

const router = Router();

router.get("/", getContacts);
router.post("/", postContact);
router.put("/:id", putContact);
router.delete("/:id", deleteContact);

export default router;
