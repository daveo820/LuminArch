'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NoteState {
  content: string;
  updatedAt: number;
  setContent: (content: string) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      content: '',
      updatedAt: Date.now(),

      setContent: (content) => {
        set({
          content,
          updatedAt: Date.now(),
        });
      },
    }),
    {
      name: 'vibe-board-notes',
    }
  )
);
