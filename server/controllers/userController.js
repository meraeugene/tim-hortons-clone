import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendOTPVerificationEmail } from "../utils/emailUtils.js";
import UserOTPVerification from "../models/userOTPVerification.js";
import generateJWTToken from "../utils/generateJWTToken.js";
import cloudinaryUploadImg from "../utils/cloudinary.js";

// @desc Register a user
// @route POST /api/users/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    // Destructure user input from the request body
    let { firstName, lastName, email, password } = req.body;

    // Trim whitespace from input fields
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();

    // Check for empty input fields
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      res.status(400).json({ message: "Input fields are empty" });
      return;
    }

    // Validate first name format (only alphabets allowed)
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      res.status(400).json({
        message: "Invalid first name format. Only alphabets are allowed.",
      });
      return;
    }

    // Validate name format (only alphabets allowed)
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      res.status(400).json({
        message: "Invalid last name format. Only alphabets are allowed.",
      });
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({
        message: "Invalid email format.",
      });
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must be at least 6 characters long and include at least one letter and one digit.",
      });
      return;
    }

    // Check if user with the given email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        message: "Registration failed. Please use a different email address.",
      });
      return;
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance and Save the new user to the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin: false,
      verified: false,
      remindStatus: false,
    });

    // Send OTP verification email and get the result
    const result = await sendOTPVerificationEmail({
      _id: user._id,
      email: user.email,
    });

    generateJWTToken(res, user._id);

    // Respond with success and additional data
    return res.status(201).json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        verified: user.verified,
        remindStatus: user.remindStatus,
      },
      otpStatus: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// @desc Login user
// @route POST /api/users/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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

      if (!verified) {
        res.status(400).json({
          message: "Kindly verify your email to proceed.",
        });
        return;
      }

      generateJWTToken(res, _id);

      res.status(200).json({
        status: "SUCCESS",
        data: {
          _id,
          firstName,
          lastName,
          email,
          isAdmin,
          verified,
          remindStatus,
          image,
        },
        message: "Login Succesfully.",
      });
    } else {
      res.status(400).json({
        message:
          "The account name or password that you have entered is incorrect.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
});

// @desc Verify OTP email
// @route POST /api/users/verifyOTP
// @access Public
const verifyOTP = asyncHandler(async (req, res) => {
  try {
    // Destructure userId and otp from the request body
    let { otp } = req.body;

    otp = otp.trim();

    if (otp === "") {
      res.status(400).json({
        message: "Please enter the One-Time Password (OTP) to proceed.",
      });
      return;
    }

    // Find user OTP verification records based on userId
    const userOTPVerificationRecords = await UserOTPVerification.find(
      req.userCredentials._id
    );

    // Check if there are no records found
    if (userOTPVerificationRecords.length === 0) {
      res.status(400).json({
        message:
          "Account not found or already verified. Please sign up or log in.",
      });
      return;
    }

    // Extract expiresAt and hashedOTP from the first record
    const { expiresAt, otp: hashedOTP } = userOTPVerificationRecords[0];

    // Check if OTP has expired
    if (expiresAt < Date.now()) {
      // Delete expired OTP records
      await UserOTPVerification.deleteMany(req.userCredentials._id);
      res.status(400).json({
        message: "The verification code has expired. Please request a new OTP.",
      });
      return;
    }

    // Validate the provided OTP
    const validOTP = await bcrypt.compare(otp, hashedOTP);

    if (!validOTP) {
      res.status(400).json({
        message: "Please double-check your email and enter the correct code.",
      });
      return;
    }

    // Update user as verified and delete OTP records
    await User.updateOne({ _id: req.userCredentials._id }, { verified: true });
    const updatedUser = await User.findById(req.userCredentials._id);

    await UserOTPVerification.deleteMany(req.userCredentials._id);

    // Respond with success message
    res.json({
      status: "SUCCESS",
      message:
        "Your email has been successfully verified. You can now log in to your account.",
      data: {
        _id: updatedUser._id,
        verified: updatedUser.verified,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: `Verification failed. ${error.message}`,
    });
  }
});

// @desc Resend OTP Verification Code
// @route GET /api/users/verifyOTP
// @access Public
const resendOTPVerificationCode = asyncHandler(async (req, res) => {
  try {
    // Destructure userId and email from the request body
    const { userId, email } = req.body;

    // Checking userId and email if empty
    if (!userId || !email) {
      res.status(400).json({
        message: "Empty user details are not allowed",
      });
    }

    // Delete existing OTP records for the user
    await UserOTPVerification.deleteMany({ userId });

    // Send a new OTP verification email
    sendOTPVerificationEmail({ _id: userId, email }, res);

    // Respond with success message
    res.json({
      status: "SUCCESS",
      message: "New OTP verification code sent successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the JWT cookie
    // res.cookie("jwt", "", {
    //   httpOnly: true,
    //   expires: new Date(0),
    // });

    // // Clear the connect.sid cookie
    // res.clearCookie("connect.sid");
    res.clearCookie("jwt");
    // Respond with a 200 OK status and a success message
    res.status(200).json({ message: "Log out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    // Fetch user profile based on the authenticated user's ID
    const user = await User.findById(req.userCredentials._id);

    // Check if the user exists
    if (user) {
      // Destructure user properties for a cleaner response
      const {
        _id,
        firstName,
        lastName,
        email,
        image,
        isAdmin,
        verified,
        remindStatus,
      } = user;

      // Respond with a 200 OK status and the user profile details
      res.status(200).json({
        _id,
        firstName,
        lastName,
        email,
        image,
        isAdmin,
        verified,
        remindStatus,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    // Retrieve the user based on the ID from the request credentials
    const user = await User.findById(req.userCredentials._id);

    // Check if the user exists
    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
    }

    let imagePath; // Declare imagePath variable to store the URL of the uploaded image

    if (req.body.image) {
      // Upload image to cloudinary
      const cloudinaryResponse = await cloudinaryUploadImg(
        req.body.image.path,
        "image"
      );
      imagePath = cloudinaryResponse.url; // Store the URL of the uploaded image
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.image = imagePath || user.image;

    // Save the updated user information
    const updatedUser = await user.save();

    // Respond with the updated user details
    res.status(200).json({
      status: "SUCCESS",
      data: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        verified: updatedUser.verified,
        image: updatedUser.image,
        remindStatus: updatedUser.remindStatus,
      },
      message: "Profile Updated Succesfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (currentPassword === "" || newPassword === "") {
      res.status(404).json({
        message: "Password Reset Failed. Fill in the required fields.",
      });

      return;
    }

    const user = await User.findById(req.userCredentials._id);

    const isPasswordMatch = await user.matchPassword(currentPassword);

    if (user && isPasswordMatch) {
      // Validate password
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;

      if (!passwordRegex.test(newPassword)) {
        res.status(400).json({
          message:
            "Password must be at least 6 characters long and include at least one letter and one digit.",
        });

        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedPassword;

      await user.save();

      res.status(200).json({
        status: "SUCCESS",
        password: hashedPassword,
        message: "Password Reset Succesfully",
      });
    } else {
      res.status(404).json({
        message:
          "Failed to reset password. Incorrect  current password provided.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
});

// ADMIN ROUTES

// @desc Get  users
// @route PUT /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          firstName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await User.countDocuments({ ...keyword });

    const users = await User.find({ ...keyword })
      .sort({ isAdmin: -1, createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @desc Get  user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(404).json({
        message: "Cannot delete admin user",
      });
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: "User deleted successfully" });
    }
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// @desc Update users
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      status: "SUCCESS",
      data: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
      message: "User updated successfully",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

// @desc Remind user for event
// @route PUT /api/users/remind
// @access Private
const remindUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      res.status(404).json({
        message: "Email not found.",
      });
    }

    if (user.remindStatus) {
      res.status(404).json({
        message:
          "You have already requested a reminder. You can only be reminded once.",
      });
    }

    // Update user information based on the request body
    user.remindStatus = true;

    // Save the updated user information
    const updatedUser = await user.save();

    // Respond with the updated user details
    res.status(200).json({
      status: "SUCCESS",
      data: updatedUser,
      message: `You'll receive a reminder 7 days before special occasions at ${req.body.email}. Privacy guaranteed, no spam or sharing.`,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message, // Include more details about the error
    });
  }
});

export {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTPVerificationCode,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  remindUser,
};
