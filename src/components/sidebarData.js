const links = (labels) => labels.map((label) => ({ label }));
const group = (label, items) => ({ label, children: links(items) });

const universityNewsLinks = [
  'Yangiliklar',
  "E'lonlar",
  'Xalqaro grant-stipendiyalar',
  'Fotogalereya',
  'Videogalereya',
];

const universityAboutLinks = [
  'Unversitet',
  'Unversitet tarixi',
  'Unversitet nizomi',
  'Unversitet tuzilmasi',
  'Rekvizitlar',
  'Aloqa',
  'Bitirganlar assotsiatsiyasi',
  'Yashil universitet',
  'Barqaror rivojlanish',
];

const documentLinks = [
  'Ish reja',
  'Qonunlar',
  'Farmonlar',
  'Qarorlar',
  'Nizomlar va qoidalar',
  'Hisobotlar',
  'Shartnomalar',
  "O'quv-me'yoriy hujjatlar",
];

const leadershipLinks = [
  'Universitet rektori',
  "O'quv ishlari bo'yicha birinchi prorektor",
  "O'quv ishlari bo'yicha prorektor",
  'Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor',
  'Yoshlar masalalari va ma’naviy-ma’rifiy ishlar bo‘yicha birinchi prorektor',
  "Moliya va iqtisod ishlari bo'yicha prorektor",
  "Xalqaro hamkorlik bo'yicha prorektor",
  "Qurilish-ta'mirlash ishlari bo'yicha prorektor",
  'Transformatsiya ofisi',
];

const instituteLinks = [
  'SamDU Markaziy Osiyo xalqlari tillari va madaniyati instituti',
  'SamDU Yadro texnologiyalari instituti',
  'Sun’iy intellekt va raqamli texnologiyalar instituti',
  'SamDU Agrobiotexnologiyalar va oziq-ovqat xavfsizligi instituti',
  'SamDU Muhandislik fizikasi instituti',
  'SamDU Turkologiya ilmiy-tadqiqot instituti',
  'SamDU Inson resurslari va mahalla taraqqiyotini boshqarish instituti',
  'SamDU Biokimyo instituti',
];

const structureMenus = {
    Fakultetlar: [
    'Matematika fakulteti',
    'Geografiya va ekologiya fakulteti',
    'Tarix fakulteti',
    'Psixologiya va ijtimoiy-siyosiy fanlar fakulteti',
    'Yuridik fakulteti',
    'Telekommunikatsiya va kompyuter injiniring fakulteti',
  ],
  Kafedralar: [
    'Markaziy Osiyo xalqlari tillari va madaniyati instituti kafedralari',
    'Agrobiotexnologiyalar va oziq-ovqat xavfsizligi instituti kafedralari',
    'Muhandislik fizikasi instituti kafedralari',
    'Inson resurslari va mahalla taraqqiyotini boshqarish instituti kafedralari',
    'Biokimyo instituti kafedralari',
    'Yadro texnologiyalari instituti kafedralari',
    'Matematika fakulteti kafedralari',
    'Geografiya va ekologiya fakulteti kafedralari',
    'Tarix fakulteti kafedralari',
    'Psixologiya va ijtimoiy munosabatlar fakulteti kafedralari',
    'Sun’iy intellekt va raqamli texnologiyalar instituti',
    'Yuridik fakulteti kafedralari',
    'Telekommunikatsiya va kompyuter injiniring fakulteti kafedralari',
  ],
  "Boshqarma va bo'limlar": [
    'Axborot xizmati',
    "Birinchi o'quv-uslubiy boshqarma",
    'Buxgalteriya',
    'Xalqaro hamkorlik boshqarmasi',
    'Reja-moliya bo’limi',
    'Ta’lim sifatini nazorat qilish bo’limi',
    "Kadrlar bo'limi",
    'Yoshlar bilan ishlash, ma’naviyat va ma’rifat boshqarmasi',
    'Ilmiy-tadqiqotlar va innovatsion rivojlantirish boshqarmasi',
    "SamDU boshlang'ich Kasaba uyushmasi qo'mitasi",
    "Yuridik xizmat bo'limi",
    'Korrupsiyaga qarshi kurashish "Komplayens-nazorat" tizimini boshqarish bo’limi',
    'Xotin-qizlar va gender tenglik masalalari bo‘yicha maslahatchi',
    "Marketing va talabalar bilan ishlash bo'limi",
    "Devonxona va arxiv bo'limi",
    'Innovatsion ishlanmalarni tijoratlashtirish va patentlash bo’limi',
    'Samarqand davlat universiteti “Registrator ofisi”',
  ],
  Markazlar: [
    "Sun'iy intellektni tartibga solishni rivojlantirish bo'yicha Markaziy Osiyo tadqiqot markazi",
    'Osiyo tadqiqotlari markazi',
    "O'zbekiston-Hindiston sun'iy intellekt va mashinali o'qitish qo'shma markazi",
    'Pedagog kadrlarni qayta tayyorlash va ularning malakasini oshirish mintaqaviy markazi',
    "Raqamli ta'lim texnologiyalari markazi",
    'Axborot-resurs markazi',
    "Xalqaro ta'lim dasturlari markazi",
    "Ta'limni rivojlantirish markazi",
    'Tayyorlov markazi',
    'Magistratura markazi',
  ],
  "Xorijiy o'qituvchilar": ["Xorijiy o'qituvchilar"],
  Kengashlar: ['Jamoatchilik boshqaruvi va nazorati kengashi'],
};

const activityMenus = {
  "Ma'naviy-ma'rifiy faoliyat": [
    'Talabalar hayoti',
    'Tyutorlik faoliyati',
    'Universitet psixologi',
    "Ma'naviyat rukni",
  ],
  'Ilmiy faoliyat': [
    'Ilmiy markazlar',
    'Kengash',
    'Ilmiy kengashlar',
    'Avtoreferatlar',
    'Ilmiy jurnallar',
    'Anjumanlar',
    'Iqtidorli talabalar',
    'Doktorantura',
    'Ilmiy laboratoriyalar',
    'Ilmiy-innovatsion ishlanmalarni tijoratlashtirish',
    'Muzeylar',
    'Samarqand davlat universiteti Kuzatuv Kengashi',
  ],
  'Moliyaviy faoliyat': [
    'Xalqaro hamkor tashkilotlar',
    "Xalqaro o'qituvchilar",
    "Xorijda malaka oshirish va ta'lim",
    'Jalb etilgan sarmoyalar va grantlar',
    'Yozgi maktablar',
    'Xalqaro IT mutaxassislarini jalb qilish',
    'Amaldagi loyihalar',
  ],
  'Xalqaro aloqalar': [
    'Xalqaro hamkor tashkilotlar',
    "Xalqaro o'qituvchilar",
    "Xorijda malaka oshirish va ta'lim",
    'Jalb etilgan sarmoyalar va grantlar',
    'Yozgi maktablar',
    'Xalqaro IT mutaxassislarini jalb qilish',
    'Amaldagi loyihalar',
  ],
  'Universitet qo‘llab-quvvatlash markazi': ['Universitet qo‘llab-quvvatlash markazi'],
  Vakansiyalar: ['Vakansiyalar'],
  'Korrupsiyaga qarshi kurash': [
    'Korrupsiyaga qarshi kurashish "Komplayens-nazorat" tizimini boshqarish bo\'limi',
    'Murojaat',
    'Korrupsiyaga qarshi kurash',
    "O'tkazilayotgan tadbirlar",
  ],
  'Ekofaol talabalar': ["O'tkazilayotgan tadbirlar", 'Ekofaol talabalar'],
};

const admissionMenus = {
  Bakalavriat: [
    'Eslatma',
    'Qabul nizomi',
    'Qabul kvotasi',
    "Hujjatlar to'plami",
    "Imtihon fanlari ro'yxati",
    "Ko'zi ojiz abituriyentlar uchun",
    "Qabul komissiyasi joylashuv o'rni",
    "Samarqand davlat universiteti xalqaro ta'lim dasturlari markazi",
    "Ta'lim yo'nalishlari",
    'Imtihon dasturlari',
    "O'tish ballari",
    'Akademik litsey bitiruvchilari qabuli',
    'Xorijlik talabalar uchun qabul',
    'Institutlar va Fakultetlar',
  ],
  Magistratura: [
    "Samarqand davlat universiteti xalqaro ta'lim dasturlari markazi",
    'Eslatma',
    'Qabul nizomi',
    'Qabul kvotasi',
    "Hujjatlar to'plami",
    'Qabul monitoringi',
    "Qabul komissiyasi joylashuv o'rni",
    'Mutaxassisliklar',
    'Institutlar va Fakultetlar',
  ],
  'Ikkinchi va undan keyingi oliy ta’limga qabul': ['Ikkinchi va undan keyingi oliy ta’limga qabul'],
  'Texnikum bitiruvchilari uchun qabul': ['Qabul natijalari'],
  'Xalqaro qo‘shma ta’lim dasturlari': ['Xalqaro qo‘shma ta’lim dasturlari'],
  'Virtual tur': ['Virtual tur'],
};

const studentMenus = {
  Bakalavriat: [
    "Yo'riqnoma",
    'Kontingent',
    'Stipendiyalar',
    'Talabalar turar joylari',
    'Davlat imtihonlari',
    'Talabaning axborot paketi',
    'Grantlarni taqdim etish va qayta taqsimlash',
  ],
  Magistratura: [
    "Yo'riqnoma",
    'Kontingent',
    'Stipendiyalar',
    'Davlat imtihonlari',
    "Magistrlik dissertatsiyasi mavzulari to'g'risida e'lonlar",
    'Grantlarni taqdim etish va qayta taqsimlash',
  ],
  'Xorijiy talabalar': [
    'Study in Uzbekistan',
    'Xorijiy talabalar uchun hujjat topshirish',
    "Xorijiy talabalar to'g'risida ma'lumotlar",
    "Xorijiy talabalar uchun to'lov-kontrakt miqdori",
    'Xorijiy talabalarning xavfsizligi',
    'Xorijiy talabalar turar joylari',
    'Broshyuralar',
  ],
};

const structureLinks = [
  'Rahbariyat',
  'Institutlar',
  'Fakultetlar',
  'Kafedralar',
  "Boshqarma va bo'limlar",
  'Markazlar',
  "Xorijiy o'qituvchilar",
  'Kengashlar',
];

const activityLinks = [
  "Ma'naviy-ma'rifiy faoliyat",
  'Ilmiy faoliyat',
  'Moliyaviy faoliyat',
  'Xalqaro aloqalar',
  'Universitet qo‘llab-quvvatlash markazi',
  'Vakansiyalar',
  'Korrupsiyaga qarshi kurash',
  'Ekofaol talabalar',
];

const admissionLinks = [
  'Bakalavriat',
  'Magistratura',
  'Ikkinchi va undan keyingi oliy ta’limga qabul',
  'Texnikum bitiruvchilari uchun qabul',
  'Xalqaro qo‘shma ta’lim dasturlari',
  'Virtual tur',
];

const studentLinks = ['Bakalavriat', 'Magistratura', 'Xorijiy talabalar'];

const menuGroup = (label, children) => ({ label, children });
const toMenuItems = (items) => items.map((item) => {
  const menuItem = typeof item === 'string' ? { label: item } : item;
  return menuItem.children
    ? { ...menuItem, children: toMenuItems(menuItem.children) }
    : menuItem;
});

const structureItems = [
  menuGroup('Rahbariyat', leadershipLinks),
  menuGroup('Institutlar', instituteLinks),
  ...Object.entries(structureMenus).map(([label, children]) => menuGroup(label, children)),
];

const activityItems = activityLinks.map((label) => activityMenus[label]
  ? menuGroup(label, activityMenus[label])
  : { label });

const admissionItems = admissionLinks.map((label) => menuGroup(label, admissionMenus[label]));
const studentItems = studentLinks.map((label) => menuGroup(label, studentMenus[label]));

export const sidebarNavigation = toMenuItems([
  {
    label: 'Unversitet',
    icon: 'building',
    id: 'university-submenu',
    children: [
      menuGroup('Unversitet yangiliklari', universityNewsLinks),
      menuGroup('Unversitet haqida', universityAboutLinks),
      menuGroup('Hujjatlar', documentLinks),
    ],
  },
  { label: 'Tuzilma', icon: 'structure', id: 'structure-submenu', children: structureItems },
  { label: 'Foaliat', icon: 'activity', id: 'activity-submenu', children: activityItems },
  { label: 'Qabul 2026', icon: 'admissions', id: 'admission-submenu', children: admissionItems },
  { label: 'Talabalar', icon: 'students', id: 'students-submenu', children: studentItems },
]);
