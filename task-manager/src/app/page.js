import TaskBoard from "./components/TaskBoard";

export default function HomePage() {
  return (
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