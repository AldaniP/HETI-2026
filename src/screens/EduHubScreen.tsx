import React from 'react';
import { ArrowLeft, Search, PlayCircle } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
  setSelectedArticleId: (id: string) => void;
}

export function EduHubScreen({ navigate, setSelectedArticleId }: Props) {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50 flex flex-col h-full">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm justify-between">
        <div className="flex items-center">
            <button onClick={() => navigate('home')} className="mr-3 text-gray-600">
            <ArrowLeft size={24} />
            </button>
            <h1 className="font-bold text-lg text-gray-800">Edukasi</h1>
        </div>
        <Search size={22} className="text-gray-600" />
      </div>

      <div className="p-4 pt-6">
        <h3 className="font-bold text-gray-800 mb-3 text-lg">Populer</h3>
        <div className="flex overflow-x-auto space-x-4 hide-scrollbar pb-2">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="min-w-[280px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:border-emerald-200 transition" 
              onClick={() => {
                setSelectedArticleId(i === 1 ? 'syariah_milenial' : 'emas_perak');
                navigate('edu_detail');
              }}
            >
              <img src={i === 1 ? "https://images.unsplash.com/photo-1579621970588-a3f5ece89634?auto=format&fit=crop&w=600&q=80" : "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"} referrerPolicy="no-referrer" className="w-full h-36 object-cover" />
              <div className="p-4">
                <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold inline-block mb-2">
                  {i === 1 ? 'Finansial Pintar' : 'Zakat Maal'}
                </span>
                <h4 className="font-bold text-gray-800 leading-tight mb-2">
                  {i === 1 ? 'Manajemen Keuangan Syariah untuk Milenial' : 'Memahami Zakat Emas dan Perak secara Detil'}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-gray-800 mb-3 px-4 text-lg">Video Tutorial</h3>
        <div className="flex overflow-x-auto px-4 space-x-3 hide-scrollbar pb-2">
            {[1, 2, 3].map(i => (
                <div key={i} className="min-w-[160px] relative rounded-xl overflow-hidden cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80" referrerPolicy="no-referrer" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle size={32} className="text-white opacity-80" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-xs font-medium line-clamp-2">Cara Hitung Zakat Emas {i}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="mt-4 px-4 pb-4 space-y-3">
        <h3 className="font-bold text-gray-800 mb-3 text-lg">Artikel Terbaru</h3>
        {[
          {
            id: 'syariah_milenial',
            title: 'Manajemen Keuangan Syariah untuk Milenial',
            category: 'Finansial Pintar',
            img: 'https://images.unsplash.com/photo-1579621970588-a3f5ece89634?auto=format&fit=crop&w=150&q=80',
            meta: 'Finansial • 12 mnt baca'
          },
          {
            id: 'wakaf_infaq_sedekah',
            title: 'Perbedaan Mendasar Wakaf, Infaq, dan Sedekah',
            category: 'Fiqih Muamalah',
            img: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=150&q=80',
            meta: 'Fiqih Muamalah • 5 mnt baca'
          },
          {
            id: 'emas_perak',
            title: 'Memahami Zakat Emas dan Perak secara Detil',
            category: 'Zakat Maal',
            img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=150&q=80',
            meta: 'Zakat Maal • 8 mnt baca'
          }
        ].map(item => (
            <div 
              key={item.id} 
              className="flex space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-200 transition" 
              onClick={() => {
                setSelectedArticleId(item.id);
                navigate('edu_detail');
              }}
            >
                <img src={item.img} referrerPolicy="no-referrer" className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-sm text-gray-800 mb-1 leading-snug line-clamp-2">{item.title}</h4>
                    <span className="text-[10px] text-gray-500">{item.meta}</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
