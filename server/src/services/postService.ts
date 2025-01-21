import Post, { IPost } from "../models/post";

export class PostService {
  // Create a new post
  public static async createPost(
    userId: string,
    caption: string,
    photoUrl: string
  ): Promise<IPost> {
    return Post.create({ userId, caption, photoUrl });
  }

  // Get all posts for the feed
  public static async getAllPosts(): Promise<IPost[]> {
    return Post.find().sort({ createdAt: -1 }).populate("userId", "name email");
  }
}
