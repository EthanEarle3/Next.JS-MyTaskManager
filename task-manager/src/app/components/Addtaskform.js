"use client";

import { useState } from "react";
export default function AddTaskForm({ onAddTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText || typeof onAddTask !== "function") return;

    onAddTask(trimmedText);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new structural milestone..."
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
