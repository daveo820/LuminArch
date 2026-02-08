'use client';

import { useEffect } from 'react';
import { useSettingsStore, themes } from '@/stores/useSettingsStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeColor = useSettingsStore((state) => state.themeColor);

  useEffect(() => {
    const theme = themes[themeColor];
    const root = document.documentElement;

    root.style.setProperty('--accent', `rgb(${theme.accent})`);
    root.style.setProperty('--accent2', `rgb(${theme.accent2})`);
    root.style.setProperty('--accent-rgb', theme.accent);
    root.style.setProperty('--accent2-rgb', theme.accent2);
  }, [themeColor]);

  return <>{children}</>;
}
