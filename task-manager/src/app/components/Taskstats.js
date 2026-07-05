export default function TaskStats({ tasks = [], onClear }) {
  const safeTasks = tasks || [];
  const total = safeTasks.length;
  const completedCount = safeTasks.filter((t) => t?.completed).length;
  const activeCount = total - completedCount;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
      <div className="flex gap-4 items-center justify-center sm:justify-start">
        <span>Total: <strong className="text-slate-800">{total}</strong></span>
        <span>Active: <strong className="text-slate-800">{activeCount}</strong></span>
        <span>Completed: <strong className="text-slate-800">{completedCount}</strong></span>
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-center bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors cursor-pointer"
        >
          Clear Completed Tasks
        </button>
      )}
    </div>
  );
}
