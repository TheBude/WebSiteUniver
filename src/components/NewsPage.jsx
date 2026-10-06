import React, { useState, useMemo } from 'react';
import { translate } from '../i18n';
import { samduNewsList } from '../data/samduNewsData';
import './NewsPage.css';

export default function NewsPage({ language = 'uz', onBack }) {
  const t = (key) => translate(key, language);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState(null);

  // Unikal kategoriyalarni yig'ib olish
  const categories = useMemo(() => {
    const list = [{ id: 'all', labelKey: 'Barchasi' }];
    const seen = new Set();
    for (const item of samduNewsList) {
      const cat = item.category[language] || item.category.uz;
      if (!seen.has(cat)) {
        seen.add(cat);
        list.push({ id: cat, label: cat });
      }
    }
    return list;
  }, [language]);

  // Qidiruv va toifa bo'yicha saralash
  const filteredNews = useMemo(() => {
    return samduNewsList.filter((item) => {
      const title = (item.title[language] || item.title.uz).toLowerCase();
      const excerpt = (item.excerpt[language] || item.excerpt.uz).toLowerCase();
      const category = (item.category[language] || item.category.uz);

      const matchesSearch = !searchQuery.trim() ||
        title.includes(searchQuery.toLowerCase().trim()) ||
        excerpt.includes(searchQuery.toLowerCase().trim());

      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  const featuredArticle = filteredNews.length > 0 ? filteredNews[0] : null;
  const gridArticles = filteredNews.length > 1 ? filteredNews.slice(1) : (filteredNews.length === 1 && searchQuery ? filteredNews : []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="samdu-news-page" aria-label={t('Yangiliklar')}>
      {/* 1. Breadcrumbs va Yuqori Navigatsiya */}
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
            <span className="samdu-breadcrumb-cat">{t('Unversitet yangiliklari')}</span>
          </li>
          <li className="samdu-breadcrumb-sep">/</li>
          <li className="samdu-breadcrumb-item is-active" aria-current="page">
            <span>{t('Yangiliklar')}</span>
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

      {/* 2. Sarlavha qismi */}
      <header className="samdu-news-header-box">
        <div className="samdu-page-badge-wrap">
          <span className="samdu-page-badge">{t('Axborot xizmati')}</span>
          <span className="samdu-page-portal-tag">{t('Samarqand davlat universiteti rasmiy axborot portali')}</span>
        </div>
        <h1 className="samdu-news-page-title">
          {language === 'ru'
            ? 'Новости Самаркандского государственного университета'
            : language === 'en'
            ? 'Samarkand State University News'
            : language === 'qr'
            ? 'Samarqand mámleketlik universiteti jańalıqları'
            : 'Samarqand davlat universiteti yangiliklari'}
        </h1>
        <p className="samdu-news-page-subtitle">
          {language === 'ru'
            ? 'Официальные события, научные достижения, международные связи и студенческая жизнь университета (samdu.uz).'
            : language === 'en'
            ? 'Official announcements, academic milestones, international partnerships, and student life updates (samdu.uz).'
            : language === 'qr'
            ? 'Universitet ilimiy-akademiyalıq jetiskenlikleri, xalıqaralıq sheriklik hám studentler turmısı boyınsha sońǵı xabarlar (samdu.uz).'
            : 'Universitetning eng so‘nggi ilmiy-akademik yutuqlari, xalqaro anjumanlari va rasmiy xabarlari (samdu.uz).'}
        </p>
      </header>

      {/* 3. Filtrlash va Qidiruv Paneli */}
      <div className="samdu-news-filter-panel">
        <div className="samdu-news-search-wrap">
          <svg className="samdu-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="samdu-news-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ru'
                ? 'Поиск по новостям...'
                : language === 'en'
                ? 'Search news...'
                : language === 'qr'
                ? 'Jańalıqlar boyınsha izlew...'
                : 'Yangiliklar bo‘yicha qidirish...'
            }
          />
          {searchQuery && (
            <button
              type="button"
              className="samdu-clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Tozalash"
            >
              ×
            </button>
          )}
        </div>

        <div className="samdu-news-categories-bar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = cat.labelKey ? t(cat.labelKey) : cat.label;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`samdu-news-cat-btn ${isSelected ? 'is-active' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="samdu-news-count-badge">
          <span>{filteredNews.length}</span>
          <small>
            {language === 'ru'
              ? 'новостей'
              : language === 'en'
              ? 'articles'
              : language === 'qr'
              ? 'jańalıq'
              : 'ta yangilik'}
          </small>
        </div>
      </div>

      {/* 4. Asosiy Yangilik (Featured Card) */}
      {featuredArticle && !searchQuery && selectedCategory === 'all' && (
        <section className="samdu-news-featured-hero">
          <div
            className="samdu-hero-card"
            onClick={() => setActiveArticle(featuredArticle)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveArticle(featuredArticle)}
          >
            <div className="samdu-hero-media">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title[language] || featuredArticle.title.uz}
                className="samdu-hero-img"
              />
              <span className="samdu-hero-badge">
                {featuredArticle.category[language] || featuredArticle.category.uz}
              </span>
            </div>

            <div className="samdu-hero-info">
              <div className="samdu-card-meta">
                <span className="samdu-meta-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {featuredArticle.date}
                </span>
                <span className="samdu-meta-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {featuredArticle.views} {t('marta ko‘rildi')}
                </span>
              </div>

              <h2 className="samdu-hero-title">
                {featuredArticle.title[language] || featuredArticle.title.uz}
              </h2>

              <p className="samdu-hero-desc">
                {featuredArticle.excerpt[language] || featuredArticle.excerpt.uz}
              </p>

              <div className="samdu-hero-cta">
                <span className="samdu-cta-text">{t('Batafsil o‘qish')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Yangiliklar To'plami (Grid) */}
      <section className="samdu-news-grid-section">
        <div className="samdu-news-cards-grid">
          {gridArticles.map((article) => {
            const title = article.title[language] || article.title.uz;
            const excerpt = article.excerpt[language] || article.excerpt.uz;
            const category = article.category[language] || article.category.uz;

            return (
              <article
                key={article.id}
                className="samdu-news-modern-card"
                onClick={() => setActiveArticle(article)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveArticle(article)}
              >
                <div className="samdu-card-img-box">
                  <img src={article.image} alt={title} className="samdu-card-thumb" />
                  <span className="samdu-card-category-badge">{category}</span>
                </div>

                <div className="samdu-card-content">
                  <div className="samdu-card-meta">
                    <span className="samdu-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {article.date}
                    </span>
                    <span className="samdu-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {article.views}
                    </span>
                  </div>

                  <h3 className="samdu-card-title">{title}</h3>
                  <p className="samdu-card-excerpt">{excerpt}</p>

                  <div className="samdu-card-footer">
                    <span className="samdu-read-more">{t('Batafsil')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredNews.length === 0 && (
          <div className="samdu-news-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <h3>
              {language === 'ru'
                ? 'Новости не найдены'
                : language === 'en'
                ? 'No news found'
                : language === 'qr'
                ? 'Jańalıqlar tabılmadı'
                : 'Hech qanday yangilik topilmadi'}
            </h3>
            <p>
              {language === 'ru'
                ? 'Попробуйте изменить поисковый запрос или выбрать другую категорию.'
                : language === 'en'
                ? 'Try adjusting your search query or choosing another category.'
                : language === 'qr'
                ? 'Qidiruv so‘zini o‘zgartirib ko‘ring yoki boshqa toifani tanlang.'
                : 'Qidiruv so‘zini o‘zgartirib ko‘ring yoki boshqa toifani tanlang.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="samdu-btn-reset-filter"
            >
              {language === 'ru' ? 'Сбросить фильтры' : language === 'en' ? 'Reset filters' : 'Filtrlarni tozalash'}
            </button>
          </div>
        )}
      </section>

      {/* 6. Rasmiy Manba Izohi */}
      <div className="samdu-news-source-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p>
          {language === 'ru'
            ? 'Все материалы предоставлены информационной службой Самаркандского государственного университета. Первоисточник:'
            : language === 'en'
            ? 'All news materials provided by Samarkand State University Media Office. Official source:'
            : language === 'qr'
            ? 'Barlıq maǵlıwmatlar Samarqand mámleketlik universiteti málimleme xızmeti tárepinen usınılǵan. Tiykarǵı derek:'
            : 'Barcha ma’lumotlar Samarqand davlat universiteti axborot xizmati tomonidan taqdim etilgan. Rasmiy manba:'}{' '}
          <a href="https://www.samdu.uz/uz/news" target="_blank" rel="noopener noreferrer">
            samdu.uz/uz/news
          </a>
        </p>
      </div>

      {/* 7. Batafsil O'qish Modali (News Article Modal) */}
      {activeArticle && (
        <div
          className="samdu-news-modal-overlay"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="samdu-news-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="samdu-news-modal-close"
              onClick={() => setActiveArticle(null)}
              aria-label="Yopish"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="samdu-modal-media">
              <img
                src={activeArticle.image}
                alt={activeArticle.title[language] || activeArticle.title.uz}
              />
              <span className="samdu-modal-category">
                {activeArticle.category[language] || activeArticle.category.uz}
              </span>
            </div>

            <div className="samdu-modal-body">
              <div className="samdu-card-meta">
                <span className="samdu-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {activeArticle.date}
                </span>
                <span className="samdu-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {activeArticle.views} {t('marta ko‘rildi')}
                </span>
              </div>

              <h2 className="samdu-modal-title">
                {activeArticle.title[language] || activeArticle.title.uz}
              </h2>

              <div className="samdu-modal-text">
                {activeArticle.content && (activeArticle.content[language] || activeArticle.content.uz) ? (
                  (activeArticle.content[language] || activeArticle.content.uz).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))
                ) : (
                  <p>{activeArticle.excerpt[language] || activeArticle.excerpt.uz}</p>
                )}
              </div>

              <div className="samdu-modal-actions">
                <a
                  href={activeArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="samdu-modal-source-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>
                    {language === 'ru'
                      ? 'Открыть на официальном сайте (samdu.uz)'
                      : language === 'en'
                      ? 'Open on official portal (samdu.uz)'
                      : language === 'qr'
                      ? 'Rasmiy saytta ashıw (samdu.uz)'
                      : 'Rasmiy saytda ochish (samdu.uz)'}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="samdu-modal-close-btn"
                >
                  {language === 'ru' ? 'Закрыть' : language === 'en' ? 'Close' : 'Yopish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
