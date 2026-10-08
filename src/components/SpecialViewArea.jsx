import React from 'react';
import { translate } from '../i18n';
import './SpecialViewArea.css';

/**
 * SamDU Maxsus Imkoniyatlar Paneli (nuu.uz uslubida modernizatsiya qilingan).
 * Ko'zi ojizlar va ko'rishida nuqsoni bo'lgan foydalanuvchilar uchun:
 * 1. Ko'rinish rejimlari (Oddiy, Oq-qora, Qorong'i / Invert)
 * 2. Shrift o'lchami (0%, +15%, +30%, +50%)
 * 3. Sahifa masshtabi (100%, 110%, 120%, 130%)
 * 4. Tasvirlarni yashirish / ko'rsatish
 * 5. Standart holatga qaytarish (Reset)
 */
export default function SpecialViewArea({
  language,
  isOpen,
  onClose,
  isVisionMode,
  onToggleVisionMode,
  appearance = 'normal',
  onChangeAppearance,
  fontScale = 0,
  onChangeFontScale,
  zoomScale = 100,
  onChangeZoomScale,
  hideImages = false,
  onToggleHideImages,
  onReset,
}) {
  if (!isOpen && !isVisionMode) {
    return null;
  }

  const t = (key) => translate(key, language);

  const fontPresets = [
    { value: 0, label: '0%' },
    { value: 15, label: '+15%' },
    { value: 30, label: '+30%' },
    { value: 50, label: '+50%' },
  ];

  const zoomPresets = [
    { value: 100, label: '100%' },
    { value: 110, label: '110%' },
    { value: 120, label: '120%' },
    { value: 130, label: '130%' },
  ];

  const handlePrevFont = () => {
    const currentIndex = fontPresets.findIndex((p) => p.value === fontScale);
    if (currentIndex > 0) {
      onChangeFontScale(fontPresets[currentIndex - 1].value);
    } else if (fontScale > 0) {
      onChangeFontScale(0);
    }
  };

  const handleNextFont = () => {
    const currentIndex = fontPresets.findIndex((p) => p.value === fontScale);
    if (currentIndex >= 0 && currentIndex < fontPresets.length - 1) {
      onChangeFontScale(fontPresets[currentIndex + 1].value);
    } else if (fontScale < 50) {
      onChangeFontScale(50);
    }
  };

  const handlePrevZoom = () => {
    const currentIndex = zoomPresets.findIndex((p) => p.value === zoomScale);
    if (currentIndex > 0) {
      onChangeZoomScale(zoomPresets[currentIndex - 1].value);
    } else if (zoomScale > 100) {
      onChangeZoomScale(100);
    }
  };

  const handleNextZoom = () => {
    const currentIndex = zoomPresets.findIndex((p) => p.value === zoomScale);
    if (currentIndex >= 0 && currentIndex < zoomPresets.length - 1) {
      onChangeZoomScale(zoomPresets[currentIndex + 1].value);
    } else if (zoomScale < 130) {
      onChangeZoomScale(130);
    }
  };

  // Agar panel yopiq lekin vision-mode yoqilgan bo'lsa, ixcham ochish tugmachasi
  if (!isOpen && isVisionMode) {
    return (
      <aside
        aria-label={t('Maxsus imkoniyatlar')}
        className="spc-panel-preserve fixed top-20 right-4 z-40 animate-fade-in sm:top-24"
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-[#0f1d38]/95 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:border-sky-300 hover:bg-[#18294e] hover:shadow-sky-500/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
          title={t('Maxsus imkoniyatlar')}
        >
          <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{t('Maxsus imkoniyatlar')}</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label={t('Maxsus imkoniyatlar')}
      className="spc-panel-preserve samdu-special-view-panel sticky top-0 z-50 border-b border-sky-500/30 bg-[#0b152d]/98 shadow-2xl backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
        {/* Panel sarlavhasi va yopish tugmasi */}
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide sm:text-base">
                {t('Maxsus imkoniyatlar')}
              </h2>
              <p className="hidden text-xs text-slate-300 sm:block">
                {t('Ko‘zi ojizlar va zaif ko‘ruvchilar uchun moslashtirilgan rejim')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-label={t('Sozlamalarni yopish')}
              title={t('Sozlamalarni yopish')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sozlamalar bloklari: Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* 1. KO'RINISH (APPEARANCE - nuu.uz oddiy, oq-qora, qorong'i) */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {t('Ko‘rinish')}
              </span>
              <span className="text-[11px] font-medium text-sky-300">
                {appearance === 'normal'
                  ? t('Oddiy')
                  : appearance === 'grayscale'
                  ? t('Oq-qora')
                  : t('Qorong‘i')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Oddiy (Normal) */}
              <button
                type="button"
                onClick={() => onChangeAppearance('normal')}
                className={`flex-1 flex flex-col items-center justify-center rounded-lg border py-2 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                  appearance === 'normal'
                    ? 'border-sky-400 bg-sky-500/25 text-white shadow-md shadow-sky-500/20'
                    : 'border-white/15 bg-[#14234b]/50 text-slate-300 hover:border-white/30 hover:bg-white/10'
                }`}
                aria-label={t('Oddiy')}
                title={t('Oddiy')}
                aria-pressed={appearance === 'normal'}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded border border-white/20 bg-slate-800 text-base font-black text-white shadow-inner">
                  A
                </div>
                <span className="mt-1 text-[11px] font-medium">{t('Oddiy')}</span>
              </button>

              {/* Oq-qora (Grayscale) */}
              <button
                type="button"
                onClick={() => onChangeAppearance('grayscale')}
                className={`flex-1 flex flex-col items-center justify-center rounded-lg border py-2 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                  appearance === 'grayscale'
                    ? 'border-sky-400 bg-sky-500/25 text-white shadow-md shadow-sky-500/20'
                    : 'border-white/15 bg-[#14234b]/50 text-slate-300 hover:border-white/30 hover:bg-white/10'
                }`}
                aria-label={t('Oq-qora')}
                title={t('Oq-qora')}
                aria-pressed={appearance === 'grayscale'}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-slate-500 text-base font-black text-white shadow-inner">
                  A
                </div>
                <span className="mt-1 text-[11px] font-medium">{t('Oq-qora')}</span>
              </button>

              {/* Qorong'i / Invert */}
              <button
                type="button"
                onClick={() => onChangeAppearance('dark')}
                className={`flex-1 flex flex-col items-center justify-center rounded-lg border py-2 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                  appearance === 'dark'
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-md shadow-yellow-500/20'
                    : 'border-white/15 bg-[#14234b]/50 text-slate-300 hover:border-white/30 hover:bg-white/10'
                }`}
                aria-label={t('Qorong‘i')}
                title={t('Qorong‘i')}
                aria-pressed={appearance === 'dark'}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded border border-yellow-400 bg-black text-base font-black text-yellow-400 shadow-inner">
                  A
                </div>
                <span className="mt-1 text-[11px] font-medium">{t('Qorong‘i')}</span>
              </button>
            </div>
          </div>

          {/* 2. SHRIFT O'LCHAMI (FONT SIZER) */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {t('Shrift o‘lchami')}
              </span>
              <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[11px] font-bold text-sky-300 border border-sky-400/30">
                {fontScale === 0 ? t('Standart') : `+${fontScale}%`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevFont}
                disabled={fontScale <= 0}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-bold text-slate-200 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={t('Kichiklashtirish')}
                title={t('Kichiklashtirish')}
              >
                A-
              </button>

              <div className="grid grid-cols-4 gap-1 flex-1">
                {fontPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => onChangeFontScale(preset.value)}
                    className={`rounded border py-1.5 text-center text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-amber-300 ${
                      fontScale === preset.value
                        ? 'border-sky-400 bg-sky-500 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextFont}
                disabled={fontScale >= 50}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-bold text-slate-200 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={t('Kattalashtirish')}
                title={t('Kattalashtirish')}
              >
                A+
              </button>
            </div>
          </div>

          {/* 3. SAHIFA MASSHTABI (ZOOM SIZER) */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {t('Sahifa masshtabi')}
              </span>
              <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[11px] font-bold text-sky-300 border border-sky-400/30">
                {zoomScale}%
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevZoom}
                disabled={zoomScale <= 100}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-bold text-slate-200 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={t('Kichiklashtirish')}
                title={t('Kichiklashtirish')}
              >
                -
              </button>

              <div className="grid grid-cols-4 gap-1 flex-1">
                {zoomPresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => onChangeZoomScale(preset.value)}
                    className={`rounded border py-1.5 text-center text-xs font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-amber-300 ${
                      zoomScale === preset.value
                        ? 'border-sky-400 bg-sky-500 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextZoom}
                disabled={zoomScale >= 130}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-bold text-slate-200 transition-colors hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-label={t('Kattalashtirish')}
                title={t('Kattalashtirish')}
              >
                +
              </button>
            </div>
          </div>

          {/* 4. TASVIRLAR VA AMALLAR */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-col justify-between gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {t('Tasvirlar')}
              </span>
              <button
                type="button"
                onClick={onToggleHideImages}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                  hideImages
                    ? 'border-rose-400/50 bg-rose-500/20 text-rose-300'
                    : 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300'
                }`}
                aria-label={hideImages ? t('Tasvirlarni ko‘rsatish') : t('Tasvirlarni yashirish')}
                title={hideImages ? t('Tasvirlarni ko‘rsatish') : t('Tasvirlarni yashirish')}
                aria-pressed={hideImages}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {hideImages ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  )}
                </svg>
                <span>{hideImages ? t('Tasvirlarni ko‘rsatish') : t('Tasvirlarni yashirish')}</span>
              </button>
            </div>

            {/* Qaytarish va O'chirish tugmalari */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={onReset}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                title={t('Standart holatga qaytarish')}
              >
                <svg className="h-3.5 w-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t('Standart holatga qaytarish')}</span>
              </button>

              <button
                type="button"
                onClick={onToggleVisionMode}
                className="flex items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-300 transition-all hover:bg-rose-500/20 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                title={t('Maxsus rejimni o‘chirish')}
              >
                {t('Maxsus rejimni o‘chirish')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
