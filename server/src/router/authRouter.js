import express from "express";

import {
  Register,
  Login,
  Logout,
  Profile,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
} from "../controller/authController.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/profile", Profile);
router.post("/change-password", ChangePassword);
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password", ResetPassword);

export default router;
