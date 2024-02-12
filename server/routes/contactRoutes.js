import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createContact,
  deleteContactById,
  getContacts,
} from "../controllers/contactController.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// Get all contacts submitted by Admin and Create contact by everyone
router.route("/").get(protect, admin, getContacts).post(createContact);
// Delete a contact by Admin
router.route("/:id").delete(protect, admin, checkObjectId, deleteContactById);

export default router;
