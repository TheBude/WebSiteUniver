import React from 'react';
import { translate } from '../i18n';
import './RectorWelcome.css';

const rectorContent = {
  quote: {
    uz: '“Samarqand davlat universiteti — Mirzo Ulug‘bek akademiyasi an’analarining munosib davomchisi bo‘lib, bugungi kunda jahon ilm-fani bilan faol integratsiyalashgan zamonaviy ta’lim va innovatsiya markaziga aylandi. Bizning bosh maqsadimiz — yangi O‘zbekiston taraqqiyoti uchun yuqori intellektual salohiyatga ega, mustaqil fikrlaydigan milliy kadrlarni tarbiyalashdir.”',
    qr: '«Samarqand mámleketlik universiteti — Mirzo Uluǵbek akademiyası dástúrleriniń múnásip dawamshısı bolıp, búgingi kúnde dúnya ilimi menen belsendi integraciyalasqan zamanagóy tálim hám innovaciya orayına aylandı. Bizlerdiń baslı maqsetimiz — jańa Ózbekstan rawajlanıwı ushın joqarı intellektual potencialǵa iye kadrlar tayarlaw.»',
    ru: '«Самаркандский государственный университет — достойный преемник традиций академии Мирзо Улугбека, ставший современным центром науки, образования и инноваций, глубоко интегрированным в мировое академическое пространство. Наша главная цель — подготовка высококвалифицированных специалистов с передовым мышлением для процветания нового Узбекистана.»',
    en: '“Samarkand State University stands as the proud successor to the traditions of the Mirzo Ulugh Beg Academy, evolving into a world-class center of education, science, and innovation. Our foremost mission is nurturing high-caliber professionals and forward-thinking innovators to spearhead the advancement of New Uzbekistan.”',
  },
  pillars: [
    {
      title: {
        uz: '600 yillik ilmiy meros',
        qr: '600 jıllıq ilimiy miyras',
        ru: '600-летнее научное наследие',
        en: '600-Year Scholarly Heritage',
      },
      desc: {
        uz: 'Mirzo Ulug‘bek madrasasidan boshlangan fundamental fan an’analari',
        qr: 'Mirzo Uluǵbek medresesinen baslanǵan fundamental ilim dástúrleri',
        ru: 'Традиции фундаментальной науки, заложенные медресе Мирзо Улугбека',
        en: 'Fundamental science legacy originating from the Ulugh Beg Madrasah',
      },
    },
    {
      title: {
        uz: '8 ta ilmiy institut',
        qr: '8 ilimiy institut',
        ru: '8 исследовательских институтов',
        en: '8 Research Institutes',
      },
      desc: {
        uz: 'Yadro fizikasi, sun’iy intellekt, agrobiotexnologiya va biokimyo markazlari',
        qr: 'Yadro fizikası, jasama intellekt, agrobiotexnologiya hám bioximiya orayları',
        ru: 'Центры ядерной физики, искусственного интеллекта и агробиотехнологий',
        en: 'Hubs for nuclear physics, artificial intelligence, and agrobiotechnology',
      },
    },
    {
      title: {
        uz: 'Global xalqaro maydon',
        qr: 'Global xalıqaralıq maydan',
        ru: 'Глобальная интеграция',
        en: 'Global Academic Ties',
      },
      desc: {
        uz: '60+ mamlakat, 200+ xorijiy OTMlar bilan almashinuv va qo‘shma dasturlar',
        qr: '60+ mámleket, 200+ shet el joqarı oqıw orınları menen qospa baǵdarlamalar',
        ru: 'Партнерство с 200+ зарубежными вузами и программы двойных дипломов',
        en: 'Exchange and dual-degree programs with 200+ universities in 60+ countries',
      },
    },
  ],
};

export default function RectorWelcome({ language = 'uz', onNavigate }) {
  const t = (key) => translate(key, language);

  const handleLearnMore = () => {
    if (onNavigate) {
      onNavigate('Universitet rektori');
    } else {
      window.location.hash = 'Universitet rektori';
    }
  };

  return (
    <section className="samdu-rector-section" aria-label={t('Rektor murojaati')}>
      <div className="samdu-rector-card">
        <div className="samdu-rector-media">
          <div className="samdu-rector-img-box">
            <img
              src="https://www.samdu.uz/upload/images/69098ad6aa03f-69098ad6aa040-69098ad6aa041-69098ad6aa042.jpg"
              alt={t('Rustam Ibragimovich Xolmurodov')}
              className="samdu-rector-img"
            />
            <div className="samdu-rector-tag">
              <span>{t('Universitet rektori')}</span>
            </div>
          </div>
          <div className="samdu-rector-caption">
            <h3 className="samdu-rector-name">{t('Rustam Ibragimovich Xolmurodov')}</h3>
            <p className="samdu-rector-role">{t('SamDU rektori, professor, O‘zbekiston Respublikasi fan arbobi')}</p>
          </div>
        </div>

        <div className="samdu-rector-info">
          <div className="samdu-rector-head">
            <span className="samdu-rector-badge">{t('Ilmiy salohiyat va strategiya')}</span>
            <h2 className="samdu-rector-title">{t('Rektor murojaati')}</h2>
          </div>

          <blockquote className="samdu-rector-quote">
            <p>{rectorContent.quote[language] || rectorContent.quote.uz}</p>
          </blockquote>

          <div className="samdu-pillars-grid">
            {rectorContent.pillars.map((pillar, idx) => (
              <div key={idx} className="samdu-pillar-item">
                <div className="samdu-pillar-dot" />
                <div>
                  <h4 className="samdu-pillar-title">{pillar.title[language] || pillar.title.uz}</h4>
                  <p className="samdu-pillar-desc">{pillar.desc[language] || pillar.desc.uz}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="samdu-rector-actions">
            <button
              type="button"
              className="samdu-rector-btn"
              onClick={handleLearnMore}
            >
              <span>{t('Batafsil tanishish')}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
