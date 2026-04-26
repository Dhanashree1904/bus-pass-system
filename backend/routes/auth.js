const express = require("express");
const router = express.Router();
const { register, login, getProfile, verifyEmail, resendVerificationEmail } = require("../controllers/authController");
const { auth } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

// Protected routes
router.get("/profile", auth, getProfile);

module.exports = router;
