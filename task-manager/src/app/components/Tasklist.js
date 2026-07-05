// Component: TaskList
// This component is responsible for rendering a list of tasks using the TaskCard component
// It receives an array of tasks and two callback functions as props: onToggle and onDelete
// The onToggle function is called when a task's completion status is toggled, and the onDelete function is called when a task is deleted
// The component filters out any malformed tasks to ensure that only valid task objects are rendered
import TaskCard from "./Taskcard";

export default function TaskList({ tasks = [], onToggle, onDelete }) {
  const safeTasks = tasks || [];
  
  // Clean filtering to guarantee malformed variables never bypass map iteration
  const cleanTasks = safeTasks.filter((task) => task && typeof task === "object" && "id" in task);

  if (cleanTasks.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-xl">
        No interactive tasks match your current view criteria.
      </div>
    );
  }
// Renders a list of components using key={task.id} to ensure that each component has a unique identifier for efficient rendering and updating
// The TaskCard component is used to display each individual task, and it receives the task object, onToggle function, and onDelete function as props
  return (
    <ul className="divide-y divide-slate-50 border border-slate-100 rounded-xl overflow-hidden">
      {cleanTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

