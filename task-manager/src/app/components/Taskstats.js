// COMPONENT: TaskStats
// This component is a client component because it uses React state and effects
// It is used to display the statistics of the task list in the TaskBoard component
// It receives an array of tasks and a callback function onClear as props
// It calculates the total number of tasks, the number of completed tasks, and the number of active tasks
// It renders these statistics and a button to clear completed tasks if there are any
export default function TaskStats({ tasks = [], onClear }) {
  const safeTasks = tasks || [];
  const total = safeTasks.length;
  const completedCount = safeTasks.filter((t) => t?.completed).length;
  const activeCount = total - completedCount;
// calulated the number of tasks by active safe and completed tasks, and the total number of tasks by the length of the safeTasks array
// The main container for the TaskStats component, which includes the statistics and the clear completed button
//uses onClick event handler to use the onClear function to clear completed tasks when the button is clicked
  return (
    // Tailwind CSS classes style the main container to be a flex container with a column layout on small screens and a row layout on larger screens, with spacing and border styling
    // The statistics are displayed in a flex container with spacing and text styling, and the clear completed button is styled with Tailwind CSS classes for background color, text color, border radius, hover effect, and cursor style
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
