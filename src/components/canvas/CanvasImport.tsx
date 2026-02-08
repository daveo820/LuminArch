'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useTaskStore } from '@/stores/useTaskStore';
import type { CanvasCourse, CanvasAssignment } from '@/types';
import { cn } from '@/lib/cn';
import { estimateEffort } from '@/lib/productivity';

interface ExtendedAssignment extends CanvasAssignment {
  points_possible?: number;
}

export function CanvasImport() {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState<CanvasCourse[]>([]);
  const [assignments, setAssignments] = useState<ExtendedAssignment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedAssignments, setSelectedAssignments] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addTask, hasCanvasTask } = useTaskStore();

  useEffect(() => {
    if (isOpen && courses.length === 0) {
      fetchCourses();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCourse) {
      fetchAssignments(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/canvas/courses');
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses. Check your Canvas credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async (courseId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/canvas/assignments?courseId=${courseId}`);
      if (!res.ok) throw new Error('Failed to fetch assignments');
      const data: ExtendedAssignment[] = await res.json();

      // Filter to only show future assignments
      const now = new Date();
      const futureAssignments = data.filter((a) => {
        if (!a.due_at) return true; // Include assignments without due date
        return new Date(a.due_at) >= now;
      });

      // Sort by due date
      futureAssignments.sort((a, b) => {
        if (!a.due_at) return 1;
        if (!b.due_at) return -1;
        return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
      });

      setAssignments(futureAssignments);
    } catch (err) {
      setError('Failed to load assignments.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAssignment = (id: number) => {
    const newSelected = new Set(selectedAssignments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAssignments(newSelected);
  };

  const selectAllThisWeek = () => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const thisWeekIds = assignments
      .filter((a) => {
        if (!a.due_at) return false;
        const due = new Date(a.due_at);
        return due >= now && due <= weekFromNow && !hasCanvasTask(a.id);
      })
      .map((a) => a.id);

    setSelectedAssignments(new Set(thisWeekIds));
  };

  const importSelected = () => {
    const course = courses.find((c) => c.id === selectedCourse);
    const courseCode = course?.course_code || course?.name || '';

    assignments
      .filter((a) => selectedAssignments.has(a.id))
      .forEach((assignment) => {
        // Skip if already imported
        if (hasCanvasTask(assignment.id)) return;

        const descriptionText = assignment.description
          ? stripHtml(assignment.description).slice(0, 300)
          : '';

        addTask({
          title: assignment.name,
          description: descriptionText || undefined,
          columnId: 'todo',
          dueAt: assignment.due_at ? new Date(assignment.due_at).getTime() : undefined,
          course: courseCode,
          points: assignment.points_possible,
          canvasId: assignment.id,
          effort: estimateEffort(assignment.name, assignment.points_possible),
        });
      });

    setSelectedAssignments(new Set());
    setIsOpen(false);
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.ceil((dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `${date.toLocaleDateString('en-US', { weekday: 'short' })} (${diffDays}d)`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getUrgencyStyle = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffDays = Math.ceil((dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'text-red-400';
    if (diffDays === 0) return 'text-orange-400';
    if (diffDays === 1) return 'text-yellow-400';
    if (diffDays <= 7) return 'text-blue-400';
    return 'text-[rgb(var(--text-muted))]';
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        Import from Canvas
      </Button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[rgb(var(--bg-surface))] rounded-xl border border-[var(--border)] w-full max-w-2xl max-h-[80vh] flex flex-col animate-slide-up">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-semibold">Import from Canvas</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex">
            {/* Courses */}
            <div className="w-1/3 border-r border-[var(--border)] overflow-y-auto">
              <div className="p-3 border-b border-[var(--border)]">
                <span className="text-xs font-medium text-[rgb(var(--text-muted))] uppercase tracking-wider">
                  Courses
                </span>
              </div>
              {loading && courses.length === 0 ? (
                <div className="p-4 text-sm text-[rgb(var(--text-muted))]">Loading...</div>
              ) : (
                <div className="p-2">
                  {courses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourse(course.id)}
                      className={cn(
                        'w-full text-left p-2 rounded-lg text-sm transition-colors',
                        selectedCourse === course.id
                          ? 'bg-[var(--accent)] text-[rgb(var(--bg-base))]'
                          : 'hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-primary))]'
                      )}
                    >
                      <div className="font-medium truncate">
                        {course.course_code || course.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Assignments */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 border-b border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-medium text-[rgb(var(--text-muted))] uppercase tracking-wider">
                  Upcoming Assignments
                </span>
                <div className="flex items-center gap-2">
                  {selectedCourse && assignments.length > 0 && (
                    <button
                      onClick={selectAllThisWeek}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      Select this week
                    </button>
                  )}
                  {selectedAssignments.size > 0 && (
                    <span className="text-xs text-[var(--accent)] font-medium">
                      {selectedAssignments.size} selected
                    </span>
                  )}
                </div>
              </div>

              {!selectedCourse ? (
                <div className="p-4 text-sm text-[rgb(var(--text-muted))]">
                  Select a course to view assignments
                </div>
              ) : loading ? (
                <div className="p-4 text-sm text-[rgb(var(--text-muted))]">Loading...</div>
              ) : assignments.length === 0 ? (
                <div className="p-4 text-sm text-[rgb(var(--text-muted))]">
                  No upcoming assignments
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {assignments.map((assignment) => {
                    const alreadyImported = hasCanvasTask(assignment.id);
                    return (
                      <button
                        key={assignment.id}
                        onClick={() => !alreadyImported && toggleAssignment(assignment.id)}
                        disabled={alreadyImported}
                        className={cn(
                          'w-full text-left p-3 rounded-lg transition-colors',
                          alreadyImported
                            ? 'opacity-50 cursor-not-allowed bg-[rgb(var(--bg-elevated))]'
                            : selectedAssignments.has(assignment.id)
                              ? 'bg-[var(--accent)]/20 border border-[var(--accent)]'
                              : 'hover:bg-[rgb(var(--bg-elevated))] border border-transparent'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                              alreadyImported
                                ? 'bg-green-500/20 border-green-500/50'
                                : selectedAssignments.has(assignment.id)
                                  ? 'bg-[var(--accent)] border-[var(--accent)]'
                                  : 'border-[rgb(var(--text-muted))]'
                            )}
                          >
                            {(selectedAssignments.has(assignment.id) || alreadyImported) && (
                              <svg
                                className={cn(
                                  'w-3 h-3',
                                  alreadyImported ? 'text-green-400' : 'text-[rgb(var(--bg-base))]'
                                )}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[rgb(var(--text-primary))]">
                              {assignment.name}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={cn('text-xs font-medium', getUrgencyStyle(assignment.due_at))}>
                                {formatDueDate(assignment.due_at)}
                              </span>
                              {assignment.points_possible && (
                                <span className="text-xs text-[rgb(var(--text-muted))]">
                                  {assignment.points_possible} pts
                                </span>
                              )}
                              {alreadyImported && (
                                <span className="text-xs text-green-400">Imported</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-[var(--border)] flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={importSelected}
              disabled={selectedAssignments.size === 0}
            >
              Import {selectedAssignments.size > 0 && `(${selectedAssignments.size})`}
            </Button>
          </div>

          {error && (
            <div className="absolute bottom-20 left-4 right-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
