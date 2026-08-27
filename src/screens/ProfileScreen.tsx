import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  FileText, 
  Download, 
  ChevronRight, 
  Coins, 
  Eye, 
  X, 
  CheckCircle2, 
  Award, 
  QrCode, 
  Check, 
  Printer 
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { getPoints } from '../utils/points';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

interface DocumentItem {
  id: string;
  title: string;
  code: string;
  date: string;
  nominal: string;
  nazhir: string;
  proyek: string;
}

const userDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Sertifikat Wakaf Masjid',
    code: 'SW-0091',
    date: '12 Apr 2026',
    nominal: 'Rp 5.000.000',
    nazhir: 'Yayasan Wakaf Masjid Agung Nusantara',
    proyek: 'Pembangunan Menara & Ruang Ibadah Tahap II'
  },
  {
    id: 'doc-2',
    title: 'Sertifikat Wakaf Masjid',
    code: 'SW-0092',
    date: '12 Apr 2026',
    nominal: 'Rp 4.500.000',
    nazhir: 'Dewan Kemakmuran Masjid Baitul Izzah',
    proyek: 'Pengadaan Sarana Air Bersih & Panel Surya'
  },
  {
    id: 'doc-3',
    title: 'Sertifikat Wakaf Masjid',
    code: 'SW-0093',
    date: '12 Apr 2026',
    nominal: 'Rp 3.000.000',
    nazhir: 'Lembaga Wakaf Produktif Indonesia',
    proyek: 'Renovasi Karpet & Interior Ruang Utama'
  }
];

export function ProfileScreen({ navigate }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (doc: DocumentItem) => {
    setDownloadSuccess(doc.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50 relative font-sans">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-xs">
        <button onClick={() => navigate('home')} className="mr-3 text-gray-600 hover:text-gray-950 p-1 rounded-full transition cursor-pointer">
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-bold text-lg flex-1 text-gray-800">Profil</h1>
        <button onClick={() => navigate('setting')} className="text-gray-600 hover:text-gray-950 p-1 rounded-full transition cursor-pointer">
          <Settings size={22} />
        </button>
      </div>

      <div className="bg-white p-5 border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
            alt="Profile" 
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full border-2 border-emerald-600 p-0.5 object-cover"
          />
          <div>
            <h2 className="font-bold text-lg text-gray-800">Ahmad Abdullah</h2>
            <p className="text-sm text-gray-500">ahmad.abdullah@email.com</p>
          </div>
        </div>
      </div>

      {/* Poin Berkah Banner */}
      <div 
        onClick={() => navigate('points')}
        className="mx-4 mt-4 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-xl p-3.5 flex items-center justify-between shadow-3xs cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg text-amber-300">
            <Coins size={18} className="animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider block">Level 1 • Mubtadi</span>
            <span className="text-xs font-black font-mono">{getPoints()} XP Berkah</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-emerald-250 font-bold">
          <span>Rincian</span>
          <ChevronRight size={14} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm text-gray-800 mb-3">Ringkasan Portofolio</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-center">
            <span className="text-xs text-gray-500 mb-1">Total Wakaf</span>
            <span className="font-bold text-lg text-emerald-700">Rp 12.5M</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-center">
            <span className="text-xs text-gray-500 mb-1">Program Didanai</span>
            <span className="font-bold text-lg text-gray-800">14 <span className="text-xs font-normal text-gray-500">Proyek</span></span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-center">
            <span className="text-xs text-gray-500 mb-1">Sertifikat Wakaf</span>
            <span className="font-bold text-lg text-gray-800">12 <span className="text-xs font-normal text-gray-500">Terbit</span></span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col justify-center">
            <span className="text-xs text-gray-500 mb-1">Total Zakat</span>
            <span className="font-bold text-lg text-blue-600">Rp 4.2M</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-left">
        <div className="px-4 mb-2">
          <h3 className="font-bold text-sm text-gray-800">Dokumen Saya</h3>
        </div>
        <div className="bg-white border-y border-gray-100 divide-y divide-gray-100">
          {userDocuments.map((doc) => (
            <div key={doc.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{doc.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{doc.date} • {doc.code}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {/* Tombol Preview Dokumen */}
                <button 
                  onClick={() => setSelectedDoc(doc)}
                  title="Lihat Pratinjau Dokumen"
                  className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition cursor-pointer"
                >
                  <Eye size={18} />
                </button>
                {/* Tombol Unduh Dokumen */}
                <button 
                  onClick={() => handleDownload(doc)}
                  title="Unduh Dokumen PDF"
                  className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition cursor-pointer"
                >
                  {downloadSuccess === doc.id ? (
                    <Check size={18} className="text-emerald-600" />
                  ) : (
                    <Download size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 px-4 pb-4">
        <button 
          onClick={() => navigate('login')} 
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-3.5 rounded-xl text-sm border border-rose-100 transition cursor-pointer"
        >
          Keluar (Logout)
        </button>
      </div>

      {/* Modal Pratinjau Sertifikat Wakaf */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={18} className="text-emerald-400" />
                <span className="font-bold text-xs">Pratinjau Sertifikat Resmi</span>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Paper Container */}
            <div className="p-4 overflow-y-auto bg-slate-100">
              <div className="bg-white border-2 border-emerald-700/60 rounded-xl p-5 shadow-md relative overflow-hidden text-center">
                {/* Decorative border watermark */}
                <div className="absolute inset-2 border border-emerald-600/20 rounded-lg pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full opacity-50 pointer-events-none"></div>

                {/* Badge Lembaga */}
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                    <Award size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-black tracking-widest text-emerald-800 uppercase block leading-none">Badan Wakaf Indonesia</span>
                    <span className="text-[8px] text-gray-400 font-medium leading-none">Nomor Pengesahan: BWI/SWU/2026</span>
                  </div>
                </div>

                <div className="my-3 border-t border-b border-emerald-100 py-2">
                  <h3 className="font-serif font-black text-sm text-emerald-950 uppercase tracking-wider">
                    Sertifikat Wakaf Uang
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-700 font-bold mt-0.5">
                    No: {selectedDoc.code}/WAKAF/BWI/2026
                  </p>
                </div>

                <p className="text-[10px] text-gray-500 italic mb-2">
                  Diberikan dengan penuh takzim kepada:
                </p>

                <h4 className="text-sm font-extrabold text-gray-900 mb-1">
                  Ahmad Abdullah
                </h4>
                <p className="text-[10px] text-gray-500 mb-3">
                  Wakif Terdaftar
                </p>

                <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2.5 mb-3 text-left space-y-1">
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-gray-500">Nilai Wakaf:</span>
                    <span className="font-bold text-emerald-900">{selectedDoc.nominal}</span>
                  </div>
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-gray-500">Peruntukan:</span>
                    <span className="font-bold text-gray-800 truncate max-w-[170px]">{selectedDoc.title}</span>
                  </div>
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-gray-500">Tanggal Ikrar:</span>
                    <span className="font-semibold text-gray-700">{selectedDoc.date}</span>
                  </div>
                  <div className="flex justify-between text-[10.5px]">
                    <span className="text-gray-500">Nazhir Mitra:</span>
                    <span className="font-semibold text-gray-700 truncate max-w-[170px]">{selectedDoc.nazhir}</span>
                  </div>
                </div>

                {/* QR Code Verifikasi */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-left">
                    <div className="p-1 bg-white border border-gray-200 rounded-md shadow-2xs">
                      <QrCode size={36} className="text-slate-800" />
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-emerald-800 block flex items-center">
                        <CheckCircle2 size={9} className="mr-0.5 text-emerald-600" /> Tervalidasi Sah
                      </span>
                      <span className="text-[8px] text-gray-400 block">Pindai untuk verifikasi</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] text-gray-400 block">Tertanda Digital,</span>
                    <span className="text-[9px] font-bold text-emerald-900 block">Ketua Badan Pelaksana BWI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
              <button 
                onClick={() => handleDownload(selectedDoc)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                {downloadSuccess === selectedDoc.id ? (
                  <>
                    <Check size={14} />
                    <span>Tersimpan di Perangkat</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Unduh PDF Resmi</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

