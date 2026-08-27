import React from 'react';
import { Home, HandHeart, Clock, BookOpen } from 'lucide-react';
import { ScreenRoute } from '../types';

interface BottomNavProps {
  currentRoute: ScreenRoute;
  navigate: (route: ScreenRoute) => void;
}

export function BottomNav({ currentRoute, navigate }: BottomNavProps) {
  // Only show nav on main tabs
  const isMainTab = ['home', 'catalog', 'history', 'edu_hub'].includes(currentRoute);

  if (!isMainTab) return null;

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50">
      <button 
        onClick={() => navigate('home')}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentRoute === 'home' ? 'text-green-600' : 'text-gray-500'}`}
      >
        <Home size={24} />
        <span className="text-[10px] font-medium">Beranda</span>
      </button>
      
      <button 
        onClick={() => navigate('catalog')}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentRoute === 'catalog' ? 'text-green-600' : 'text-gray-500'}`}
      >
        <HandHeart size={24} />
        <span className="text-[10px] font-medium">Wakaf</span>
      </button>
      
      <button 
        onClick={() => navigate('history')}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentRoute === 'history' ? 'text-green-600' : 'text-gray-500'}`}
      >
        <Clock size={24} />
        <span className="text-[10px] font-medium">Riwayat</span>
      </button>
      
      <button 
        onClick={() => navigate('edu_hub')}
        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${currentRoute === 'edu_hub' ? 'text-green-600' : 'text-gray-500'}`}
      >
        <BookOpen size={24} />
        <span className="text-[10px] font-medium">Edukasi</span>
      </button>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
