import { homeCarouselSlides } from './homeCarouselSlides';
import { sidebarNavigation } from './components/sidebarData';
import { translate } from './i18n';

const supportedLanguages = ['uz', 'qr', 'ru', 'en'];

// Tezkor xizmatlar ro'yxati
const quickServicesList = [
  {
    title: {
      uz: 'Hujjat topshirish (xorijiy talabalar uchun)',
      qr: 'Hújjet tapsırıw (sırt elli studentler ushın)',
      ru: 'Подача документов (для иностранных студентов)',
      en: 'Admission (for international students)',
    },
    terms: ['qabul', 'admission', 'priyom', 'talaba', 'hujjat', 'xorijiy'],
    targetHash: 'Xorijiy talabalar uchun hujjat topshirish',
  },
  {
    title: {
      uz: 'SamDU tyutorlariga murojaat',
      qr: 'SamDU tyutorlarına múrájat',
      ru: 'Обращение к тьюторам СамГУ',
      en: 'Contact SamSU tutors',
    },
    terms: ['tyutor', 'tyutorlar', 'murojaat', 'tutor'],
    targetHash: 'Tyutorlik faoliyati',
  },
  {
    title: {
      uz: 'Elektron kutubxona',
      qr: 'Elektron kitapxana',
      ru: 'Электронная библиотека',
      en: 'Electronic library',
    },
    terms: ['kutubxona', 'library', 'kitob', 'kitapxana', 'biblioteka'],
    targetHash: 'Axborot-resurs markazi',
  },
  {
    title: {
      uz: 'Erasmus+',
      qr: 'Erasmus+',
      ru: 'Erasmus+',
      en: 'Erasmus+',
    },
    terms: ['erasmus', 'grant', 'yevropa', 'xalqaro', 'loyiha'],
    targetHash: 'Xalqaro grant-stipendiyalar',
  },
  {
    title: {
      uz: 'Hemis universitet',
      qr: 'Hemis universitet',
      ru: 'Hemis университет',
      en: 'Hemis University',
    },
    terms: ['hemis', 'univer', 'otm', 'boshqaruv'],
    targetHash: 'Samarqand davlat universiteti “Registrator ofisi”',
  },
  {
    title: {
      uz: 'Hemis talaba',
      qr: 'Hemis student',
      ru: 'Hemis студент',
      en: 'Hemis student',
    },
    terms: ['hemis', 'student', 'talaba', 'baho', 'jadval', 'reyting'],
    targetHash: 'Talabalar hayoti',
  },
  {
    title: {
      uz: 'Hemis uz',
      qr: 'Hemis uz',
      ru: 'Hemis uz',
      en: 'Hemis uz',
    },
    terms: ['hemis', 'tizim', 'platforma'],
    targetHash: 'Talabalar hayoti',
  },
  {
    title: {
      uz: 'Unilibrary',
      qr: 'Unilibrary',
      ru: 'Unilibrary',
      en: 'Unilibrary',
    },
    terms: ['unilibrary', 'kutubxona', 'kutubhona', 'kitoblar'],
    targetHash: 'Axborot-resurs markazi',
  },
  {
    title: {
      uz: 'Interaktiv xizmatlar',
      qr: 'Interaktiv xızmetler',
      ru: 'Интерактивные услуги',
      en: 'Interactive services',
    },
    terms: ['xizmat', 'xizmatlar', 'interaktiv', 'portal'],
    targetHash: 'Unversitet tuzilmasi',
  },
  {
    title: {
      uz: 'Talabalar stipendiyalari (SamDU)',
      qr: 'Studentler stipendiyaları (SamDU)',
      ru: 'Стипендии студентов (СамГУ)',
      en: 'Student Scholarships (SamSU)',
    },
    terms: ['stipendiya', 'stipendiyalar', 'grant', 'kontrakt', 'alochi', 'miqdori', 'talaba stipendiyalar', 'scholarship', 'стипендия', 'стипендии'],
    targetHash: 'Stipendiyalar',
  },
];

// Raqamlarda SamDU statistik ko'rsatkichlari
const statsSearchEntries = [
  {
    title: {
      uz: 'Talabalar soni (35 000+)',
      qr: 'Studentler sanı (35 000+)',
      ru: 'Количество студентов (35 000+)',
      en: 'Student Enrollment (35,000+)',
    },
    terms: ['statistika', 'kontingent', 'talabalar', 'soni', 'students'],
    targetHash: 'Kontingent',
  },
  {
    title: {
      uz: 'Professor-o‘qituvchilar (1 200+)',
      qr: 'Professor-oqıtıwshılar (1 200+)',
      ru: 'Профессорско-преподавательский состав (1 200+)',
      en: 'Faculty & Professors (1,200+)',
    },
    terms: ['professorlar', 'ustozlar', 'pedagoglar', 'doktorlar', 'phd'],
    targetHash: 'Rahbariyat',
  },
  {
    title: {
      uz: 'QS TOP-500 xalqaro reyting va QS Stars 5 yulduz',
      qr: 'QS TOP-500 xalıqaralıq reyting hám QS Stars 5 juldız',
      ru: 'Международный рейтинг QS ТОП-500 и 5 звезд QS Stars',
      en: 'QS World University Rankings TOP-500 and 5 Stars',
    },
    terms: ['qs', 'reyting', 'top-500', 'stars', 'yulduz', 'xalqaro'],
    targetHash: 'Unversitet',
  },
  {
    title: {
      uz: 'Fakultetlar va institutlar (14 ta fakultet, 8 ta institut)',
      qr: 'Fakultetler hám institutlar (14 fakultet, 8 institut)',
      ru: 'Факультеты и институты (14 факультетов, 8 институтов)',
      en: 'Faculties and Institutes (14 faculties, 8 institutes)',
    },
    terms: ['fakultet', 'institut', 'tuzilma', 'yadro', 'suniy intellekt', 'matematika'],
    targetHash: 'Unversitet tuzilmasi',
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

function createEntry({ label, breadcrumb, type, searchTerms = [], targetHash }, language) {
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
    targetHash: targetHash || (typeof label === 'string' ? label : label.uz),
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
      targetHash: item.label,
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

  // 1. Yon menyu bo'limlari (172+ sahifa)
  addNavigationEntries(sidebarNavigation, [], language, entries);

  // 2. Slayder yangiliklari
  for (const slide of homeCarouselSlides) {
    entries.push(createEntry({
      label: slide.title,
      breadcrumb: ['Bosh sahifa', slide.category],
      type: 'Slayd',
      searchTerms: [slide.category, slide.imageAlt],
      targetHash: 'Yangiliklar',
    }, language));
  }

  // 3. Tezkor xizmatlar (Hemis, Kutubxona, Erasmus va boshqalar)
  for (const service of quickServicesList) {
    entries.push(createEntry({
      label: service.title,
      breadcrumb: ['Bosh sahifa', 'Interaktiv xizmatlar'],
      type: 'Xizmat',
      searchTerms: service.terms,
      targetHash: service.targetHash,
    }, language));
  }

  // 4. Raqamlarda SamDU statistikasi
  for (const stat of statsSearchEntries) {
    entries.push(createEntry({
      label: stat.title,
      breadcrumb: ['Bosh sahifa', 'Raqamlarda SamDU'],
      type: 'Ma’lumot',
      searchTerms: stat.terms,
      targetHash: stat.targetHash,
    }, language));
  }

  // 5. Rektor va rasmiy rekvizitlar
  entries.push(
    createEntry({
      label: 'Universitet rektori: Rustam Ibragimovich Xolmurodov',
      breadcrumb: ['Rahbariyat'],
      type: 'Ma’lumot',
      searchTerms: ['rektor', 'xolmurodov', 'rahbar', 'rector'],
      targetHash: 'Universitet rektori',
    }, language),
    createEntry({
      label: 'Samarqand davlat universiteti',
      breadcrumb: ['Bosh sahifa'],
      type: 'Ma’lumot',
      searchTerms: ['samdu', 'samsu', 'universitet'],
      targetHash: 'Unversitet',
    }, language),
    createEntry({
      label: '140104, Samarqand shahri, Universitet xiyoboni, 15-uy',
      breadcrumb: ['Aloqa'],
      type: 'Ma’lumot',
      searchTerms: ['Bosh bino manzili:', 'manzil', 'lokatsiya'],
      targetHash: 'Aloqa',
    }, language),
    createEntry({
      label: '+998 (66) 240-38-40',
      breadcrumb: ['Aloqa'],
      type: 'Ma’lumot',
      searchTerms: ['Telefon', 'Bosh bino manzili:', 'aloqa', 'kontakt'],
      targetHash: 'Aloqa',
    }, language),
    createEntry({
      label: 'STIR: 200874221, MFO: 00014, G‘azna: 23402000300100001010',
      breadcrumb: ['Rekvizitlar'],
      type: 'Ma’lumot',
      searchTerms: ['rekvizit', 'stir', 'inn', 'mfo', 'hisob', 'bank'],
      targetHash: 'Rekvizitlar',
    }, language),
    createEntry({
      label: 'Agar mendan sizni nima qiynaydi? deb so‘rasangiz, farzandlarimizning ta’lim va tarbiyasi deb javob beraman.',
      breadcrumb: ['Bosh sahifa', 'Sh.Mirziyoyev'],
      type: 'Iqtibos',
      searchTerms: ['iqtibos', 'mirziyoyev', 'tarbiya'],
      targetHash: 'Unversitet',
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
    uniqueMatches.push({
      label: match.label,
      breadcrumb: match.breadcrumb,
      type: match.type,
      targetHash: match.targetHash,
    });
    if (uniqueMatches.length === 12) break;
  }

  return uniqueMatches;
}