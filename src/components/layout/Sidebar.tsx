'use client';

import { ThisWeekPanel } from '@/components/layout/ThisWeekPanel';
import { TodoPanel } from '@/components/todos/TodoPanel';
import { NotesPanel } from '@/components/notes/NotesPanel';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function Sidebar() {
  const { showThisWeekPanel, showQuickTasks, showNotes } = useSettingsStore();

  // Check if any panels are visible
  const hasVisiblePanels = showThisWeekPanel || showQuickTasks || showNotes;

  if (!hasVisiblePanels) {
    return (
      <aside className="w-80 border-r border-[var(--border)] flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-[rgb(var(--text-muted))] text-center">
            All sidebar panels are hidden.<br />
            Open Settings to enable them.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r border-[var(--border)] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {showThisWeekPanel && (
          <>
            <ThisWeekPanel />
            {(showQuickTasks || showNotes) && <div className="h-px bg-[var(--border)] mx-4" />}
          </>
        )}
        {showQuickTasks && (
          <>
            <TodoPanel />
            {showNotes && <div className="h-px bg-[var(--border)] mx-4" />}
          </>
        )}
        {showNotes && <NotesPanel />}
      </div>
    </aside>
  );
}
