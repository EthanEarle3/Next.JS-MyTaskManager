
// COMPONENT: TaskCard
// This component is a client component because it uses React state and effects
// It is used to display a single task in the TaskList component
// It receives a task object, onToggle function, and onDelete function as props
// It renders the task text, a checkbox to toggle completion status, and a delete button
// It uses conditional rendering and styling to indicate the task's completion status and to show/hide the delete button on hover
// Props:
// - task: an object representing the task, with properties id, text, and completed
// - onToggle: a function to toggle the completion status of the task
// - onDelete: a function to delete the task from the list
// - Task: a task object with properties id, text, and completed
export default function TaskCard({ task, onToggle, onDelete }) {
  if (!task) {
    return null;
  }
 // getting the properties of the object and creating default values in case of errors
  const { id = 0, text = "", completed = false } = task;
// The main container for the TaskCard component, which includes the checkbox, task text, and delete button
// The checkbox is controlled by the completed property of the task object, and it calls the onToggle function with the task id when changed
// The task text is displayed with a line-through style if the task is completed, and it truncates long text to fit within the container
// The delete button is hidden by default and becomes visible when the user hovers over the TaskCard component
// The delete button calls the onDelete function with the task id when clicked
  return (
    // Tailwind CSS classes style the main container to be a flex container with spacing, background color, hover effect, and transition
    // The group class is used to enable the hover effect on the delete button when the user hovers over the TaskCard component
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
          // Tailwind CSS classes style the delete button to be hidden by default and become visible when the user hovers over the TaskCard component, with padding, text color, hover effect, border radius, and transition
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.34 6m-4.74 0L9.3 9m12 3.667V9.75M3.75 9.75V12.67M19.5 9.75a3 3 0 00-3-3H7.5a3 3 0 00-3 3m15 0V19.5a3 3 0 01-3 3H7.5a3 3 0 01-3-3V9.75"
          />
        </svg>
      </button>
    </li>
  );
}
