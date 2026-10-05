import { homeCarouselSlides } from './homeCarouselSlides';
import { sidebarNavigation } from './components/sidebarData';
import { translate } from './i18n';

const supportedLanguages = ['uz', 'qr', 'ru', 'en'];

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
  return supportedLanguages.map((language) => translate(value, language));
}

function createEntry({ label, breadcrumb, type, searchTerms = [] }, language) {
  const displayLabel = translate(label, language);
  const displayBreadcrumb = breadcrumb
    .map((part) => translate(part, language))
    .join(' / ');

  return {
    label: displayLabel,
    breadcrumb: displayBreadcrumb,
    type: translate(type, language),
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
  addNavigationEntries(sidebarNavigation, [], language, entries);

  for (const slide of homeCarouselSlides) {
    entries.push(createEntry({
      label: slide.title,
      breadcrumb: ['Bosh sahifa', slide.category],
      type: 'Slayd',
      searchTerms: [slide.category, slide.imageAlt],
    }, language));
  }

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