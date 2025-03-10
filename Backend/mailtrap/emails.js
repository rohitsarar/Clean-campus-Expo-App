import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTempalet.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variable for security
    pass: process.env.EMAIL_PASS,  // App password from Gmail
  },
});

const sender = `"Rohit Gupta" <${process.env.EMAIL_USER}>`;

// Send verification email (OTP)
export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Your OTP Code",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw new Error("Error sending OTP email");
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

// Send password reset success email
export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset success email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending password reset success email:", error);
    throw new Error("Error sending password reset success email");
  }
};
