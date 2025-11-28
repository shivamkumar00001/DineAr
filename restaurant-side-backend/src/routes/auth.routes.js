import express from "express";
import {
  register,
  verifyRegistrationOTP,
  login,
  logout,
  getProfile,
  sendForgotOTP,
  verifyForgotOTP,
  resetPassword,
} from "../controllers/auth.controller.js";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Auth router works!" });
});

// Public routes
router.post("/register", register);
router.post("/verify-otp", verifyRegistrationOTP);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgot-password", sendForgotOTP);
router.post("/verify-forgot-otp", verifyForgotOTP);
router.post("/reset-password", resetPassword);

// Protected route
router.get("/profile", isAuthenticated, getProfile);

export default router;
