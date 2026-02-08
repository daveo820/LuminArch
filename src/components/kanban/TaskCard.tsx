'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/cn';
import type { Task, Urgency } from '@/types';
import { useTaskStore } from '@/stores/useTaskStore';
import { useState } from 'react';
import {
  getUrgency,
  estimateEffort,
  effortInfo,
  formatStartDate,
  getNextAction,
  isQuickWin,
  isHighPriority,
} from '@/lib/productivity';

interface TaskCardProps {
  task: Task;
}

function formatDueDate(dueAt: number): string {
  const date = new Date(dueAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.ceil((dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const urgencyStyles: Record<Urgency, string> = {
  overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
  today: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  tomorrow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'this-week': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  later: 'bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] border-[var(--border)]',
};

const urgencyBorder: Record<Urgency, string> = {
  overdue: 'border-l-red-500',
  today: 'border-l-orange-500',
  tomorrow: 'border-l-yellow-500',
  'this-week': 'border-l-blue-500',
  later: 'border-l-transparent',
};

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const urgency = getUrgency(task.dueAt);
  const effort = task.effort || estimateEffort(task.title, task.points);
  const quickWin = isQuickWin(task);
  const highPriority = isHighPriority(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative bg-[rgb(var(--bg-surface))] rounded-lg p-3 border border-[var(--border)]',
        'transition-all duration-200',
        'hover:border-[var(--border-accent)]',
        task.dueAt && `border-l-2 ${urgencyBorder[urgency]}`,
        isDragging && 'opacity-50 shadow-lg scale-[1.02] glow-accent',
        quickWin && 'ring-1 ring-green-500/30',
        highPriority && !quickWin && 'ring-1 ring-orange-500/30'
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      <div className="relative pointer-events-none">
        {/* Tags row */}
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          {task.course && (
            <span className="text-[10px] font-medium text-[var(--accent)]">
              {task.course}
            </span>
          )}
          {quickWin && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-medium">
              ⚡ Quick Win
            </span>
          )}
          {highPriority && !quickWin && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-medium">
              🎯 Priority
            </span>
          )}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            className="w-full bg-transparent text-sm font-medium text-[rgb(var(--text-primary))] outline-none pointer-events-auto"
            autoFocus
          />
        ) : (
          <p className="text-sm font-medium text-[rgb(var(--text-primary))] pr-16">
            {task.title}
          </p>
        )}

        {/* Info row: Due date, effort, points */}
        {(task.dueAt || task.points) && (
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {task.dueAt && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border',
                  urgencyStyles[urgency]
                )}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDueDate(task.dueAt)}
              </span>
            )}
            <span className={cn('text-[10px] font-medium', effortInfo[effort].color)}>
              {effortInfo[effort].icon} {effortInfo[effort].label}
            </span>
            {task.points && (
              <span className="text-[10px] text-[rgb(var(--text-muted))]">
                {task.points} pts
              </span>
            )}
          </div>
        )}

        {/* Expandable section with next action */}
        {isExpanded && task.dueAt && (
          <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2 animate-fade-in">
            {/* Suggested start */}
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-[rgb(var(--text-muted))]">📅</span>
              <span className="text-[rgb(var(--text-secondary))]">
                {formatStartDate(task.dueAt, effort)}
              </span>
            </div>
            {/* Next action */}
            <div className="flex items-start gap-2 text-[10px]">
              <span className="text-[rgb(var(--text-muted))]">→</span>
              <span className="text-[rgb(var(--text-secondary))] italic">
                {getNextAction(task)}
              </span>
            </div>
          </div>
        )}

        {/* Expand toggle */}
        {task.dueAt && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-[10px] text-[rgb(var(--text-muted))] hover:text-[var(--accent)] pointer-events-auto transition-colors"
          >
            {isExpanded ? '− Less' : '+ Tips'}
          </button>
        )}
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 rounded hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 rounded hover:bg-red-500/20 text-[rgb(var(--text-muted))] hover:text-red-400 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
