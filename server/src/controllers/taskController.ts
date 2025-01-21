import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

export class TaskController {
  // Create Task
  public static async createTask(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const userId = req.user!._id; // Assuming user is attached to the request after authentication

      const newTask = await TaskService.createTask(userId, name, description);
      res.status(201).json({ success: true, task: newTask });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create task" });
    }
  }

  // Get All Tasks for the User
  public static async getTasks(req: Request, res: Response) {
    try {
      const userId = req.user!._id as string; // Assuming user is attached to the request after authentication

      const tasks = await TaskService.getTasksByUser(userId);
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch tasks" });
    }
  }

  // Update Task Status
  public static async updateTaskStatus(req: Request, res: Response) {
    try {
      const { taskId, status } = req.body;

      const updatedTask = await TaskService.updateTaskStatus(taskId, status);

      if (!updatedTask) {
        res.status(404).json({ success: false, message: "Task not found" });
      }

      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update task status" });
    }
  }

  // Delete Task
  public static async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;

      const deletedTask = await TaskService.deleteTask(taskId);

      if (!deletedTask) {
        res.status(404).json({ success: false, message: "Task not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete task" });
    }
  }
}
