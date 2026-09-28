import Router from "express";
import { getContacts, postContact } from "../controllers/contactControllers.js";

const router = Router();

router.get("/", getContacts);
router.post("/", postContact);

export default router;
