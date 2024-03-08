import { Router } from "express";
import { register, login } from "../controller/authController.js";
// import { verifyToken } from "../middleware/auth.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

// router.route("/logout").get(verifyToken, logout);
// router.route("/verify-email").post(emailVerification);
// router.route("/resendOTP").post(resendVerificationEmail);
// router.route("/passwordResetEmail").post(passwordResetEmail);
// router.route("/resetPassword").post(resetPassword);

export default router;
