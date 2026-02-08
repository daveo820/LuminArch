'use client';

import { useEffect } from 'react';
import { useSettingsStore, themes, type ThemeColor } from '@/stores/useSettingsStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themeColor } = useSettingsStore();

  useEffect(() => {
    const theme = themes[themeColor as ThemeColor];
    const root = document.documentElement;

    root.style.setProperty('--accent', `rgb(${theme.accent})`);
    root.style.setProperty('--accent2', `rgb(${theme.accent2})`);
    root.style.setProperty('--accent-rgb', theme.accent);
    root.style.setProperty('--accent2-rgb', theme.accent2);
  }, [themeColor]);

  return <>{children}</>;
}
