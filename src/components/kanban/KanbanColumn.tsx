'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@/lib/cn';
import type { Task, Column } from '@/types';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

export function KanbanColumn({ column, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  return (
    <div
      className={cn(
        'flex flex-col w-80 flex-shrink-0 bg-[rgb(var(--bg-surface))] rounded-xl',
        'border border-[var(--border)]',
        isOver && 'border-[var(--accent)] glow-accent'
      )}
    >
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-[rgb(var(--text-primary))]">
            {column.title}
          </h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]">
            {tasks.length}
          </span>
        </div>
        <div className="h-0.5 mt-3 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] opacity-60" />
      </div>

      <div
        ref={setNodeRef}
        className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[200px]"
      >
        <SortableContext
          items={sortedTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-[rgb(var(--text-muted))] text-sm">
            No tasks yet
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[var(--border)]">
        <AddTaskForm columnId={column.id} />
      </div>
    </div>
  );
}
