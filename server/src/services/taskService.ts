import Task, { ITask } from "../models/task";

export class TaskService {
  public static async createTask(
    userId: string,
    name: string,
    description: string
  ): Promise<ITask> {
    return await Task.create({ userId, name, description });
  }

  public static async getTasksByUser(
    userId: string,
    status?: string
  ): Promise<ITask[]> {
    const query: any = { userId };

    if (status) {
      query.status = status;
    }

    return await Task.find(query)
      .select("-createdAt -userId -updatedAt -__v")
      .lean();
  }

  public static async updateTaskStatus(
    taskId: string,
    status: "pending" | "completed" | "done"
  ): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  }

  public static async deleteTask(taskId: string): Promise<ITask | null> {
    return await Task.findByIdAndDelete(taskId);
  }
}
