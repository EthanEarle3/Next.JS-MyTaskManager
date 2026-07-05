"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./Addtaskform";
import TaskList from "./Tasklist";
import TaskStats from "./Taskstats";
import React from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

export default function TaskBoard() {
  // Always initialize strictly as an array to prevent undefined errors
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const saved = localStorage.getItem("next-tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        } else {
          setTasks([]);
        }
      } catch (e) {
        console.error("Failed to parse tasks", e);
        setTasks([]);
      }
    } else {
      setTasks([
        { id: 1, text: "Review Next.js App Router docs", completed: true },
        { id: 2, text: "Refactor state into TaskBoard component", completed: false },
        { id: 3, text: "Write clean documentation in README.md", completed: false },
      ]);
    }
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("next-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = (text: string): void => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...(prev || [])]);
  };

  const handleToggleTask = (id: number): void => {
    setTasks((prev) =>
      (prev || []).map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number): void => {
    setTasks((prev) => (prev || []).filter((task) => task.id !== id));
  };

  const handleClearCompleted = (): void => {
    setTasks((prev) => (prev || []).filter((task) => !task.completed));
  };

  // Safely guard array filter execution
  const safeTasks = tasks || [];
  const filteredTasks = safeTasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const TaskListWithHandlers = TaskList as React.ComponentType<{
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }>;

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
      <AddTaskForm onAdd={handleAddTask} />

      <div className="flex border-b border-slate-100 pb-1 gap-2">
        {(["all", "active", "completed"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors cursor-pointer ${
              filter === type
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <TaskListWithHandlers
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />

      <TaskStats tasks={safeTasks} onClear={handleClearCompleted} />
    </div>
  );
}
