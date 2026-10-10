import React from 'react';
import { translate } from '../i18n';
import './UsefulLinks.css';

/**
 * SamDU Foydali Manbalar (Useful Websites & Portals) komponenti.
 * Davlat tashkilotlari, vazirlik va rasmiy portallar havolalari ro'yxati.
 * Responsive: mobilda 1 ustun, planshetda 2 ustun, kompyuterda 3 ustun (grid).
 */
export default function UsefulLinks({ language = 'uz' }) {
  const t = (key) => translate(key, language);

  const linksData = [
    {
      id: 'gov-uz',
      name: "O'zbekiston respublikasi hukumat portali",
      url: 'https://gov.uz/oz',
      domain: 'gov.uz',
      iconBg: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/20',
      hoverGlow: 'group-hover:border-blue-400/60 dark:group-hover:border-blue-400/60',
      icon: (
        // Davlat / Hukumat binosi (Ustunli klassik bino)
        <svg className="h-6 w-6 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2L2 7v2h20V7L12 2zm-8 7h2v9H4V9zm5 0h2v9H9V9zm5 0h2v9h-2V9zm5 0h2v9h-2V9zM2 20h20v2H2v-2z" />
        </svg>
      ),
    },
    {
      id: 'edu-uz',
      name: "Oliy ta'lim vazirligi",
      url: 'https://edu.uz/oz',
      domain: 'edu.uz',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-500/20',
      hoverGlow: 'group-hover:border-indigo-400/60 dark:group-hover:border-indigo-400/60',
      icon: (
        // Talaba qalpoqchasi (Graduation Cap / Ta'lim)
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      ),
    },
    {
      id: 'ziyonet-uz',
      name: "ZiyoNet ta'lim portali",
      url: 'https://ziyonet.uz/',
      domain: 'ziyonet.uz',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20',
      hoverGlow: 'group-hover:border-amber-400/60 dark:group-hover:border-amber-400/60',
      icon: (
        // Internet / Globus (Globe)
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
    },
    {
      id: 'lex-uz',
      name: "Qonun hujjatlari ma'lumotlar bazasi",
      url: 'https://lex.uz/',
      domain: 'lex.uz',
      iconBg: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-500/20',
      hoverGlow: 'group-hover:border-purple-400/60 dark:group-hover:border-purple-400/60',
      icon: (
        // Qonun / Bolg'a (Gavel / Adolat)
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 3.5l6 6-2 2-6-6 2-2zM3 21l8-8m0 0l-2-2 4-4 2 2-4 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 16l5 5M18 21l3-3" />
        </svg>
      ),
    },
    {
      id: 'uza-uz',
      name: "O'zbekiston Milliy axborot agentligi",
      url: 'https://uza.uz/oz',
      domain: 'uza.uz',
      iconBg: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-500/20',
      hoverGlow: 'group-hover:border-rose-400/60 dark:group-hover:border-rose-400/60',
      icon: (
        // Yangiliklar / Gazeta (Newspaper)
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m4 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6m-6 4h6" />
        </svg>
      ),
    },
    {
      id: 'my-gov-uz',
      name: 'Yagona interaktiv davlat xizmatlari',
      url: 'https://my.gov.uz/oz',
      domain: 'my.gov.uz',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20',
      hoverGlow: 'group-hover:border-emerald-400/60 dark:group-hover:border-emerald-400/60',
      icon: (
        // Xizmatlar binosi / Portal binosi
        <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="useful-links-section"
      aria-labelledby="useful-links-title"
      className="my-10 sm:my-14"
    >
      {/* Sarlavha va Badge bloki */}
      <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
        <div className="useful-link-badge mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>{t('FOYDALI MANBALAR')}</span>
        </div>

        <h2
          id="useful-links-title"
          className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl"
        >
          {t('Foydali Saytlar')}
        </h2>
        <div className="mt-2.5 h-1 w-14 rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />
      </div>

      {/* Responsive Grid: Mobilda 1 ta, Planshetda 2 ta, Kompyuterda 3 ta */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {linksData.map((item) => {
          const siteName = t(item.name);
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteName} (${item.domain})`}
              title={`${siteName} - ${item.domain}`}
              className={`useful-link-card group relative flex items-center justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-300 bg-white dark:bg-[#0f1d38] border-slate-200 dark:border-white/10 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-sky-500/10 focus:outline-none focus:ring-2 focus:ring-sky-400 ${item.hoverGlow}`}
            >
              {/* Chap tomon: Ikonka bloki */}
              <div
                className={`useful-link-icon-box flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 shadow-sm ${item.iconBg}`}
              >
                {item.icon}
              </div>

              {/* O'rta qism: Sayt nomi va havolasi (URL) */}
              <div className="mx-3.5 flex-1 min-w-0">
                <h3 className="useful-link-title line-clamp-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300 sm:text-base">
                  {siteName}
                </h3>
                <div className="useful-link-domain mt-1 flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                  <span>{item.domain}</span>
                </div>
              </div>

              {/* O'ng tomon: Tashqi havola belgisi (external link icon ↗) */}
              <div
                className="useful-link-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/70 bg-slate-50 text-slate-400 transition-all duration-300 group-hover:border-sky-400/40 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:group-hover:bg-sky-500/20 dark:group-hover:text-sky-300"
                aria-hidden="true"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
