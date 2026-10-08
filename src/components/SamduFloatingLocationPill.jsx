import React, { useState, useEffect } from 'react';
import { translate } from '../i18n';
import './SamduLocationMap.css';

export default function SamduFloatingLocationPill({ language = 'uz' }) {
  const t = (key) => translate(key, language);
  const [isVisible, setIsVisible] = useState(true);
  const [isNearFooter, setIsNearFooter] = useState(false);

  // Footerga yetganda suzuvchi tugmani yashirish
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Agar foydalanuvchi sahifa pastiga yaqinlashsa (oxirgi 450px)
      if (documentHeight - (scrollY + windowHeight) < 450) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || isNearFooter) {
    return null;
  }

  const handleScrollToMap = () => {
    const mapElement = document.getElementById('samdu-location-map-widget');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      mapElement.classList.remove('samdu-map-highlight');
      // Trigger reflow
      void mapElement.offsetWidth;
      mapElement.classList.add('samdu-map-highlight');
      setTimeout(() => {
        mapElement.classList.remove('samdu-map-highlight');
      }, 2000);
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="samdu-floating-loc-pill"
      aria-label={t('SamDU Lokatsiyasi')}
    >
      <button
        type="button"
        className="samdu-floating-loc-btn"
        onClick={handleScrollToMap}
        title={t('SamDU interaktiv xaritasi')}
      >
        <span className="samdu-map-pulse-dot" aria-hidden="true" />
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
        <span>{t('SamDU Lokatsiyasi')}</span>
      </button>

      <button
        type="button"
        className="samdu-floating-loc-dismiss"
        onClick={() => setIsVisible(false)}
        title={t('Menyuni yopish')}
        aria-label={t('Menyuni yopish')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </aside>
  );
}
