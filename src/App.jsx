import React, { useEffect, useState } from 'react';
import HeaderBanner from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomeCarousel from './components/HomeCarousel';
import QuickServices from './components/QuickServices';
import NewsSection from './components/NewsSection';
import { translate } from './i18n';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('samdu-dark-mode') === 'true');
  const [isVisionMode, setIsVisionMode] = useState(() => window.localStorage.getItem('samdu-vision-mode') === 'true');
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem('samdu-language');
    return ['uz', 'qr', 'ru', 'en'].includes(savedLanguage) ? savedLanguage : 'uz';
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
    root.classList.toggle('vision-mode', isVisionMode);
    window.localStorage.setItem('samdu-dark-mode', String(isDarkMode));
    window.localStorage.setItem('samdu-vision-mode', String(isVisionMode));
  }, [isDarkMode, isVisionMode]);

  const handleServiceSelect = (service) => {
    console.log('Tanlangan xizmat:', service);
  };

  const handleNewsSelect = (news) => {
    console.log('Tanlangan yangilik:', news);
  };

  return (
    <div className="site-shell min-h-screen pl-16">
      <HeaderBanner
        language={language}
        onLanguageChange={changeLanguage}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((mode) => !mode)}
        isVisionMode={isVisionMode}
        onToggleVisionMode={() => setIsVisionMode((mode) => !mode)}
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
        onToggleVisionMode={() => setIsVisionMode((mode) => !mode)}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* 1. Asosiy slayd */}
        <HomeCarousel language={language} />

        {/* 2. Tezkor xizmatlar karuseli (Hemis, Erasmus va boshqalar) */}
        <QuickServices language={language} onServiceClick={handleServiceSelect} />

        {/* 3. SamDU yangiliklar bo'limi */}
        <NewsSection language={language} onNewsClick={handleNewsSelect} />
      </main>
    </div>
  );
}