'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor = 'orange' | 'blue' | 'purple' | 'green' | 'pink' | 'red';

export interface ThemeConfig {
  name: string;
  accent: string;
  accent2: string;
  accentHsl: string;
}

export const themes: Record<ThemeColor, ThemeConfig> = {
  orange: {
    name: 'Sunset Orange',
    accent: '255, 140, 66',
    accent2: '255, 200, 87',
    accentHsl: '25, 100%, 63%',
  },
  blue: {
    name: 'Ocean Blue',
    accent: '59, 130, 246',
    accent2: '99, 179, 237',
    accentHsl: '217, 91%, 60%',
  },
  purple: {
    name: 'Royal Purple',
    accent: '147, 51, 234',
    accent2: '192, 132, 252',
    accentHsl: '270, 76%, 56%',
  },
  green: {
    name: 'Forest Green',
    accent: '34, 197, 94',
    accent2: '134, 239, 172',
    accentHsl: '142, 71%, 45%',
  },
  pink: {
    name: 'Rose Pink',
    accent: '236, 72, 153',
    accent2: '249, 168, 212',
    accentHsl: '330, 81%, 60%',
  },
  red: {
    name: 'Cherry Red',
    accent: '239, 68, 68',
    accent2: '252, 165, 165',
    accentHsl: '0, 84%, 60%',
  },
};

interface SettingsState {
  // Appearance
  themeColor: ThemeColor;
  compactMode: boolean;
  showEffortBadges: boolean;
  showQuickWinGlow: boolean;

  // Sidebar
  sidebarCollapsed: boolean;
  showThisWeekPanel: boolean;
  showQuickTasks: boolean;
  showNotes: boolean;

  // Notifications
  showOverdueWarnings: boolean;
  showHeavyDayWarnings: boolean;

  // Actions
  setThemeColor: (color: ThemeColor) => void;
  setCompactMode: (enabled: boolean) => void;
  setShowEffortBadges: (enabled: boolean) => void;
  setShowQuickWinGlow: (enabled: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setShowThisWeekPanel: (enabled: boolean) => void;
  setShowQuickTasks: (enabled: boolean) => void;
  setShowNotes: (enabled: boolean) => void;
  setShowOverdueWarnings: (enabled: boolean) => void;
  setShowHeavyDayWarnings: (enabled: boolean) => void;
  resetToDefaults: () => void;
}

const defaultSettings = {
  themeColor: 'orange' as ThemeColor,
  compactMode: false,
  showEffortBadges: true,
  showQuickWinGlow: true,
  sidebarCollapsed: false,
  showThisWeekPanel: true,
  showQuickTasks: true,
  showNotes: true,
  showOverdueWarnings: true,
  showHeavyDayWarnings: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setThemeColor: (color) => set({ themeColor: color }),
      setCompactMode: (enabled) => set({ compactMode: enabled }),
      setShowEffortBadges: (enabled) => set({ showEffortBadges: enabled }),
      setShowQuickWinGlow: (enabled) => set({ showQuickWinGlow: enabled }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setShowThisWeekPanel: (enabled) => set({ showThisWeekPanel: enabled }),
      setShowQuickTasks: (enabled) => set({ showQuickTasks: enabled }),
      setShowNotes: (enabled) => set({ showNotes: enabled }),
      setShowOverdueWarnings: (enabled) => set({ showOverdueWarnings: enabled }),
      setShowHeavyDayWarnings: (enabled) => set({ showHeavyDayWarnings: enabled }),
      resetToDefaults: () => set(defaultSettings),
    }),
    {
      name: 'birdie-board-settings',
    }
  )
);
