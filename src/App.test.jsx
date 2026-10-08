import { cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { getSearchCharacterCount, getSiteSearchResults } from './siteSearchIndex';
import { getChatBotAnswer } from './utils/samduChatEngine';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.classList.remove('dark-mode', 'vision-mode');
});

describe('Display mode controls', () => {
  it('toggles and remembers dark mode', () => {
    render(<App />);

    const toggles = screen.getAllByRole('button', { name: 'Tungi rejim' });
    fireEvent.click(toggles[0]);

    expect(toggles).toHaveLength(2);
    expect(toggles[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggles[1]).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement).toHaveClass('dark-mode');
    expect(window.localStorage.getItem('samdu-dark-mode')).toBe('true');
  });

  it('toggles the high-contrast vision mode', () => {
    render(<App />);

    const toggles = screen.getAllByRole('button', { name: 'Ko‘zi ojizlar uchun rejim' });
    fireEvent.click(toggles[0]);

    expect(toggles).toHaveLength(2);
    expect(toggles[0]).toHaveAttribute('aria-pressed', 'true');
    expect(toggles[1]).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement).toHaveClass('vision-mode');
    expect(window.localStorage.getItem('samdu-vision-mode')).toBe('true');
  });

  it('controls nuu.uz style appearance modes, font size, zoom, hide-images and reset', () => {
    render(<App />);

    // Maxsus rejimni yoqish
    const visionToggle = screen.getAllByRole('button', { name: 'Ko‘zi ojizlar uchun rejim' })[0];
    fireEvent.click(visionToggle);

    const panel = screen.getByRole('complementary', { name: 'Maxsus imkoniyatlar' });
    expect(panel).toBeInTheDocument();

    // 1. Ko'rinish rejimi: Oq-qora
    const grayscaleBtn = within(panel).getByRole('button', { name: 'Oq-qora' });
    fireEvent.click(grayscaleBtn);
    expect(document.documentElement).toHaveClass('spc-grayscale');
    expect(window.localStorage.getItem('samdu-vision-appearance')).toBe('grayscale');

    // 2. Ko'rinish rejimi: Qorong'i (invert)
    const darkBtn = within(panel).getByRole('button', { name: 'Qorong‘i' });
    fireEvent.click(darkBtn);
    expect(document.documentElement).toHaveClass('spc-dark');
    expect(window.localStorage.getItem('samdu-vision-appearance')).toBe('dark');

    // 3. Shrift o'lchami: +30%
    const fontPreset = within(panel).getByRole('button', { name: '+30%' });
    fireEvent.click(fontPreset);
    expect(document.documentElement.style.getPropertyValue('--vision-font-scale')).toBe('1.3');
    expect(window.localStorage.getItem('samdu-vision-font-scale')).toBe('30');

    // 4. Sahifa masshtabi: 120%
    const zoomPreset = within(panel).getByRole('button', { name: '120%' });
    fireEvent.click(zoomPreset);
    expect(document.documentElement.style.getPropertyValue('--vision-zoom-scale')).toBe('1.2');
    expect(window.localStorage.getItem('samdu-vision-zoom-scale')).toBe('120');

    // 5. Tasvirlarni yashirish
    const hideImagesBtn = within(panel).getByRole('button', { name: 'Tasvirlarni yashirish' });
    fireEvent.click(hideImagesBtn);
    expect(document.documentElement).toHaveClass('spc-hide-images');
    expect(window.localStorage.getItem('samdu-vision-hide-images')).toBe('true');

    // 6. Standart holatga qaytarish (Reset)
    const resetBtn = within(panel).getByRole('button', { name: 'Standart holatga qaytarish' });
    fireEvent.click(resetBtn);
    expect(document.documentElement).not.toHaveClass('spc-grayscale');
    expect(document.documentElement).not.toHaveClass('spc-dark');
    expect(document.documentElement).not.toHaveClass('spc-hide-images');
    expect(document.documentElement.style.getPropertyValue('--vision-font-scale')).toBe('1');
    expect(document.documentElement.style.getPropertyValue('--vision-zoom-scale')).toBe('1');

    // 7. Panelni yopish
    const closeBtn = within(panel).getByRole('button', { name: 'Sozlamalarni yopish' });
    fireEvent.click(closeBtn);

    // Yopilgandan so'ng ixcham suzuvchi ochish tugmasi chiqadi
    const reopenPill = screen.getByRole('button', { name: 'Maxsus imkoniyatlar' });
    expect(reopenPill).toBeInTheDocument();
  });
});

describe('Site search', () => {
  it('waits for two characters and searches nested sections and slides', () => {
    expect(getSearchCharacterCount('b')).toBe(1);
    expect(getSiteSearchResults('b', 'uz')).toHaveLength(0);
    expect(getSiteSearchResults('bu', 'uz').some((result) => result.label === 'Buxgalteriya')).toBe(true);
    expect(getSiteSearchResults('top-500', 'uz').some((result) => result.type === 'Slayd')).toBe(true);
  });

  it('matches translated menu labels in the selected language', () => {
    expect(getSiteSearchResults('Новости', 'ru').some((result) => result.label === 'Новости')).toBe(true);
  });
});

describe('Sidebar toggle', () => {
  it('opens the sidebar when the menu button is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));

    expect(screen.getByText('Tuzilma')).toBeInTheDocument();
  });

  it('closes the previously expanded branch when another menu is opened', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));

    const universityButton = screen.getByRole('button', { name: 'Unversitet' });
    const structureButton = screen.getByRole('button', { name: 'Tuzilma' });
    fireEvent.click(universityButton);
    expect(universityButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(structureButton);
    expect(structureButton).toHaveAttribute('aria-expanded', 'true');
    expect(universityButton).toHaveAttribute('aria-expanded', 'false');

    const leadershipButton = screen.getByRole('button', { name: 'Rahbariyat' });
    const institutesButton = screen.getByRole('button', { name: 'Institutlar' });
    fireEvent.click(leadershipButton);
    fireEvent.click(institutesButton);

    expect(leadershipButton).toHaveAttribute('aria-expanded', 'false');
    expect(institutesButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows the university submenu when its section is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet' }));

    expect(screen.getByText('Unversitet yangiliklari')).toBeInTheDocument();
    expect(screen.getByText('Unversitet haqida')).toBeInTheDocument();
    expect(screen.getByText('Hujjatlar')).toBeInTheDocument();
  });

  it('shows university news links when its submenu is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet yangiliklari' }));

    const sidebar = screen.getByRole('complementary');
    expect(within(sidebar).getByText('Yangiliklar')).toBeInTheDocument();
    expect(within(sidebar).getByText("E'lonlar")).toBeInTheDocument();
    expect(within(sidebar).getByText('Xalqaro grant-stipendiyalar')).toBeInTheDocument();
    expect(within(sidebar).getByText('Fotogalereya')).toBeInTheDocument();
    expect(within(sidebar).getByText('Videogalereya')).toBeInTheDocument();
  });

  it('shows university information links when its submenu is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet haqida' }));

    const sidebar = screen.getByRole('complementary');
    expect(within(sidebar).getByText('Unversitet tarixi')).toBeInTheDocument();
    expect(within(sidebar).getByText('Unversitet nizomi')).toBeInTheDocument();
    expect(within(sidebar).getByText('Unversitet tuzilmasi')).toBeInTheDocument();
    expect(within(sidebar).getByText('Rekvizitlar')).toBeInTheDocument();
    expect(within(sidebar).getByText('Aloqa')).toBeInTheDocument();
    expect(within(sidebar).getByText('Bitirganlar assotsiatsiyasi')).toBeInTheDocument();
    expect(within(sidebar).getByText('Yashil universitet')).toBeInTheDocument();
    expect(within(sidebar).getByText('Barqaror rivojlanish')).toBeInTheDocument();
  });

  it('shows document categories when Hujjatlar is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Unversitet' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hujjatlar' }));

    expect(screen.getByText('Ish reja')).toBeInTheDocument();
    expect(screen.getByText('Qonunlar')).toBeInTheDocument();
    expect(screen.getByText('Farmonlar')).toBeInTheDocument();
    expect(screen.getByText('Qarorlar')).toBeInTheDocument();
    expect(screen.getByText('Nizomlar va qoidalar')).toBeInTheDocument();
    expect(screen.getByText('Hisobotlar')).toBeInTheDocument();
    expect(screen.getByText('Shartnomalar')).toBeInTheDocument();
    expect(screen.getByText("O'quv-me'yoriy hujjatlar")).toBeInTheDocument();
  });

  it('shows structure categories when Tuzilma is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));

    const sidebar = screen.getByRole('complementary');
    expect(within(sidebar).getByText('Rahbariyat')).toBeInTheDocument();
    expect(within(sidebar).getByText('Institutlar')).toBeInTheDocument();
    expect(within(sidebar).getByText('Fakultetlar')).toBeInTheDocument();
    expect(within(sidebar).getByText('Kafedralar')).toBeInTheDocument();
    expect(within(sidebar).getByText("Boshqarma va bo'limlar")).toBeInTheDocument();
    expect(within(sidebar).getByText('Markazlar')).toBeInTheDocument();
    expect(within(sidebar).getAllByText("Xorijiy o'qituvchilar")).toHaveLength(2);
    expect(within(sidebar).getByText('Kengashlar')).toBeInTheDocument();
  });

  it('shows leadership roles when Rahbariyat is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rahbariyat' }));

    const sidebar = screen.getByRole('complementary');
    expect(within(sidebar).getByText('Universitet rektori')).toBeInTheDocument();
    expect(within(sidebar).getByText("O'quv ishlari bo'yicha birinchi prorektor")).toBeInTheDocument();
    expect(within(sidebar).getByText("O'quv ishlari bo'yicha prorektor")).toBeInTheDocument();
    expect(within(sidebar).getByText('Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor')).toBeInTheDocument();
    expect(within(sidebar).getByText('Yoshlar masalalari va ma’naviy-ma’rifiy ishlar bo‘yicha birinchi prorektor')).toBeInTheDocument();
    expect(within(sidebar).getByText("Moliya va iqtisod ishlari bo'yicha prorektor")).toBeInTheDocument();
    expect(within(sidebar).getByText("Xalqaro hamkorlik bo'yicha prorektor")).toBeInTheDocument();
    expect(within(sidebar).getByText("Qurilish-ta'mirlash ishlari bo'yicha prorektor")).toBeInTheDocument();
    expect(within(sidebar).getByText('Transformatsiya ofisi')).toBeInTheDocument();
  });

  it('shows institute names when Institutlar is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));
    fireEvent.click(screen.getByRole('button', { name: 'Institutlar' }));

    expect(screen.getByText('SamDU Markaziy Osiyo xalqlari tillari va madaniyati instituti')).toBeInTheDocument();
    expect(screen.getByText('SamDU Yadro texnologiyalari instituti')).toBeInTheDocument();
    expect(screen.getAllByText('Sun’iy intellekt va raqamli texnologiyalar instituti')).toHaveLength(2);
    expect(screen.getByText('SamDU Agrobiotexnologiyalar va oziq-ovqat xavfsizligi instituti')).toBeInTheDocument();
    expect(screen.getByText('SamDU Muhandislik fizikasi instituti')).toBeInTheDocument();
    expect(screen.getByText('SamDU Turkologiya ilmiy-tadqiqot instituti')).toBeInTheDocument();
    expect(screen.getByText('SamDU Inson resurslari va mahalla taraqqiyotini boshqarish instituti')).toBeInTheDocument();
    expect(screen.getByText('SamDU Biokimyo instituti')).toBeInTheDocument();
  });

  it('opens the faculty, department, center, and council lists', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));

    const submenuExamples = [
      ['Fakultetlar', 'Matematika fakulteti'],
      ['Kafedralar', 'Yadro texnologiyalari instituti kafedralari'],
      ['Markazlar', 'Osiyo tadqiqotlari markazi'],
      ['Kengashlar', 'Jamoatchilik boshqaruvi va nazorati kengashi'],
    ];

    for (const [menuLabel, expectedLink] of submenuExamples) {
      const menuButton = screen.getByRole('button', { name: menuLabel });
      fireEvent.click(menuButton);

      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(expectedLink)).toBeInTheDocument();
    }
  });

  it('shows management and department entries when that menu is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));
    fireEvent.click(screen.getByRole('button', { name: "Boshqarma va bo'limlar" }));

    expect(screen.getByText('Axborot xizmati')).toBeInTheDocument();
    expect(screen.getByText("Birinchi o'quv-uslubiy boshqarma")).toBeInTheDocument();
    expect(screen.getByText('Buxgalteriya')).toBeInTheDocument();
    expect(screen.getByText('Xalqaro hamkorlik boshqarmasi')).toBeInTheDocument();
    expect(screen.getByText('Reja-moliya bo’limi')).toBeInTheDocument();
    expect(screen.getByText('Ta’lim sifatini nazorat qilish bo’limi')).toBeInTheDocument();
    expect(screen.getByText("Kadrlar bo'limi")).toBeInTheDocument();
    expect(screen.getByText('Yoshlar bilan ishlash, ma’naviyat va ma’rifat boshqarmasi')).toBeInTheDocument();
    expect(screen.getByText('Ilmiy-tadqiqotlar va innovatsion rivojlantirish boshqarmasi')).toBeInTheDocument();
    expect(screen.getByText("SamDU boshlang'ich Kasaba uyushmasi qo'mitasi")).toBeInTheDocument();
    expect(screen.getByText("Yuridik xizmat bo'limi")).toBeInTheDocument();
    expect(screen.getByText('Korrupsiyaga qarshi kurashish "Komplayens-nazorat" tizimini boshqarish bo’limi')).toBeInTheDocument();
    expect(screen.getByText('Xotin-qizlar va gender tenglik masalalari bo‘yicha maslahatchi')).toBeInTheDocument();
    expect(screen.getByText("Marketing va talabalar bilan ishlash bo'limi")).toBeInTheDocument();
    expect(screen.getByText("Devonxona va arxiv bo'limi")).toBeInTheDocument();
    expect(screen.getByText('Innovatsion ishlanmalarni tijoratlashtirish va patentlash bo’limi')).toBeInTheDocument();
    expect(screen.getByText('Samarqand davlat universiteti “Registrator ofisi”')).toBeInTheDocument();
  });

  it('shows the requested single item under Xorijiy o‘qituvchilar', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Tuzilma' }));
    fireEvent.click(screen.getByRole('button', { name: "Xorijiy o'qituvchilar" }));

    expect(screen.getByRole('button', { name: "Xorijiy o'qituvchilar" })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByText("Xorijiy o'qituvchilar")).toHaveLength(2);
  });

  it('shows activity links when Foaliat is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Foaliat' }));

    expect(screen.getByText("Ma'naviy-ma'rifiy faoliyat")).toBeInTheDocument();
    expect(screen.getByText('Ilmiy faoliyat')).toBeInTheDocument();
    expect(screen.getByText('Moliyaviy faoliyat')).toBeInTheDocument();
    expect(screen.getByText('Xalqaro aloqalar')).toBeInTheDocument();
    expect(screen.getAllByText('Universitet qo‘llab-quvvatlash markazi')).toHaveLength(2);
    expect(screen.getAllByText('Vakansiyalar')).toHaveLength(2);
    expect(screen.getAllByText('Korrupsiyaga qarshi kurash')).toHaveLength(2);
    expect(screen.getAllByText('Ekofaol talabalar')).toHaveLength(2);
  });

  it('shows nested spiritual, academic, financial, and international links', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Foaliat' }));

    const submenuExamples = [
      ["Ma'naviy-ma'rifiy faoliyat", ['Talabalar hayoti', 'Tyutorlik faoliyati', 'Universitet psixologi', "Ma'naviyat rukni"]],
      ['Ilmiy faoliyat', ['Ilmiy markazlar', 'Kengash', 'Ilmiy kengashlar', 'Avtoreferatlar', 'Ilmiy jurnallar', 'Anjumanlar', 'Iqtidorli talabalar', 'Doktorantura', 'Ilmiy laboratoriyalar', 'Ilmiy-innovatsion ishlanmalarni tijoratlashtirish', 'Muzeylar', 'Samarqand davlat universiteti Kuzatuv Kengashi']],
      ['Moliyaviy faoliyat', ['Xalqaro hamkor tashkilotlar', "Xalqaro o'qituvchilar", "Xorijda malaka oshirish va ta'lim", 'Jalb etilgan sarmoyalar va grantlar', 'Yozgi maktablar', 'Xalqaro IT mutaxassislarini jalb qilish', 'Amaldagi loyihalar']],
      ['Xalqaro aloqalar', ['Xalqaro hamkor tashkilotlar', "Xalqaro o'qituvchilar", "Xorijda malaka oshirish va ta'lim", 'Jalb etilgan sarmoyalar va grantlar', 'Yozgi maktablar', 'Xalqaro IT mutaxassislarini jalb qilish', 'Amaldagi loyihalar']],
    ];

    for (const [menuLabel, expectedLinks] of submenuExamples) {
      const menuButton = screen.getByRole('button', { name: menuLabel });
      fireEvent.click(menuButton);

      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      const submenu = within(document.getElementById(menuButton.getAttribute('aria-controls')));
      for (const link of expectedLinks) {
        expect(submenu.getByText(link)).toBeInTheDocument();
      }
    }
  });

  it('shows the requested repeated and nested activity items', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Foaliat' }));

    const submenuExamples = [
      ['Universitet qo‘llab-quvvatlash markazi', ['Universitet qo‘llab-quvvatlash markazi']],
      ['Vakansiyalar', ['Vakansiyalar']],
      ['Korrupsiyaga qarshi kurash', ['Korrupsiyaga qarshi kurashish "Komplayens-nazorat" tizimini boshqarish bo\'limi', 'Murojaat', 'Korrupsiyaga qarshi kurash', "O'tkazilayotgan tadbirlar"]],
      ['Ekofaol talabalar', ["O'tkazilayotgan tadbirlar", 'Ekofaol talabalar']],
    ];

    for (const [menuLabel, expectedLinks] of submenuExamples) {
      const menuButton = screen.getByRole('button', { name: menuLabel });
      fireEvent.click(menuButton);

      const submenu = within(document.getElementById(menuButton.getAttribute('aria-controls')));
      for (const link of expectedLinks) {
        expect(submenu.getByText(link)).toBeInTheDocument();
      }
    }
  });

  it('shows admission options when Qabul 2026 is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Qabul 2026' }));

    const admissionMenu = within(document.getElementById('admission-submenu'));
    expect(admissionMenu.getByRole('button', { name: 'Bakalavriat' })).toBeInTheDocument();
    expect(admissionMenu.getByRole('button', { name: 'Magistratura' })).toBeInTheDocument();
    expect(admissionMenu.getByRole('button', { name: 'Ikkinchi va undan keyingi oliy ta’limga qabul' })).toBeInTheDocument();
    expect(admissionMenu.getByRole('button', { name: 'Texnikum bitiruvchilari uchun qabul' })).toBeInTheDocument();
    expect(admissionMenu.getByRole('button', { name: 'Xalqaro qo‘shma ta’lim dasturlari' })).toBeInTheDocument();
    expect(admissionMenu.getByRole('button', { name: 'Virtual tur' })).toBeInTheDocument();
  });

  it('shows the requested links under each admission option', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Qabul 2026' }));

    const admissionMenu = within(document.getElementById('admission-submenu'));
    const submenuExamples = [
      ['Bakalavriat', [
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
      ]],
      ['Magistratura', [
        "Samarqand davlat universiteti xalqaro ta'lim dasturlari markazi",
        'Eslatma',
        'Qabul nizomi',
        'Qabul kvotasi',
        "Hujjatlar to'plami",
        'Qabul monitoringi',
        "Qabul komissiyasi joylashuv o'rni",
        'Mutaxassisliklar',
        'Institutlar va Fakultetlar',
      ]],
      ['Ikkinchi va undan keyingi oliy ta’limga qabul', ['Ikkinchi va undan keyingi oliy ta’limga qabul']],
      ['Texnikum bitiruvchilari uchun qabul', ['Qabul natijalari']],
      ['Xalqaro qo‘shma ta’lim dasturlari', ['Xalqaro qo‘shma ta’lim dasturlari']],
      ['Virtual tur', ['Virtual tur']],
    ];

    for (const [label, expectedLinks] of submenuExamples) {
      const menuButton = admissionMenu.getByRole('button', { name: label });
      fireEvent.click(menuButton);

      const submenu = within(document.getElementById(menuButton.getAttribute('aria-controls')));
      for (const link of expectedLinks) {
        expect(submenu.getByText(link)).toBeInTheDocument();
      }
    }
  });

  it('shows student options when Talabalar is clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Talabalar' }));

    const studentsMenu = within(document.getElementById('students-submenu'));
    expect(studentsMenu.getByRole('button', { name: 'Bakalavriat' })).toBeInTheDocument();
    expect(studentsMenu.getByRole('button', { name: 'Magistratura' })).toBeInTheDocument();
    expect(studentsMenu.getByRole('button', { name: 'Xorijiy talabalar' })).toBeInTheDocument();
  });

  it('shows the requested links under each student option', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /panelini kengaytirish/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Talabalar' }));

    const studentMenu = within(document.getElementById('students-submenu'));
    const submenuExamples = [
      ['Bakalavriat', [
        "Yo'riqnoma",
        'Kontingent',
        'Stipendiyalar',
        'Talabalar turar joylari',
        'Davlat imtihonlari',
        'Talabaning axborot paketi',
        'Grantlarni taqdim etish va qayta taqsimlash',
      ]],
      ['Magistratura', [
        "Yo'riqnoma",
        'Kontingent',
        'Stipendiyalar',
        'Davlat imtihonlari',
        "Magistrlik dissertatsiyasi mavzulari to'g'risida e'lonlar",
        'Grantlarni taqdim etish va qayta taqsimlash',
      ]],
      ['Xorijiy talabalar', [
        'Study in Uzbekistan',
        'Xorijiy talabalar uchun hujjat topshirish',
        "Xorijiy talabalar to'g'risida ma'lumotlar",
        "Xorijiy talabalar uchun to'lov-kontrakt miqdori",
        'Xorijiy talabalarning xavfsizligi',
        'Xorijiy talabalar turar joylari',
        'Broshyuralar',
      ]],
    ];

    for (const [label, expectedLinks] of submenuExamples) {
      const menuButton = studentMenu.getByRole('button', { name: label });
      fireEvent.click(menuButton);

      const submenu = within(document.getElementById(menuButton.getAttribute('aria-controls')));
      for (const link of expectedLinks) {
        expect(submenu.getByText(link)).toBeInTheDocument();
      }
    }
  });

  it('switches the interface through all four languages', () => {
    render(<App />);

    const languageSwitches = [
      ['Tilni tanlash', /QR Qoraqalpoqcha/, 'Bas bet'],
      ['Tildi tańlaw', /Eng Inglisshe/, 'Home'],
      ['Choose language', /Ru Russian/, 'Главная'],
      ['Выбрать язык', /Uz Узбекский/, 'Bosh sahifa'],
    ];

    for (const [menuLabel, optionLabel, expectedHeading] of languageSwitches) {
      expect(screen.getByTestId('language-switcher-navbar-trigger')).toHaveAccessibleName(menuLabel);
      fireEvent.click(screen.getByTestId('language-switcher-navbar-trigger'));
      const languageMenu = within(screen.getByRole('menu'));
      expect(languageMenu.getAllByRole('menuitemradio')).toHaveLength(4);
      for (const code of ['uz', 'qr', 'ru', 'en']) {
        expect(languageMenu.getByTestId(`language-flag-${code}`)).toBeInTheDocument();
      }
      fireEvent.click(screen.getByRole('menuitemradio', { name: optionLabel }));

      expect(screen.getByRole('heading', { name: expectedHeading })).toBeInTheDocument();
    }

    expect(document.documentElement.lang).toBe('uz');
    expect(document.title).toBe('Samarqand davlat universiteti');
    expect(screen.getByRole('button', { name: 'Tuzilma' })).toBeInTheDocument();
    expect(window.localStorage.getItem('samdu-language')).toBe('uz');
  });

  it('animates the language burger and dropdown entries on open and close', () => {
    render(<App />);

    const trigger = screen.getByTestId('language-switcher-navbar-trigger');
    const iconLines = trigger.querySelectorAll('path');
    expect(iconLines).toHaveLength(3);

    fireEvent.click(trigger);

    const menu = document.getElementById('desktop-language-menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(iconLines[0]).toHaveClass('rotate-45');
    expect(iconLines[1]).toHaveClass('opacity-0');
    expect(menu).toHaveClass('opacity-100', 'translate-y-0', 'scale-100');
    expect(within(menu).getAllByRole('menuitemradio')[0]).toHaveClass('translate-x-0', 'opacity-100');

    fireEvent.mouseDown(document.body);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(iconLines[0]).not.toHaveClass('rotate-45');
    expect(menu).toHaveClass('opacity-0', 'translate-y-2', 'scale-95');
  });

  it('places a language switcher under the mobile sidebar navigation', () => {
    render(<App />);

    const sidebar = screen.getByRole('complementary');
    const mobileTrigger = within(sidebar).getByTestId('language-switcher-sidebar-trigger');
    expect(mobileTrigger).toBeInTheDocument();

    fireEvent.click(mobileTrigger);

    const mobileMenu = document.getElementById('mobile-language-menu');
    expect(mobileTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.body).toContainElement(mobileMenu);
    expect(mobileMenu).toHaveClass('fixed', 'opacity-100');
  });
});

describe('SamDU Location Map Widget', () => {
  it('renders interactive map in footer and opens full modal', () => {
    render(<App />);

    // Footer map widget is present
    const mapWidget = document.getElementById('samdu-location-map-widget');
    expect(mapWidget).toBeInTheDocument();
    expect(within(mapWidget).getByText('Bosh bino lokatsiyasi')).toBeInTheDocument();

    // Map iframe is rendered
    const iframes = screen.getAllByTitle('SamDU interaktiv xaritasi');
    expect(iframes.length).toBeGreaterThan(0);

    // Provider toggle works
    const osmBtn = within(mapWidget).getByRole('button', { name: 'OpenStreetMap' });
    fireEvent.click(osmBtn);
    expect(osmBtn).toHaveClass('is-active');

    // Action buttons
    expect(within(mapWidget).getByText('Marshrut')).toBeInTheDocument();
    expect(within(mapWidget).getByText('Yandex')).toBeInTheDocument();

    // Modal opens and closes
    const expandBtn = within(mapWidget).getByTitle('To‘liq ko‘rish');
    fireEvent.click(expandBtn);
    expect(screen.getByText('Samarqand davlat universiteti (Bosh bino)')).toBeInTheDocument();

    const closeBtn = screen.getByTitle('Xaritani yopish');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Samarqand davlat universiteti (Bosh bino)')).not.toBeInTheDocument();
  });
});

describe('Navbar Animated Ticker', () => {
  it('contains interactive links for location, phone, social networks with YouTube, and pauses on hover', () => {
    render(<App />);

    // Phone link
    const phoneLink = screen.getByRole('link', { name: /\(66\) 240-38-40/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+998662403840');

    // Social links: YouTube instead of Twitter
    const youtubeLinks = screen.getAllByRole('link', { name: 'YouTube' });
    expect(youtubeLinks.some((l) => l.getAttribute('href') === 'https://www.youtube.com/@samduuz')).toBe(true);
    expect(screen.queryByRole('link', { name: 'Twitter' })).not.toBeInTheDocument();

    const telegramLinks = screen.getAllByRole('link', { name: 'Telegram' });
    expect(telegramLinks.some((l) => l.getAttribute('href') === 'https://t.me/samduuz')).toBe(true);

    const facebookLinks = screen.getAllByRole('link', { name: 'Facebook' });
    expect(facebookLinks.some((l) => l.getAttribute('href') === 'https://www.facebook.com/samdu.uz')).toBe(true);

    const instagramLinks = screen.getAllByRole('link', { name: 'Instagram' });
    expect(instagramLinks.some((l) => l.getAttribute('href') === 'https://instagram.com/samdu_uz')).toBe(true);

    // Location link
    const locationLink = screen.getByRole('link', { name: /140104, Samarqand shahri, Universitet xiyoboni, 15-uy/i });
    expect(locationLink).toHaveAttribute('href', '#samdu-location-map-widget');

    // President quote link
    const quoteLink = screen.getByRole('link', { name: /Agar mendan sizni nima qiynaydi/i });
    expect(quoteLink).toHaveAttribute('href', '#Unversitet');

    // Hover pause test
    const bannerContainer = quoteLink.closest('.group\\/banner');
    expect(bannerContainer).toBeInTheDocument();
    fireEvent.mouseEnter(bannerContainer);
    fireEvent.mouseLeave(bannerContainer);
  });
});

describe('SamDU AI ChatBot and Knowledge Engine', () => {
  it('correctly retrieves factual university data across languages', () => {
    // Qabul 2026 facts
    const admissionAnsUz = getChatBotAnswer('qabul 2026', 'uz');
    expect(admissionAnsUz.text).toContain('Bakalavriat');
    expect(admissionAnsUz.link?.hash).toBe('Qabul 2026');

    // Fakultetlar
    const facultiesAnsRu = getChatBotAnswer('факультеты', 'ru');
    expect(facultiesAnsRu.text).toContain('Юридический');

    // Stipendiya miqdorlari
    const stipendAnsUz = getChatBotAnswer('stipendiya qancha', 'uz');
    expect(stipendAnsUz.text).toContain('517 880');

    // Manzil va xarita
    const locAnsEn = getChatBotAnswer('where is campus', 'en');
    expect(locAnsEn.text).toContain('University Boulevard');
  });

  it('renders chat trigger, opens chat window and handles user question', async () => {
    render(<App />);

    // Chatbot trigger tugmasi
    const triggerBtn = screen.getByRole('button', { name: 'SamDU AI Maslahatchi' });
    expect(triggerBtn).toBeInTheDocument();

    // Trigger bosilganda chat oynasi ochiladi
    fireEvent.click(triggerBtn);

    const chatWindow = screen.getByRole('dialog');
    expect(chatWindow).toBeInTheDocument();
    expect(within(chatWindow).getByText('SamDU AI Maslahatchi')).toBeInTheDocument();

    // Dastlabki salomlashuv xabari mavjud
    expect(within(chatWindow).getByText(/Sharof Rashidov nomidagi Samarqand davlat universiteti/i)).toBeInTheDocument();

    // Tezkor chip bosilishi
    const quickChip = within(chatWindow).getAllByRole('button', { name: '🎓 Qabul 2026 qachon?' })[0];
    fireEvent.click(quickChip);

    // Foydalanuvchi xabari ko'rinadi
    expect(within(chatWindow).getAllByText('🎓 Qabul 2026 qachon?').length).toBeGreaterThan(0);

    // Yangi suhbat tugmasi
    const resetBtn = within(chatWindow).getByRole('button', { name: 'Yangi suhbat' });
    fireEvent.click(resetBtn);

    // Chatni yopish
    const closeBtn = within(chatWindow).getByRole('button', { name: 'Chatni yopish' });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
