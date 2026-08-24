import React from 'react';
import { 
  ArrowLeft, 
  Wallet, 
  HandHeart, 
  Info, 
  Clock, 
  Share2 
} from 'lucide-react';
import { ScreenRoute, NotificationItem } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
  notification: NotificationItem | null;
}

export function NotificationDetailScreen({ navigate, notification }: Props) {
  // Fallback if accessed without selected notification
  const notif: NotificationItem = notification || {
    id: 1,
    type: 'transaction',
    title: 'Pembayaran Berhasil',
    message: 'Alhamdulillah, pembayaran wakaf Anda sebesar Rp 500.000 telah kami terima.',
    time: '10 menit yang lalu',
    read: true,
    fullContent: {
      date: '23 Agustus 2026 • 21:50 WIB',
      subtitle: 'Konfirmasi Penerimaan Dana Wakaf Uang',
      description: 'Alhamdulillahirabbil \'alamin, dana wakaf uang yang Anda tunaikan telah berhasil terverifikasi secara sistem dan masuk ke rekening penampungan wakaf resmi mitra Amwal. Akad wakaf Anda telah dicatat secara sah.'
    }
  };

  const getIcon = () => {
    switch (notif.type) {
      case 'transaction':
        return (
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
            <Wallet size={24} />
          </div>
        );
      case 'update':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
            <HandHeart size={24} />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
            <Info size={24} />
          </div>
        );
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notif.title,
        text: `${notif.title}: ${notif.message} via Aplikasi Amwal Wakaf`,
      }).catch(() => {});
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full relative font-sans">
      {/* Top App Bar */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('notification')} 
            className="text-gray-700 hover:text-emerald-700 p-1 rounded-full transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="font-extrabold text-base text-gray-800">Detail Notifikasi</h1>
            <p className="text-[10.5px] text-gray-400 font-medium">Informasi & Pembaruan Akun</p>
          </div>
        </div>

        <button 
          onClick={handleShare}
          className="text-gray-500 hover:text-emerald-700 p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          title="Bagikan Notifikasi"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Main Content Area (Flat Page Layout) */}
      <div className="px-5 py-6 space-y-4">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h2 className="font-extrabold text-lg text-gray-900 leading-snug">
              {notif.title}
            </h2>
            <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-medium mt-0.5">
              <span className="flex items-center">
                <Clock size={12} className="mr-1 text-gray-400" />
                {notif.time}
              </span>
              <span>•</span>
              <span>{notif.fullContent?.date || 'Hari ini'}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">
            {notif.fullContent?.description || notif.message}
          </p>
        </div>
      </div>
    </div>
  );
}
