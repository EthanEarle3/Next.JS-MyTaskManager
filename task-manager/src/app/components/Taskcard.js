export default function TaskCard({ task, onToggle, onDelete }) {
  if (!task) {
    return null;
  }

  const { id = 0, text = "", completed = false } = task;

  return (
    <li className="flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5 rounded-sm border-slate-300 text-slate-950 focus:ring-slate-950 cursor-pointer"
        />
        <span
          className={`text-sm font-medium truncate ${
            completed
              ? "line-through text-slate-400 transition-all"
              : "text-slate-700"
          }`}
        >
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="ml-4 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
        aria-label="Delete item"
      >
        <svg
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.34 6m-4.74 0L9.3 9m12 3.667V9.75M3.75 9.75V12.67M19.5 9.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3m15 0V19.5a3 3 0 01-3 3H7.5a3 3 0 01-3-3V9.75"
          />
        </svg>
      </button>
    </li>
  );
}
