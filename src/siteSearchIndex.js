import { homeCarouselSlides } from './homeCarouselSlides';
import { sidebarNavigation } from './components/sidebarData';
import { translate } from './i18n';

const supportedLanguages = ['uz', 'qr', 'ru', 'en'];

// Yangi qo'shilgan tezkor xizmatlar ro'yxati
const quickServicesList = [
  {
    title: {
      uz: 'Hujjat topshirish (xorijiy talabalar uchun)',
      qr: 'Hújjet tapsırıw (sırt elli studentler ushın)',
      ru: 'Подача документов (для иностранных студентов)',
      en: 'Admission (for international students)',
    },
    terms: ['qabul', 'admission', 'priyom', 'talaba', 'hujjat'],
  },
  {
    title: {
      uz: 'SamDU tyutorlariga murojaat',
      qr: 'SamDU tyutorlarına múrájat',
      ru: 'Обращение к тьюторам СамГУ',
      en: 'Contact SamSU tutors',
    },
    terms: ['tyutor', 'tyutorlar', 'murojaat', 'tutor'],
  },
  {
    title: {
      uz: 'Elektron kutubxona',
      qr: 'Elektron kitapxana',
      ru: 'Электронная библиотека',
      en: 'Electronic library',
    },
    terms: ['kutubxona', 'library', 'kitob', 'kitapxana', 'biblioteka'],
  },
  {
    title: {
      uz: 'Erasmus+',
      qr: 'Erasmus+',
      ru: 'Erasmus+',
      en: 'Erasmus+',
    },
    terms: ['erasmus', 'grant', 'yevropa', 'xalqaro', 'loyiha'],
  },
  {
    title: {
      uz: 'Hemis universitet',
      qr: 'Hemis universitet',
      ru: 'Hemis университет',
      en: 'Hemis University',
    },
    terms: ['hemis', 'univer', 'otm', 'boshqaruv'],
  },
  {
    title: {
      uz: 'Hemis talaba',
      qr: 'Hemis student',
      ru: 'Hemis студент',
      en: 'Hemis student',
    },
    terms: ['hemis', 'student', 'talaba', 'baho', 'jadval', 'reyting'],
  },
  {
    title: {
      uz: 'Hemis uz',
      qr: 'Hemis uz',
      ru: 'Hemis uz',
      en: 'Hemis uz',
    },
    terms: ['hemis', 'tizim', 'platforma'],
  },
  {
    title: {
      uz: 'Unilibrary',
      qr: 'Unilibrary',
      ru: 'Unilibrary',
      en: 'Unilibrary',
    },
    terms: ['unilibrary', 'kutubxona', 'kutubhona', 'kitoblar'],
  },
  {
    title: {
      uz: 'Interaktiv xizmatlar',
      qr: 'Interaktiv xızmetler',
      ru: 'Интерактивные услуги',
      en: 'Interactive services',
    },
    terms: ['xizmat', 'xizmatlar', 'interaktiv', 'portal'],
  },
];

export function normalizeSearchText(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[’‘ʻʼ`´']/g, '')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function getSearchCharacterCount(value) {
  return Array.from(normalizeSearchText(value).replace(/\s/g, '')).length;
}

function localizedForms(value) {
  if (!value) return [];
  if (typeof value === 'object') {
    return Object.values(value).map((item) => String(item));
  }
  return supportedLanguages.map((language) => translate(value, language));
}

function createEntry({ label, breadcrumb, type, searchTerms = [] }, language) {
  const displayLabel = typeof label === 'object'
    ? label[language] || label.uz
    : translate(label, language);

  const displayBreadcrumb = breadcrumb
    .map((part) => (typeof part === 'object' ? part[language] || part.uz : translate(part, language)))
    .join(' / ');

  const displayType = translate(type, language);

  return {
    label: displayLabel,
    breadcrumb: displayBreadcrumb,
    type: displayType,
    searchText: normalizeSearchText([
      ...localizedForms(label),
      ...breadcrumb.flatMap(localizedForms),
      ...searchTerms.flatMap(localizedForms),
    ].join(' ')),
  };
}

function addNavigationEntries(items, breadcrumb, language, entries) {
  for (const item of items) {
    const nextBreadcrumb = [...breadcrumb, item.label];
    entries.push(createEntry({
      label: item.label,
      breadcrumb,
      type: 'Bo‘lim',
    }, language));

    if (item.children?.length) {
      addNavigationEntries(item.children, nextBreadcrumb, language, entries);
    }
  }
}

export function getSiteSearchResults(query, language = 'uz') {
  const normalizedQuery = normalizeSearchText(query);
  if (getSearchCharacterCount(query) < 2) return [];

  const entries = [];

  // 1. Yon menyu bo'limlari
  addNavigationEntries(sidebarNavigation, [], language, entries);

  // 2. Slayder yangiliklari
  for (const slide of homeCarouselSlides) {
    entries.push(createEntry({
      label: slide.title,
      breadcrumb: ['Bosh sahifa', slide.category],
      type: 'Slayd',
      searchTerms: [slide.category, slide.imageAlt],
    }, language));
  }

  // 3. Yangi tezkor xizmatlar (Hemis, Kutubxona, Erasmus va boshqalar)
  for (const service of quickServicesList) {
    entries.push(createEntry({
      label: service.title,
      breadcrumb: ['Bosh sahifa', 'Interaktiv xizmatlar'],
      type: 'Xizmat',
      searchTerms: service.terms,
    }, language));
  }

  // 4. Universitetning umumiy ma'lumotlari
  entries.push(
    createEntry({
      label: 'Samarqand davlat universiteti',
      breadcrumb: ['Bosh sahifa'],
      type: 'Ma’lumot',
    }, language),
    createEntry({
      label: '140104, Samarqand shahri, Universitet xiyoboni, 15-uy',
      breadcrumb: ['Aloqa'],
      type: 'Ma’lumot',
      searchTerms: ['Bosh bino manzili:'],
    }, language),
    createEntry({
      label: '(66) 240-38-40',
      breadcrumb: ['Aloqa'],
      type: 'Ma’lumot',
      searchTerms: ['Telefon', 'Bosh bino manzili:'],
    }, language),
    createEntry({
      label: 'Agar mendan sizni nima qiynaydi? deb so‘rasangiz, farzandlarimizning ta’lim va tarbiyasi deb javob beraman.',
      breadcrumb: ['Bosh sahifa', 'Sh.Mirziyoyev'],
      type: 'Iqtibos',
    }, language),
  );

  const matches = entries
    .map((entry) => {
      const matchPosition = entry.searchText.indexOf(normalizedQuery);
      if (matchPosition < 0) return null;

      const normalizedLabel = normalizeSearchText(entry.label);
      const rank = normalizedLabel.startsWith(normalizedQuery)
        ? 0
        : normalizedLabel.includes(normalizedQuery)
          ? 1
          : 2;

      return { ...entry, rank, matchPosition };
    })
    .filter(Boolean)
    .sort((first, second) => first.rank - second.rank || first.matchPosition - second.matchPosition || first.label.length - second.label.length);

  const uniqueMatches = [];
  const seen = new Set();

  for (const match of matches) {
    const key = `${match.type}:${match.label}:${match.breadcrumb}`;
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueMatches.push({ label: match.label, breadcrumb: match.breadcrumb, type: match.type });
    if (uniqueMatches.length === 10) break;
  }

  return uniqueMatches;
}