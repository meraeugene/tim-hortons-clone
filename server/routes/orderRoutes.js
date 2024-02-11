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

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, checkObjectId, getOrderById);
router.route("/:id/pay").put(protect, checkObjectId, updateOrderToPaid);
router.route("/:id/cod/pay").put(protect, checkObjectId, updateCodOrderToPaid);

router
  .route("/:id/status")
  .put(protect, admin, checkObjectId, updateOrderStatus);

export default router;
