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

