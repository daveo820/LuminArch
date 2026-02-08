'use client';

import { useEffect, useState } from 'react';
import { useNoteStore } from '@/stores/useNoteStore';

export function NotesPanel() {
  const { content, setContent } = useNoteStore();
  const [localContent, setLocalContent] = useState(content);

  // Sync with store on mount
  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  // Debounced save
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localContent !== content) {
        setContent(localContent);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [localContent, content, setContent]);

  return (
    <div className="p-4 flex flex-col min-h-[200px]">
      <h2 className="font-semibold text-sm text-[rgb(var(--text-primary))] mb-4">
        Notes
      </h2>

      <textarea
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        placeholder="Write your notes here..."
        className="flex-1 min-h-[150px] w-full bg-transparent text-sm text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))] resize-none outline-none leading-relaxed"
      />

      {localContent && (
        <div className="mt-2 text-xs text-[rgb(var(--text-muted))]">
          {localContent.length} characters
        </div>
      )}
    </div>
  );
}
