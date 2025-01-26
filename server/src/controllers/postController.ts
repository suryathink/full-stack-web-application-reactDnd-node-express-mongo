import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
  // Create a new post
  public static async createPost(req: Request, res: Response) {
    try {
      const userId = req.user!._id;
      const { caption } = req.body;
      const imageUrl = req.file?.path; // Cloudinary URL for the uploaded imageUrl

      if (!imageUrl) {
        res.status(400).json({ success: false, message: "Photo is required" });
      }

      const newPost = await PostService.createPost(
        userId,
        caption,
        imageUrl as string
      );

      res.status(201).json({ success: true, post: newPost });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create post" });
    }
  }

  // Get all posts for the feed
  public static async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.getAllPosts();
      res.status(200).json({ success: true, posts });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch posts" });
    }
  }
}
