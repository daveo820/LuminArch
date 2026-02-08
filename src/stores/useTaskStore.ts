'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import type { Task, ColumnId, EffortLevel } from '@/types';

interface AddTaskOptions {
  title: string;
  description?: string;
  columnId?: ColumnId;
  dueAt?: number;
  course?: string;
  points?: number;
  canvasId?: number;
  effort?: EffortLevel;
}

interface TaskState {
  tasks: Task[];
  addTask: (options: AddTaskOptions | string, description?: string, columnId?: ColumnId) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newColumnId: ColumnId, newOrder: number) => void;
  reorderTasks: (activeId: string, overId: string, columnId: ColumnId) => void;
  hasCanvasTask: (canvasId: number) => boolean;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (optionsOrTitle, description, columnId = 'todo') => {
        const tasks = get().tasks;

        // Handle both old signature (string, string, columnId) and new (options object)
        const options: AddTaskOptions =
          typeof optionsOrTitle === 'string'
            ? { title: optionsOrTitle, description, columnId }
            : optionsOrTitle;

        const targetColumnId = options.columnId || 'todo';
        const columnTasks = tasks.filter((t) => t.columnId === targetColumnId);
        const maxOrder =
          columnTasks.length > 0
            ? Math.max(...columnTasks.map((t) => t.order))
            : -1;

        set({
          tasks: [
            ...tasks,
            {
              id: uuid(),
              title: options.title,
              description: options.description,
              columnId: targetColumnId,
              createdAt: Date.now(),
              order: maxOrder + 1,
              dueAt: options.dueAt,
              course: options.course,
              points: options.points,
              canvasId: options.canvasId,
              effort: options.effort,
            },
          ],
        });
      },

      updateTask: (id, updates) => {
        set({
          tasks: get().tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        });
      },

      deleteTask: (id) => {
        set({
          tasks: get().tasks.filter((task) => task.id !== id),
        });
      },

      moveTask: (taskId, newColumnId, newOrder) => {
        const tasks = get().tasks;
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        const otherTasks = tasks.filter((t) => t.id !== taskId);
        const targetColumnTasks = otherTasks
          .filter((t) => t.columnId === newColumnId)
          .sort((a, b) => a.order - b.order);

        const updatedTargetTasks = targetColumnTasks.map((t, index) => ({
          ...t,
          order: index >= newOrder ? index + 1 : index,
        }));

        const updatedTask = { ...task, columnId: newColumnId, order: newOrder };

        set({
          tasks: [
            ...otherTasks.filter((t) => t.columnId !== newColumnId),
            ...updatedTargetTasks,
            updatedTask,
          ],
        });
      },

      reorderTasks: (activeId, overId, columnId) => {
        const tasks = get().tasks;
        const columnTasks = tasks
          .filter((t) => t.columnId === columnId)
          .sort((a, b) => a.order - b.order);

        const activeIndex = columnTasks.findIndex((t) => t.id === activeId);
        const overIndex = columnTasks.findIndex((t) => t.id === overId);

        if (activeIndex === -1 || overIndex === -1) return;

        const reordered = [...columnTasks];
        const [removed] = reordered.splice(activeIndex, 1);
        reordered.splice(overIndex, 0, removed);

        const updatedColumnTasks = reordered.map((t, index) => ({
          ...t,
          order: index,
        }));

        set({
          tasks: [
            ...tasks.filter((t) => t.columnId !== columnId),
            ...updatedColumnTasks,
          ],
        });
      },

      hasCanvasTask: (canvasId) => {
        return get().tasks.some((t) => t.canvasId === canvasId);
      },
    }),
    {
      name: 'vibe-board-tasks',
    }
  )
);
