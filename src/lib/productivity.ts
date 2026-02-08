import type { Task, Urgency, EffortLevel } from '@/types';

// Estimate effort based on assignment name, points, and type
export function estimateEffort(
  name: string,
  points?: number,
  assignmentType?: string
): EffortLevel {
  const nameLower = name.toLowerCase();

  // Deep work indicators (4+ hours)
  const deepWorkKeywords = [
    'exam', 'final', 'midterm', 'test', 'paper', 'essay',
    'project', 'capstone', 'presentation', 'major assignment',
    'research', 'analysis', 'report'
  ];
  if (deepWorkKeywords.some((kw) => nameLower.includes(kw))) {
    return 'deep';
  }

  // Quick task indicators (1 hour or less)
  const quickKeywords = [
    'quiz', 'reading response', 'smartbook', 'discussion',
    'reflection', 'attendance', 'participation', 'check-in'
  ];
  if (quickKeywords.some((kw) => nameLower.includes(kw))) {
    return 'quick';
  }

  // Points-based estimation
  if (points !== undefined) {
    if (points <= 10) return 'quick';
    if (points >= 100) return 'deep';
  }

  // Assignment type based
  if (assignmentType) {
    if (assignmentType.includes('quiz')) return 'quick';
    if (assignmentType.includes('exam') || assignmentType.includes('paper')) return 'deep';
  }

  // Default to moderate
  return 'moderate';
}

// Calculate suggested start date based on due date and effort
export function getSuggestedStartDate(dueAt?: number, effort?: EffortLevel): Date | null {
  if (!dueAt) return null;

  const dueDate = new Date(dueAt);
  const now = new Date();

  // Days before due date to start
  const daysNeeded: Record<EffortLevel, number> = {
    quick: 1,    // Start day before
    moderate: 2, // Start 2 days before
    deep: 4,     // Start 4 days before
  };

  const days = daysNeeded[effort || 'moderate'];
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - days);

  // If start date is in the past, return today
  if (startDate < now) {
    return now;
  }

  return startDate;
}

// Format suggested start date
export function formatStartDate(dueAt?: number, effort?: EffortLevel): string {
  const startDate = getSuggestedStartDate(dueAt, effort);
  if (!startDate) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const diffDays = Math.ceil((startDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'Start today';
  if (diffDays === 1) return 'Start tomorrow';
  return `Start ${startDate.toLocaleDateString('en-US', { weekday: 'short' })}`;
}

// Get urgency level
export function getUrgency(dueAt?: number): Urgency {
  if (!dueAt) return 'later';

  const now = new Date();
  const due = new Date(dueAt);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());

  const diffDays = Math.ceil((dueDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays <= 7) return 'this-week';
  return 'later';
}

// Generate next action based on task
export function getNextAction(task: Task): string {
  const nameLower = task.title.toLowerCase();
  const effort = task.effort || estimateEffort(task.title, task.points);

  // Specific action suggestions based on assignment type
  if (nameLower.includes('exam') || nameLower.includes('test') || nameLower.includes('final')) {
    return 'Review notes and create a study guide';
  }
  if (nameLower.includes('quiz')) {
    return 'Review chapter material before attempting';
  }
  if (nameLower.includes('paper') || nameLower.includes('essay')) {
    return 'Create an outline with thesis and main points';
  }
  if (nameLower.includes('reading response') || nameLower.includes('reflection')) {
    return 'Read the assigned material and take notes';
  }
  if (nameLower.includes('homework') || nameLower.includes('assignment')) {
    return 'Open the assignment and complete first 3 problems';
  }
  if (nameLower.includes('smartbook')) {
    return 'Open Connect and start the reading module';
  }
  if (nameLower.includes('project') || nameLower.includes('capstone')) {
    return 'Break down into milestones and start first task';
  }
  if (nameLower.includes('excel') || nameLower.includes('challenge')) {
    return 'Open the file and review instructions';
  }
  if (nameLower.includes('discussion')) {
    return 'Read the prompt and draft your initial post';
  }

  // Default based on effort
  if (effort === 'quick') return 'Set a 30-minute timer and complete it';
  if (effort === 'deep') return 'Block 2 hours and start with research';
  return 'Review requirements and begin first section';
}

// Effort level display info
export const effortInfo: Record<EffortLevel, { label: string; icon: string; color: string }> = {
  quick: { label: '~1hr', icon: '⚡', color: 'text-green-400' },
  moderate: { label: '2-3hr', icon: '⏱️', color: 'text-yellow-400' },
  deep: { label: '4hr+', icon: '🧠', color: 'text-purple-400' },
};

// Check if task is a "quick win" (quick effort + due soon)
export function isQuickWin(task: Task): boolean {
  const effort = task.effort || estimateEffort(task.title, task.points);
  const urgency = getUrgency(task.dueAt);

  return effort === 'quick' && ['today', 'tomorrow', 'this-week'].includes(urgency);
}

// Check if task needs deep focus
export function isDeepFocus(task: Task): boolean {
  const effort = task.effort || estimateEffort(task.title, task.points);
  return effort === 'deep';
}

// Check if task is high priority (exam, major assignment, or due very soon)
export function isHighPriority(task: Task): boolean {
  const nameLower = task.title.toLowerCase();
  const urgency = getUrgency(task.dueAt);

  const highPriorityKeywords = ['exam', 'final', 'midterm', 'test', 'major', 'paper', 'essay', 'project'];
  const isImportant = highPriorityKeywords.some((kw) => nameLower.includes(kw));

  return isImportant || urgency === 'overdue' || urgency === 'today';
}
