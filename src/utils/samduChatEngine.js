/**
 * Samarqand davlat universiteti (SamDU) AI ChatBot Bilimlar Bazasi va Qidiruv Dvigateli.
 * Saytning barcha rasmiy ma'lumotlari (Fakultetlar, Qabul 2026, HEMIS, Stipendiyalar,
 * Rahbariyat, Manzil va Aloqa) asosida 4 tilda (uz, qr, ru, en) ishlaydi.
 */

export const quickPromptChips = {
  uz: [
    '🎓 Qabul 2026 qachon?',
    '🏛 Qanday fakultetlar bor?',
    '💰 Stipendiya miqdori qancha?',
    '📍 SamDU qayerda joylashgan?',
    '💻 HEMIS tizimiga kirish',
    '📞 Rektorat bilan bog‘lanish',
  ],
  qr: [
    '🎓 Qabıllaw 2026 qashan?',
    '🏛 Qanday fakultetler bar?',
    '💰 Stipendiya muǵdarı qansha?',
    '📍 SamDU qay jerde jaylasqan?',
    '💻 HEMIS sistemasına kiriw',
    '📞 Basshılıq penen baylanıs',
  ],
  ru: [
    '🎓 Приём 2026',
    '🏛 Факультеты и институты',
    '💰 Размер стипендии',
    '📍 Где находится СамГУ?',
    '💻 Система HEMIS',
    '📞 Контакты ректората',
  ],
  en: [
    '🎓 Admissions 2026',
    '🏛 Faculties & Institutes',
    '💰 Scholarship amounts',
    '📍 Campus location',
    '💻 HEMIS student portal',
    '📞 Rectorate contacts',
  ],
};

const knowledgeBase = [
  // 1. SALOMLASHISH VA UMUMIY TANISHTIRUV
  {
    id: 'greeting',
    keywords: ['salom', 'assalomu alaykum', 'salom alaykum', 'privet', 'zdravstvuyte', 'hello', 'hi', 'hey', 'qalaysiz', 'kimsiz', 'kim bu', 'nima qila olasan'],
    response: {
      uz: {
        text: 'Assalomu alaykum! Men Sharof Rashidov nomidagi Samarqand davlat universitetining rasmiy **AI Maslahatchisiman**.\n\nSizga SamDU fakultetlari, Qabul 2026, stipendiya va kontraktlar, HEMIS tizimi, manzil va boshqa barcha masalalarda yordam bera olaman. Sizni nima qiziqtiradi?',
        suggestions: ['🎓 Qabul 2026', '🏛 Fakultetlar', '📍 Lokatsiya va manzil', '💰 Stipendiyalar'],
      },
      qr: {
        text: 'Ássalamualeykum! Men Sharof Rashidov atındaǵı Samarqand mámleketlik universitetiniń rasmiy **AI Máslahátshisimen**.\n\nSizge SamDU fakultetleri, Qabıllaw 2026, stipendiya hám kontraktlar, HEMIS sisteması hám basqa barlıq máselelerde járdem bere alaman. Qanday sorawıńız bar?',
        suggestions: ['🎓 Qabıllaw 2026', '🏛 Fakultetler', '📍 Jaylasqan ornı', '💰 Stipendiyalar'],
      },
      ru: {
        text: 'Здравствуйте! Я официальный **AI-Консультант** Самаркандского государственного университета имени Шарофа Рашидова.\n\nЯ могу предоставить информацию о приёме 2026, факультетах, стипендиях, системе HEMIS, контактах и многом другом. Чем я могу помочь вам?',
        suggestions: ['🎓 Приём 2026', '🏛 Факультеты', '📍 Локация и адрес', '💰 Стипендии'],
      },
      en: {
        text: 'Hello! I am the official **AI Advisor** of Samarkand State University named after Sharof Rashidov.\n\nI can help you with admissions 2026, faculties, scholarships, tuition fees, HEMIS portal, campus location, and university contacts. How can I assist you today?',
        suggestions: ['🎓 Admissions 2026', '🏛 Faculties', '📍 Campus location', '💰 Scholarships'],
      },
    },
  },

  // 2. QABUL 2026 (BAKALAVR, MAGISTRATURA, KVOTALAR)
  {
    id: 'admissions',
    keywords: ['qabul', 'qabul 2026', 'hujjat topshirish', 'kvota', 'imtihon', 'imtihonlar', 'ball', 'ballar', 'otish bali', 'bakalavr', 'magistratura', 'abituriyent', 'priyom', 'postupleniye', 'admission', 'apply'],
    response: {
      uz: {
        text: '🎓 **SamDU Qabul 2026 bo‘yicha asosiy ma’lumotlar:**\n\n• **Bakalavriat:** 76 ta ta’lim yo‘nalishi (kunduzgi, kechki va masofaviy shakllarda).\n• **Magistratura:** 40 dan ortiq mutaxassisliklar.\n• **Xorijiy talabalar qabuli:** admission.samdu.uz portali orqali onlayn qabul qilinadi.\n• **Kerakli hujjatlar:** Pasport/ID, attestat yoki diplom, 3.5x4.5 fotosurat.\n• **Qabul komissiyasi manzili:** Samarqand shahri, Universitet xiyoboni, 15-uy (Bosh bino).',
        link: { hash: 'Qabul 2026', label: 'Qabul 2026 bo‘limini ochish' },
        suggestions: ['Bakalavriat yo‘nalishlari', 'Magistratura qabuli', 'Xorijiy talabalar uchun qabul'],
      },
      qr: {
        text: '🎓 **SamDU Qabıllaw 2026 boyınsha tiykarǵı maǵlıwmatlar:**\n\n• **Bakalavriat:** 76 bilimlendiriw baǵdarı.\n• **Magistratura:** 40 tan aslam qánigelik.\n• **Sırt elli studentler:** admission.samdu.uz arqalı onlayn tapsıradı.\n• **Qabıllaw komissiyası mánzili:** Samarqand qalası, Universitet xiyabanı, 15-úy.',
        link: { hash: 'Qabul 2026', label: 'Qabıllaw 2026 bólimin ashıw' },
        suggestions: ['Bakalavriat baǵdarları', 'Magistratura qabıllawı'],
      },
      ru: {
        text: '🎓 **Приём 2026 в Самаркандский государственный университет:**\n\n• **Бакалавриат:** 76 образовательных направлений (дневное, вечернее, дистанционное).\n• **Магистратура:** более 40 специальностей.\n• **Иностранные абитуриенты:** подача онлайн через admission.samdu.uz.\n• **Приёмная комиссия:** г. Самарканд, Университетский бульвар, дом 15.',
        link: { hash: 'Qabul 2026', label: 'Открыть раздел Приём 2026' },
        suggestions: ['Направления бакалавриата', 'Магистратура СамГУ', 'Контакты приёмной комиссии'],
      },
      en: {
        text: '🎓 **SamSU Admissions 2026 Key Highlights:**\n\n• **Undergraduate:** 76 study programs (full-time, evening, distance).\n• **Graduate (Master’s):** Over 40 specializations.\n• **International applicants:** Online applications open via admission.samdu.uz.\n• **Admissions Office:** 15 University Boulevard, Samarkand.',
        link: { hash: 'Qabul 2026', label: 'Open Admissions 2026' },
        suggestions: ['Undergraduate programs', 'Master’s degree admission', 'International students'],
      },
    },
  },

  // 3. FAKULTETLAR VA INSTITUTLAR
  {
    id: 'faculties',
    keywords: ['fakultet', 'fakultetlar', 'institut', 'institutlar', 'kafedra', 'yuridik', 'matematika', 'tarix', 'fizika', 'geografiya', 'biologiya', 'kimyo', 'fakulteti', 'instituti', 'faculties', 'institutes', 'факультет', 'факультеты', 'институт', 'институты', 'кафедра', 'юридический', 'стипендия', 'стипендии'],
    response: {
      uz: {
        text: '🏛 **SamDUda 14 ta fakultet va 8 ta ilmiy-tadqiqot instituti mavjud:**\n\n**Asosiy fakultetlar:**\n• Yuridik fakulteti\n• Matematika fakulteti\n• Tarix fakulteti\n• Geografiya va ekologiya fakulteti\n• Telekommunikatsiya va kompyuter injiniring fakulteti\n• Psixologiya va ijtimoiy-siyosiy fanlar fakulteti\n\n**Institutlar:**\n• Sun’iy intellekt va raqamli texnologiyalar instituti\n• Yadro texnologiyalari instituti\n• Muhandislik fizikasi instituti\n• Biokimyo instituti\n• Agrobiotexnologiyalar va oziq-ovqat xavfsizligi instituti',
        link: { hash: 'Fakultetlar', label: 'Barcha fakultetlarni ko‘rish' },
        suggestions: ['Yuridik fakulteti haqida', 'Sun’iy intellekt instituti', 'Institutlar ro‘yxati'],
      },
      qr: {
        text: '🏛 **SamDU quramında 14 fakultet hám 8 ilimiy-izertlew institutı iskerlik kórsetpekte:**\n\n• Yuridika fakulteti\n• Matematika fakulteti\n• Tariyx fakulteti\n• Geografiya hám ekologiya fakulteti\n• Jasalma intellekt hám cifrlı texnologiyalar institutı\n• Biokimyo institutı hám basqalar.',
        link: { hash: 'Fakultetlar', label: 'Fakultetler dizimin ashıw' },
        suggestions: ['Yuridika fakulteti', 'Institutlar'],
      },
      ru: {
        text: '🏛 **В СамГУ действуют 14 факультетов и 8 научно-исследовательских институтов:**\n\n**Популярные факультеты:**\n• Юридический факультет\n• Математический факультет\n• Исторический факультет\n• Факультет географии и экологии\n• Факультет телекоммуникаций и компьютерной инженерии\n\n**Научно-исследовательские институты:**\n• Институт ИИ и цифровых технологий\n• Институт ядерных технологий\n• Институт инженерной физики\n• Институт биохимии и агробиотехнологий.',
        link: { hash: 'Fakultetlar', label: 'Открыть список факультетов' },
        suggestions: ['Юридический факультет', 'Институт искусственного интеллекта', 'Институты СамГУ'],
      },
      en: {
        text: '🏛 **SamSU comprises 14 Faculties and 8 Research Institutes:**\n\n**Core Faculties:**\n• Faculty of Law\n• Faculty of Mathematics\n• Faculty of History\n• Faculty of Geography & Ecology\n• Faculty of Telecommunications & Computer Engineering\n\n**Institutes:**\n• Institute of Artificial Intelligence & Digital Technologies\n• Institute of Nuclear Technologies\n• Institute of Engineering Physics\n• Institute of Biochemistry.',
        link: { hash: 'Fakultetlar', label: 'Browse all faculties' },
        suggestions: ['Faculty of Law', 'AI Research Institute', 'All institutes'],
      },
    },
  },

  // 4. STIPENDIYA VA KONTRAKT MIQDORLARI
  {
    id: 'scholarships',
    keywords: ['stipendiya', 'stipendiyalar', 'kontrakt', 'tulov', 'narx', 'narxi', 'qancha', 'stipendiya miqdori', 'grant', 'alo', 'alochi', 'doktorantura', 'scholarship', 'tuition'],
    response: {
      uz: {
        text: '💰 **SamDU Talabalar stipendiyasi va moliyaviy ma’lumotlar (2026):**\n\n• **Bazaviy stipendiya:** 517 880 so‘m/oy\n• **“A’lochi” talaba (+20% ustama):** 621 456 so‘m/oy\n• **Ijtimoiy / Nogironlik (+50%):** 776 820 so‘m/oy\n• **Tayanch doktorantura (PhD):** 6 210 435 so‘m/oy\n• **Doktorantura (DSc):** 7 934 850 so‘m/oy\n• **Prezident va nomli stipendiyalar:** Tanlov asosida maxsus oshirilgan miqdorda beriladi.',
        link: { hash: 'Stipendiyalar', label: 'Stipendiyalar va kalkulyator sahifasi' },
        suggestions: ['Stipendiya kalkulyatori', 'Qabul kvotasi', 'Erasmus+ grantlari'],
      },
      qr: {
        text: '💰 **SamDU Stipendiyalar muǵdarı:**\n\n• **Tiykarǵı stipendiya:** 517 880 so‘m/ay\n• **«A’lo» student (+20%):** 621 456 so‘m/ay\n• **Sociallıq qosımsha (+50%):** 776 820 so‘m/ay\n• **Tayansh doktorantura (PhD):** 6 210 435 so‘m/ay.',
        link: { hash: 'Stipendiyalar', label: 'Stipendiyalar betin ashıw' },
        suggestions: ['Stipendiyalar kalkulyatorı'],
      },
      ru: {
        text: '💰 **Размеры стипендий в СамГУ:**\n\n• **Базовая стипендия:** 517 880 сум/месяц\n• **Студентам-отличникам (+20%):** 621 456 сум/месяц\n• **Социальная надбавка (+50%):** 776 820 сум/месяц\n• **Базовая докторантура (PhD):** 6 210 435 сум/месяц\n• **Докторантура (DSc):** 7 934 850 сум/месяц.',
        link: { hash: 'Stipendiyalar', label: 'Открыть калькулятор стипендий' },
        suggestions: ['Калькулятор стипендий', 'Контрактные платежи'],
      },
      en: {
        text: '💰 **SamSU Student Scholarships (Monthly Rates):**\n\n• **Base Stipend:** 517,880 UZS/month\n• **Honors Students (+20%):** 621,456 UZS/month\n• **Social/Disability allowance (+50%):** 776,820 UZS/month\n• **PhD Fellows:** 6,210,435 UZS/month\n• **DSc Fellows:** 7,934,850 UZS/month.',
        link: { hash: 'Stipendiyalar', label: 'View scholarship calculator' },
        suggestions: ['Scholarship calculator', 'Tuition details'],
      },
    },
  },

  // 5. MANZIL, LOKATSIYA VA XARITA
  {
    id: 'location',
    keywords: ['manzil', 'lokatsiya', 'joylashuv', 'qayerda', 'xarita', 'qanday boriladi', 'avtobus', 'bosh bino', 'bulvar', 'universitet xiyoboni', 'marshrut', 'location', 'address', 'map', 'campus', 'where', 'directions', 'адрес', 'где', 'бульвар'],
    response: {
      uz: {
        text: '📍 **Samarqand davlat universiteti joylashuvi va xaritasi:**\n\n• **Manzil:** 140104, Samarqand shahri, Universitet xiyoboni, 15-uy.\n• **Mo‘ljal:** Mirzo Ulug‘bek xiyoboni, Registrator ofisi yonida.\n• **GPS Koordinatalari:** 39.64817° N, 66.95837° E.\n• **Jamoat transporti:** “Universitet xiyoboni” bekati (12, 19, 22, 52, 92-avtobuslar).\n\n*Saytimizning eng quyi qismida interaktiv Google/OSM xarita o‘rnatilgan.*',
        link: { hash: 'Aloqa', label: 'Xarita va aloqa sahifasiga o‘tish' },
        suggestions: ['Xaritada ko‘rish', 'Rektorat bilan bog‘lanish', 'Telefon raqamlari'],
      },
      qr: {
        text: '📍 **Samarqand mámleketlik universiteti mánzili:**\n\n• **Mánzil:** 140104, Samarqand qalası, Universitet xiyabanı, 15-úy.\n• **Baǵdar:** Mirzo Uluǵbek xiyabanı qasında.\n• **Avtobuslar:** 12, 19, 22, 52, 92-sanlı jámiyetlik transportlar.',
        link: { hash: 'Aloqa', label: 'Baylanıs betin ashıw' },
        suggestions: ['Kartada kóriw', 'Telefon nomerler'],
      },
      ru: {
        text: '📍 **Локация и адрес СамГУ:**\n\n• **Адрес:** 140104, г. Самарканд, Университетский бульвар, дом 15.\n• **Ориентир:** Университетский бульвар, рядом с Офисом регистратора.\n• **Координаты GPS:** 39.64817° N, 66.95837° E.\n• **Общественный транспорт:** Автобусы № 12, 19, 22, 52, 92.\n\n*В футере сайта доступна интерактивная визуальная карта с маршрутами.*',
        link: { hash: 'Aloqa', label: 'Перейти к карте и контактам' },
        suggestions: ['Посмотреть на карте', 'Контакты и телефон', 'Приёмная комиссия'],
      },
      en: {
        text: '📍 **SamSU Campus Location & Directions:**\n\n• **Address:** 15 University Boulevard, Samarkand 140104, Uzbekistan.\n• **Landmark:** University Boulevard, next to the Registrar Office.\n• **GPS Coordinates:** 39.64817° N, 66.95837° E.\n• **Public Transit:** Buses 12, 19, 22, 52, 92 (University Blvd stop).\n\n*An interactive live map is available at the bottom of the page.*',
        link: { hash: 'Aloqa', label: 'View campus map & contacts' },
        suggestions: ['View on map', 'University phone numbers'],
      },
    },
  },

  // 6. ALOQA, TELEFON VA REKVIZITLAR
  {
    id: 'contact',
    keywords: ['aloqa', 'telefon', 'raqam', 'nomer', 'email', 'pochta', 'devonxona', 'rekvizit', 'inn', 'stir', 'mfo', 'gaznachilik', 'call', 'contact', 'phone'],
    response: {
      uz: {
        text: '📞 **SamDU bilan bog‘lanish va rasmiy rekvizitlar:**\n\n• **Bosh telefon:** +998 (66) 240-38-40\n• **Devonxona pochtasi:** devonxona@samdu.uz\n• **STIR (INN):** 200874221\n• **MFO:** 00014\n• **G‘aznachilik hisob raqami:** 23402000300100001010\n• **Ijtimoiy tarmoqlar:** Telegram (@samduuz), Facebook, Instagram, YouTube.',
        link: { hash: 'Rekvizitlar', label: 'Rekvizitlar bo‘limiga o‘tish' },
        suggestions: ['Rektorat qabul vaqtlari', 'Devonxona', 'SamDU xaritasi'],
      },
      qr: {
        text: '📞 **SamDU Baylanıs hám rekvizitler:**\n\n• **Telefon:** +998 (66) 240-38-40\n• **Pochta:** devonxona@samdu.uz\n• **STIR (INN):** 200874221\n• **MFO:** 00014\n• **Ǵáziyne esap beti:** 23402000300100001010.',
        link: { hash: 'Rekvizitlar', label: 'Rekvizitler bólimin ashıw' },
        suggestions: ['Telefon nomerler'],
      },
      ru: {
        text: '📞 **Контакты и реквизиты СамГУ:**\n\n• **Телефон канцелярии:** +998 (66) 240-38-40\n• **Электронная почта:** devonxona@samdu.uz\n• **ИНН (STIR):** 200874221\n• **МФО:** 00014\n• **Казначейский счет:** 23402000300100001010\n• **Соцсети:** Telegram (@samduuz), YouTube, Facebook, Instagram.',
        link: { hash: 'Rekvizitlar', label: 'Открыть реквизиты' },
        suggestions: ['Телефон ректората', 'Карта и адрес'],
      },
      en: {
        text: '📞 **SamSU Contact Information & Bank Details:**\n\n• **General Inquiries:** +998 (66) 240-38-40\n• **Email:** devonxona@samdu.uz\n• **Tax ID (TIN):** 200874221\n• **Bank Code (MFO):** 00014\n• **Treasury Account:** 23402000300100001010\n• **Social Media:** Telegram (@samduuz), YouTube, Facebook, Instagram.',
        link: { hash: 'Rekvizitlar', label: 'View organization details' },
        suggestions: ['Rectorate contact', 'Campus location'],
      },
    },
  },

  // 7. REKTOR VA RAHBARIYAT
  {
    id: 'rector',
    keywords: ['rektor', 'rahbariyat', 'prorektor', 'xolmurodov', 'rustam xolmurodov', 'rahbar', 'dekan', 'boshqaruv', 'rector', 'leadership'],
    response: {
      uz: {
        text: '👔 **SamDU Rektori va Rahbariyati:**\n\n• **Rektor:** Rustam Ibragimovich Xolmurodov — professor, texnika fanlari doktori, O‘zbekiston Respublikasi fan arbobi.\n• **O‘quv ishlari bo‘yicha birinchi prorektor**\n• **Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor**\n• **Yoshlar masalalari va ma’naviy-ma’rifiy ishlar bo‘yicha birinchi prorektor**\n• **Xalqaro hamkorlik bo‘yicha prorektor**\n• **Moliya va iqtisod ishlari bo‘yicha prorektor**',
        link: { hash: 'Universitet rektori', label: 'Rektor sahifasiga o‘tish' },
        suggestions: ['Rektor murojaati', 'Rahbariyat ro‘yxati', 'Bog‘lanish'],
      },
      qr: {
        text: '👔 **SamDU Rektorı hám Basshılıǵı:**\n\n• **Rektor:** Rustam Ibragimovich Xolmurodov — professor, Ózbekstan Respublikası ilim ǵayratkeri.\n• Oqıw, ilim, xalıqaralıq hám jaslar isleri boyınsha prorektorlar.',
        link: { hash: 'Universitet rektori', label: 'Rektor betin ashıw' },
        suggestions: ['Basshılıq dizimi'],
      },
      ru: {
        text: '👔 **Руководство СамГУ:**\n\n• **Ректор:** Рустам Ибрагимович Халмурадов — профессор, доктор технических наук, Заслуженный деятель науки Республики Узбекистан.\n• Проректоры по учебной работе, научной деятельности, международным связям и молодежной политике.',
        link: { hash: 'Universitet rektori', label: 'Страница ректора' },
        suggestions: ['Обращение ректора', 'Список руководства'],
      },
      en: {
        text: '👔 **SamSU Leadership & Administration:**\n\n• **Rector:** Prof. Rustam Ibragimovich Khalmuradov — Doctor of Technical Sciences, Honored Scientist of Uzbekistan.\n• Vice-rectors for Academic Affairs, Research, International Cooperation, Youth Affairs, and Finance.',
        link: { hash: 'Universitet rektori', label: 'View Rector’s page' },
        suggestions: ['Rector’s message', 'Administration list'],
      },
    },
  },

  // 8. HEMIS VA RAQAMLI TIZIMLAR
  {
    id: 'hemis',
    keywords: ['hemis', 'hemis talaba', 'hemis otm', 'registrator', 'baho', 'jadval', 'kredit', 'modul', 'student.samdu.uz', 'hemis.samdu.uz'],
    response: {
      uz: {
        text: '💻 **SamDU HEMIS Axborot Tizimlari:**\n\n• **Talabalar portali:** student.samdu.uz — dars jadvali, baholar, davomat, fanlar ro‘yxati va GPA monitoringi.\n• **OTM axborot tizimi:** hemis.samdu.uz — o‘qituvchilar va ma’muriyat uchun.\n• **Registrator ofisi:** Talabalarning akademik harakatchanligi, ma’lumotnomalar va diplom berish masalalari bilan shug‘ullanadi.',
        link: { hash: 'Samarqand davlat universiteti “Registrator ofisi”', label: 'Registrator ofisi sahifasi' },
        suggestions: ['student.samdu.uz ga o‘tish', 'Kutubxona tizimi', 'Talabalar hayoti'],
      },
      qr: {
        text: '💻 **SamDU HEMIS Sistemaları:**\n\n• **Student portali:** student.samdu.uz — sabaq kestesi, baholar hám kreditler.\n• **OTM sisteması:** hemis.samdu.uz.',
        link: { hash: 'Talabalar hayoti', label: 'Studentler turmısı beti' },
        suggestions: ['HEMIS portalı'],
      },
      ru: {
        text: '💻 **Информационные системы HEMIS СамГУ:**\n\n• **Студенческий портал:** student.samdu.uz — расписание занятий, журнал оценок, посещаемость, GPA.\n• **Система вуза:** hemis.samdu.uz — для преподавателей и деканатов.\n• **Офис регистратора:** справки, ведомости и академический учет.',
        link: { hash: 'Samarqand davlat universiteti “Registrator ofisi”', label: 'Офис регистратора' },
        suggestions: ['Студенческая жизнь', 'Электронная библиотека'],
      },
      en: {
        text: '💻 **SamSU HEMIS Digital Systems:**\n\n• **Student Portal:** student.samdu.uz — class schedules, gradebook, attendance, GPA tracking.\n• **Faculty/University Portal:** hemis.samdu.uz.\n• **Registrar Office:** Handles academic records, certificates, and transcripts.',
        link: { hash: 'Samarqand davlat universiteti “Registrator ofisi”', label: 'Registrar Office' },
        suggestions: ['Student life', 'Digital services'],
      },
    },
  },

  // 9. KUTUBXONA VA RESURSLAR
  {
    id: 'library',
    keywords: ['kutubxona', 'kitob', 'unilibrary', 'arm', 'axborot resurs', 'qo‘lyozma', 'maqola', 'darslik', 'library', 'books'],
    response: {
      uz: {
        text: '📚 **SamDU Axborot-resurs markazi va Kutubxona:**\n\n• **Kitob fondi:** 3.8 milliondan ziyod ilmiy, o‘quv adabiyotlari va noyob sharq qo‘lyozmalari fondi.\n• **Elektron kutubxona:** unilibrary.uz va arm.samdu.uz platformalarida minglab kitoblar elektron formatda mavjud.\n• Talabalar va tadqiqotchilar uchun 24/7 rejimida Wi-Fi bilan jihozlangan zamonaviy o‘quv zallari mavjud.',
        link: { hash: 'Axborot-resurs markazi', label: 'Axborot-resurs markazi sahifasi' },
        suggestions: ['Elektron kutubxona', 'Ilmiy jurnallar', 'Talabalar xizmatlari'],
      },
      qr: {
        text: '📚 **SamDU Kitapxana fondı:**\n\n• 3.8 millionnan aslam ilimiy hám kórkem ádebiyatlar.\n• Elektron kitapxana: unilibrary.uz.',
        link: { hash: 'Axborot-resurs markazi', label: 'Kitapxana beti' },
        suggestions: ['Elektron kitapxana'],
      },
      ru: {
        text: '📚 **Информационно-ресурсный центр СамГУ (Библиотека):**\n\n• **Фонд:** более 3.8 млн книг, редких рукописей и научных изданий.\n• **Электронная библиотека:** unilibrary.uz и arm.samdu.uz.\n• Просторные читальные залы с бесплатным Wi-Fi и доступом к мировым базам данных (Scopus, Web of Science).',
        link: { hash: 'Axborot-resurs markazi', label: 'Перейти в раздел библиотеки' },
        suggestions: ['Электронная библиотека', 'Научные журналы'],
      },
      en: {
        text: '📚 **SamSU Information Resource Center (Library):**\n\n• **Collection:** Over 3.8 million academic books, journals, and rare oriental manuscripts.\n• **Digital Library:** Accessible via unilibrary.uz.\n• Equipped with modern study halls, high-speed Wi-Fi, and international database access (Scopus, ScienceDirect).',
        link: { hash: 'Axborot-resurs markazi', label: 'Open Library Page' },
        suggestions: ['Digital library', 'Scientific journals'],
      },
    },
  },

  // 10. YOTOQXONA VA TALABALAR HAYOTI
  {
    id: 'dormitory',
    keywords: ['yotoqxona', 'turar joy', 'yotoqxona arizasi', 'ijtimoiy', 'talabalar uyi', 'ijara', 'dormitory', 'hostel', 'housing'],
    response: {
      uz: {
        text: '🏢 **SamDU Talabalar turar joylari (Yotoqxona):**\n\n• Universitetda barcha qulayliklarga ega zamonaviy talabalar turar joylari (TTJ) mavjud.\n• Xonalarda Wi-Fi, oshxona, kir yuvish xonalari, kutubxona va dam olish hududlari yaratilgan.\n• Ariza topshirish: my.gov.uz yoki dekanatdagi tyutorlar orqali onlayn shaklda qabul qilinadi.',
        link: { hash: 'Talabalar turar joylari', label: 'Talabalar turar joylari sahifasi' },
        suggestions: ['Tyutorlik faoliyati', 'Stipendiyalar', 'Talabalar hayoti'],
      },
      qr: {
        text: '🏢 **SamDU Studentler jataqxanası:**\n\n• Barlıq qolaylıqlarǵa iye zamanagóy jataqxanalar.\n• Arza tapsırıw: my.gov.uz yamasa tyutorlar arqalı ámelge asırıladı.',
        link: { hash: 'Talabalar turar joylari', label: 'Jataqxana beti' },
        suggestions: ['Studentler turmısı'],
      },
      ru: {
        text: '🏢 **Студенческие общежития СамГУ:**\n\n• Университет располагает современными общежитиями со всеми удобствами (Wi-Fi, кухни, прачечные, комнаты отдыха).\n• Подача заявки: онлайн через my.gov.uz или через тьюторов факультета.',
        link: { hash: 'Talabalar turar joylari', label: 'Раздел общежитий' },
        suggestions: ['Студенческая жизнь', 'Стипендии'],
      },
      en: {
        text: '🏢 **SamSU Student Housing & Dormitories:**\n\n• Modern residence halls equipped with high-speed Wi-Fi, kitchen facilities, study areas, and laundry.\n• Applications are submitted online via my.gov.uz or faculty student coordinators (tutors).',
        link: { hash: 'Talabalar turar joylari', label: 'Student Housing Page' },
        suggestions: ['Student life', 'Campus contacts'],
      },
    },
  },

  // 11. XALQARO REYTING VA TARIX
  {
    id: 'history_ranking',
    keywords: ['tarix', 'tarixi', 'reyting', 'qs', 'top 500', 'mirzo ulugbek', 'madrasa', '1420', '1927', 'stars', 'history', 'ranking'],
    response: {
      uz: {
        text: '🌟 **SamDU Tarixi va Xalqaro Nufuzi:**\n\n• **Tarixiy asos:** 1420-yilda Mirzo Ulug‘bek madrasasi tashkil etilishi bilan boshlangan bo‘lib, Markaziy Osiyodagi eng qadimiy ilm markazidir.\n• **Zamonaviy qayta tiklanish:** 1927-yilda Oliy pedagogika instituti sifatida tashkil topgan.\n• **QS World University Rankings:** Dunyoning TOP-500 yetakchi oliygohlari qatorida hamda QS Stars bo‘yicha 5 yulduzli maqomga ega.\n• 60 dan ortiq davlatlar bilan 200 dan ziyod xalqaro memorandumlar imzolangan.',
        link: { hash: 'Unversitet tarixi', label: 'Universitet tarixi sahifasi' },
        suggestions: ['Raqamlarda SamDU', 'Fakultetlar', 'Xalqaro hamkorlik'],
      },
      qr: {
        text: '🌟 **SamDU Tariyxı hám Xalıqaralıq abırayı:**\n\n• 1420-jılda Mirzo Uluǵbek medresesi sıpatında baslanǵan.\n• QS World University Rankings TOP-500 diziminen orın alǵan.',
        link: { hash: 'Unversitet tarixi', label: 'Universitet tarıyxı beti' },
        suggestions: ['Sanlarda SamDU'],
      },
      ru: {
        text: '🌟 **История и международный рейтинг СамГУ:**\n\n• **Истоки:** восходят к медресе Мирзо Улугбека 1420 года.\n• **Современный статус:** воссоздан в 1927 году.\n• **Рейтинг QS:** СамГУ входит в ТОП-500 лучших университетов мира (QS World University Rankings) и имеет рейтинг 5 звёзд по QS Stars.\n• Сотрудничество с более чем 200 вузами из 60 стран.',
        link: { hash: 'Unversitet tarixi', label: 'История университета' },
        suggestions: ['СамГУ в цифрах', 'Международные связи'],
      },
      en: {
        text: '🌟 **SamSU History & Global Rankings:**\n\n• **Historical Roots:** Established in 1420 as the Ulugh Beg Madrasah.\n• **Modern Era:** Re-established in 1927.\n• **QS World Rankings:** Ranked among the TOP-500 universities worldwide with a 5-Star QS rating.\n• Active partnerships with 200+ universities across 60 countries.',
        link: { hash: 'Unversitet tarixi', label: 'Read University History' },
        suggestions: ['SamSU in Numbers', 'Faculties & Institutes'],
      },
    },
  },
];

/**
 * Foydalanuvchi savoliga mos eng yaxshi javobni aniqlash
 */
export function getChatBotAnswer(query, language = 'uz') {
  const lang = ['uz', 'qr', 'ru', 'en'].includes(language) ? language : 'uz';

  if (!query || typeof query !== 'string' || !query.trim()) {
    return knowledgeBase[0].response[lang];
  }

  const clean = query
    .toLowerCase()
    .replace(/[?!.,;:'"«»()]/g, ' ')
    .trim();

  const words = clean.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const kw of item.keywords) {
      if (clean.includes(kw)) {
        score += kw.length > 5 ? 3 : 2;
      }
      for (const w of words) {
        if (w === kw || (kw.length > 4 && w.startsWith(kw))) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Agar aniq kalit so'z topilsa
  if (bestMatch && highestScore >= 2) {
    return bestMatch.response[lang] || bestMatch.response.uz;
  }

  // Fallback (topilmagan holatda)
  const fallbacks = {
    uz: {
      text: `Kechirasiz, savolingiz bo‘yicha to‘liq ma’lumot topilmadi. \n\nSizga quyidagi rasmiy yo‘nalishlar bo‘yicha yordam bera olaman:\n• **Qabul 2026** (hujjatlar, kvotalar va imtihonlar)\n• **Fakultetlar va institutlar**\n• **Stipendiyalar va to‘lov-kontrakt**\n• **Universitet joylashuvi va xaritasi**\n• **HEMIS va kutubxona tizimlari**\n\nYoki rektorat bilan bog‘lanish uchun: +998 (66) 240-38-40.`,
      suggestions: ['🎓 Qabul 2026', '🏛 Fakultetlar', '💰 Stipendiyalar', '📍 Manzil va aloqa'],
    },
    qr: {
      text: `Keshirersiz, sorawıńız boyınsha tolıq maǵlıwmat tabılmadı.\n\nSizge Qabıllaw 2026, fakultetler, stipendiyalar hám jaylasqan ornı boyınsha járdem bere alaman.\nBaylanıs: +998 (66) 240-38-40.`,
      suggestions: ['🎓 Qabıllaw 2026', '🏛 Fakultetler', '💰 Stipendiyalar'],
    },
    ru: {
      text: `К сожалению, точный ответ на ваш запрос не найден.\n\nЯ могу рассказать о:\n• **Приёме 2026** (бакалавриат, магистратура)\n• **Факультетах и институтах СамГУ**\n• **Размерах стипендий и оплате**\n• **Адресе и интерактивной карте**\n• **Системе HEMIS и библиотеке**\n\nТелефон для справок: +998 (66) 240-38-40.`,
      suggestions: ['🎓 Приём 2026', '🏛 Факультеты', '💰 Стипендии', '📍 Где находится СамГУ?'],
    },
    en: {
      text: `I couldn't find a direct answer for your query.\n\nHere are the top topics I can help you with:\n• **Admissions 2026** (Undergraduate & Master’s)\n• **Faculties & Research Institutes**\n• **Scholarship rates & tuition fees**\n• **Campus location & live map**\n• **HEMIS portal & digital library**\n\nDirect contact helpline: +998 (66) 240-38-40.`,
      suggestions: ['🎓 Admissions 2026', '🏛 Faculties', '💰 Scholarships', '📍 Campus location'],
    },
  };

  return fallbacks[lang] || fallbacks.uz;
}
