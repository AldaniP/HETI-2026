import React from 'react';
import { ArrowLeft, User, Lock, BellRing, CircleHelp, Info } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function SettingScreen({ navigate }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('profile')} className="mr-3 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg flex-1">Pengaturan</h1>
      </div>

      <div className="mt-4">
        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Akun</h3>
        <div className="bg-white border-y border-gray-100">
            <button className="w-full flex items-center p-4 border-b border-gray-100">
                <User size={20} className="text-gray-500 mr-3" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">Ubah Profil</span>
                <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>
            <button className="w-full flex items-center p-4">
                <Lock size={20} className="text-gray-500 mr-3" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">Keamanan & Password</span>
                <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferensi</h3>
        <div className="bg-white border-y border-gray-100">
            <div className="w-full flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center">
                    <BellRing size={20} className="text-gray-500 mr-3" />
                    <span className="text-left text-sm font-medium text-gray-800">Notifikasi Push</span>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-green-500 checked:right-0 right-5" defaultChecked />
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-green-500 cursor-pointer"></label>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bantuan & Info</h3>
        <div className="bg-white border-y border-gray-100">
            <button className="w-full flex items-center p-4 border-b border-gray-100">
                <CircleHelp size={20} className="text-gray-500 mr-3" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">Pusat Bantuan</span>
                <ArrowLeft size={16} className="text-gray-400 rotate-180" />
            </button>
            <button className="w-full flex items-center p-4">
                <Info size={20} className="text-gray-500 mr-3" />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">Tentang Aplikasi</span>
                <span className="text-xs text-gray-400 font-medium">v1.2.0</span>
            </button>
        </div>
      </div>
      
      <div className="p-4 mt-4">
        <button 
            onClick={() => navigate('login')}
            className="w-full bg-white text-red-500 font-bold py-3.5 rounded-xl border border-red-200 hover:bg-red-50 transition"
        >
            Keluar Akun
        </button>
      </div>
    </div>
  );
}
