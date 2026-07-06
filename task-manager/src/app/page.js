//Component: HomePage
// This component is the main page of the task manager application and it is a server component because it does not use React state or effects
// It is used to render the header and the TaskBoard component, which manages the state of the tasks and renders the AddTaskForm, TaskList, and TaskStats components
// It renders a header with a title and a description, and it includes the TaskBoard component
// The TaskBoard component is responsible for managing the state of the tasks and rendering the AddTaskForm, TaskList, and TaskStats components
import TaskBoard from "./components/TaskBoard";

export default function HomePage() {
  return (
    // Tailwind CSS classes style the main container to be centered, with a maximum width and padding for spacing
    // The header contains a title and a description, styled with Tailwind CSS classes for spacing
    <main className="container mx-auto max-w-4xl p-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-800">
          Task Workspace
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Organize, filter, and track your daily execution steps with type safety.
        </p>
      </header>
      <TaskBoard />
    </main>
  );
}