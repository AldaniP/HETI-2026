import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, CheckCircle2, ShieldCheck, Building2, Calendar, FileSpreadsheet, Eye } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
  docType?: 'rab' | 'usage' | 'legal';
}

export function DocumentScreen({ navigate, docType = 'rab' }: Props) {
  const [activeDoc, setActiveDoc] = useState<'rab' | 'usage' | 'legal'>(docType);
  const [downloaded, setDownloaded] = useState(false);

  const docDetails = {
    rab: {
      title: 'Rencana Anggaran Biaya (RAB)',
      fileName: 'RAB_Pembangunan_Gedung_Sekolah_Yatim_2026.pdf',
      size: '2.4 MB',
      updated: '15 Januari 2026',
      subtitle: 'Rincian Estimasi Biaya Konstruksi & Pengadaan Fasilitas',
      sections: [
        { label: 'Pekerjaan Struktur & Pondasi (3 Lantai)', cost: 'Rp 420.000.000' },
        { label: 'Pekerjaan Arsitektur, Dinding & Atap', cost: 'Rp 280.000.000' },
        { label: 'Instalasi MEP (Mekanikal, Elektrikal, Sanitasi)', cost: 'Rp 150.000.000' },
        { label: 'Sarana Meubelair Kelas & Asrama Santri', cost: 'Rp 100.000.000' },
        { label: 'Biaya Pengawasan Teknis & Operasional (5%)', cost: 'Rp 50.000.000' },
      ],
      total: 'Rp 1.000.000.000',
      auditor: 'Tim Ahli Konstruksi & Akuntan Publik Terdaftar'
    },
    usage: {
      title: 'Laporan Penggunaan Wakaf',
      fileName: 'Laporan_Realisasi_Penggunaan_Dana_Wakaf_Tahap_1_2.pdf',
      size: '3.1 MB',
      updated: '20 Februari 2026',
      subtitle: 'Akuntabilitas Realisasi Penyerapan Dana Wakaf yang Telah Terhimpun',
      sections: [
        { label: 'Pembersihan Lahan & Pondasi Bore Pile (Tahap 1)', cost: 'Rp 185.000.000' },
        { label: 'Pengecoran Kolom & Balok Lantai 1 (Tahap 2)', cost: 'Rp 165.000.000' },
        { label: 'Pengadaan Besi Ulir & Semen Curah Bersertifikat', cost: 'Rp 75.000.000' },
        { label: 'Upah Tukang & Tenaga Ahli (Jan - Feb 2026)', cost: 'Rp 25.000.000' },
      ],
      total: 'Rp 450.000.000 (Terserap)',
      auditor: 'Laporan Diaudit oleh Nazhir Dompet Dhuafa & Pengawas Syariah'
    },
    legal: {
      title: 'Legalitas Nazhir',
      fileName: 'SK_BWI_Legalitas_Nazhir_Dompet_Dhuafa.pdf',
      size: '1.8 MB',
      updated: '10 Desember 2025',
      subtitle: 'Sertifikat & Izin Resmi Pengelola Wakaf dari Badan Wakaf Indonesia',
      sections: [
        { label: 'Nomor Registrasi Nazhir BWI', cost: '3.3.00012/BWI/NZ/2020' },
        { label: 'Izin Operasional Lembaga Amil Zakat & Wakaf', cost: 'SK Kemenag RI No. 491/2021' },
        { label: 'Akta Notaris & Pengesahan Kemenkumham', cost: 'AHU-0019283.AH.01.04.2016' },
        { label: 'Opini Audit Keuangan Independen', cost: 'WTP (Wajar Tanpa Pengecualian)' },
        { label: 'Status Pengawasan Syariah', cost: 'Terverifikasi Dewan Pengawas Syariah' },
      ],
      total: 'Status: Nazhir Resmi & Aktif',
      auditor: 'Badan Wakaf Indonesia (BWI) & Kementerian Agama RI'
    }
  };

  const current = docDetails[activeDoc];

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-100 flex flex-col h-full relative font-sans">
      {/* Top Header */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <button 
            onClick={() => navigate('wakaf_detail')} 
            className="text-slate-600 hover:text-emerald-800 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-extrabold text-sm text-slate-900 tracking-tight">{current.title}</h1>
            <p className="text-[10.5px] text-slate-400">Transparansi Dokumen Program Wakaf</p>
          </div>
        </div>

        <button 
          onClick={handleDownload}
          className="flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-2xs active:scale-95"
          title="Unduh Dokumen"
        >
          <Download size={14} />
          <span>{downloaded ? 'Tersimpan!' : 'Unduh'}</span>
        </button>
      </div>

      {/* Doc Selector Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-100 flex space-x-1.5 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveDoc('rab')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeDoc === 'rab' 
              ? 'bg-emerald-700 text-white shadow-2xs' 
              : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          RAB Proyek
        </button>
        <button
          onClick={() => setActiveDoc('usage')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeDoc === 'usage' 
              ? 'bg-emerald-700 text-white shadow-2xs' 
              : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          Laporan Penggunaan
        </button>
        <button
          onClick={() => setActiveDoc('legal')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeDoc === 'legal' 
              ? 'bg-emerald-700 text-white shadow-2xs' 
              : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          Legalitas Nazhir
        </button>
      </div>

      {/* PDF Document Canvas View */}
      <div className="p-4 flex-1 flex flex-col items-center">
        {/* Document Card (A4 proportion representation) */}
        <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-4">
          {/* Header of Document */}
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">Dokumen Resmi BWI & Nazhir</span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900 leading-snug">{current.title}</h2>
              <p className="text-[11px] text-slate-500">{current.subtitle}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100/80">
              <FileSpreadsheet size={20} />
            </div>
          </div>

          {/* Meta Info Bar */}
          <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Nama Berkas</span>
              <span className="text-[11px] font-bold text-slate-800 truncate block">{current.fileName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Terakhir Diperbarui</span>
              <span className="text-[11px] font-bold text-slate-800 flex items-center">
                <Calendar size={11} className="mr-1 text-slate-400" />
                {current.updated}
              </span>
            </div>
          </div>

          {/* Table Breakdown / Itemized Details */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-slate-700 block uppercase tracking-wider">
              {activeDoc === 'legal' ? 'Rincian Perizinan & Akreditasi:' : 'Rincian Alokasi & Rekapitulasi Anggaran:'}
            </span>
            <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              {current.sections.map((sec, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between bg-white hover:bg-slate-50/70 transition">
                  <span className="text-slate-700 text-[11.5px] font-medium pr-2">{sec.label}</span>
                  <span className="font-extrabold text-slate-900 text-right shrink-0 text-[11.5px]">{sec.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary / Total Box */}
          <div className="bg-emerald-50/70 border border-emerald-100/90 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                {activeDoc === 'legal' ? 'Status Verifikasi' : 'Jumlah Keseluruhan'}
              </span>
              <span className="text-sm font-extrabold text-emerald-950">{current.total}</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-[10px] font-bold">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Terverifikasi</span>
            </div>
          </div>

          {/* Auditor Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-[10.5px] text-slate-400">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span className="leading-tight">{current.auditor}</span>
          </div>

          {/* Action Download Full Button */}
          <button 
            onClick={handleDownload}
            className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold py-3 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer shadow-xs"
          >
            <Download size={16} />
            <span>{downloaded ? 'Dokumen Berhasil Diunduh (PDF)' : 'Unduh Dokumen Lengkap (PDF)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

