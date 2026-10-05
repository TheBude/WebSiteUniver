import React from 'react';
import './NewsSection.css';

// SamDU rasmiy saytidan olingan haqiqiy yangiliklar ma'lumotlari
const newsData = [
  {
    id: 1,
    isFeatured: true,
    date: '05.03.2026',
    views: 1248,
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
      en: 'Shavkat Mirziyoyev presented the Zulfiya State Award to SamSU teacher Mohigul Tokhirova',
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
    date: '04.03.2026',
    views: 890,
    image: 'https://www.samdu.uz/upload/images/69258ee414acf-69258ee414ad0-69258ee414ad1-69258ee414ad2.jpg',
    category: {
      uz: 'Xalqaro reyting',
      qr: 'Xalıqaralıq reyting',
      ru: 'Международный рейтинг',
      en: 'International ranking',
    },
    title: {
      uz: 'SamDU fanlararo tadqiqotlar bo‘yicha TOP-500 universitetlar qatoridan joy oldi',
      qr: 'SamDU pánlerara izertlewler boyınsha TOP-500 universitetler qatarınan orın aldı',
      ru: 'СамГУ вошел в число ТОП-500 университетов по междисциплинарным исследованиям',
      en: 'SamSU ranked among TOP-500 universities in interdisciplinary research',
    },
  },
  {
    id: 3,
    date: '02.03.2026',
    views: 642,
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
      en: 'The 5th Forum of Rectors of Uzbekistan and Japan was held at Samarkand State University',
    },
  },
  {
    id: 4,
    date: '28.02.2026',
    views: 1120,
    image: 'https://www.samdu.uz/upload/images/691852b79a89f-691852b79a8a0-691852b79a8a1-691852b79a8a2.png',
    category: {
      uz: 'Yangi bino',
      qr: 'Jańa imarat',
      ru: 'Новое здание',
      en: 'New building',
    },
    title: {
      uz: 'Sun’iy intellekt va raqamli texnologiyalar fakultetining zamonaviy yangi binosi foydalanishga topshirildi',
      qr: 'Jasama intellekt hám sanlı texnologiyalar fakultetiniń zamanagóy jańa imaratı paydalanıwǵa tapsırıldı',
      ru: 'Новое современное здание факультета искусственного интеллекта и цифровых технологий сдано в эксплуатацию',
      en: 'New modern building of the Faculty of Artificial Intelligence and Digital Technologies commissioned',
    },
  },
];

const sectionLabels = {
  header: {
    uz: 'So‘nggi yangiliklar',
    qr: 'Sońǵı jańalıqlar',
    ru: 'Последние новости',
    en: 'Latest News',
  },
  allNews: {
    uz: 'Barcha yangiliklar',
    qr: 'Barlıq jańalıqlar',
    ru: 'Все новости',
    en: 'All News',
  },
  readMore: {
    uz: 'Batafsil o‘qish',
    qr: 'Tolıqraq oqıw',
    ru: 'Подробнее',
    en: 'Read More',
  },
};

export default function NewsSection({ language = 'uz', onNewsClick }) {
  const featuredNews = newsData.find((n) => n.isFeatured) || newsData[0];
  const sideNews = newsData.filter((n) => !n.isFeatured);

  const handleItemClick = (newsItem) => {
    if (onNewsClick) {
      onNewsClick(newsItem);
    } else {
      console.log('Tanlangan yangilik:', newsItem.id);
    }
  };

  return (
    <section className="samdu-news-section" aria-label="Universitet yangiliklari">
      {/* Sarlavha paneli */}
      <div className="samdu-news-header">
        <div className="samdu-news-title-wrap">
          <span className="samdu-news-badge" />
          <h2 className="samdu-news-main-title">{sectionLabels.header[language] || sectionLabels.header.uz}</h2>
        </div>
        <button
          type="button"
          className="samdu-news-all-btn"
          onClick={() => handleItemClick({ id: 'all' })}
        >
          <span>{sectionLabels.allNews[language] || sectionLabels.allNews.uz}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Yangiliklar to'ri */}
      <div className="samdu-news-layout">
        {/* Katta bosh yangilik */}
        <article
          className="samdu-featured-card"
          onClick={() => handleItemClick(featuredNews)}
        >
          <div className="samdu-card-media">
            <img src={featuredNews.image} alt={featuredNews.title[language] || featuredNews.title.uz} />
            <span className="samdu-category-tag">
              {featuredNews.category[language] || featuredNews.category.uz}
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
                {featuredNews.date}
              </span>
              <span className="samdu-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {featuredNews.views}
              </span>
            </div>
            <h3 className="samdu-featured-title">
              {featuredNews.title[language] || featuredNews.title.uz}
            </h3>
            <p className="samdu-featured-desc">
              {featuredNews.excerpt[language] || featuredNews.excerpt.uz}
            </p>
            <div className="samdu-read-link">
              <span>{sectionLabels.readMore[language] || sectionLabels.readMore.uz}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </article>

        {/* Yon tomondagi 3 ta qo'shimcha yangilik */}
        <div className="samdu-side-news-list">
          {sideNews.map((item) => (
            <article
              key={item.id}
              className="samdu-side-card"
              onClick={() => handleItemClick(item)}
            >
              <div className="samdu-side-media">
                <img src={item.image} alt={item.title[language] || item.title.uz} />
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
    </section>
  );
}