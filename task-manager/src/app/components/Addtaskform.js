"use client";
// This component is a client component because it uses React state and effects
// It is used to add a new task to the task list in the TaskBoard component
// It receives a callback function onAddTask as a prop, which is called when the form is submitted
import { useState } from "react";
export default function AddTaskForm({ onAddTask }) {
  // Holds the current value of the input field for the new task text
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // e.preventDefault() prevents the default form submission behavior, which would cause a page reload
    const trimmedText = text.trim();

    if (!trimmedText || typeof onAddTask !== "function") return;
// If there is no text for the fuction it does nothing, and the setText("") resets the input field to an empty string after the task is added
    onAddTask(trimmedText);
    setText("");
  };
// A form with a input field and a submit button to sumbit to the TaskManager.
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm" />
      <button
        type="submit"
        className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap"
      >
        Add Task
      </button>
    </form>
  );
}
