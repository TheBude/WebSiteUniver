import React, { useState, useEffect } from 'react';
import { translate } from '../i18n';
import './SamduLocationMap.css';

const SAMDU_COORDS = {
  lat: 39.64817,
  lng: 66.95837,
};

export default function SamduLocationMap({ language = 'uz', className = '' }) {
  const t = (key) => translate(key, language);

  const [activeProvider, setActiveProvider] = useState('google'); // 'google' | 'osm'
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Til kodi
  const langCode = language === 'qr' ? 'uz' : language;

  const googleEmbedUrl = `https://maps.google.com/maps?q=${SAMDU_COORDS.lat},${SAMDU_COORDS.lng}&hl=${langCode}&z=16&output=embed`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=66.9515%2C39.6435%2C66.9655%2C39.6530&layer=mapnik&marker=${SAMDU_COORDS.lat}%2C${SAMDU_COORDS.lng}`;

  const currentEmbedUrl = activeProvider === 'osm' ? osmEmbedUrl : googleEmbedUrl;

  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SAMDU_COORDS.lat},${SAMDU_COORDS.lng}`;
  const yandexMapsUrl = `https://yandex.uz/maps/?text=${SAMDU_COORDS.lat},${SAMDU_COORDS.lng}`;

  // Modal ochiq paytida Escape tugmasi bilan yopish
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div
      id="samdu-location-map-widget"
      className={`samdu-map-widget ${className}`}
      aria-label={t('SamDU interaktiv xaritasi')}
    >
      {/* 1. Header qismi: Status indikatori va asboblar */}
      <div className="samdu-map-header">
        <div className="samdu-map-status-pill">
          <span className="samdu-map-pulse-dot" aria-hidden="true" />
          <span>{t('Bosh bino lokatsiyasi')}</span>
        </div>

        <div className="samdu-map-header-tools">
          <button
            type="button"
            className={`samdu-map-provider-btn ${activeProvider === 'google' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveProvider('google');
              setIsLoading(true);
            }}
            title="Google Maps"
            aria-label="Google Maps"
          >
            Google
          </button>
          <button
            type="button"
            className={`samdu-map-provider-btn ${activeProvider === 'osm' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveProvider('osm');
              setIsLoading(true);
            }}
            title="OpenStreetMap"
            aria-label="OpenStreetMap"
          >
            OSM
          </button>
          <button
            type="button"
            className="samdu-map-expand-btn"
            onClick={() => setIsModalOpen(true)}
            title={t('Xaritani kattalashtirish')}
            aria-label={t('Xaritani kattalashtirish')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Xarita iframesi va vizual qoplama */}
      <div className="samdu-map-frame-box">
        {isLoading && (
          <div className="samdu-map-loading-shade" aria-hidden="true">
            <div className="samdu-map-spinner" />
            <span>{t('Onlayn xarita')}...</span>
          </div>
        )}

        <iframe
          key={`${activeProvider}-${language}`}
          title={t('SamDU interaktiv xaritasi')}
          src={currentEmbedUrl}
          className="samdu-map-iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
        />

        <div className="samdu-map-overlay-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span>{t('Universitet xiyoboni, 15')}</span>
        </div>
      </div>

      {/* 3. Tezkor harakat tugmalari paneli */}
      <div className="samdu-map-actions">
        <a
          href={googleDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="samdu-map-action-link samdu-map-action-primary"
          title={t('Marshrut olish')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>{t('Marshrut')}</span>
        </a>

        <a
          href={yandexMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="samdu-map-action-link"
          title={t('Yandex Xarita')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 8 8 12 12 16 16 12 12 8" />
          </svg>
          <span>Yandex</span>
        </a>

        <button
          type="button"
          className="samdu-map-action-btn"
          onClick={() => setIsModalOpen(true)}
          title={t('To‘liq ko‘rish')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span>{t('To‘liq ko‘rish')}</span>
        </button>
      </div>

      {/* 4. To‘liq interaktiv Modal dialog */}
      {isModalOpen && (
        <div
          className="samdu-map-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="samdu-map-modal-title"
        >
          <div
            className="samdu-map-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="samdu-map-modal-header">
              <div>
                <h3 id="samdu-map-modal-title" className="samdu-map-modal-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{t('Samarqand davlat universiteti (Bosh bino)')}</span>
                </h3>
                <p className="samdu-map-modal-subtitle">
                  {t('140104, Samarqand shahri, Universitet xiyoboni, 15-uy')}
                </p>
              </div>

              <button
                type="button"
                className="samdu-map-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                title={t('Xaritani yopish')}
                aria-label={t('Xaritani yopish')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="samdu-map-modal-body">
              <div className="samdu-map-modal-frame-box">
                <iframe
                  title={t('SamDU interaktiv xaritasi')}
                  src={currentEmbedUrl}
                  className="samdu-map-modal-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="samdu-map-modal-info-panel">
                <div className="samdu-map-info-item">
                  <div className="samdu-map-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="samdu-map-info-text">
                    <strong>{t('Mo‘ljal:')}</strong>
                    <p>{t('Mo‘ljal: Universitet xiyoboni, Registrator ofisi yonida')}</p>
                  </div>
                </div>

                <div className="samdu-map-info-item">
                  <div className="samdu-map-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="14" rx="2" />
                      <path d="M7 21h10M12 17v4" />
                    </svg>
                  </div>
                  <div className="samdu-map-info-text">
                    <strong>{t('Jamoat transporti:')}</strong>
                    <p>{t('Avtobuslar: 12, 19, 22, 52, 92')}</p>
                  </div>
                </div>

                <div className="samdu-map-info-item">
                  <div className="samdu-map-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="samdu-map-info-text">
                    <strong>GPS Koordinatalari:</strong>
                    <p>39.64817° N, 66.95837° E</p>
                  </div>
                </div>

                <div className="samdu-map-info-item">
                  <div className="samdu-map-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="samdu-map-info-text">
                    <strong>{t('Bog‘lanish')}</strong>
                    <p>+998 (66) 240-38-40 / devonxona@samdu.uz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="samdu-map-modal-footer">
              <a
                href={googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="samdu-map-modal-btn samdu-map-modal-btn-primary"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>{t('Navigatsiyani boshlash')}</span>
              </a>

              <a
                href={yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="samdu-map-modal-btn samdu-map-modal-btn-secondary"
              >
                <span>{t('Yandex Xarita')}</span>
              </a>

              <button
                type="button"
                className="samdu-map-modal-btn samdu-map-modal-btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                {t('Xaritani yopish')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
