import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  status: "Pending" | "Completed" | "Done";
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
      enum: ["Pending", "Completed", "Done"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
