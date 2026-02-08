export type ColumnId = 'todo' | 'in-progress' | 'complete';

export type Urgency = 'overdue' | 'today' | 'tomorrow' | 'this-week' | 'later';

export type EffortLevel = 'quick' | 'moderate' | 'deep';

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
  order: number;
  createdAt: number;
  dueAt?: number;
  course?: string;
  points?: number;
  canvasId?: number;
  effort?: EffortLevel;
  assignmentType?: string;
}

export interface Column {
  id: ColumnId;
  title: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  content: string;
  updatedAt: number;
}

export const COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'complete', title: 'Complete' },
];

// Canvas LMS Types
export interface CanvasCourse {
  id: number;
  name: string;
  course_code: string;
  workflow_state: string;
}

export interface CanvasAssignment {
  id: number;
  name: string;
  description: string | null;
  due_at: string | null;
  course_id: number;
  html_url: string;
  submission_types: string[];
  has_submitted_submissions: boolean;
}
