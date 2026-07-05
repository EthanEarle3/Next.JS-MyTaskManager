'use client';

import * as React from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskStatsProps {
  tasks: Task[];
  onClear: () => void;
}

export default function TaskStats({ tasks, onClear }: TaskStatsProps) {
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = total - completedCount;

  return React.createElement(
    'div',
    {
      className:
        'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium',
    },
    React.createElement(
      'div',
      { className: 'flex gap-4 items-center justify-center sm:justify-start' },
      React.createElement(
        'span',
        null,
        'Total: ',
        React.createElement('strong', { className: 'text-slate-800' }, total)
      ),
      React.createElement(
        'span',
        null,
        'Active: ',
        React.createElement('strong', { className: 'text-slate-800' }, activeCount)
      ),
      React.createElement(
        'span',
        null,
        'Completed: ',
        React.createElement('strong', { className: 'text-slate-800' }, completedCount)
      )
    ),
    completedCount > 0
      ? React.createElement(
          'button',
          {
            onClick: onClear,
            className:
              'px-3 py-1.5 text-center bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors cursor-pointer',
          },
          'Clear Completed Tasks'
        )
      : null
  );
}

