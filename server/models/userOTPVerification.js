import mongoose from "mongoose";

const UserOTPVerificationSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  UserOTPVerificationSchema
);

export default UserOTPVerification;
