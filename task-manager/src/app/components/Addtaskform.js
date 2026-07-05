'use client';

import {useState} from 'react';

export default function AddTaskForm({onAdd}) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();            // prevent page reload
    if (!title.trim()) return;    // guard: reject blank submissions
    onAdd(title.trim());
    setTitle('');                 // reset field
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded text-sm hover:bg-green-800"
      >Add</button>
    </form>
  );
}