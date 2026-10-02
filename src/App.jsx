import React, { useState } from 'react';
import HeaderBanner from './components/Navbar'; // Fayl nomingizga qarab (masalan ./components/Navbar)
import Sidebar from './components/Sidebar';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Headerga ochiq-yopiq holati va funksiyasi berildi */}
      <HeaderBanner 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* 2. Sidebar komponenti */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-800">Bosh sahifa</h1>
      </main>
    </div>
  );
}