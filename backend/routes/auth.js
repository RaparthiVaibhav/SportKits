const router = require("express").Router();
const authController = require("../controllers/authController");

// SIGNUP
router.post("/signup", authController.signup);

// LOGIN
router.post("/login", authController.login);

// SEND OTP
router.post("/send-otp", authController.sendOtp);

// VERIFY OTP
router.post("/verify-otp", authController.verifyOtp);

// RESET PASSWORD
router.post("/reset-password", authController.resetPassword);

module.exports = router;