import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateJWTToken from "../utils/generateJWTToken.js";

// @desc Create a contact
// @route POST /api/auth/google
// @access Public
const createGoogleAuth = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      generateJWTToken(res, user._id);
      const {
        _id,
        firstName,
        lastName,
        email,
        isAdmin,
        verified,
        remindStatus,
        image,
      } = user;

      res.status(200).json({
        status: "SUCCESS",
        _id,
        firstName,
        lastName,
        email,
        isAdmin,
        verified,
        remindStatus,
        image,
        message: "Login Succesfully.",
      });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.body.image,
        isAdmin: false,
        verified: req.body.verified,
        remindStatus: false,
      });
      await newUser.save();

      generateJWTToken(res, newUser._id);

      const {
        _id,
        firstName,
        lastName,
        email,
        isAdmin,
        verified,
        remindStatus,
        image,
      } = newUser;

      res.status(200).json({
        status: "SUCCESS",
        _id,
        firstName,
        lastName,
        email,
        isAdmin,
        verified,
        remindStatus,
        image,
        message: "Login Succesfully.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export { createGoogleAuth };
