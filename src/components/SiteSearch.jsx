import { useEffect, useId, useRef, useState } from 'react';
import { translate } from '../i18n';
import { getSearchCharacterCount, getSiteSearchResults } from '../siteSearchIndex';
import './SiteSearch.css';

export default function SiteSearch({ language, placement = 'navbar', expanded = false, onOpenSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputId = useId();
  const resultsId = useId();
  const isSidebar = placement === 'sidebar';
  const characterCount = getSearchCharacterCount(query);
  const results = characterCount >= 2 ? getSiteSearchResults(query, language) : [];

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (isSidebar && !expanded) setIsOpen(false);
  }, [expanded, isSidebar]);

  const toggleSearch = () => {
    setIsOpen((open) => !open);
    setActiveIndex(-1);
    if (isSidebar && !expanded) onOpenSidebar?.();
  };

  const selectResult = (result) => {
    setQuery(result.label);
    setActiveIndex(-1);
    setIsOpen(false);
    if (result.targetHash) {
      window.location.hash = result.targetHash;
    } else {
      window.location.hash = result.label;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!results.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectResult(results[activeIndex]);
    }
  };

  const buttonLayout = isSidebar
    ? expanded
      ? 'w-full justify-start gap-3 px-3'
      : 'mx-auto h-10 w-10 justify-center'
    : 'h-10 w-10 justify-center';

  return (
    <div className={`site-search relative ${isSidebar ? 'site-search--sidebar w-full' : 'site-search--navbar shrink-0'}`} ref={containerRef}>
      <button
        className={`flex items-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 ${buttonLayout} ${expanded ? 'min-h-10' : ''}`}
        type="button"
        aria-label={translate('Qidiruv', language)}
        aria-expanded={isOpen}
        aria-controls={resultsId}
        title={translate('Qidiruv', language)}
        onClick={toggleSearch}
      >
        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        {isSidebar && expanded && <span className="text-left text-xs">{translate('Qidiruv', language)}</span>}
      </button>

      {isOpen && (
        <div className="site-search__panel" id={resultsId}>
          <label className="sr-only" htmlFor={inputId}>{translate('Qidiruv', language)}</label>
          <input
            autoFocus
            className="site-search__input"
            id={inputId}
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={`${resultsId}-options`}
            aria-expanded={characterCount >= 2 && results.length > 0}
            autoComplete="off"
            placeholder={translate('Qidirish...', language)}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
          />

          {characterCount < 2 ? (
            <p className="site-search__message">{translate('Kamida 2 ta belgi kiriting', language)}</p>
          ) : results.length ? (
            <ul className="site-search__results" id={`${resultsId}-options`} role="listbox">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.label}-${result.breadcrumb}`}>
                  <button
                    className={`site-search__result${index === activeIndex ? ' is-active' : ''}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    onClick={() => selectResult(result)}
                  >
                    <span className="site-search__result-label">{result.label}</span>
                    <span className="site-search__result-meta">{result.type} · {result.breadcrumb}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="site-search__message">{translate('Natija topilmadi', language)}</p>
          )}
        </div>
      )}
    </div>
  );
}