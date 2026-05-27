import React from 'react';
import { ArrowLeft, Bell, Wallet, Info, HandHeart } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function NotificationScreen({ navigate }: Props) {
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      title: 'Pembayaran Berhasil',
      message: 'Alhamdulillah, pembayaran wakaf Anda sebesar Rp 500.000 telah kami terima.',
      time: '10 menit yang lalu',
      read: false,
      icon: <Wallet size={20} />
    },
    {
      id: 2,
      type: 'update',
      title: 'Update Program Wakaf',
      message: 'Pembangunan Gedung Sekolah Yatim yang Anda danai telah mencapai progres 45%.',
      time: '2 jam yang lalu',
      read: false,
      icon: <HandHeart size={20} />
    },
    {
      id: 3,
      type: 'info',
      title: 'Selamat Datang di Amwal',
      message: 'Mulai perjalanan amal jariyah Anda bersama kami. Temukan program wakaf pilihan.',
      time: '1 hari yang lalu',
      read: true,
      icon: <Info size={20} />
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('home')} className="mr-3 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg flex-1">Notifikasi</h1>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className={`bg-white p-4 rounded-xl border flex space-x-3 cursor-pointer ${notif.read ? 'border-gray-100' : 'border-green-200 shadow-sm bg-green-50/30'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              notif.type === 'transaction' ? 'bg-blue-100 text-blue-600' :
              notif.type === 'update' ? 'bg-green-100 text-green-600' :
              'bg-orange-100 text-orange-600'
            }`}>
              {notif.icon}
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
