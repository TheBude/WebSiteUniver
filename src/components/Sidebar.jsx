import React from 'react';

const sidebarLinks = [
  'Unversitet',
  'Tuzilma',
  'Foaliat',
  'Qabul 2026',
  'Talabalar',
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* 1. Xira orqa fon (Overlay) - Menyudan tashqariga bosilganda yopilishi uchun */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300"
        />
      )}

      {/* 2. Chap tomondan chiqadigan menyu */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 sm:w-80 bg-[#161f3e] text-slate-100 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-r border-blue-900/40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Yuqori qism (Sarlavha va X tugmasi) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#121a35]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-bold text-base tracking-wide text-white">Menyu bo‘limi</span>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            title="Yopish"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Bo'limlar ro'yxati (Scroll qismi) */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {sidebarLinks.map((item, index) => (
            <a
              key={index}
              href={`#${item}`}
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm text-slate-200 hover:text-white hover:bg-blue-600/30 rounded-lg transition-colors border-b border-white/5 last:border-b-0"
            >
              <span>{item}</span>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Pastki qism */}
        <div className="p-4 border-t border-white/10 text-center text-xs text-slate-400 bg-[#121a35]">
          © {new Date().getFullYear()} Samarqand davlat universiteti
        </div>
      </aside>
    </>
  );
}