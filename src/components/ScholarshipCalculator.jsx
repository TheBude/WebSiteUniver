import React, { useState } from 'react';
import './ScholarshipCalculator.css';

const scholarshipTiers = [
  {
    id: 'base',
    amount: 517880,
    label: {
      uz: 'Bazaviy stipendiya (Oddiy)',
      qr: 'Tiykarǵı stipendiya (Ápiwayı)',
      ru: 'Базовая стипендия (Стандарт)',
      en: 'Base Scholarship (Standard)',
    },
    badge: {
      uz: 'Standart stavka',
      qr: 'Standart stavka',
      ru: 'Стандартная ставка',
      en: 'Standard rate',
    },
    desc: {
      uz: 'Davlat granti va to‘lov-kontrakt asosida ta’lim olayotgan barcha talabalar uchun belgilangan bazaviy miqdor.',
      qr: 'Mámleketlik grant hám tólew-kontrakt tiykarında tálim alıp atırǵan barlıq studentler ushın tiykarǵı muǵdar.',
      ru: 'Базовый размер стипендии для студентов государственного гранта и контрактной формы обучения.',
      en: 'Standard base stipend for all state grant and tuition-contract undergraduate/graduate students.',
    },
  },
  {
    id: 'excellent',
    amount: 621456,
    multiplier: '+20%',
    label: {
      uz: '“A’lochi” talabalar (+20%)',
      qr: '«A’lo» studentler (+20%)',
      ru: 'Стипендия «Отличник» (+20%)',
      en: 'Honors / Excellent (+20%)',
    },
    badge: {
      uz: '+20% Rag‘batlantirish',
      qr: '+20% Xoshametlew',
      ru: '+20% Поощрение',
      en: '+20% Honors bonus',
    },
    desc: {
      uz: 'Semestr yakuni bo‘yicha barcha fanlarni faqat «a’lo» (86–100 ball) baholarga o‘zlashtirgan talabalar uchun.',
      qr: 'Semestr juwmaǵı boyınsha barlıq pánlerdi tek «a’lo» bahalarǵa ózlestirgen studentler ushın.',
      ru: 'Для студентов, освоивших все предметы семестра исключительно на «отлично» (86–100 баллов).',
      en: 'Awarded to students with straight "Excellent" grades (86–100 points) in the prior semester.',
    },
  },
  {
    id: 'disability',
    amount: 776820,
    multiplier: '+50%',
    label: {
      uz: '“Nogiron” talabalar (+50%)',
      qr: '«Mayıplıǵı bolǵan» studentler (+50%)',
      ru: 'Студенты с инвалидностью (+50%)',
      en: 'Students with Disability (+50%)',
    },
    badge: {
      uz: '+50% Ijtimoiy himoya',
      qr: '+50% Sociallıq qorǵaw',
      ru: '+50% Социальная надбавка',
      en: '+50% Social support',
    },
    desc: {
      uz: 'I va II guruh nogironligi bo‘lgan talabalarga qonunchilikda belgilangan tartibda 50% ustama bilan to‘lanadi.',
      qr: 'I hám II topar mayıplıǵı bolǵan studentlerge nızamshılıq tiykarında 50% qosımsha menen tólenedi.',
      ru: 'Назначается студентам с инвалидностью I и II групп с надбавкой 50% согласно законодательству.',
      en: 'State guaranteed 50% supplement for students with Group I or II disabilities.',
    },
  },
  {
    id: 'intern',
    amount: 5497800,
    label: {
      uz: 'Stajor-tadqiqotchi',
      qr: 'Stajor-izertlewshi',
      ru: 'Стажер-исследователь',
      en: 'Trainee Researcher',
    },
    badge: {
      uz: 'Ilmiy-tadqiqot',
      qr: 'Ilimiy-izertlew',
      ru: 'Исследования',
      en: 'Research staff',
    },
    desc: {
      uz: 'Universitet ilmiy-tadqiqot institutlari va kafedralarida faoliyat yurituvchi stajor-tadqiqotchilar.',
      qr: 'Universitet ilimiy-izertlew institutları hám kafedralarında xızmet kórsetiwshi stajor-izertlewshiler.',
      ru: 'Для стажеров-исследователей кафедр и научно-исследовательских институтов университета.',
      en: 'Appointed to university trainee-research fellows undergoing pre-doctoral research programs.',
    },
  },
  {
    id: 'phd',
    amount: 6210435,
    label: {
      uz: 'Tayanch doktorantura (PhD)',
      qr: 'Tayansh doktorantura (PhD)',
      ru: 'Базовая докторантура (PhD)',
      en: 'Basic Doctoral Studies (PhD)',
    },
    badge: {
      uz: 'PhD tadqiqot',
      qr: 'PhD izertlew',
      ru: 'PhD исследование',
      en: 'PhD fellow',
    },
    desc: {
      uz: 'Falsafa doktori (PhD) ilmiy darajasini olish uchun tayanch doktoranturada tahsil oluvchilar.',
      qr: 'Filosofiya doktorı (PhD) ilimiy dárejesin alıw ushın tayansh doktoranturada oqıp atırǵanlar.',
      ru: 'Выплачивается исследователям базовой докторантуры на соискание ученой степени PhD.',
      en: 'Monthly grant for doctoral researchers working toward a Doctor of Philosophy (PhD) degree.',
    },
  },
  {
    id: 'dsc',
    amount: 7934850,
    label: {
      uz: 'Doktorantura (DSc)',
      qr: 'Doktorantura (DSc)',
      ru: 'Докторантура (DSc)',
      en: 'Doctoral Studies (DSc)',
    },
    badge: {
      uz: 'DSc olimlar',
      qr: 'DSc alımlar',
      ru: 'DSc ученые',
      en: 'DSc fellow',
    },
    desc: {
      uz: 'Fan doktori (Doctor of Science — DSc) ilmiy darajasi uchun ilmiy izlanish olib boruvchi doktorantlar.',
      qr: 'Ilim doktorı (Doctor of Science — DSc) ilimiy dárejesi ushın izertlew alıp barıwshı doktorantlar.',
      ru: 'Назначается докторантам на соискание ученой степени доктора наук (DSc).',
      en: 'Monthly scholarship for scholars preparing Doctor of Science (DSc) dissertations.',
    },
  },
];

const periodOptions = [
  {
    months: 1,
    label: { uz: '1 oy', qr: '1 ay', ru: '1 месяц', en: '1 month' },
  },
  {
    months: 5,
    label: { uz: '1 semestr (5 oy)', qr: '1 semestr (5 ay)', ru: '1 семестр (5 мес.)', en: '1 semester (5 mo.)' },
  },
  {
    months: 10,
    label: { uz: 'O‘quv yili (10 oy)', qr: 'Oqıw jılı (10 ay)', ru: 'Учебный год (10 мес.)', en: 'Academic year (10 mo.)' },
  },
  {
    months: 12,
    label: { uz: 'To‘liq yil (12 oy)', qr: 'Tolıq jıl (12 ay)', ru: 'Полный год (12 мес.)', en: 'Full year (12 mo.)' },
  },
];

function formatCurrency(num) {
  return num.toLocaleString('uz-UZ').replace(/,/g, ' ') + ' so‘m';
}

export default function ScholarshipCalculator({ language = 'uz' }) {
  const [selectedTierId, setSelectedTierId] = useState('base');
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [copied, setCopied] = useState(false);

  const tier = scholarshipTiers.find((t) => t.id === selectedTierId) || scholarshipTiers[0];
  const totalAmount = tier.amount * selectedMonths;

  const t = {
    title: {
      uz: 'Interaktiv stipendiya kalkulyatori',
      qr: 'Interaktiv stipendiya kalkulyatorı',
      ru: 'Интерактивный калькулятор стипендии',
      en: 'Interactive Scholarship Calculator',
    },
    subtitle: {
      uz: 'O‘z toifangizni va davrni tanlab, oylik yoki semestrlik to‘lov hajmini hisoblang:',
      qr: 'Óz kategoriyangızdı hám dáwirdi tańlap, aylıq yamasa semestrlik tólew muǵdarın esaplań:',
      ru: 'Выберите вашу категорию и период для расчета ежемесячной или семестровой выплаты:',
      en: 'Select your category and timeframe to calculate your monthly or semester stipend amount:',
    },
    selectCategory: {
      uz: 'Talaba yoki tadqiqotchi toifasi:',
      qr: 'Student yamasa izertlewshi kategoriyası:',
      ru: 'Категория студента / исследователя:',
      en: 'Student / Researcher Category:',
    },
    selectPeriod: {
      uz: 'Hisoblash davri:',
      qr: 'Esaplaw dáwiri:',
      ru: 'Период расчета:',
      en: 'Calculation Period:',
    },
    totalLabel: {
      uz: 'Jami stipendiya miqdori:',
      qr: 'Jámi stipendiya muǵdarı:',
      ru: 'Итоговый размер выплаты:',
      en: 'Total Stipend Amount:',
    },
    monthlyRate: {
      uz: 'Oylik bazaviy stavka:',
      qr: 'Aylıq tiykarǵı stavka:',
      ru: 'Ежемесячная ставка:',
      en: 'Monthly rate:',
    },
    copyBtn: {
      uz: 'Miqdorni nusxalash',
      qr: 'Muǵdardı kóshirip alıw',
      ru: 'Скопировать сумму',
      en: 'Copy Amount',
    },
    copiedBtn: {
      uz: 'Nusxalandi!',
      qr: 'Kóshirildi!',
      ru: 'Скопировано!',
      en: 'Copied!',
    },
  };

  const handleCopy = () => {
    const textToCopy = `${formatCurrency(totalAmount)} (${tier.label[language] || tier.label.uz} - ${selectedMonths} oy)`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="samdu-calculator-box">
      <div className="samdu-calc-header">
        <div className="samdu-calc-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="11" y2="14" />
            <line x1="8" y1="18" x2="11" y2="18" />
            <line x1="14" y1="14" x2="16" y2="14" />
            <line x1="14" y1="18" x2="16" y2="18" />
          </svg>
          <span>{t.title[language] || t.title.uz}</span>
        </div>
        <p className="samdu-calc-subtitle">{t.subtitle[language] || t.subtitle.uz}</p>
      </div>

      <div className="samdu-calc-grid">
        <div className="samdu-calc-controls">
          <div className="samdu-calc-group">
            <label className="samdu-calc-label">{t.selectCategory[language] || t.selectCategory.uz}</label>
            <div className="samdu-calc-tier-options">
              {scholarshipTiers.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedTierId(item.id)}
                  className={`samdu-calc-tier-btn ${selectedTierId === item.id ? 'is-selected' : ''}`}
                >
                  <span className="samdu-tier-name">{item.label[language] || item.label.uz}</span>
                  <span className="samdu-tier-sum">{formatCurrency(item.amount)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="samdu-calc-group">
            <label className="samdu-calc-label">{t.selectPeriod[language] || t.selectPeriod.uz}</label>
            <div className="samdu-calc-period-options">
              {periodOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.months}
                  onClick={() => setSelectedMonths(opt.months)}
                  className={`samdu-period-btn ${selectedMonths === opt.months ? 'is-selected' : ''}`}
                >
                  {opt.label[language] || opt.label.uz}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="samdu-calc-result-card">
          <div className="samdu-calc-result-top">
            <span className="samdu-calc-res-tag">{tier.badge[language] || tier.badge.uz}</span>
            <span className="samdu-calc-res-label">{t.totalLabel[language] || t.totalLabel.uz}</span>
          </div>

          <div className="samdu-calc-huge-amount" aria-live="polite">
            {formatCurrency(totalAmount)}
          </div>

          <div className="samdu-calc-monthly-note">
            <span>{t.monthlyRate[language] || t.monthlyRate.uz}</span>
            <strong>{formatCurrency(tier.amount)} / oy</strong>
          </div>

          <div className="samdu-calc-tier-desc">
            <p>{tier.desc[language] || tier.desc.uz}</p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="samdu-calc-copy-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>{copied ? (t.copiedBtn[language] || t.copiedBtn.uz) : (t.copyBtn[language] || t.copyBtn.uz)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
