import React, { useState } from 'react';
import { translate } from '../i18n';
import './NewsSection.css';

// SamDU rasmiy saytidan olingan haqiqiy yangiliklar va e'lonlar ma'lumotlari
const newsAndAnnouncements = [
  {
    id: 1,
    type: 'news',
    isFeatured: true,
    date: '05.03.2026',
    views: 1420,
    image: 'https://www.samdu.uz/upload/images/69abf7e93fa95-69abf7e93fa96-69abf7e93fa97-69abf7e93fa98.jpg',
    category: {
      uz: 'Tadbir',
      qr: 'Ilaj',
      ru: 'Событие',
      en: 'Event',
    },
    title: {
      uz: 'Shavkat Mirziyoyev SamDU o‘qituvchisi Mohigul Tohirovaga Zulfiya davlat mukofotini topshirdi',
      qr: 'Shavkat Mirziyoyev SamDU oqıtıwshısı Mohigul Toxirovaǵa Zulfiya mámleketlik sıylıǵın tapsırdı',
      ru: 'Шавкат Мирзиёев вручил преподавателю СамГУ Мохигул Тохировой Государственную премию имени Зульфии',
      en: 'Shavkat Mirziyoyev presented the Zulfiya State Award to SamSU lecturer Mohigul Tokhirova',
    },
    excerpt: {
      uz: 'Samarqand davlat universiteti biologiya fakulteti o‘qituvchisi, falsafa doktori (PhD) Mohigul Tohirova yuksak davlat mukofoti bilan taqdirlandi.',
      qr: 'Samarqand mámleketlik universiteti biologiya fakulteti oqıtıwshısı Mohigul Toxirova joqarı mámleketlik sıylıq penen sıylıqlandı.',
      ru: 'Преподаватель биологического факультета СамГУ, доктор философии (PhD) Мохигул Тохирова удостоена высокой государственной награды.',
      en: 'Mohigul Tokhirova, PhD, teacher at Samarkand State University Faculty of Biology, was awarded the prestigious state prize.',
    },
  },
  {
    id: 2,
    type: 'news',
    date: '04.03.2026',
    views: 980,
    image: 'https://www.samdu.uz/upload/images/69258ee414acf-69258ee414ad0-69258ee414ad1-69258ee414ad2.jpg',
    category: {
      uz: 'Xalqaro reyting',
      qr: 'Xalıqaralıq reyting',
      ru: 'Международный рейтинг',
      en: 'International ranking',
    },
    title: {
      uz: 'SamDU fanlararo tadqiqotlar bo‘yicha dunyoning TOP-500 universitetlari qatoridan joy oldi',
      qr: 'SamDU pánlerara izertlewler boyınsha TOP-500 universitetler qatarınan orın aldı',
      ru: 'СамГУ вошел в число ТОП-500 университетов по междисциплинарным исследованиям',
      en: 'SamSU ranked among TOP-500 universities worldwide in interdisciplinary research',
    },
  },
  {
    id: 3,
    type: 'news',
    date: '02.03.2026',
    views: 740,
    image: 'https://www.samdu.uz/upload/images/690989c4ce9be-690989c4ce9bf-690989c4ce9c0-690989c4ce9c1.jpg',
    category: {
      uz: 'Hamkorlik',
      qr: 'Birge islesiw',
      ru: 'Сотрудничество',
      en: 'Partnership',
    },
    title: {
      uz: 'O‘zbekiston va Yaponiya rektorlarining 5-forumi Samarqand davlat universitetida bo‘lib o‘tdi',
      qr: 'Ózbekstan hám Yaponiya rektorlarınıń 5-forumı Samarqand mámleketlik universitetinde bolıp ótti',
      ru: '5-й форум ректоров Узбекистана и Японии прошел в Самаркандском государственном университете',
      en: 'The 5th Forum of Rectors of Uzbekistan and Japan was hosted at Samarkand State University',
    },
  },
  {
    id: 4,
    type: 'announcement',
    date: '01.03.2026',
    views: 1290,
    image: 'https://www.samdu.uz/upload/images/691852b79a89f-691852b79a8a0-691852b79a8a1-691852b79a8a2.png',
    category: {
      uz: 'E’lon',
      qr: 'Járiya',
      ru: 'Объявление',
      en: 'Announcement',
    },
    title: {
      uz: '2026/2027 o‘quv yili magistratura va doktorantura qabul kvotalari hamda hujjat topshirish tartibi',
      qr: '2026/2027 oqıw jılı magistratura hám doktorantura qabıllaw kvotaları hám hújjet tapsırıw tártibi',
      ru: 'Квоты приема в магистратуру и докторантуру на 2026/2027 учебный год и порядок подачи документов',
      en: '2026/2027 academic year master’s and doctoral admission quotas and application guidelines',
    },
  },
  {
    id: 5,
    type: 'announcement',
    date: '28.02.2026',
    views: 860,
    image: 'https://www.samdu.uz/upload/images/685a00c356e09-685a00c356e0a-685a00c356e0b-685a00c356e0c.jpg',
    category: {
      uz: 'Grant',
      qr: 'Grant',
      ru: 'Грант',
      en: 'Grant',
    },
    title: {
      uz: 'Erasmus+ va xalqaro akademik mobillik dasturlari bo‘yicha tanlov e’lon qilinadi',
      qr: 'Erasmus+ hám xalıqaralıq akademiyalıq mobillik baǵdarlamaları boyınsha tańlaw járiyalanadı',
      ru: 'Конкурс по программам Erasmus+ и международной академической мобильности',
      en: 'Call for applications for Erasmus+ and international academic mobility programs',
    },
  },
];

export default function NewsSection({ language = 'uz', onNewsClick }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'news', 'announcement'
  const t = (key) => translate(key, language);

  const filteredItems = newsAndAnnouncements.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const featured = filteredItems.find((n) => n.isFeatured) || filteredItems[0];
  const sideItems = filteredItems.filter((n) => n.id !== featured?.id).slice(0, 3);

  const handleItemClick = (newsItem) => {
    if (onNewsClick) {
      onNewsClick(newsItem);
    } else {
      window.location.hash = newsItem.id === 'all' ? 'Yangiliklar' : `Yangiliklar`;
    }
  };

  return (
    <section className="samdu-news-section" aria-label={t('So‘nggi yangiliklar va e’lonlar')}>
      {/* Sarlavha va Filtrlash Paneli */}
      <div className="samdu-news-header">
        <div className="samdu-news-title-wrap">
          <span className="samdu-news-badge" />
          <h2 className="samdu-news-main-title">{t('So‘nggi yangiliklar va e’lonlar')}</h2>
        </div>

        {/* Tab filtrlari */}
        <div className="samdu-news-tabs">
          <button
            type="button"
            className={`samdu-tab-btn ${activeTab === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {t('Barchasi')}
          </button>
          <button
            type="button"
            className={`samdu-tab-btn ${activeTab === 'news' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            {t('Yangiliklar')}
          </button>
          <button
            type="button"
            className={`samdu-tab-btn ${activeTab === 'announcement' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('announcement')}
          >
            {t("E'lonlar")}
          </button>
        </div>

        <button
          type="button"
          className="samdu-news-all-btn"
          onClick={() => handleItemClick({ id: 'all' })}
        >
          <span>{t('Barcha yangiliklar')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Yangiliklar to'ri */}
      {featured ? (
        <div className="samdu-news-layout">
          {/* Katta bosh yangilik */}
          <article
            className="samdu-featured-card"
            onClick={() => handleItemClick(featured)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleItemClick(featured)}
          >
            <div className="samdu-card-media">
              <img
                src={featured.image}
                alt={featured.title[language] || featured.title.uz}
              />
              <span className="samdu-category-tag">
                {featured.category[language] || featured.category.uz}
              </span>
            </div>
            <div className="samdu-featured-body">
              <div className="samdu-news-meta">
                <span className="samdu-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {featured.date}
                </span>
                <span className="samdu-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {featured.views}
                </span>
              </div>
              <h3 className="samdu-featured-title">
                {featured.title[language] || featured.title.uz}
              </h3>
              {featured.excerpt && (
                <p className="samdu-featured-desc">
                  {featured.excerpt[language] || featured.excerpt.uz}
                </p>
              )}
              <div className="samdu-read-link">
                <span>{t('Batafsil o‘qish')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </article>

          {/* Yon tomondagi yangiliklar ro'yxati */}
          <div className="samdu-side-news-list">
            {sideItems.map((item) => (
              <article
                key={item.id}
                className="samdu-side-card"
                onClick={() => handleItemClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
              >
                <div className="samdu-side-media">
                  <img
                    src={item.image}
                    alt={item.title[language] || item.title.uz}
                  />
                </div>
                <div className="samdu-side-info">
                  <div className="samdu-news-meta">
                    <span className="samdu-meta-item">{item.date}</span>
                    <span className="samdu-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {item.views}
                    </span>
                  </div>
                  <h4 className="samdu-side-title">
                    {item.title[language] || item.title.uz}
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}