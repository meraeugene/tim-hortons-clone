import UserOtpVerification from "../models/userOTPVerification.js";
import { transporter } from "../config/transporter.js";
import bcrypt from "bcryptjs";

const sendOTPVerificationEmail = async ({ _id, email }) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Email Account Verification",
      html: `
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/94/Tim_Hortons_Logo.png" alt="Tim Hortons Logo" style="width: 150px;  object-fit: cover;" />
        <p >Hello, <a  style="font-weight: bold;">${email}</a>,</p>
        <p style="margin: 0px;">Here is the OTP you need to verify your account:</p>
        <p >This code will expire in <b>1 hour</b>.</p>
        <h1 style="font-size: 38px; color: #C8102E; margin: 0px; ">${otp}</h1>
        <p >Cheers,</p>
        <h2 style="margin: 0px;"><b>Tim Hortons Team</b></h2>
      `,
    };

    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new UserOtpVerification({
      _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);

    return {
      status: "PENDING",
      message:
        "An OTP (One-Time Password) has been sent to your registered email address. Please check your inbox and enter the code to verify your account.",
      data: {
        _id,
        email,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export { sendOTPVerificationEmail };
