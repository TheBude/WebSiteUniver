import { translate } from '../i18n';

function ModeIcon({ mode, active }) {
  if (mode === 'dark') {
    return active ? (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ) : (
      <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
    );
  }

  return active ? (
    <>
      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a15.8 15.8 0 0 1-3.1 3.8M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.9-.5" />
    </>
  ) : (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  );
}

export default function DisplayModeControls({
  language,
  isDarkMode,
  onToggleDarkMode,
  isVisionMode,
  onToggleVisionMode,
  placement = 'navbar',
  expanded = false,
}) {
  const isSidebar = placement === 'sidebar';
  const modes = [
    { id: 'dark', label: 'Tungi rejim', active: isDarkMode, onClick: onToggleDarkMode },
    { id: 'vision', label: 'Ko‘zi ojizlar uchun rejim', active: isVisionMode, onClick: onToggleVisionMode },
  ];

  return (
    <div className={`flex items-center ${isSidebar ? 'w-full flex-col gap-1' : 'gap-1.5'}`}>
      {modes.map((mode) => {
        const label = translate(mode.label, language);
        const buttonLayout = isSidebar
          ? expanded
            ? 'min-h-10 w-full justify-start gap-3 px-3'
            : 'h-10 w-10 justify-center'
          : 'h-10 w-10 justify-center';

        return (
          <button
            className={`flex shrink-0 items-center rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 ${buttonLayout} ${mode.active ? 'border-sky-300/60 bg-sky-500/20 text-white' : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'}`}
            type="button"
            key={mode.id}
            aria-label={label}
            aria-pressed={mode.active}
            title={label}
            onClick={mode.onClick}
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <ModeIcon mode={mode.id} active={mode.active} />
            </svg>
            {isSidebar && expanded && <span className="text-left text-xs">{label}</span>}
          </button>
        );
      })}
    </div>
  );
}