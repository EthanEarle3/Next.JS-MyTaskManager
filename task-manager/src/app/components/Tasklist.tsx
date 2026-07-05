import React from "react";
import TaskCard from "./Taskcard";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks = [], onToggle, onDelete }: TaskListProps) {
  const safeTasks = tasks || [];

  // Filter out any accidentally corrupted or null/undefined items
  const cleanTasks = safeTasks.filter((task) => task && typeof task === "object" && "id" in task);

  if (cleanTasks.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
        No interactive tasks match your current view criteria.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-50 border border-slate-100 rounded-xl overflow-hidden">
      {cleanTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
