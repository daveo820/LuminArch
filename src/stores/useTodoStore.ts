'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { TodoItem } from '@/types';

interface TodoState {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (text) => {
        set({
          todos: [
            ...get().todos,
            {
              id: uuid(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        });
      },

      toggleTodo: (id) => {
        set({
          todos: get().todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        });
      },

      deleteTodo: (id) => {
        set({
          todos: get().todos.filter((todo) => todo.id !== id),
        });
      },

      updateTodo: (id, text) => {
        set({
          todos: get().todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        });
      },
    }),
    {
      name: 'vibe-board-todos',
    }
  )
);
