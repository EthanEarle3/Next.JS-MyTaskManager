"use client";
// COMPONENT: TaskBoard
// This component is a client component because it uses React state and effects
// It is used to manage the task list, including adding, toggling, deleting, and filtering tasks
// It uses the AddTaskForm, TaskList, and TaskStats components to render the UI
// Passes down the props and functions to the child components to handle user interactions and state updates

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./Tasklist";
import TaskStats from "./Taskstats";


export default function TaskBoard() {
  // Keeps track of the lists of tasks and the current states of the tasks, including their completion status and the
  //  current filter applied to the list using the useState to manage the state of the tasks and the filter, and useEffect to persist the tasks to local storage whenever they change
  const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") {
      return [
        { id: 1, text: "Review Next.js App Router docs", completed: true },
        { id: 2, text: "Refactor state into TaskBoard component", completed: false },
        { id: 3, text: "Write clean documentation in README.md", completed: false },
      ];
    }
// Gets tasks from local storage to keep the tasks across reload pages using localstorage.getItem("next-tasks") and JSON.parse(saved) to parse the JSON string into an array of task objects
// If there are no tasks in local storage, it returns a default list of tasks using the ternary operator to check if the parsed value is an array, and if not, it returns the default list of tasks
    try {
      const saved = window.localStorage.getItem("next-tasks");
      if (!saved) {
        return [
          { id: 1, text: "Review Next.js App Router docs", completed: true },
          { id: 2, text: "Refactor state into TaskBoard component", completed: false },
          { id: 3, text: "Write clean documentation in README.md", completed: false },
        ];
      }
// If there are tasks in local storage, it parses the JSON string and returns the array of tasks
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [
        { id: 1, text: "Review Next.js App Router docs", completed: true },
        { id: 2, text: "Refactor state into TaskBoard component", completed: false },
        { id: 3, text: "Write clean documentation in README.md", completed: false },
      ];
    } catch (error) {
      // If there is an error parsing the JSON string, it logs the error and returns a default list of tasks
      // This ensures that the app does not crash and provides a fallback for the user
      console.error("Failed to parse tasks", error);
      return [
        { id: 1, text: "Review Next.js App Router docs", completed: true },
        { id: 2, text: "Refactor state into TaskBoard component", completed: false },
        { id: 3, text: "Write clean documentation in README.md", completed: false },
      ];
    }
  });
  // Keeps track of the current filter applied to the task list, which can be "all", "active", or "completed"
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (tasks && tasks.length > 0) {
      window.localStorage.setItem("next-tasks", JSON.stringify(tasks));
    } else {
      window.localStorage.removeItem("next-tasks");
    }
  }, [tasks]);
// The handleAddTask function creates a new task object with a unique id, the provided text, and a completed status of false
// It then updates the tasks state by adding the new task to the beginning of the list, ensuring that the most recent task is displayed first
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...(prev || [])]);
  };
// The handleToggleTask function toggles the completed status of a task by its id
// It maps over the current tasks and updates the completed property of the matching task, while leaving other tasks unchanged
// The handleDeleteTask function removes a task from the list by filtering out the task with the specified id
// The handleClearCompleted function removes all completed tasks from the list by filtering out tasks that have their completed property set to true
// The filteredTasks variable applies the current filter to the list of tasks, returning only the tasks that match the selected filter criteria
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
    // The main container for the TaskBoard component, which includes the AddTaskForm, filter buttons, TaskList, and TaskStats components
  return (
    // Tailwind CSS classes style the main container to have spacing, background color, padding, rounded corners, border, and shadow effects
    // The AddTaskForm component is used to add new tasks, the filter buttons allow the user to filter the task list, the TaskList component displays the list of tasks, and the TaskStats component shows the statistics of the task list
    <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
      <AddTaskForm onAddTask={handleAddTask} />

      <div className="flex border-b border-slate-100 pb-1 gap-2">
        {["all", "active", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
           // Tailwind CSS classes style the filter buttons to have padding, text size, font weight, rounded corners, and transition effects
           // The button's background and text color change based on whether it is the currently selected filter, providing feedback to the user 
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
