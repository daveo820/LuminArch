'use client';

import { useState } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { cn } from '@/lib/cn';
import type { Task, Urgency } from '@/types';
import {
  getUrgency,
  isQuickWin,
  isHighPriority,
  isDeepFocus,
  getNextAction,
} from '@/lib/productivity';
import { Calendar } from './Calendar';

const urgencyColors: Record<Urgency, string> = {
  overdue: 'bg-red-500',
  today: 'bg-orange-500',
  tomorrow: 'bg-yellow-500',
  'this-week': 'bg-blue-500',
  later: 'bg-[rgb(var(--text-muted))]',
};

const urgencyTextColors: Record<Urgency, string> = {
  overdue: 'text-red-400',
  today: 'text-orange-400',
  tomorrow: 'text-yellow-400',
  'this-week': 'text-blue-400',
  later: 'text-[rgb(var(--text-muted))]',
};

export function ThisWeekPanel() {
  const { tasks } = useTaskStore();
  const { showOverdueWarnings, showHeavyDayWarnings } = useSettingsStore();
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Filter active tasks (not completed)
  const activeTasks = tasks.filter((t) => t.columnId !== 'complete');

  // Get tasks due this week
  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingTasks = activeTasks
    .filter((task) => {
      if (!task.dueAt) return false;
      return new Date(task.dueAt) <= weekFromNow;
    })
    .sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0));

  // Categorize tasks
  const overdueTasks = upcomingTasks.filter((t) => getUrgency(t.dueAt) === 'overdue');
  const todayTasks = upcomingTasks.filter((t) => getUrgency(t.dueAt) === 'today');
  const tomorrowTasks = upcomingTasks.filter((t) => getUrgency(t.dueAt) === 'tomorrow');
  const thisWeekTasks = upcomingTasks.filter((t) => getUrgency(t.dueAt) === 'this-week');

  // Special groups
  const quickWins = activeTasks.filter(isQuickWin);
  const highPriority = activeTasks.filter((t) => isHighPriority(t) && !isQuickWin(t));
  const deepFocus = activeTasks.filter(isDeepFocus);

  // Get the single most important task to work on
  const topTask = overdueTasks[0] || todayTasks[0] || quickWins[0] || highPriority[0] || tomorrowTasks[0];

  const TaskGroup = ({
    title,
    tasks,
    urgency,
    icon
  }: {
    title: string;
    tasks: Task[];
    urgency?: Urgency;
    icon?: string;
  }) => {
    if (tasks.length === 0) return null;

    return (
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1.5">
          {urgency && <div className={cn('w-2 h-2 rounded-full', urgencyColors[urgency])} />}
          {icon && <span className="text-xs">{icon}</span>}
          <span className={cn(
            'text-xs font-medium',
            urgency ? urgencyTextColors[urgency] : 'text-[rgb(var(--text-secondary))]'
          )}>
            {title} ({tasks.length})
          </span>
        </div>
        <div className="space-y-1 pl-4">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="text-[11px] text-[rgb(var(--text-secondary))] truncate"
              title={task.title}
            >
              {task.course && (
                <span className="text-[var(--accent)] mr-1">{task.course}</span>
              )}
              {task.title}
            </div>
          ))}
          {tasks.length > 3 && (
            <div className="text-[10px] text-[rgb(var(--text-muted))]">
              +{tasks.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm text-[rgb(var(--text-primary))]">
          This Week
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCalendarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] hover:text-[var(--accent)] transition-colors"
            title="Open Calendar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]">
            {upcomingTasks.length} due
          </span>
        </div>
      </div>

      {/* Top priority callout */}
      {topTask && (
        <div className="mb-4 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30">
          <div className="text-[10px] font-medium text-[var(--accent)] uppercase tracking-wider mb-1">
            Work on first
          </div>
          <div className="text-sm font-medium text-[rgb(var(--text-primary))] truncate">
            {topTask.title}
          </div>
          <div className="text-[11px] text-[rgb(var(--text-secondary))] mt-1 italic">
            → {getNextAction(topTask)}
          </div>
        </div>
      )}

      {/* Urgency groups */}
      <TaskGroup title="Overdue" tasks={overdueTasks} urgency="overdue" />
      <TaskGroup title="Due Today" tasks={todayTasks} urgency="today" />
      <TaskGroup title="Due Tomorrow" tasks={tomorrowTasks} urgency="tomorrow" />
      <TaskGroup title="This Week" tasks={thisWeekTasks} urgency="this-week" />

      {/* Divider */}
      {(quickWins.length > 0 || highPriority.length > 0 || deepFocus.length > 0) && (
        <div className="h-px bg-[var(--border)] my-3" />
      )}

      {/* Special groups */}
      <TaskGroup title="Quick Wins" tasks={quickWins} icon="⚡" />
      <TaskGroup title="High Priority" tasks={highPriority} icon="🎯" />
      <TaskGroup title="Deep Focus Needed" tasks={deepFocus} icon="🧠" />

      {upcomingTasks.length === 0 && quickWins.length === 0 && (
        <p className="text-sm text-[rgb(var(--text-muted))] text-center py-4">
          No upcoming deadlines 🎉
        </p>
      )}

      {/* Stats */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 rounded-lg bg-[rgb(var(--bg-elevated))]">
            <div className="text-base font-semibold text-[rgb(var(--text-primary))]">
              {tasks.filter((t) => t.columnId === 'todo').length}
            </div>
            <div className="text-[10px] text-[rgb(var(--text-muted))]">To Do</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-[rgb(var(--bg-elevated))]">
            <div className="text-base font-semibold text-[var(--accent)]">
              {tasks.filter((t) => t.columnId === 'in-progress').length}
            </div>
            <div className="text-[10px] text-[rgb(var(--text-muted))]">Active</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-[rgb(var(--bg-elevated))]">
            <div className="text-base font-semibold text-green-400">
              {tasks.filter((t) => t.columnId === 'complete').length}
            </div>
            <div className="text-[10px] text-[rgb(var(--text-muted))]">Done</div>
          </div>
        </div>

        {/* Overload warning */}
        {showOverdueWarnings && overdueTasks.length > 0 && (
          <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] text-red-400">
            ⚠️ {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} need attention
          </div>
        )}

        {showHeavyDayWarnings && todayTasks.length >= 3 && (
          <div className="mt-2 p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-[11px] text-orange-400">
            📊 Heavy day: {todayTasks.length} tasks due today
          </div>
        )}
      </div>

      <Calendar isOpen={calendarOpen} onClose={() => setCalendarOpen(false)} />
    </div>
  );
}
