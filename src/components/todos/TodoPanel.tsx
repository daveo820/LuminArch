'use client';

import { useState } from 'react';
import { useTodoStore } from '@/stores/useTodoStore';
import { TodoItem } from './TodoItem';
import { Input } from '@/components/ui/Input';

export function TodoPanel() {
  const { todos, addTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const incompleteTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm text-[rgb(var(--text-primary))]">
          Quick Tasks
        </h2>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]">
          {incompleteTodos.length}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a quick task..."
          className="h-9"
        />
      </form>

      <div className="space-y-1">
        {incompleteTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        {completedTodos.length > 0 && (
          <>
            <div className="py-2">
              <span className="text-xs text-[rgb(var(--text-muted))]">
                Completed ({completedTodos.length})
              </span>
            </div>
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        )}

        {todos.length === 0 && (
          <p className="text-center py-4 text-sm text-[rgb(var(--text-muted))]">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}
