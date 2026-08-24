import React from 'react';
import { ArrowLeft, Bell, Wallet, Info, HandHeart } from 'lucide-react';
import { ScreenRoute, NotificationItem } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'transaction',
    title: 'Pembayaran Berhasil',
    message: 'Alhamdulillah, pembayaran wakaf Anda sebesar Rp 500.000 telah kami terima.',
    time: '10 menit yang lalu',
    read: false,
    fullContent: {
      date: '23 Agustus 2026 • 21:50 WIB',
      subtitle: 'Konfirmasi Penerimaan Dana Wakaf Uang',
      description: 'Alhamdulillahirabbil \'alamin, dana wakaf uang yang Anda tunaikan telah berhasil terverifikasi secara sistem dan masuk ke rekening penampungan wakaf resmi mitra Amwal. Akad wakaf Anda telah dicatat secara sah.',
      badge: 'Transaksi Berhasil',
      highlights: [
        { label: 'Nomor Transaksi', value: 'WKF-20260823-8821' },
        { label: 'Program Wakaf', value: 'Pembangunan Gedung Sekolah Yatim & Dhuafa' },
        { label: 'Nominal Wakaf', value: 'Rp 500.000' },
        { label: 'Metode Pembayaran', value: 'QRIS Realtime (BSI)' },
        { label: 'Status Akad', value: 'Sah & Tervalidasi' }
      ],
      actionLabel: 'Lihat Riwayat Transaksi',
      actionRoute: 'history'
    }
  },
  {
    id: 2,
    type: 'update',
    title: 'Update Program Wakaf',
    message: 'Pembangunan Gedung Sekolah Yatim yang Anda danai telah mencapai progres 45%.',
    time: '2 jam yang lalu',
    read: false,
    fullContent: {
      date: '23 Agustus 2026 • 19:40 WIB',
      subtitle: 'Laporan Progres Pembangunan Sekolah Yatim',
      description: 'Pengerjaan struktur beton dan pengecoran lantai 2 Gedung Sekolah Yatim & Dhuafa telah rampung. Pembangunan berlanjut ke pemasangan dinding bata dan instalasi kelistrikan. Terima kasih atas partisipasi jariyah Anda.',
      badge: 'Update Proyek Wakaf',
      highlights: [
        { label: 'Nama Program', value: 'Pembangunan Gedung Sekolah Yatim' },
        { label: 'Mitra Nazhir', value: 'Yayasan Harapan Yatim Indonesia' },
        { label: 'Progres Aktual', value: '45% (Struktur Lantai 2)' },
        { label: 'Estimasi Selesai', value: 'Desember 2026' }
      ],
      actionLabel: 'Lihat Detail Program Wakaf',
      actionRoute: 'wakaf_detail'
    }
  },
  {
    id: 3,
    type: 'info',
    title: 'Selamat Datang di Amwal',
    message: 'Mulai perjalanan amal jariyah Anda bersama kami. Temukan program wakaf pilihan.',
    time: '1 hari yang lalu',
    read: true,
    fullContent: {
      date: '22 Agustus 2026 • 10:15 WIB',
      subtitle: 'Platform Digital Wakaf & Amal Jariyah Terpercaya',
      description: 'Ahlan wa Sahlan di Amwal! Bersama Amwal, tunaikan wakaf uang, zakat maal, infaq, dan qurban dengan mudah, aman, dan transparan langsung dari genggaman Anda. Seluruh program dikelola oleh Nazhir terverifikasi BWI.',
      badge: 'Selamat Datang',
      highlights: [
        { label: 'Pengawasan', value: 'Dewan Pengawas Syariah (DPS)' },
        { label: 'Legalitas', value: 'Badan Wakaf Indonesia (BWI)' },
        { label: 'Nominal Mulai', value: 'Rp 10.000 / Wakaf' }
      ],
      actionLabel: 'Jelajahi Program Wakaf',
      actionRoute: 'catalog'
    }
  }
];

export function NotificationScreen({ navigate, onSelectNotification }: Props) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return <Wallet size={20} />;
      case 'update':
        return <HandHeart size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const handleItemClick = (notif: NotificationItem) => {
    if (onSelectNotification) {
      onSelectNotification(notif);
    }
    navigate('notification_detail');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('home')} className="mr-3 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg flex-1">Notifikasi</h1>
      </div>

      <div className="p-4 space-y-3">
        {DEFAULT_NOTIFICATIONS.map(notif => (
          <div 
            key={notif.id} 
            onClick={() => handleItemClick(notif)}
            className={`bg-white p-4 rounded-xl border flex space-x-3 cursor-pointer ${notif.read ? 'border-gray-100' : 'border-green-200 shadow-sm bg-green-50/30'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              notif.type === 'transaction' ? 'bg-blue-100 text-blue-600' :
              notif.type === 'update' ? 'bg-green-100 text-green-600' :
              'bg-orange-100 text-orange-600'
            }`}>
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={`text-sm ${notif.read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>{notif.title}</h4>
                {!notif.read && <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{notif.message}</p>
              <p className="text-[10px] text-gray-400 font-medium">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
