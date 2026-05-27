import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { ScreenRoute, HistoryItem } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function HistoryScreen({ navigate }: Props) {
  const [activeTab, setActiveTab] = useState('Semua');
  
  const historyData: HistoryItem[] = [
    { id: 'INV-2026-001', campaignTitle: 'Pembangunan Gedung Sekolah Yatim', date: '25 Mei 2026 14:30', amount: 500000, status: 'Proses' },
    { id: 'INV-2026-002', campaignTitle: 'Wakaf Alat Kesehatan Klinik Umat', date: '10 Apr 2026 09:15', amount: 1000000, status: 'Berhasil' },
    { id: 'INV-2025-098', campaignTitle: 'Wakaf Sumur Air Bersih', date: '12 Des 2025 16:45', amount: 250000, status: 'Berhasil' },
    { id: 'INV-2025-075', campaignTitle: 'Wakaf Al-Quran Pelosok', date: '01 Nov 2025 10:00', amount: 150000, status: 'Gagal' },
  ];

  const filteredHistory = activeTab === 'Semua' 
    ? historyData 
    : historyData.filter(item => item.status === activeTab);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Berhasil': return 'text-green-600 bg-green-50';
      case 'Proses': return 'text-orange-600 bg-orange-50';
      case 'Gagal': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Berhasil': return <CheckCircle2 size={16} className="text-green-600 mr-1" />;
      case 'Proses': return <Clock size={16} className="text-orange-600 mr-1" />;
      case 'Gagal': return <XCircle size={16} className="text-red-600 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50 flex flex-col h-full">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <h1 className="font-bold text-lg flex-1">Riwayat Wakaf</h1>
      </div>
      
      <div className="bg-white py-3 px-4 shadow-sm border-b border-gray-100">
        <div className="flex overflow-x-auto space-x-2 hide-scrollbar">
          {['Semua', 'Proses', 'Berhasil', 'Gagal'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredHistory.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs text-gray-500 mb-1 block">{item.date} • {item.id}</span>
                <h4 className="font-bold text-sm text-gray-800 leading-tight pr-4">{item.campaignTitle}</h4>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold flex items-center border ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                {item.status}
              </div>
            </div>
            
            <div className="border-t border-dashed border-gray-200 my-3"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nominal Wakaf</span>
              <span className="font-bold text-green-700">Rp {item.amount.toLocaleString('id-ID')}</span>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-10 opacity-50 flex flex-col items-center">
            <Clock size={40} className="text-gray-400 mb-3" />
            <p className="font-medium text-gray-600">Belum ada riwayat {activeTab !== 'Semua' ? activeTab.toLowerCase() : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}
