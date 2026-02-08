'use client';

import { useState } from 'react';
import { useTaskStore } from '@/stores/useTaskStore';
import { cn } from '@/lib/cn';
import { getUrgency } from '@/lib/productivity';
import type { Task } from '@/types';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar({ isOpen, onClose }: CalendarProps) {
  const { tasks } = useTaskStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter((task: Task) => {
      if (!task.dueAt || task.columnId === 'complete') return false;
      const taskDate = new Date(task.dueAt);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Build calendar grid
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // Get tasks for selected date
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[rgb(var(--bg-surface))] rounded-xl border border-[var(--border)] w-full max-w-2xl max-h-[85vh] flex flex-col animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Calendar</h2>
              <button
                onClick={goToToday}
                className="text-xs px-2 py-1 rounded bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-secondary))] hover:text-[var(--accent)] transition-colors"
              >
                Today
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex">
            {/* Calendar Grid */}
            <div className="flex-1 p-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-secondary))]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold">
                  {MONTHS[month]} {year}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-secondary))]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-[rgb(var(--text-muted))] py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dayTasks = getTasksForDate(date);
                  const hasOverdue = dayTasks.some((t) => getUrgency(t.dueAt) === 'overdue');
                  const isSelected = selectedDate?.toDateString() === date.toDateString();

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        'aspect-square rounded-lg flex flex-col items-center justify-start p-1 transition-all',
                        'hover:bg-[rgb(var(--bg-elevated))]',
                        isToday(date) && 'ring-2 ring-[var(--accent)]',
                        isSelected && 'bg-[var(--accent)]/20',
                      )}
                    >
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isToday(date) ? 'text-[var(--accent)]' : 'text-[rgb(var(--text-primary))]'
                        )}
                      >
                        {date.getDate()}
                      </span>
                      {dayTasks.length > 0 && (
                        <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                          {dayTasks.slice(0, 3).map((task) => {
                            const urgency = getUrgency(task.dueAt);
                            const colors: Record<string, string> = {
                              overdue: 'bg-red-500',
                              today: 'bg-orange-500',
                              tomorrow: 'bg-yellow-500',
                              'this-week': 'bg-blue-500',
                              later: 'bg-[rgb(var(--text-muted))]',
                            };
                            return (
                              <div
                                key={task.id}
                                className={cn('w-1.5 h-1.5 rounded-full', colors[urgency])}
                              />
                            );
                          })}
                          {dayTasks.length > 3 && (
                            <span className="text-[8px] text-[rgb(var(--text-muted))]">
                              +{dayTasks.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Tasks */}
            <div className="w-64 border-l border-[var(--border)] overflow-y-auto">
              <div className="p-3 border-b border-[var(--border)] sticky top-0 bg-[rgb(var(--bg-surface))]">
                <span className="text-xs font-medium text-[rgb(var(--text-muted))] uppercase tracking-wider">
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Select a day'}
                </span>
              </div>

              <div className="p-3 space-y-2">
                {!selectedDate && (
                  <p className="text-sm text-[rgb(var(--text-muted))] text-center py-4">
                    Click a day to see tasks
                  </p>
                )}

                {selectedDate && selectedDateTasks.length === 0 && (
                  <p className="text-sm text-[rgb(var(--text-muted))] text-center py-4">
                    No tasks due this day
                  </p>
                )}

                {selectedDateTasks.map((task) => {
                  const urgency = getUrgency(task.dueAt);
                  const borderColors: Record<string, string> = {
                    overdue: 'border-l-red-500',
                    today: 'border-l-orange-500',
                    tomorrow: 'border-l-yellow-500',
                    'this-week': 'border-l-blue-500',
                    later: 'border-l-[rgb(var(--text-muted))]',
                  };

                  return (
                    <div
                      key={task.id}
                      className={cn(
                        'p-2 rounded-lg bg-[rgb(var(--bg-elevated))] border-l-2',
                        borderColors[urgency]
                      )}
                    >
                      {task.course && (
                        <span className="text-[10px] font-medium text-[var(--accent)]">
                          {task.course}
                        </span>
                      )}
                      <p className="text-sm text-[rgb(var(--text-primary))] line-clamp-2">
                        {task.title}
                      </p>
                      {task.points && (
                        <span className="text-[10px] text-[rgb(var(--text-muted))]">
                          {task.points} pts
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="p-3 border-t border-[var(--border)] flex items-center justify-center gap-4 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[rgb(var(--text-muted))]">Overdue</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[rgb(var(--text-muted))]">Today</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-[rgb(var(--text-muted))]">Tomorrow</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[rgb(var(--text-muted))]">This Week</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
