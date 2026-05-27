import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  HandCoins, 
  HandHeart, 
  HeartHandshake, 
  Beef, 
  ArrowRight,
  Coins,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { getPoints, canCheckInToday, checkInDaily } from '../utils/points';

interface Props {
  navigate: (route: ScreenRoute) => void;
  setSelectedArticleId?: (id: string) => void;
}

export function HomeScreen({ navigate, setSelectedArticleId }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [points, setPoints] = useState<number>(0);
  const [showHasCheckIn, setShowHasCheckIn] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadPoints = () => {
    setPoints(getPoints());
    setShowHasCheckIn(canCheckInToday());
  };

  const handleClaimCheckIn = () => {
    const res = checkInDaily();
    if (res.success) {
      setToastMessage(`Alhamdulillah! Berhasil presensi harian. +${res.pointsAdded} XP Berkah ditambahkan!`);
      loadPoints();
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };
  
  const banners = [
    {
      title: "Berwakaf Lebih Mudah",
      desc: "Bangun pahala mengalir bersama Amwal",
      img: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Infaq Jumat Berkah",
      desc: "Raih keberkahan di hari yang mulia",
      img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Qurban Tanpa Batas",
      desc: "Tebar kebahagiaan hingga pelosok negeri",
      img: "https://images.unsplash.com/photo-1484557985045-eaa252be761c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    loadPoints();

    // Listen to points updates dynamically
    const handlePointsUpdated = () => {
      loadPoints();
    };
    window.addEventListener('amwal_points_updated', handlePointsUpdated);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('amwal_points_updated', handlePointsUpdated);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="relative flex-1 mr-4">
          <input 
            type="text" 
            placeholder="Cari program wakaf..." 
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('notification')} className="text-gray-600 relative">
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
            onClick={() => navigate('profile')}
          />
        </div>
      </div>

      {/* Poin Berkah & Absensi Header Bar */}
      <div className="mx-4 mt-3 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-xl px-4 py-3 shadow-3xs cursor-pointer" onClick={() => navigate('points')}>
        <div className="flex items-center space-x-2.5">
          <div className="bg-white/10 p-2 rounded-lg text-amber-300">
            <Coins size={18} className="animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Poin Berkah Anda</p>
            <p className="text-sm font-black font-mono tracking-tight">{points} XP</p>
          </div>
        </div>
        
        {showHasCheckIn ? (
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClaimCheckIn();
            }}
            className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg transition duration-200 shadow-xs flex items-center space-x-1 cursor-pointer"
          >
            <Sparkles size={11} className="animate-spin" />
            <span>Klaim Absen</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1 bg-white/10 px-2.5 py-1 rounded-lg text-[10.5px] font-bold text-emerald-100">
            <CheckCircle2 size={12} className="text-emerald-350" />
            <span>Sudah Absen Hari ini</span>
          </div>
        )}
      </div>

      {/* Toast Notification for Daily Check-In */}
      {toastMessage && (
        <div className="mx-4 mt-3 bg-amber-500 text-white font-bold text-xs px-4.5 py-3 rounded-lg shadow-sm border border-amber-600 flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-2">
            <Sparkles size={15} className="text-white animate-bounce" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="px-4 py-4 relative">
        <div className="overflow-hidden rounded-xl relative shadow-sm">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-40"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner, idx) => (
              <div key={idx} className="w-full shrink-0 h-full">
                <div className="relative h-full bg-green-700 w-full flex items-center justify-center">
                  <img src={banner.img} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="relative z-10 text-white text-center px-4">
                    <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
                    <p className="text-sm">{banner.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-1.5 absolute bottom-3 left-0 right-0 z-20">
            {banners.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-4 gap-3 bg-white mx-4 rounded-2xl border border-gray-100 shadow-sm mt-2">
        <button className="flex flex-col items-center justify-center space-y-1.5 transition active:scale-95 group" onClick={() => navigate('catalog')}>
          <div className="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shadow-xs border border-green-100 group-hover:bg-green-100 group-hover:shadow-sm transition duration-150">
            <HandHeart size={22} />
          </div>
          <span className="text-[10.5px] text-gray-700 text-center font-bold leading-tight group-hover:text-green-800 transition">Wakaf</span>
        </button>
        <button className="flex flex-col items-center justify-center space-y-1.5 transition active:scale-95 group" onClick={() => navigate('zakat')}>
          <div className="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shadow-xs border border-purple-100 group-hover:bg-purple-100 group-hover:shadow-sm transition duration-150">
            <HeartHandshake size={22} />
          </div>
          <span className="text-[10.5px] text-gray-700 text-center font-bold leading-tight group-hover:text-purple-800 transition">Zakat</span>
        </button>
        <button className="flex flex-col items-center justify-center space-y-1.5 transition active:scale-95 group" onClick={() => navigate('qurban')}>
          <div className="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shadow-xs border border-orange-100 group-hover:bg-orange-100 group-hover:shadow-sm transition duration-150">
            <Beef size={22} />
          </div>
          <span className="text-[10.5px] text-gray-700 text-center font-bold leading-tight group-hover:text-orange-900 transition">Qurban</span>
        </button>
        <button className="flex flex-col items-center justify-center space-y-1.5 transition active:scale-95 group" onClick={() => navigate('infaq')}>
          <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-xs border border-emerald-100 group-hover:bg-emerald-100 group-hover:shadow-sm transition duration-150">
            <HandCoins size={22} />
          </div>
          <span className="text-[10.5px] text-gray-700 text-center font-bold leading-tight group-hover:text-emerald-800 transition">Lainnya</span>
        </button>
      </div>

      <div className="mt-6">
        <div className="px-4 flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Berita & Edukasi</h3>
          <button onClick={() => navigate('edu_hub')} className="text-sm text-green-600 font-medium flex items-center">Lihat Semua <ArrowRight size={14} className="ml-1"/></button>
        </div>
        <div className="flex overflow-x-auto px-4 pb-4 space-x-4 hide-scrollbar">
          {[
            {
              id: 'syariah_milenial',
              title: 'Manajemen Keuangan Syariah untuk Milenial',
              category: 'Finansial Pintar',
              img: 'https://images.unsplash.com/photo-1579621970588-a3f5ece89634?auto=format&fit=crop&w=400&q=80'
            },
            {
              id: 'wakaf_infaq_sedekah',
              title: 'Perbedaan Mendasar Wakaf, Infaq, dan Sedekah',
              category: 'Fiqih Muamalah',
              img: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=400&q=80'
            }
          ].map((item) => (
            <div 
              key={item.id} 
              className="min-w-[240px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:border-emerald-200 transition" 
              onClick={() => {
                if (setSelectedArticleId) {
                  setSelectedArticleId(item.id);
                }
                navigate('edu_detail');
              }}
            >
              <img src={item.img} referrerPolicy="no-referrer" className="w-full h-28 object-cover" />
              <div className="p-3">
                <span className="text-xs text-blue-600 font-medium mb-1 block">{item.category}</span>
                <h4 className="font-bold text-sm text-gray-800 leading-tight mb-1 line-clamp-2">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <div className="px-4 flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Program Wakaf Pilihan</h3>
          <button onClick={() => navigate('catalog')} className="text-sm text-green-600 font-medium flex items-center">Lihat Semua <ArrowRight size={14} className="ml-1"/></button>
        </div>
        <div className="px-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer" onClick={() => navigate('wakaf_detail')}>
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80" referrerPolicy="no-referrer" className="w-28 h-auto object-cover" />
            <div className="p-3 flex-1">
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium mb-1.5 inline-block">Pendidikan</span>
              <h4 className="font-bold text-sm text-gray-800 leading-tight mb-1">Pembangunan Gedung Sekolah Yatim</h4>
              <p className="text-xs text-gray-500 mb-2">Dompet Dhuafa</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-green-700">Terkumpul Rp 450jt</span>
                <span className="text-gray-500">45 hari lagi</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer" onClick={() => navigate('wakaf_detail')}>
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80" referrerPolicy="no-referrer" className="w-28 h-auto object-cover" />
            <div className="p-3 flex-1">
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium mb-1.5 inline-block">Kesehatan</span>
              <h4 className="font-bold text-sm text-gray-800 leading-tight mb-1">Wakaf Alat Kesehatan Klinik Umat</h4>
              <p className="text-xs text-gray-500 mb-2">Lazismu</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-green-700">Terkumpul Rp 140jt</span>
                <span className="text-gray-500">12 hari lagi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
