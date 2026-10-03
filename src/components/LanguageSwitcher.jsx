import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getLanguageName, languages, translate } from '../i18n';

function FlagIcon({ country, testId }) {
  return (
    <svg
      className="h-4 w-6 shrink-0 overflow-hidden rounded-[2px] border border-white/20"
      viewBox="0 0 24 16"
      aria-hidden="true"
      data-testid={testId}
    >
      {country === 'ru' ? (
        <>
          <rect width="24" height="16" fill="#fff" />
          <rect y="5.33" width="24" height="5.34" fill="#0039a6" />
          <rect y="10.67" width="24" height="5.33" fill="#d52b1e" />
        </>
      ) : country === 'en' ? (
        <>
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="4" />
          <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.5" />
          <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="6" />
          <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="2.8" />
        </>
      ) : (
        <>
          <rect width="24" height="5.33" fill="#0099b5" />
          <rect y="5.33" width="24" height="5.34" fill="#fff" />
          <rect y="10.67" width="24" height="5.33" fill="#1eb53a" />
          <rect y="5.08" width="24" height="0.5" fill="#ce1126" />
          <rect y="10.42" width="24" height="0.5" fill="#ce1126" />
          <circle cx="4.6" cy="2.55" r="1.6" fill="#fff" />
          <circle cx="5.25" cy="2.15" r="1.35" fill="#0099b5" />
          <g fill="#fff">
            <circle cx="10" cy="1.1" r="0.35" />
            <circle cx="12" cy="1.1" r="0.35" />
            <circle cx="14" cy="1.1" r="0.35" />
            <circle cx="10" cy="2.4" r="0.35" />
            <circle cx="12" cy="2.4" r="0.35" />
            <circle cx="14" cy="2.4" r="0.35" />
            <circle cx="16" cy="2.4" r="0.35" />
            <circle cx="10" cy="3.7" r="0.35" />
            <circle cx="12" cy="3.7" r="0.35" />
            <circle cx="14" cy="3.7" r="0.35" />
            <circle cx="16" cy="3.7" r="0.35" />
            <circle cx="18" cy="3.7" r="0.35" />
          </g>
        </>
      )}
    </svg>
  );
}

export default function LanguageSwitcher({ language, onLanguageChange, placement = 'navbar', compact = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarMenuPosition, setSidebarMenuPosition] = useState({ left: 8, bottom: 112 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const t = (text) => translate(text, language);
  const selectedLanguage = languages.find((option) => option.code === language) ?? languages[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!triggerRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || placement !== 'sidebar') return undefined;

    const updateMenuPosition = () => {
      const bounds = triggerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const menuWidth = 224;
      setSidebarMenuPosition({
        left: Math.max(8, Math.min(bounds.left, window.innerWidth - menuWidth - 8)),
        bottom: Math.max(8, window.innerHeight - bounds.top + 8),
      });
    };

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    return () => window.removeEventListener('resize', updateMenuPosition);
  }, [isOpen, placement]);

  const triggerClass = compact
    ? 'mx-auto flex h-11 w-11 items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/5 p-0 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400'
    : 'flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2.5 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:px-3';

  const dropdown = (
    <div
      id={placement === 'sidebar' ? 'mobile-language-menu' : 'desktop-language-menu'}
      ref={menuRef}
      className={`${placement === 'sidebar' ? 'fixed z-[100]' : 'absolute right-0 top-full z-[100] mt-2'} w-56 origin-top-right overflow-hidden rounded-lg border border-white/10 bg-[#121a35] py-1 shadow-2xl transition-all duration-200 ease-out ${isOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible pointer-events-none translate-y-2 scale-95 opacity-0'}`}
      style={placement === 'sidebar' ? sidebarMenuPosition : undefined}
      role="menu"
      aria-label={t('Tilni tanlash')}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {languages.map((option, index) => (
        <button
          key={option.code}
          type="button"
          role="menuitemradio"
          aria-checked={language === option.code}
          aria-label={`${option.short} ${getLanguageName(option.code, language)}`}
          onClick={() => {
            onLanguageChange(option.code);
            setIsOpen(false);
          }}
          style={{ transitionDelay: isOpen ? `${index * 35}ms` : '0ms' }}
          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-all duration-150 ease-out hover:bg-white/10 ${language === option.code ? 'bg-white/10 text-white' : 'text-slate-300'} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}
        >
          <FlagIcon country={option.flagCode} testId={`language-flag-${option.code}`} />
          <span className="w-8 font-semibold">{option.short}</span>
          <span>{getLanguageName(option.code, language)}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={placement === 'sidebar' ? 'relative w-full' : 'relative'}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t(isOpen ? 'Til menyusini yopish' : 'Tilni tanlash')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={placement === 'sidebar' ? 'mobile-language-menu' : 'desktop-language-menu'}
        data-testid={`language-switcher-${placement}-trigger`}
        title={t(isOpen ? 'Til menyusini yopish' : 'Tilni tanlash')}
        className={triggerClass}
      >
        <FlagIcon country={selectedLanguage.flagCode} testId={`${placement}-selected-language-flag`} />
        <svg className={`transition-transform duration-300 ease-in-out ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path className={`origin-center transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-[6px] rotate-45' : ''}`} d="M4 6h16" />
          <path className={`transition-opacity duration-150 ${isOpen ? 'opacity-0' : 'opacity-100'}`} d="M4 12h16" />
          <path className={`origin-center transition-transform duration-300 ease-in-out ${isOpen ? '-translate-y-[6px] -rotate-45' : ''}`} d="M4 18h16" />
        </svg>
      </button>
      {placement === 'sidebar' ? createPortal(dropdown, document.body) : dropdown}
    </div>
  );
}
