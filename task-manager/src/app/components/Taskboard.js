"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./Tasklist";
import TaskStats from "./Taskstats";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...(prev || [])]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      (prev || []).map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => (prev || []).filter((task) => task.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => (prev || []).filter((task) => !task.completed));
  };

  const safeTasks = tasks || [];
  const filteredTasks = safeTasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-100 pb-1 gap-2">
        {["all", "active", "completed"].map((type) => (
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

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />

      <TaskStats tasks={safeTasks} onClear={handleClearCompleted} />
    </div>
  );
}
