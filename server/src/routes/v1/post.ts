import express from "express";
import { PostController } from "../../controllers/postController";
import upload from "../../middlewares/uploadMiddleware";
import verifyToken from "../../middlewares/auth";

const router = express.Router();

// Create a new post
router.post(
  "/",
  verifyToken,
  upload.single("photo"),
  PostController.createPost
);

// Get all posts
router.get("/", verifyToken, PostController.getAllPosts);

export default router;
