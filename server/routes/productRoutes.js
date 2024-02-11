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

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/categories").get(getCategories);
router.route("/category/:category").get(getProductsByCategory);
router.route("/reviews").get(protect, admin, getAllProductReviews);
router
  .route("/reviews/:id")
  .delete(protect, admin, checkObjectId, deleteReviewById);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
