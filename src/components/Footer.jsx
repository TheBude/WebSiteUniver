import React from 'react';
import { translate } from '../i18n';
import SamduLocationMap from './SamduLocationMap';
import './Footer.css';

const quickLinks = [
  { labelKey: 'Unversitet', hash: 'Unversitet' },
  { labelKey: 'Unversitet tarixi', hash: 'Unversitet tarixi' },
  { labelKey: 'Unversitet nizomi', hash: 'Unversitet nizomi' },
  { labelKey: 'Unversitet tuzilmasi', hash: 'Unversitet tuzilmasi' },
  { labelKey: 'Universitet rektori', hash: 'Universitet rektori' },
  { labelKey: 'Fakultetlar', hash: 'Fakultetlar' },
  { labelKey: 'Institutlar', hash: 'Institutlar' },
  { labelKey: 'Qabul 2026', hash: 'Qabul 2026' },
  { labelKey: 'Talabalar', hash: 'Talabalar' },
  { labelKey: 'Rekvizitlar', hash: 'Rekvizitlar' },
  { labelKey: 'Aloqa', hash: 'Aloqa' },
];

const interactiveServices = [
  { label: 'Hemis OTM axborot tizimi', url: 'https://hemis.samdu.uz' },
  { label: 'Hemis Talaba portali', url: 'https://student.samdu.uz' },
  { label: 'Elektron kutubxona (Unilibrary)', url: 'https://unilibrary.uz' },
  { label: 'Erasmus+ xalqaro dasturi', url: 'https://erasmusplus.uz' },
  { label: 'Xorijiy abituriyentlar qabuli', url: 'https://admission.samdu.uz' },
  { label: 'SamDU Registrator ofisi', hash: 'Samarqand davlat universiteti “Registrator ofisi”' },
];

export default function Footer({ language = 'uz', onNavigate }) {
  const t = (key) => translate(key, language);

  const handleLinkClick = (hash, e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoSrc = `${import.meta.env.BASE_URL}SamduLogo.png`;

  return (
    <footer className="samdu-footer" aria-label={t('Samarqand davlat universiteti')}>
      <div className="samdu-footer-container">
        <div className="samdu-footer-grid">
          <div className="samdu-footer-col samdu-footer-brand-col">
            <div className="samdu-footer-logo-row">
              <div className="samdu-footer-logo-circle">
                <img
                  src={logoSrc}
                  alt="SamDU Gerbi"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="samdu-footer-sub-title">{t('SHAROF RASHIDOV NOMIDAGI')}</span>
                <h3 className="samdu-footer-title">{t('SAMARQAND DAVLAT UNIVERSITETI')}</h3>
              </div>
            </div>
            <p className="samdu-footer-desc">
              {t('Samarqand davlat universiteti — 1420-yilda Mirzo Ulug‘bek asos solgan madrasa an’analarining munosib vorisi bo‘lib, zamonaviy ilm-fan, ta’lim va xalqaro innovatsiyalarning yetakchi markazidir.')}
            </p>
            <div className="samdu-footer-socials">
              <a href="https://t.me/samduuz" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/samdu.uz" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://instagram.com/samdu_uz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@samduuz" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="samdu-footer-col">
            <h4 className="samdu-footer-col-title">{t('Tezkor havolalar')}</h4>
            <ul className="samdu-footer-links">
              {quickLinks.slice(0, 6).map((item) => (
                <li key={item.hash}>
                  <a href={`#${item.hash}`} onClick={(e) => handleLinkClick(item.hash, e)}>
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="samdu-footer-col">
            <h4 className="samdu-footer-col-title">{t('Interaktiv xizmatlar')}</h4>
            <ul className="samdu-footer-links">
              {interactiveServices.map((service, idx) => (
                <li key={idx}>
                  {service.hash ? (
                    <a href={`#${service.hash}`} onClick={(e) => handleLinkClick(service.hash, e)}>
                      {service.label}
                    </a>
                  ) : (
                    <a href={service.url} target="_blank" rel="noopener noreferrer">
                      {service.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="samdu-footer-col">
            <h4 className="samdu-footer-col-title">{t('Bog‘lanish va rekvizitlar')}</h4>
            <div className="samdu-footer-contact-info">
              <div className="samdu-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t('140104, Samarqand shahri, Universitet xiyoboni, 15-uy')}</span>
              </div>
              <div className="samdu-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+998 (66) 240-38-40</span>
              </div>
              <div className="samdu-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>devonxona@samdu.uz</span>
              </div>
              <div className="samdu-footer-requisites">
                <span className="samdu-req-line">{t('STIR (INN):')} 200874221</span>
                <span className="samdu-req-line">{t('MFO:')} 00014</span>
                <span className="samdu-req-line">{t('G‘aznachilik hisob raqami:')} 23402000300100001010</span>
              </div>

              {/* SamDU Interaktiv Visual Xarita Vidjeti */}
              <SamduLocationMap language={language} />
            </div>
          </div>
        </div>

        <div className="samdu-footer-bottom">
          <p className="samdu-footer-copy">
            © {new Date().getFullYear()} {t('SAMARQAND DAVLAT UNIVERSITETI')}. {t('Barcha huquqlar himoyalangan')}.
          </p>
          <div className="samdu-footer-bottom-links">
            <a href="#Unversitet nizomi" onClick={(e) => handleLinkClick('Unversitet nizomi', e)}>{t('Unversitet nizomi')}</a>
            <span className="samdu-sep">·</span>
            <a href="#Rekvizitlar" onClick={(e) => handleLinkClick('Rekvizitlar', e)}>{t('Rekvizitlar')}</a>
            <span className="samdu-sep">·</span>
            <a href="#Aloqa" onClick={(e) => handleLinkClick('Aloqa', e)}>{t('Aloqa')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
