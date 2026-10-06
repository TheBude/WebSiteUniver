import React, { useState } from 'react';
import { translate } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import DisplayModeControls from './DisplayModeControls';
import SiteSearch from './SiteSearch';
import { sidebarNavigation } from './sidebarData';

const sidebarIcons = {
  building: (
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
  ),
  structure: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </>
  ),
  activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  admissions: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  students: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

function createMenuId(label, parentId) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return parentId ? `${parentId}--${slug}` : `sidebar-menu-${slug}`;
}

function MenuTree({
  items,
  ancestors = [],
  depth = 0,
  isSidebarOpen,
  expandedItems,
  onToggle,
  onOpenSidebar,
  onCloseSidebar,
  language,
}) {
  const t = (text) => translate(text, language);
  const rootLevel = depth === 0;

  return (
    <div className={rootLevel
      ? 'space-y-1'
      : `mt-1 space-y-1 border-l border-white/10 ${depth === 1 ? 'ml-6 pl-3' : 'ml-3 pl-2'}`}
    >
      {items.map((item) => {
        const parentId = ancestors[ancestors.length - 1];
        const id = item.id ?? createMenuId(item.label, parentId);
        const hasChildren = Boolean(item.children?.length);
        const isExpanded = expandedItems.has(id);
        const itemClassName = rootLevel
          ? `flex h-11 w-full items-center gap-3 rounded-lg text-left text-sm text-slate-200 transition-colors hover:bg-blue-600/30 hover:text-white ${isSidebarOpen ? 'px-3.5' : 'justify-center px-0'}`
          : 'flex min-h-9 w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-blue-600/30 hover:text-white';

        if (hasChildren) {
          const handleToggle = () => {
            if (rootLevel && !isSidebarOpen) {
              onOpenSidebar();
              return;
            }
            onToggle(id, ancestors);
          };

          return (
            <div key={id}>
              <button
                type="button"
                onClick={handleToggle}
                aria-label={t(item.label)}
                aria-expanded={isExpanded && (!rootLevel || isSidebarOpen)}
                aria-controls={id}
                title={rootLevel && !isSidebarOpen ? t(item.label) : undefined}
                className={itemClassName}
              >
                {rootLevel && item.icon && (
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {sidebarIcons[item.icon]}
                  </svg>
                )}
                {(!rootLevel || isSidebarOpen) && (
                  <span className={rootLevel ? 'flex-1 whitespace-nowrap' : 'flex-1 whitespace-normal break-words'}>{t(item.label)}</span>
                )}
                {(!rootLevel || isSidebarOpen) && (
                  <svg className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
              <div
                id={id}
                aria-hidden={!isSidebarOpen || !isExpanded}
                inert={!isSidebarOpen || !isExpanded}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isSidebarOpen && isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <MenuTree
                    items={item.children}
                    ancestors={[...ancestors, id]}
                    depth={depth + 1}
                    isSidebarOpen={isSidebarOpen}
                    expandedItems={expandedItems}
                    onToggle={onToggle}
                    onOpenSidebar={onOpenSidebar}
                    onCloseSidebar={onCloseSidebar}
                    language={language}
                  />
                </div>
              </div>
            </div>
          );
        }

        return (
          <a
            key={id}
            href={`#${item.href ?? item.label}`}
            onClick={onCloseSidebar}
            aria-label={t(item.label)}
            title={rootLevel && !isSidebarOpen ? t(item.label) : undefined}
            className={itemClassName}
          >
            {rootLevel && item.icon && (
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {sidebarIcons[item.icon]}
              </svg>
            )}
            {(!rootLevel || isSidebarOpen) && (
              <span className={rootLevel ? 'whitespace-nowrap' : 'whitespace-normal break-words'}>{t(item.label)}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose, onOpen, language, onLanguageChange, isDarkMode, onToggleDarkMode, isVisionMode, onToggleVisionMode }) {
  const [expandedItems, setExpandedItems] = useState(() => new Set());

  const toggleMenu = (id, ancestors) => {
    setExpandedItems((currentItems) => {
      if (currentItems.has(id)) {
        return new Set(ancestors.filter((ancestorId) => currentItems.has(ancestorId)));
      }
      return new Set([...ancestors, id]);
    });
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col overflow-hidden border-r border-blue-900/40 bg-[#161f3e] text-slate-100 shadow-2xl transition-[width] duration-300 ease-in-out ${isOpen ? 'w-72 sm:w-80' : 'w-16'}`}>
        <div className={`flex h-[73px] shrink-0 items-center border-b border-white/10 bg-[#121a35] ${isOpen ? 'justify-between px-6' : 'justify-center px-2'}`}>
          {isOpen && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
              <span className="text-base font-bold tracking-wide text-white">{translate('Menyu bo‘limi', language)}</span>
            </div>
          )}
          <button
            type="button"
            onClick={isOpen ? onClose : onOpen}
            aria-label={translate(isOpen ? 'Menyuni yopish' : 'Bo‘limlar panelini kengaytirish', language)}
            aria-expanded={isOpen}
            title={translate(isOpen ? 'Menyuni yopish' : 'Bo‘limlar panelini kengaytirish', language)}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path className={`origin-center transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-[5px] rotate-45' : ''}`} d="M4 7h16" />
              <path className={`transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} d="M4 12h16" />
              <path className={`origin-center transition-transform duration-300 ease-in-out ${isOpen ? '-translate-y-[5px] -rotate-45' : ''}`} d="M4 17h16" />
            </svg>
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto py-3" aria-label={translate('Asosiy menyu', language)}>
          <MenuTree
            items={sidebarNavigation}
            isSidebarOpen={isOpen}
            expandedItems={expandedItems}
            onToggle={toggleMenu}
            onOpenSidebar={onOpen}
            onCloseSidebar={onClose}
            language={language}
          />
        </nav>

        <div className="shrink-0 border-t border-white/10 px-2 py-2 md:hidden">
          <SiteSearch language={language} placement="sidebar" expanded={isOpen} onOpenSidebar={onOpen} />
        </div>

        <div className="shrink-0 border-t border-white/10 px-2 py-2 md:hidden">
          <DisplayModeControls
            language={language}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            isVisionMode={isVisionMode}
            onToggleVisionMode={onToggleVisionMode}
            placement="sidebar"
            expanded={isOpen}
          />
        </div>

        <div className="flex h-14 shrink-0 items-center justify-center border-t border-white/10 px-1 md:hidden">
          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} placement="sidebar" compact={!isOpen} />
        </div>

        <div className={`flex h-14 shrink-0 items-center border-t border-white/10 bg-[#121a35] text-xs text-slate-400 ${isOpen ? 'justify-center px-4' : 'justify-center px-2'}`}>
          {isOpen ? (
            <span className="whitespace-nowrap">© {new Date().getFullYear()} {translate('Samarqand davlat universiteti', language)}</span>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-label={translate('Samarqand davlat universiteti', language)}>
              {sidebarIcons.building}
            </svg>
          )}
        </div>
      </aside>
    </>
  );
}
