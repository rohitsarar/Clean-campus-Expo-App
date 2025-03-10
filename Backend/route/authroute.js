import express from "express";
import { signup,login,logout, checkAuth, verifyEmail, forgotPassword, resetPassword} from '../controller/Auth.js';
import {verifyToken} from '../middleware/verifyToken.js';
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
// Route for signup
router.post("/signup", signup);

// Route for login
router.post("/login", login);


router.post("/logout",logout);



router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
export default router;





