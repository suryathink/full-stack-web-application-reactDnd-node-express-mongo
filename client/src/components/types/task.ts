export type TaskStatus = "pending" | "completed" | "done";

export interface Task {
  _id: string;
  name: string;
  description: string;
  status: TaskStatus;
}
