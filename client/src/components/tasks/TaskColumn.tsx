import { useDrop } from "react-dnd";
import type { Task, TaskStatus } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onTaskMove,
  onDeleteTask,
}: TaskColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: Task) => {
      if (item.status !== status) {
        onTaskMove(item.id, status); // Move the task to the new status
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] bg-gray-50 p-4 rounded-lg ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
}
