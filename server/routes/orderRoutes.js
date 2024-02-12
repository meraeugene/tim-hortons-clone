import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderStatus,
  updateCodOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// Manage order item (create by user, get by admin,)
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// Get individual orders
router.route("/myorders").get(protect, getMyOrders);
// Get order by id for everyone
router.route("/:id").get(protect, checkObjectId, getOrderById);
// Pay order through visa and paypal by Admin
router.route("/:id/pay").put(protect, checkObjectId, updateOrderToPaid);
// Pay order through COD and verify by Admin
router.route("/:id/cod/pay").put(protect, checkObjectId, updateCodOrderToPaid);
// Update order status like delivered, process, shipped etc..
router
  .route("/:id/status")
  .put(protect, admin, checkObjectId, updateOrderStatus);

export default router;
