import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  userId: string; // Reference to the user who created the post
  caption: string;
  photoUrl: string; // URL of the uploaded photo
  createdAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
