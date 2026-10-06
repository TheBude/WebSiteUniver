import React from 'react';
import { translate } from '../i18n';
import { getSamduPageContent } from '../data/samduPagesData';
import './InnerPage.css';

export default function InnerPage({ pageIdentifier, language = 'uz', onBack, onNavigate }) {
  const t = (key) => translate(key, language);
  const page = getSamduPageContent(pageIdentifier, language);

  if (!page) {
    return (
      <div className="samdu-inner-page-container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('Natija topilmadi')}</h2>
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {t('Bosh sahifaga qaytish')}
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="samdu-inner-page" aria-label={page.title}>
      <nav className="samdu-breadcrumb-bar" aria-label="Breadcrumb">
        <ol className="samdu-breadcrumbs">
          <li className="samdu-breadcrumb-item">
            <button
              type="button"
              onClick={onBack}
              className="samdu-breadcrumb-home"
              title={t('Bosh sahifa')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{t('Bosh sahifa')}</span>
            </button>
          </li>
          <li className="samdu-breadcrumb-sep">/</li>
          <li className="samdu-breadcrumb-item">
            <span className="samdu-breadcrumb-cat">{page.category}</span>
          </li>
          <li className="samdu-breadcrumb-sep">/</li>
          <li className="samdu-breadcrumb-item is-active" aria-current="page">
            <span>{page.title}</span>
          </li>
        </ol>

        <div className="samdu-inner-top-actions">
          <button
            type="button"
            onClick={onBack}
            className="samdu-btn-back"
            aria-label={t('Orqaga')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{t('Orqaga')}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="samdu-btn-print"
            title={t('Chop etish')}
            aria-label={t('Chop etish')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
          </button>
        </div>
      </nav>

      <header className="samdu-page-header">
        <div className="samdu-page-badge-wrap">
          <span className="samdu-page-badge">{page.category}</span>
          <span className="samdu-page-portal-tag">{t('Samarqand davlat universiteti rasmiy axborot portali')}</span>
        </div>
        <h1 className="samdu-page-title">{page.title}</h1>
        {page.lead && <p className="samdu-page-lead">{page.lead}</p>}
      </header>

      {page.image && (
        <div className="samdu-page-banner">
          <img
            src={page.image}
            alt={page.title}
            className="samdu-page-banner-img"
          />
          <div className="samdu-page-banner-shade" />
          <div className="samdu-page-banner-tag">
            <span>{page.category}</span>
          </div>
        </div>
      )}

      <div className="samdu-page-content-grid">
        <div className="samdu-page-main-text">
          {page.paragraphs && page.paragraphs.map((p, idx) => (
            <p key={idx} className="samdu-page-paragraph">{p}</p>
          ))}

          <div className="samdu-page-footer-actions">
            <button
              type="button"
              onClick={onBack}
              className="samdu-btn-back-large"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>{t('Bosh sahifaga qaytish')}</span>
            </button>
          </div>
        </div>

        <aside className="samdu-page-sidebar">
          {page.facts && page.facts.length > 0 && (
            <div className="samdu-sidebar-card">
              <h3 className="samdu-sidebar-card-title">{t('Muhim faktlar')}</h3>
              <ul className="samdu-facts-list">
                {page.facts.map((fact, idx) => (
                  <li key={idx} className="samdu-fact-item">
                    <span className="samdu-fact-label">{fact.label}</span>
                    <strong className="samdu-fact-value">{fact.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page.contact && (
            <div className="samdu-sidebar-card samdu-contact-card">
              <h3 className="samdu-sidebar-card-title">{t('Bog‘lanish')}</h3>
              <div className="samdu-sidebar-contact">
                {page.contact.address && (
                  <div className="samdu-side-contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{page.contact.address}</span>
                  </div>
                )}
                {page.contact.phone && (
                  <div className="samdu-side-contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{page.contact.phone}</span>
                  </div>
                )}
                {page.contact.email && (
                  <div className="samdu-side-contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{page.contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
