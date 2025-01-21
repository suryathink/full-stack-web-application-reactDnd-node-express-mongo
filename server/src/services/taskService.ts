import Task, { ITask } from "../models/task";

export class TaskService {
  // Create a new task
  public static async createTask(
    userId: string,
    name: string,
    description: string
  ): Promise<ITask> {
    return Task.create({ userId, name, description });
  }

  // Get all tasks for a user
  public static async getTasksByUser(userId: string): Promise<ITask[]> {
    return Task.find({ userId });
  }

  // Update the status of a task
  public static async updateTaskStatus(
    taskId: string,
    status: "Pending" | "Completed" | "Done"
  ): Promise<ITask | null> {
    return Task.findByIdAndUpdate(taskId, { status }, { new: true });
  }

  // Delete a task by ID
  public static async deleteTask(taskId: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(taskId);
  }
}
