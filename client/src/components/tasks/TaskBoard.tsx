import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task, TaskStatus } from "../types/task";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";
import TaskAPI from "./apiHelper";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const data = await TaskAPI.fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (name: string, description: string) => {
    const newTask: Task = {
      _id: Date.now().toString(),
      name,
      description,
      status: "pending",
    };
    setTasks([...tasks, newTask]);

    await TaskAPI.createTask(name, description);
  };

  const handleTaskMove = async (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    await TaskAPI.updateTaskStatus(taskId, newStatus);
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    await TaskAPI.deleteTask(taskId);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskForm onAddTask={handleAddTask} />
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
          <TaskColumn
            name="Pending"
            status="pending"
            tasks={getTasksByStatus("pending")}
            onTaskMove={handleTaskMove}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            name="Completed"
            status="completed"
            tasks={getTasksByStatus("completed")}
            onTaskMove={handleTaskMove}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            name="Done"
            status="done"
            tasks={getTasksByStatus("done")}
            onTaskMove={handleTaskMove}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </DndProvider>
    </div>
  );
}
