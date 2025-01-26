import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  status: "pending" | "completed" | "done";
}

const TaskSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);
TaskSchema.index({ userId: 1, status: 1 });

export default mongoose.model<ITask>("Task", TaskSchema);
