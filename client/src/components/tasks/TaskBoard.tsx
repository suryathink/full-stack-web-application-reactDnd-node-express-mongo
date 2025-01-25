import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task, TaskStatus } from "../types/task";
import TaskForm from "./TaskForm";
import TaskColumn from "./TaskColumn";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
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
            title="Pending"
            status="pending"
            tasks={getTasksByStatus("pending")}
            onTaskMove={handleTaskMove}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={getTasksByStatus("completed")}
            onTaskMove={handleTaskMove}
            onDeleteTask={handleDeleteTask}
          />
          <TaskColumn
            title="Done"
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
