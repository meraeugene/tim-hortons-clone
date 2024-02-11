import express from "express";
import {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTPVerificationCode,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  resetPassword,
  remindUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

// USER ROUTES
// Signup
router.post("/auth/register", registerUser);
// Login
router.post("/auth/login", loginUser);
//  Logout
router.post("/auth/logout", logoutUser);
// Verify OTP Email
router.post("/verifyOTP", protect, verifyOTP);
// Resend OTP Verification
router.post("/resendOTPVerifcationCode", resendOTPVerificationCode);
// Reset Password
router.put("/resetPassword", protect, resetPassword);
// Remind User
router.put("/remind", protect, remindUser);

//  Get user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// ADMIN ROUTES
//  Get all users
router.get("/", protect, admin, getUsers);
// Delete , Get user by id, update user info
router
  .route("/:id")
  .delete(protect, admin, checkObjectId, deleteUser)
  .get(protect, admin, checkObjectId, getUserById)
  .put(protect, admin, checkObjectId, updateUser);

export default router;
