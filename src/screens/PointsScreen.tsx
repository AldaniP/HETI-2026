import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  Coins, 
  Calendar, 
  BookOpen, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  Zap,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { 
  getPoints, 
  getPointsHistory, 
  canCheckInToday, 
  checkInDaily, 
  PointsHistoryItem 
} from '../utils/points';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function PointsScreen({ navigate }: Props) {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [history, setHistory] = useState<PointsHistoryItem[]>([]);
  const [canCheckIn, setCanCheckIn] = useState<boolean>(false);
  const [checkInSuccess, setCheckInSuccess] = useState<string | null>(null);

  const loadPointsData = () => {
    setTotalPoints(getPoints());
    setHistory(getPointsHistory());
    setCanCheckIn(canCheckInToday());
  };

  useEffect(() => {
    loadPointsData();

    // Listen to points updates dynamically
    const handlePointsUpdated = () => {
      loadPointsData();
    };
    window.addEventListener('amwal_points_updated', handlePointsUpdated);
    return () => {
      window.removeEventListener('amwal_points_updated', handlePointsUpdated);
    };
  }, []);

  const handleCheckInNow = () => {
    const res = checkInDaily();
    if (res.success) {
      setCheckInSuccess(`Masyallah! Berhasil melakukan absensi harian. Anda mendapatkan +${res.pointsAdded} XP Berkah!`);
      loadPointsData();
      setTimeout(() => {
        setCheckInSuccess(null);
      }, 4000);
    }
  };

  const progressPercent = Math.min((totalPoints / 1000) * 100, 100);

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white flex flex-col h-full relative font-sans">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('home')} 
          className="text-gray-700 hover:text-emerald-700 p-1 -ml-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="text-xs font-bold text-gray-800 uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full">
          Poin Berkah & Level Akun
        </span>
        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Award size={18} />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Point Card Banner */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
          {/* Decorative subtle element */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-600/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute top-2 right-4 text-emerald-300/15 pointer-events-none">
            <Coins size={115} />
          </div>

          <div className="relative z-10 space-y-3.5">
            <div>
              <span className="text-[10px] bg-white/15 text-amber-200 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Total Akumulasi XP Anda
              </span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl font-black font-mono tracking-tight text-white">{totalPoints}</span>
                <span className="text-xs text-emerald-200 font-bold">XP Berkah</span>
              </div>
            </div>

            <div className="h-2 bg-white/15 rounded-full overflow-hidden w-full relative">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[11px] font-bold text-emerald-100/90 pt-0.5">
              <span>Level 1 (Mubtadi)</span>
              <span>Target: 1.000 XP untuk Level 2</span>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {checkInSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-sm flex items-start space-x-2 animate-bounce">
            <Sparkles size={18} className="shrink-0 mt-0.5 text-amber-300" />
            <p className="text-xs font-bold leading-normal">{checkInSuccess}</p>
          </div>
        )}

        {/* Absen Harian Section */}
        <div className="bg-gray-50/80 rounded-2xl p-4 transition">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center">
                <Calendar className="text-emerald-600 mr-1.5" size={15} />
                Absensi Berkah Harian
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs">
                Dapatkan +50 XP gratis setiap hari hanya dengan menekan tombol masuk aplikasi.
              </p>
            </div>
            <span className="text-[10px] bg-emerald-100/80 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
              Harian
            </span>
          </div>

          <div className="mt-3.5">
            {canCheckIn ? (
              <button
                onClick={handleCheckInNow}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Zap size={14} className="text-amber-300 fill-amber-300" />
                <span>Absen & Klaim 50 XP Sekarang</span>
              </button>
            ) : (
              <div className="w-full py-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center space-x-2">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Sudah Absen Hari Ini (Klaim lagi besok)</span>
              </div>
            )}
          </div>
        </div>

        {/* Misi Tambahan */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider px-0.5">
            Kumpulkan Lebih Banyak XP
          </h3>
          <div className="space-y-2">
            <div 
              className="p-3.5 rounded-2xl bg-gray-50/80 hover:bg-emerald-50/50 transition cursor-pointer flex items-center justify-between group" 
              onClick={() => navigate('edu_hub')}
            >
              <div className="flex items-center space-x-3 pr-2">
                <div className="bg-blue-100/80 text-blue-700 p-2.5 rounded-xl">
                  <BookOpen size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition">
                    Menyelesaikan Kuis Edukasi
                  </h4>
                  <p className="text-[10.5px] text-gray-400">Kerjakan kuis di setiap akhir artikel.</p>
                </div>
              </div>
              <div className="text-right flex-none">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  +100 XP
                </span>
                <span className="text-[9.5px] text-gray-400 block mt-0.5">Materi Fiqih</span>
              </div>
            </div>

            <div 
              className="p-3.5 rounded-2xl bg-gray-50/80 hover:bg-emerald-50/50 transition cursor-pointer flex items-center justify-between group" 
              onClick={() => navigate('catalog')}
            >
              <div className="flex items-center space-x-3 pr-2">
                <div className="bg-amber-100/80 text-amber-700 p-2.5 rounded-xl">
                  <ArrowUpRight size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition">
                    Melakukan Wakaf Produktif
                  </h4>
                  <p className="text-[10.5px] text-gray-400">Salurkan donasi wakaf kemanusiaan.</p>
                </div>
              </div>
              <div className="text-right flex-none">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                  +200 XP
                </span>
                <span className="text-[9.5px] text-gray-400 block mt-0.5">Sekali Donasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Histori Poin */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider flex items-center">
              <Clock size={13} className="mr-1.5 text-gray-400" />
              Histori Perolehan XP
            </h3>
            <span className="text-[10px] text-gray-400 font-bold">{history.length} amalan</span>
          </div>

          {history.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-400 text-xs">
              Belum ada catatan histori. Mulai dengan absen di atas!
            </div>
          ) : (
            <div className="bg-gray-50/70 rounded-2xl divide-y divide-gray-100 overflow-hidden text-left">
              {history.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 pr-2">
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1 leading-normal">{item.title}</h4>
                    <p className="text-[9.5px] text-gray-400 font-medium">{item.date} • Berhasil Tercatat</p>
                  </div>
                  <div className="text-right flex-none">
                    <span className={`text-xs font-mono font-bold ${
                      item.type === 'plus' ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {item.type === 'plus' ? '+' : '-'}{item.points} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
