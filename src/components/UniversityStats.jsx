import React from 'react';
import { translate } from '../i18n';
import './UniversityStats.css';

const statsData = [
  {
    id: 'students',
    number: '35 000+',
    labelKey: 'Talabalar soni',
    subKey: 'Bakalavriat, magistratura va doktorantura',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    badge: '2026',
  },
  {
    id: 'professors',
    number: '1 200+',
    labelKey: 'Professor-o‘qituvchilar',
    subKey: 'Fan doktorlari, professorlar va PhD darajalilar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    badge: '150+ DSc',
  },
  {
    id: 'ranking',
    number: 'TOP-500',
    labelKey: 'Xalqaro reyting',
    subKey: 'QS World University Rankings TOP-500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    badge: 'QS Stars ★★★★★',
  },
  {
    id: 'faculties',
    number: '14 / 8',
    labelKey: 'Fakultet va institutlar',
    subKey: '14 ta fakultet va 8 ta ilmiy-tadqiqot instituti',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
      </svg>
    ),
    badge: '80+ Ta’lim',
  },
  {
    id: 'partners',
    number: '60+',
    labelKey: 'Hamkor davlatlar',
    subKey: '60+ davlat bilan 200 dan ortiq xalqaro shartnomalar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    badge: '200+ OTM',
  },
  {
    id: 'library',
    number: '1.5M+',
    labelKey: 'Kitob fondi',
    subKey: '1.5M+ kitob va noyob qo‘lyozmalar fondi',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="13" y2="11" />
      </svg>
    ),
    badge: 'ARM',
  },
];

export default function UniversityStats({ language = 'uz' }) {
  const t = (key) => translate(key, language);

  return (
    <section className="samdu-stats-section" aria-label={t('Raqamlarda SamDU')}>
      <div className="samdu-stats-header">
        <div className="samdu-stats-title-wrap">
          <span className="samdu-stats-badge-line" />
          <div>
            <span className="samdu-stats-subtitle">{t('Akademik ta’lim va ilmiy yutuqlar')}</span>
            <h2 className="samdu-stats-main-title">{t('Raqamlarda SamDU')}</h2>
          </div>
        </div>
      </div>

      <div className="samdu-stats-grid">
        {statsData.map((item) => (
          <div key={item.id} className="samdu-stat-card">
            <div className="samdu-stat-top">
              <div className="samdu-stat-icon-wrap">{item.icon}</div>
              <span className="samdu-stat-pill">{item.badge}</span>
            </div>
            <div className="samdu-stat-body">
              <div className="samdu-stat-number">{item.number}</div>
              <h3 className="samdu-stat-label">{t(item.labelKey)}</h3>
              <p className="samdu-stat-sub">{t(item.subKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
