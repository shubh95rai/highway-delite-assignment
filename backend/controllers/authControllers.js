import User from "../models/User.js";
import sendOtpToEmail from "../config/emailService.js";
import otpGenerator from "../utils/otpGenerator.js";
import { clearTokenCookie } from "../utils/token.js";
import { generateTokenAndSetCookie } from "../utils/token.js";

export async function getOtpOnSignUp(req, res) {
  const { name, dateOfBirth, email } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!dateOfBirth) {
    return res.status(400).json({ message: "Date of birth is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = otpGenerator();
    const expiry = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes from now in milliseconds

    await User.create({
      name,
      dateOfBirth,
      email,
      emailOtp: otp,
      emailOtpExpiry: expiry,
    });

    await sendOtpToEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error in getOtp: ", error.message);

    return res.status(500).json({ message: "Server error" });
  }
}

export async function signUp(req, res) {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.emailOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.emailOtp = null;
    user.emailOtpExpiry = null;

    await user.save();

    generateTokenAndSetCookie(user?._id, res);

    return res.status(200).json({ user, message: "Registered successfully" });
  } catch (error) {
    console.log("Error in verifyOtp: ", error.message);

    return res.status(500).json({ message: "Server error" });
  }
}

export async function getOtpOnSignIn(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator();
    const expiry = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes from now in milliseconds

    user.emailOtp = otp;
    user.emailOtpExpiry = expiry;

    await user.save();

    await sendOtpToEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error in getOtpOnSignIn: ", error.message);

    return res.status(500).json({ message: "Server error" });
  }
}

export async function signIn(req, res) {
  const { email, otp } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.emailOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.emailOtp = null;
    user.emailOtpExpiry = null;

    await user.save();

    generateTokenAndSetCookie(user?._id, res);

    return res.status(200).json({ user, message: "Logged in successfully" });
  } catch (error) {
    console.log("Error in signIn: ", error.message);

    return res.status(500).json({ message: "Server error" });
  }
}

export async function signout(req, res) {
  try {
    clearTokenCookie(res);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in signout: ", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

export async function checkAuth(req, res) {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "User retrieved successfully" });
  } catch (error) {
    console.log("Error in checkAuth: ", error.message);

    res.status(500).json({ message: "Server error" });
  }
}
