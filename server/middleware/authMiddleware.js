import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the JWT token using the secret key
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Fetch user details (excluding password) based on the decoded user ID
      req.userCredentials = await User.findById(decodedToken.userId).select(
        "-password"
      );

      // Call the next middleware in the chain
      next();
    } catch (error) {
      // If token verification fails, respond with a 401 Unauthorized status and an error message
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // If no token is present, respond with a 401 Unauthorized status and an error message
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  // Check if user credentials exist and the user is an admin
  if (req.userCredentials && req.userCredentials.isAdmin) {
    // Call the next middleware in the chain
    next();
  } else {
    // If not an admin, respond with a 401 Unauthorized status and an error message
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
