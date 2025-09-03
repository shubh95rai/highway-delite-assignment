import express from "express";
import {
  signout,
  checkAuth,
  signUp,
  getOtpOnSignUp,
  getOtpOnSignIn,
  signIn,
} from "../controllers/authControllers.js";
import protect from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup/get-otp", getOtpOnSignUp);
authRouter.post("/signup", signUp);
authRouter.post("/signin/get-otp", getOtpOnSignIn);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signout);

authRouter.get("/check-auth", protect, checkAuth);

export default authRouter;
