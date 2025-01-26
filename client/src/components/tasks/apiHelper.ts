import axios from "axios";
import { Task, TaskStatus } from "../types/task";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization header with Bearer token
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Add the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// API Helper Functions
const TaskAPI = {
  /**
   * Fetch all tasks
   * @returns Promise<Task[]>
   */
  fetchTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<{ success: boolean; tasks: Task[] }>(
      "/api/v1/task"
    );
    return response.data.tasks; // Return the tasks array
  },

  /**
   * Fetch tasks by status
   * @param status TaskStatus
   * @returns Promise<Task[]>
   */
  fetchTasksByStatus: async (status: TaskStatus): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(
      `/api/v1/task?status=${status}`
    );
    return response.data;
  },

  /**
   * Create a new task
   * @param name string
   * @param description string
   * @returns Promise<Task>
   */
  createTask: async (name: string, description: string): Promise<Task> => {
    const response = await apiClient.post<Task>("/api/v1/task/create", {
      name,
      description,
      status: "pending", // Default status for a new task
    });
    return response.data;
  },

  /**
   * Update a task's status
   * @param taskId string
   * @param newStatus TaskStatus
   * @returns Promise<void>
   */
  updateTaskStatus: async (
    taskId: string,
    newStatus: TaskStatus
  ): Promise<void> => {
    await apiClient.patch(`/api/v1/task/status`, {
      taskId,
      status: newStatus,
    });
  },

  /**
   * Delete a task
   * @param taskId string
   * @returns Promise<void>
   */
  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/task/${taskId}`);
  },
};

export default TaskAPI;
