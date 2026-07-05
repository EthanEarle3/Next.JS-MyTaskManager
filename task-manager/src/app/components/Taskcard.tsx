import * as React from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return React.createElement(
    "li",
    {
      className:
        "flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors group",
    },
    React.createElement(
      "div",
      { className: "flex items-center gap-3 flex-1 min-w-0" },
      React.createElement("input", {
        type: "checkbox",
        checked: task.completed,
        onChange: () => onToggle(task.id),
        className:
          "w-5 h-5 rounded-sm border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer",
      }),
      React.createElement(
        "span",
        {
          className: `text-sm font-medium truncate ${
            task.completed
              ? "line-through text-slate-400 transition-all"
              : "text-slate-700"
          }`,
        },
        task.text
      )
    ),
    React.createElement(
      "button",
      {
        onClick: () => onDelete(task.id),
        className:
          "ml-4 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all cursor-pointer",
        "aria-label": "Delete item",
      },
      React.createElement(
        "svg",
        {
          xmlns: "http://w3.org",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 2,
          stroke: "currentColor",
          className: "w-4 h-4",
        },
        React.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d:
            "M14.74 9l-.34 6m-4.74 0L9.3 9m12 3.667V9.75M3.75 9.75V12.67M19.5 9.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3m15 0V19.5a3 3 0 01-3 3H7.5a3 3 0 01-3-3V9.75",
        })
      )
    )
  );
}
