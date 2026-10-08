import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import DisplayModeControls from './DisplayModeControls';
import SiteSearch from './SiteSearch';
import { translate } from '../i18n';

export default function HeaderBanner({
    language,
    onLanguageChange,
    isDarkMode,
    onToggleDarkMode,
    isVisionMode,
    onToggleVisionMode,
    isSidebarOpen,
    onToggleSidebar,
}) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const t = (text) => translate(text, language);

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev === 0 ? 1 : 0));
        }, 3000);

        return () => clearInterval(timer);
    }, [isPaused]);

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLocationClick = (e) => {
        e.preventDefault();
        const mapElement = document.getElementById('samdu-location-map-widget');
        if (mapElement) {
            mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            mapElement.classList.remove('samdu-map-highlight');
            void mapElement.offsetWidth;
            mapElement.classList.add('samdu-map-highlight');
            setTimeout(() => {
                mapElement.classList.remove('samdu-map-highlight');
            }, 2000);
        } else {
            window.location.hash = 'Aloqa';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleQuoteClick = (e) => {
        e.preventDefault();
        window.location.hash = 'Unversitet';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-[#1b254b] text-white select-none border-b border-white/10 shadow-md transition-shadow">
            <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6 min-h-[58px] sm:min-h-[86px]">
                
                {/* Mobile Hamburger Burger Button (Navbar bilan birlashgan) */}
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label={t(isSidebarOpen ? 'Menyuni yopish' : 'Menyuni ochish')}
                    aria-expanded={Boolean(isSidebarOpen)}
                    className="flex md:hidden items-center justify-center h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0 border border-white/15 shadow-sm"
                    title={t('Asosiy menyu')}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path className={`origin-center transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-y-[5px] rotate-45' : ''}`} d="M4 7h16" />
                        <path className={`transition-opacity duration-200 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`} d="M4 12h16" />
                        <path className={`origin-center transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-translate-y-[5px] -rotate-45' : ''}`} d="M4 17h16" />
                    </svg>
                </button>

                <a
                    href="#"
                    onClick={handleLogoClick}
                    className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3.5 cursor-pointer no-underline text-inherit group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-0.5"
                    title={t('Bosh sahifa')}
                >
                    <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center p-[2px] shadow-sm overflow-hidden shrink-0 sm:h-14 sm:w-14 transition-transform group-hover:scale-105">
                        <img
                            src={`${import.meta.env.BASE_URL}SamduLogo.png`}
                            alt={t('SamDu Gerbi')}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextElementSibling) {
                                    e.currentTarget.nextElementSibling.style.display = 'flex';
                                }
                            }}
                        />
                        <span className="hidden text-[#1b254b] font-black text-xs items-center justify-center">
                            SamDu
                        </span>
                    </div>
                    
                    <div className="flex min-w-0 flex-1 flex-col text-left font-sans">
                        <span className="break-words text-[10px] sm:text-sm font-black leading-tight tracking-wide text-slate-100 uppercase group-hover:text-blue-200 transition-colors">
                            {t('SHAROF RASHIDOV NOMIDAGI')}
                        </span>
                        <span className="break-words text-[11px] sm:text-base font-black tracking-normal text-white uppercase leading-tight group-hover:text-blue-100 transition-colors">
                            {t('SAMARQAND DAVLAT UNIVERSITETI')}
                        </span>
                    </div>
                </a>

                {/* Navbardagi animatsiyali ma'lumotlar va Prezident iqtibosi bloki (hoverda to'xtaydi) */}
                <div 
                    className="hidden md:block flex-1 max-w-[640px] h-[58px] overflow-hidden relative group/banner rounded-lg px-2 hover:bg-white/[0.04] transition-colors"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div 
                        className="w-full transition-transform duration-700 ease-in-out flex flex-col"
                        style={{ transform: `translateY(-${slideIndex * 50}%)` }}
                    >

                        {/* Slayd 1: Universitet manzili, telefon va ijtimoiy tarmoqlar */}
                        <div className="h-[58px] min-h-[58px] flex items-center justify-between gap-4 shrink-0">
                            {/* Joylashuv ma'lumotlari (Xaritaga o'tish havolasi) */}
                            <a
                                href="#samdu-location-map-widget"
                                onClick={handleLocationClick}
                                className="flex flex-col text-left text-xs leading-snug group/loc no-underline text-inherit cursor-pointer"
                                title={t('SamDU interaktiv xaritasini ko‘rish')}
                            >
                                <span className="text-slate-300 font-normal group-hover/loc:text-blue-300 transition-colors flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                                    </svg>
                                    <span>{t('Bosh bino manzili:')}</span>
                                </span>
                                <span className="text-white font-bold tracking-tight group-hover/loc:text-blue-200 group-hover/loc:underline transition-colors">
                                    {t('140104, Samarqand shahri, Universitet xiyoboni, 15-uy')}
                                </span>
                            </a>

                            <div className="flex flex-col items-end gap-1 shrink-0">
                                {/* Telefon raqami havolasi */}
                                <a
                                    href="tel:+998662403840"
                                    className="text-sm font-bold text-white tracking-wide hover:text-blue-300 hover:underline transition-colors flex items-center gap-1.5"
                                    title={t('Qo‘ng‘iroq qilish')}
                                >
                                    <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>+998 (66) 240-38-40</span>
                                </a>

                                {/* Ijtimoiy tarmoqlar havolalari (Twitter o‘rniga YouTube) */}
                                <div className="flex items-center gap-2.5 text-slate-300">
                                    <a
                                        href="https://t.me/samduuz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Telegram"
                                        title="Telegram"
                                        className="transition-colors hover:text-sky-400"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.facebook.com/samdu.uz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        title="Facebook"
                                        className="transition-colors hover:text-blue-400"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://instagram.com/samdu_uz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        title="Instagram"
                                        className="transition-colors hover:text-pink-400"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.youtube.com/@samduuz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="YouTube"
                                        title="YouTube"
                                        className="transition-colors hover:text-red-500"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Slayd 2: Prezident iqtibosi (Universitet sahifasiga havola) */}
                        <a
                            href="#Unversitet"
                            onClick={handleQuoteClick}
                            className="h-[58px] min-h-[58px] flex items-center justify-between gap-4 shrink-0 no-underline text-inherit group/quote cursor-pointer"
                            title={t('Batafsil tanishish')}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl text-blue-400 font-serif leading-none select-none group-hover/quote:scale-110 transition-transform">
                                    “
                                </span>
                                <p className="text-xs sm:text-[13px] text-slate-100 italic leading-snug font-normal line-clamp-2 group-hover/quote:text-blue-100 transition-colors">
                                    {t('Agar mendan sizni nima qiynaydi? deb so‘rasangiz, farzandlarimizning ta’lim va tarbiyasi deb javob beraman.')}
                                </p>
                            </div>
                            <span className="text-xs font-bold text-white shrink-0 tracking-wide pl-2 border-l border-white/20 group-hover/quote:text-blue-200 transition-colors whitespace-nowrap">
                                {t('Sh.Mirziyoyev')}
                            </span>
                        </a>
                    </div>
                </div>

                <div className="hidden shrink-0 items-center gap-2 md:flex">
                    <SiteSearch language={language} placement="navbar" />
                    <DisplayModeControls
                        language={language}
                        isDarkMode={isDarkMode}
                        onToggleDarkMode={onToggleDarkMode}
                        isVisionMode={isVisionMode}
                        onToggleVisionMode={onToggleVisionMode}
                    />
                    <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
                </div>
            </div>
        </header>
    );
}