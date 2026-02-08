'use client';

import { useSettingsStore, themes, ThemeColor } from '@/stores/useSettingsStore';
import { cn } from '@/lib/cn';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const {
    themeColor,
    compactMode,
    showEffortBadges,
    showQuickWinGlow,
    showThisWeekPanel,
    showQuickTasks,
    showNotes,
    showOverdueWarnings,
    showHeavyDayWarnings,
    setThemeColor,
    setCompactMode,
    setShowEffortBadges,
    setShowQuickWinGlow,
    setShowThisWeekPanel,
    setShowQuickTasks,
    setShowNotes,
    setShowOverdueWarnings,
    setShowHeavyDayWarnings,
    resetToDefaults,
  } = useSettingsStore();

  if (!isOpen) return null;

  const themeColors: ThemeColor[] = ['orange', 'blue', 'purple', 'green', 'pink', 'red'];

  const Toggle = ({
    enabled,
    onChange,
    label,
    description,
  }: {
    enabled: boolean;
    onChange: (val: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="text-sm text-[rgb(var(--text-primary))]">{label}</div>
        {description && (
          <div className="text-xs text-[rgb(var(--text-muted))]">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          'w-11 h-6 rounded-full transition-colors relative',
          enabled ? 'bg-[var(--accent)]' : 'bg-[rgb(var(--bg-elevated))]'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform',
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[rgb(var(--bg-surface))] rounded-xl border border-[var(--border)] w-full max-w-md max-h-[85vh] flex flex-col animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-semibold">Settings</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Theme Colors */}
            <div>
              <h3 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Theme Color
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {themeColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={cn(
                      'p-3 rounded-lg border-2 transition-all',
                      themeColor === color
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                        : 'border-transparent bg-[rgb(var(--bg-elevated))] hover:border-[var(--border)]'
                    )}
                  >
                    <div
                      className="w-full h-6 rounded-md mb-2"
                      style={{
                        background: `linear-gradient(135deg, rgb(${themes[color].accent}), rgb(${themes[color].accent2}))`,
                      }}
                    />
                    <span className="text-xs text-[rgb(var(--text-secondary))]">
                      {themes[color].name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Appearance
              </h3>
              <div className="space-y-1">
                <Toggle
                  enabled={compactMode}
                  onChange={setCompactMode}
                  label="Compact Mode"
                  description="Reduce spacing for more content"
                />
                <Toggle
                  enabled={showEffortBadges}
                  onChange={setShowEffortBadges}
                  label="Show Effort Badges"
                  description="Display effort level on task cards"
                />
                <Toggle
                  enabled={showQuickWinGlow}
                  onChange={setShowQuickWinGlow}
                  label="Quick Win Glow"
                  description="Highlight quick win tasks"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h3 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Sidebar Panels
              </h3>
              <div className="space-y-1">
                <Toggle
                  enabled={showThisWeekPanel}
                  onChange={setShowThisWeekPanel}
                  label="This Week Panel"
                  description="Show upcoming deadlines"
                />
                <Toggle
                  enabled={showQuickTasks}
                  onChange={setShowQuickTasks}
                  label="Quick Tasks"
                  description="Show simple todo checklist"
                />
                <Toggle
                  enabled={showNotes}
                  onChange={setShowNotes}
                  label="Notes"
                  description="Show notes panel"
                />
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Alerts
              </h3>
              <div className="space-y-1">
                <Toggle
                  enabled={showOverdueWarnings}
                  onChange={setShowOverdueWarnings}
                  label="Overdue Warnings"
                  description="Alert when tasks are overdue"
                />
                <Toggle
                  enabled={showHeavyDayWarnings}
                  onChange={setShowHeavyDayWarnings}
                  label="Heavy Day Warnings"
                  description="Alert when many tasks due same day"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--border)] flex justify-between">
            <button
              onClick={resetToDefaults}
              className="text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[rgb(var(--bg-base))] text-sm font-medium hover:brightness-110 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
