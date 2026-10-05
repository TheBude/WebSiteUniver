import React, { useState, useEffect, useRef } from 'react';
import './QuickServices.css';

const servicesData = [
  {
    id: 'foreign-admission',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    title: {
      uz: 'Hujjat topshirish (xorijiy talabalar uchun)',
      qr: 'Hújjet tapsırıw (sırt elli studentler ushın)',
      ru: 'Подача документов (для иностранных студентов)',
      en: 'Admission (for international students)',
    },
  },
  {
    id: 'tutors',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <rect x="13" y="2" width="9" height="7" rx="1" />
        <path d="M13 3l4.5 3.5L22 3" />
      </svg>
    ),
    title: {
      uz: 'SamDU tyutorlariga murojaat',
      qr: 'SamDU tyutorlarına múrájat',
      ru: 'Обращение к тьюторам СамГУ',
      en: 'Contact SamSU tutors',
    },
  },
  {
    id: 'e-library',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
        <path d="M9 7h2v6H9z" />
        <path d="M13 7h2v6h-2z" />
      </svg>
    ),
    title: {
      uz: 'Elektron kutubxona',
      qr: 'Elektron kitapxana',
      ru: 'Электронная библиотека',
      en: 'Electronic library',
    },
  },
  {
    id: 'erasmus',
    isCustomBadge: true,
    title: {
      uz: 'Erasmus+',
      qr: 'Erasmus+',
      ru: 'Erasmus+',
      en: 'Erasmus+',
    },
  },
  {
    id: 'hemis-univer',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z" />
      </svg>
    ),
    title: {
      uz: 'Hemis universitet',
      qr: 'Hemis universitet',
      ru: 'Hemis университет',
      en: 'Hemis University',
    },
  },
  {
    id: 'hemis-talaba',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 9l4-2 4 2-4 2-4-2z" />
        <path d="M12 11v3" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    title: {
      uz: 'Hemis talaba',
      qr: 'Hemis student',
      ru: 'Hemis студент',
      en: 'Hemis student',
    },
  },
  {
    id: 'hemis-uz',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="11" height="15" rx="1.5" />
        <path d="M13 10l9-4v14l-9-3" />
        <path d="M5.5 10.5l2-1 2 1-2 1-2-1z" />
      </svg>
    ),
    title: {
      uz: 'Hemis uz',
      qr: 'Hemis uz',
      ru: 'Hemis uz',
      en: 'Hemis uz',
    },
  },
  {
    id: 'unilibrary',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <path d="M7 16h6" />
        <path d="M7 19h4" />
      </svg>
    ),
    title: {
      uz: 'Unilibrary',
      qr: 'Unilibrary',
      ru: 'Unilibrary',
      en: 'Unilibrary',
    },
  },
  {
    id: 'interactive-services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: {
      uz: 'Interaktiv xizmatlar',
      qr: 'Interaktiv xızmetler',
      ru: 'Интерактивные услуги',
      en: 'Interactive services',
    },
  },
];

export default function QuickServices({ language = 'uz', onServiceClick }) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const touchStartX = useRef(null);
  const total = servicesData.length;

  // Ekran hajmiga qarab ko'rinadigan kartalar sonini aniqlash
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsToShow(1); // Telefon uchun 1 ta karta
      } else if (width < 1024) {
        setItemsToShow(2); // Planshet uchun 2 ta karta
      } else {
        setItemsToShow(4); // Desktop kompyuter uchun 4 ta karta
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Avtomatik aylanish (har 2.8 soniyada)
  useEffect(() => {
    if (isPaused) return undefined;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Mobil qurilmalarda barmoq bilan surish (Swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      // Chapga surish (keyingisiga o'tish)
      setStartIndex((prev) => (prev + 1) % total);
    } else if (diff < -40) {
      // O'ngga surish (oldingisiga qaytish)
      setStartIndex((prev) => (prev - 1 + total) % total);
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Joriy ekranda ko'rsatiladigan kartalar
  const visibleItems = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleItems.push(servicesData[(startIndex + i) % total]);
  }

  const handleCardClick = (service) => {
    if (onServiceClick) {
      onServiceClick(service);
    } else {
      console.log('Tanlangan xizmat:', service.id);
    }
  };

  return (
    <div
      className="samdu-services-panel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Tezkor xizmatlar oynasi"
    >
      <div className="samdu-services-viewport">
        <div
          className={`samdu-services-slider cols-${itemsToShow}`}
          key={`${startIndex}-${itemsToShow}`}
        >
          {visibleItems.map((item, idx) => {
            const title = item.title[language] || item.title.uz;
            return (
              <div
                key={`${item.id}-${startIndex}-${idx}`}
                className="samdu-service-card"
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(item)}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item)}
              >
                <div className="samdu-service-icon-box">
                  {item.isCustomBadge ? (
                    <div className="samdu-erasmus-logo">
                      <span className="samdu-stars">★★★★★</span>
                      <span className="samdu-erasmus-text">Erasmus+</span>
                      <span className="samdu-stars">★★★★★</span>
                    </div>
                  ) : (
                    item.icon
                  )}
                </div>
                <div className="samdu-service-text-box">
                  <h4 className="samdu-service-title">{title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigatsiya nuqtalari */}
      <div className="samdu-services-pagination">
        {servicesData.map((_, index) => (
          <span
            key={index}
            className={`samdu-dot ${index === startIndex ? 'active' : ''}`}
            onClick={() => setStartIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}