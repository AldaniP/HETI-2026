import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function PaymentSuccessScreen({ navigate }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={48} />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Alhamdulillah</h1>
      <p className="text-gray-500 mb-8">Pembayaran wakaf Anda sedang diproses. Semoga menjadi amal jariyah yang pahalanya tidak terputus.</p>
      
      <div className="bg-gray-50 rounded-xl p-4 w-full border border-gray-100 mb-8 text-left">
        <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">ID Transaksi</span>
            <span className="text-sm font-bold text-gray-800">INV-2026-003</span>
        </div>
        <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Program</span>
            <span className="text-sm font-bold text-gray-800 truncate ml-4">Pembangunan Gedung...</span>
        </div>
        <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Metode</span>
            <span className="text-sm font-bold text-gray-800">QRIS</span>
        </div>
        <div className="border-t border-dashed border-gray-300 my-3"></div>
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Total</span>
            <span className="text-lg font-bold text-green-700">Rp 500.000</span>
        </div>
      </div>

      <div className="w-full space-y-3 mt-auto mb-8">
        <button 
            onClick={() => navigate('history')}
            className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition"
        >
            Lihat Riwayat Wakaf
        </button>
        <button 
            onClick={() => navigate('home')}
            className="w-full bg-white text-green-600 font-bold py-3.5 rounded-xl border border-green-200 hover:bg-green-50 transition"
        >
            Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
