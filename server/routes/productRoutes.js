import express from "express";
import {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllProductReviews,
  getProductsByCategory,
  deleteReviewById,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// Manage product (create, get)
router.route("/").get(getProducts).post(protect, admin, createProduct);
// Get all categories
router.route("/categories").get(getCategories);
// Sort and get products by category
router.route("/category/:category").get(getProductsByCategory);
router.route("/reviews").get(protect, admin, getAllProductReviews);
// Delete a review by Admin
router
  .route("/reviews/:id")
  .delete(protect, admin, checkObjectId, deleteReviewById);
// Create a review by everyone
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
// Manage product by Id (get, update,delete)
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
