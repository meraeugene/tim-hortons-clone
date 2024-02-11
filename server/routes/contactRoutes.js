import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createContact,
  deleteContactById,
  getContacts,
} from "../controllers/contactController.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").get(protect, admin, getContacts).post(createContact);
router.route("/:id").delete(protect, admin, checkObjectId, deleteContactById);

export default router;
