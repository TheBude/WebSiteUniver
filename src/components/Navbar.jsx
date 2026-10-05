import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import DisplayModeControls from './DisplayModeControls';
import SiteSearch from './SiteSearch';
import { translate } from '../i18n';

export default function HeaderBanner({ language, onLanguageChange, isDarkMode, onToggleDarkMode, isVisionMode, onToggleVisionMode }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const t = (text) => translate(text, language);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prev) => (prev === 0 ? 1 : 0));
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-[#1b254b] text-white select-none border-b border-white/10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6 min-h-[86px]">
                
                <div className="flex min-w-0 flex-1 items-center gap-2 md:flex-none md:gap-3.5">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-[2px] shadow-sm overflow-hidden shrink-0 sm:h-14 sm:w-14">
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
                    
                    <div className="flex min-w-0 flex-col text-left font-sans">
                        <span className="break-words text-[11px] font-black leading-tight tracking-wide text-slate-100 uppercase sm:text-sm">
                            {t('SHAROF RASHIDOV NOMIDAGI')}
                        </span>
                        <span className="break-words text-xs font-black tracking-normal text-white uppercase leading-tight sm:text-base sm:tracking-wider">
                            {t('SAMARQAND DAVLAT UNIVERSITETI')}
                        </span>
                    </div>
                </div>

                <div className="hidden md:block flex-1 max-w-[640px] h-[58px] overflow-hidden relative">
                    <div 
                        className="w-full transition-transform duration-700 ease-in-out flex flex-col"
                        style={{ transform: `translateY(-${slideIndex * 50}%)` }}
                    >

                        <div className="h-[58px] min-h-[58px] flex items-center justify-between gap-4 shrink-0">
                            <div className="flex flex-col text-left text-xs leading-snug">
                                <span className="text-slate-300 font-normal">{t('Bosh bino manzili:')}</span>
                                <span className="text-white font-bold tracking-tight">
                                    {t('140104, Samarqand shahri, Universitet xiyoboni, 15-uy')}
                                </span>
                            </div>

                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="text-sm font-bold text-white tracking-wide">
                                    (66) 240-38-40
                                </span>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <span role="img" aria-label="Facebook" className="transition-colors hover:text-white" title="Facebook">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </span>
                                    <span role="img" aria-label="Twitter" className="transition-colors hover:text-white" title="Twitter">
                                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                                        </svg>
                                    </span>
                                    <span role="img" aria-label="Instagram" className="transition-colors hover:text-white" title="Instagram">
                                        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        </svg>
                                    </span>
                                    <span role="img" aria-label="Telegram" className="transition-colors hover:text-white" title="Telegram">
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[58px] min-h-[58px] flex items-center justify-between gap-4 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl text-blue-400 font-serif leading-none select-none">
                                    “
                                </span>
                                <p className="text-xs sm:text-[13px] text-slate-100 italic leading-snug font-normal line-clamp-2">
                                    {t('Agar mendan sizni nima qiynaydi? deb so‘rasangiz, farzandlarimizning ta’lim va tarbiyasi deb javob beraman.')}
                                </p>
                            </div>
                            <span className="text-xs font-bold text-white shrink-0 tracking-wide pl-2 border-l border-white/20">
                                {t('Sh.Mirziyoyev')}
                            </span>
                        </div>
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
        </div>
    );
}