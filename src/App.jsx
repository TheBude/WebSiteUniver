import React, { useEffect, useState } from 'react';
import HeaderBanner from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomeCarousel from './components/HomeCarousel';
import QuickServices from './components/QuickServices';
import NewsSection from './components/NewsSection';
import UniversityStats from './components/UniversityStats';
import RectorWelcome from './components/RectorWelcome';
import Footer from './components/Footer';
import InnerPage from './components/InnerPage';
import ScrollReveal from './components/ScrollReveal';
import SamduFloatingLocationPill from './components/SamduFloatingLocationPill';
import SamduChatBot from './components/SamduChatBot';
import SpecialViewArea from './components/SpecialViewArea';
import UsefulLinks from './components/UsefulLinks';
import { translate } from './i18n';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('samdu-dark-mode') === 'true');
  const [isVisionMode, setIsVisionMode] = useState(() => window.localStorage.getItem('samdu-vision-mode') === 'true');
  const [visionAppearance, setVisionAppearance] = useState(() => window.localStorage.getItem('samdu-vision-appearance') || 'normal');
  const [visionFontScale, setVisionFontScale] = useState(() => {
    const val = Number(window.localStorage.getItem('samdu-vision-font-scale'));
    return Number.isFinite(val) && val >= 0 ? val : 0;
  });
  const [visionZoomScale, setVisionZoomScale] = useState(() => {
    const val = Number(window.localStorage.getItem('samdu-vision-zoom-scale'));
    return Number.isFinite(val) && val >= 100 ? val : 100;
  });
  const [visionHideImages, setVisionHideImages] = useState(() => window.localStorage.getItem('samdu-vision-hide-images') === 'true');
  const [isVisionToolbarOpen, setIsVisionToolbarOpen] = useState(() => window.localStorage.getItem('samdu-vision-mode') === 'true');
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem('samdu-language');
    return ['uz', 'qr', 'ru', 'en'].includes(savedLanguage) ? savedLanguage : 'uz';
  });

  const handleToggleVisionMode = () => {
    setIsVisionMode((prev) => {
      const next = !prev;
      setIsVisionToolbarOpen(next);
      return next;
    });
  };

  const handleResetVisionSettings = () => {
    setVisionAppearance('normal');
    setVisionFontScale(0);
    setVisionZoomScale(100);
    setVisionHideImages(false);
  };

  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return decodeURIComponent(window.location.hash.replace(/^#/, ''));
    }
    return '';
  });

  const changeLanguage = (nextLanguage) => {
    window.localStorage.setItem('samdu-language', nextLanguage);
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language === 'qr' ? 'kaa' : language;
    document.title = translate('Samarqand davlat universiteti', language);
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark-mode', isDarkMode);
    root.classList.toggle('dark', isDarkMode);
    root.classList.toggle('vision-mode', isVisionMode);

    if (isVisionMode) {
      root.classList.toggle('spc-grayscale', visionAppearance === 'grayscale');
      root.classList.toggle('spc-dark', visionAppearance === 'dark');
      root.classList.toggle('spc-hide-images', visionHideImages);
      root.style.setProperty('--vision-font-scale', String((100 + visionFontScale) / 100));
      root.style.setProperty('--vision-zoom-scale', String(visionZoomScale / 100));
    } else {
      root.classList.remove('spc-grayscale', 'spc-dark', 'spc-hide-images');
      root.style.removeProperty('--vision-font-scale');
      root.style.removeProperty('--vision-zoom-scale');
    }

    window.localStorage.setItem('samdu-dark-mode', String(isDarkMode));
    window.localStorage.setItem('samdu-vision-mode', String(isVisionMode));
    window.localStorage.setItem('samdu-vision-appearance', visionAppearance);
    window.localStorage.setItem('samdu-vision-font-scale', String(visionFontScale));
    window.localStorage.setItem('samdu-vision-zoom-scale', String(visionZoomScale));
    window.localStorage.setItem('samdu-vision-hide-images', String(visionHideImages));
  }, [isDarkMode, isVisionMode, visionAppearance, visionFontScale, visionZoomScale, visionHideImages]);

  // Hash-based SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (targetHash) => {
    window.location.hash = targetHash;
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (service) => {
    const targetMap = {
      'foreign-admission': 'Xorijiy talabalar uchun hujjat topshirish',
      'tutors': 'Tyutorlik faoliyati',
      'e-library': 'Axborot-resurs markazi',
      'erasmus': 'Xalqaro grant-stipendiyalar',
      'hemis-univer': 'Samarqand davlat universiteti “Registrator ofisi”',
      'hemis-talaba': 'Talabalar hayoti',
      'hemis-uz': 'Talabalar hayoti',
      'unilibrary': 'Axborot-resurs markazi',
      'scholarships': 'Stipendiyalar',
      'interactive-services': 'Unversitet tuzilmasi',
    };
    const target = targetMap[service.id] || 'Unversitet tuzilmasi';
    window.location.hash = target;
  };

  const handleNewsSelect = (news) => {
    if (news.id === 'all') {
      window.location.hash = 'Yangiliklar';
    } else {
      window.location.hash = 'Unversitet yangiliklari';
    }
  };

  const isHomeView = !currentHash || currentHash === 'bosh-sahifa' || currentHash === 'main';

  return (
    <div className="site-shell min-h-screen pl-0 md:pl-16">
      <SpecialViewArea
        language={language}
        isOpen={isVisionToolbarOpen}
        onClose={() => setIsVisionToolbarOpen(false)}
        isVisionMode={isVisionMode}
        onToggleVisionMode={handleToggleVisionMode}
        appearance={visionAppearance}
        onChangeAppearance={setVisionAppearance}
        fontScale={visionFontScale}
        onChangeFontScale={setVisionFontScale}
        zoomScale={visionZoomScale}
        onChangeZoomScale={setVisionZoomScale}
        hideImages={visionHideImages}
        onToggleHideImages={() => setVisionHideImages((prev) => !prev)}
        onReset={handleResetVisionSettings}
      />

      <HeaderBanner
        language={language}
        onLanguageChange={changeLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((mode) => !mode)}
        isVisionMode={isVisionMode}
        onToggleVisionMode={handleToggleVisionMode}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        language={language}
        onLanguageChange={changeLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((mode) => !mode)}
        isVisionMode={isVisionMode}
        onToggleVisionMode={handleToggleVisionMode}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Test va a11y uchun bosh sahifa sarlavhasi */}
        <h1 className="sr-only">{translate('Bosh sahifa', language)}</h1>

        {isHomeView ? (
          <>
            {/* 1. Asosiy slayd */}
            <ScrollReveal animation="fade-up">
              <HomeCarousel language={language} />
            </ScrollReveal>

            {/* 2. Tezkor interaktiv xizmatlar paneli (Hemis, Erasmus, Kutubxona va boshqalar) */}
            <ScrollReveal animation="fade-up" delay={60}>
              <QuickServices language={language} onServiceClick={handleServiceSelect} />
            </ScrollReveal>

            {/* 3. Raqamlarda SamDU (Talabalar, professorlar, reyting, fakultetlar) */}
            <ScrollReveal animation="fade-up">
              <UniversityStats language={language} />
            </ScrollReveal>

            {/* 4. So‘nggi yangiliklar va e’lonlar bo'limi */}
            <ScrollReveal animation="fade-up">
              <NewsSection language={language} onNewsClick={handleNewsSelect} />
            </ScrollReveal>

            {/* 5. Rektor murojaati va ilmiy salohiyat bloki */}
            <ScrollReveal animation="zoom-in">
              <RectorWelcome language={language} onNavigate={handleNavigate} />
            </ScrollReveal>

            {/* 6. Foydali saytlar va manbalar (gov.uz, edu.uz, ziyonet.uz, lex.uz, uza.uz, my.gov.uz) */}
            <ScrollReveal animation="fade-up">
              <UsefulLinks language={language} />
            </ScrollReveal>
          </>
        ) : (
          /* To'liq SPA ichki sahifa ko'rinishi */
          <InnerPage
            pageIdentifier={currentHash}
            language={language}
            onBack={handleBackToHome}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 6. Rasmiy Footer */}
      <ScrollReveal animation="fade-up">
        <Footer language={language} onNavigate={handleNavigate} />
      </ScrollReveal>

      {/* SamDU Lokatsiyasi tezkor suzuvchi indikatori */}
      <SamduFloatingLocationPill language={language} />

      {/* SamDU AI Maslahatchi ChatBot */}
      <SamduChatBot language={language} onNavigate={handleNavigate} />
    </div>
  );
}
