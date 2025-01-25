export type TaskStatus = "pending" | "completed" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
