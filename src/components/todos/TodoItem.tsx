'use client';

import { cn } from '@/lib/cn';
import { Checkbox } from '@/components/ui/Checkbox';
import { useTodoStore } from '@/stores/useTodoStore';
import type { TodoItem as TodoItemType } from '@/types';

interface TodoItemProps {
  todo: TodoItemType;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div
      className={cn(
        'group flex items-center gap-3 py-2 px-1 rounded-lg',
        'hover:bg-[rgb(var(--bg-elevated))] transition-colors'
      )}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        className={cn(
          'flex-1 text-sm transition-all',
          todo.completed
            ? 'text-[rgb(var(--text-muted))] line-through'
            : 'text-[rgb(var(--text-primary))]'
        )}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-[rgb(var(--text-muted))] hover:text-red-400 transition-all"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
