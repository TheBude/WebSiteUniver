import React, { useEffect, useState } from 'react';
import HeaderBanner from './components/Navbar';
import Sidebar from './components/Sidebar';
import { translate } from './i18n';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pl-16">
      <HeaderBanner language={language} onLanguageChange={changeLanguage} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpen={() => setIsSidebarOpen(true)}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-800">{translate('Bosh sahifa', language)}</h1>
      </main>
    </div>
  );
}