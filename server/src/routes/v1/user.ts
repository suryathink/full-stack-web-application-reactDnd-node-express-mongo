import express from "express";
import { UserController } from "../../controllers/userController";
import { authLimiterMiddleware } from "../../middlewares/rateLimiter";
import verifyToken from "../../middlewares/auth";
const router = express.Router();

router.post("/signup", authLimiterMiddleware, UserController.signup);
router.post("/login", authLimiterMiddleware, UserController.login);
router.post(
  "/forgot-password",
  authLimiterMiddleware,
  UserController.forgotPassword
);
router.post(
  "/reset-password",
  authLimiterMiddleware,
  UserController.resetPassword
);
router.post("/logout", verifyToken, UserController.logout);

export default router;
