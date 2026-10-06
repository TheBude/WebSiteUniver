import React, { useEffect, useRef, useState } from 'react';
import { translate } from '../i18n';
import './UniversityStats.css';

const statsData = [
  {
    id: 'students',
    targetValue: 35000,
    fallbackText: '35 000+',
    format: (v) => `${Math.round(v).toLocaleString('ru-RU').replace(/,/g, ' ')}+`,
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
    targetValue: 1200,
    fallbackText: '1 200+',
    format: (v) => `${Math.round(v).toLocaleString('ru-RU').replace(/,/g, ' ')}+`,
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
    targetValue: 500,
    fallbackText: 'TOP-500',
    format: (v) => `TOP-${Math.round(v)}`,
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
    isDual: true,
    targetValue1: 14,
    targetValue2: 8,
    fallbackText: '14 / 8',
    format: (v1, v2) => `${Math.round(v1)} / ${Math.round(v2)}`,
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
    id: 'programs',
    targetValue: 76,
    fallbackText: '76+',
    format: (v) => `${Math.round(v)}+`,
    labelKey: 'Bakalavr yo‘nalishlari',
    subKey: '76 ta kunduzgi, kechki va masofaviy ta’lim yo‘nalishlari',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    badge: 'Bakalavriat',
  },
  {
    id: 'partners',
    targetValue: 60,
    fallbackText: '60+',
    format: (v) => `${Math.round(v)}+`,
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
    isDecimal: true,
    targetValue: 3.8,
    fallbackText: '3.8M+',
    format: (v) => `${v.toFixed(1)}M+`,
    labelKey: 'Kitob fondi',
    subKey: '3.8M+ kitob va noyob qo‘lyozmalar fondi',
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
  {
    id: 'scholarships',
    targetValue: 100,
    fallbackText: '100+',
    format: (v) => `${Math.round(v)}+`,
    labelKey: 'Grant va stipendiyalar',
    subKey: 'Prezident, nomli va xalqaro Erasmus+ stipendiyalari',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    badge: 'Stipendiyalar',
  },
];

function AnimatedStatNumber({ item, isTriggered }) {
  const [displayValue, setDisplayValue] = useState(() => item.fallbackText);
  const [isCounting, setIsCounting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isTriggered) return;
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Tekshirish: foydalanuvchi animatsiyasiz rejimni yoqqanmi
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(item.fallbackText);
      setIsComplete(true);
      return;
    }

    setIsCounting(true);
    const duration = 2000; // 2 soniya davomida mayin sanash
    const startTime = performance.now();
    let animationFrameId;

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // easeOutExpo egri chizig'i - boshida tez, oxirida sekinlashib to'xtaydi
      const progress = rawProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawProgress);

      if (item.isDual) {
        const val1 = Math.round(progress * item.targetValue1);
        const val2 = Math.round(progress * item.targetValue2);
        setDisplayValue(item.format(val1, val2));
      } else if (item.isDecimal) {
        const val = progress * item.targetValue;
        setDisplayValue(item.format(val));
      } else {
        const val = Math.round(progress * item.targetValue);
        setDisplayValue(item.format(val));
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setIsCounting(false);
        setIsComplete(true);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isTriggered, item]);

  return (
    <div
      className={`samdu-stat-number ${isCounting ? 'is-counting' : ''} ${isComplete ? 'is-complete' : ''}`}
      aria-label={item.fallbackText}
    >
      {displayValue}
    </div>
  );
}

export default function UniversityStats({ language = 'uz' }) {
  const t = (key) => translate(key, language);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section ref={sectionRef} className="samdu-stats-section" aria-label={t('Raqamlarda SamDU')}>
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
        {statsData.map((item, idx) => (
          <div
            key={item.id}
            className={`samdu-stat-card ${isVisible ? 'is-animated' : ''}`}
            style={{
              transitionDelay: `${idx * 80}ms`,
            }}
          >
            <div className="samdu-stat-top">
              <div className="samdu-stat-icon-wrap">{item.icon}</div>
              <span className="samdu-stat-pill">{item.badge}</span>
            </div>
            <div className="samdu-stat-body">
              <AnimatedStatNumber item={item} isTriggered={isVisible} />
              <h3 className="samdu-stat-label">{t(item.labelKey)}</h3>
              <p className="samdu-stat-sub">{t(item.subKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
