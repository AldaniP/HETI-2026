import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  QrCode,
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';
import { ScreenRoute, HistoryItem } from '../types';
import { generateWakafReceiptPDF } from '../utils/pdfGenerator';

interface Props {
  navigate: (route: ScreenRoute) => void;
  item: HistoryItem;
}

export function HistoryDetailScreen({ navigate, item }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      generateWakafReceiptPDF(item);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bukti Wakaf - ${item.campaignTitle}`,
        text: `Alhamdulillah telah berwakaf untuk "${item.campaignTitle}" sebesar Rp ${item.amount.toLocaleString('id-ID')} via Serambi Wakaf.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy(`Bukti Wakaf ${item.id} - ${item.campaignTitle} (Rp ${item.amount.toLocaleString('id-ID')})`, 'share');
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'Berhasil':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 size={18} className="text-emerald-600" />,
          title: 'Wakaf Berhasil Disalurkan',
          desc: 'Dana telah diterima oleh Nazhir resmi dan tercatat dalam sistem amanah.'
        };
      case 'Proses':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <Clock size={18} className="text-amber-600" />,
          title: 'Sedang Dalam Proses',
          desc: 'Menunggu konfirmasi verifikasi sistem pembayaran syariah.'
        };
      case 'Gagal':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <XCircle size={18} className="text-rose-600" />,
          title: 'Transaksi Gagal / Kedaluwarsa',
          desc: 'Batas waktu pembayaran telah berakhir atau transaksi dibatalkan.'
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 flex flex-col h-full relative font-sans">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-20 border-b border-gray-150 shadow-xs justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('history')} 
            className="p-1.5 -ml-1.5 text-gray-700 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="font-extrabold text-base text-gray-900 leading-tight">Rincian Transaksi</h1>
            <p className="text-[10.5px] text-gray-500 font-medium">{item.id}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button 
            onClick={handleShare}
            title="Bagikan"
            className="p-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition"
          >
            {copiedField === 'share' ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            title="Unduh PDF"
            className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200 flex items-center space-x-1"
          >
            <Download size={18} className={isDownloading ? 'animate-bounce' : ''} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        
        {/* Status Card Banner */}
        <div className={`p-4 rounded-2xl border ${statusInfo.bg} shadow-xs`}>
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-white/80 border border-current/20 shrink-0">
              {statusInfo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-wider">{statusInfo.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current/20">
                  {item.status}
                </span>
              </div>
              <p className="text-xs opacity-90 font-medium leading-relaxed mt-1">{statusInfo.desc}</p>
            </div>
          </div>

          {downloadSuccess && (
            <div className="mt-3 bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center space-x-2 animate-fadeIn shadow-xs">
              <CheckCircle2 size={16} />
              <span>Bukti PDF Transaksi Berhasil Diunduh!</span>
            </div>
          )}
        </div>

        {/* Primary Action Button: Download PDF & Certificate Preview */}
        <div className="bg-white rounded-2xl border border-gray-150 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <FileText size={18} />
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-gray-800">Dokumen Kuitansi & Sertifikat</h3>
                <p className="text-[10px] text-gray-400 font-medium">Format PDF Resmi • Bukti Sah BWI</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center">
              <ShieldCheck size={12} className="mr-1" /> Terverifikasi
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              <Download size={15} />
              <span>{isDownloading ? 'Membuat PDF...' : 'Unduh PDF'}</span>
            </button>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-2 border border-emerald-200/80 transition active:scale-[0.98] cursor-pointer"
            >
              <Eye size={15} />
              <span>Lihat Kuitansi</span>
            </button>
          </div>
        </div>

        {/* Nominal Highlight Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl p-5 text-white shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <span className="text-[11px] text-emerald-200 font-semibold uppercase tracking-wider block mb-1">
                Nominal Wakaf
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Rp {item.amount.toLocaleString('id-ID')}
              </h2>
              <div className="mt-2 flex items-center text-[10.5px] text-emerald-100 font-medium">
                <Sparkles size={13} className="mr-1.5 text-amber-300" />
                <span>+200 Poin Berkah Amal Jariyah</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-200 block font-medium">Waktu Transaksi</span>
              <span className="text-xs font-bold text-white block mt-0.5">{item.date}</span>
            </div>
          </div>
        </div>

        {/* Program & Nazhir Card */}
        <div className="bg-white rounded-2xl border border-gray-150 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-[10.5px] font-extrabold text-gray-400 uppercase tracking-wide">Program Wakaf</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              {item.category || 'Sosial & Dakwah'}
            </span>
          </div>

          <div className="flex items-start space-x-3.5">
            <img 
              src={item.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80"}
              alt={item.campaignTitle}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-sm text-gray-850 leading-snug mb-1">
                {item.campaignTitle}
              </h3>
              <div className="flex items-center text-xs text-gray-500 font-medium">
                <Building2 size={13} className="mr-1 text-emerald-700 shrink-0" />
                <span className="truncate">{item.nazhir || 'Yayasan Amanah / Dompet Dhuafa'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button 
              onClick={() => navigate('wakaf_detail')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
            >
              <span>Lihat Detail Program</span>
              <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Payment Breakdown & Bank Details */}
        <div className="bg-white rounded-2xl border border-gray-150 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-extrabold text-xs text-gray-800 uppercase tracking-wide">Rincian Pembayaran</h3>
            <span className="text-[10px] text-gray-400 font-bold">100% Syariah</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-500 font-medium">Nomor Transaksi</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-gray-800 font-mono">{item.id}</span>
                <button 
                  onClick={() => handleCopy(item.id, 'invoice')} 
                  className="text-gray-400 hover:text-emerald-700 p-0.5"
                  title="Salin No Transaksi"
                >
                  {copiedField === 'invoice' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-500 font-medium">No. Referensi Bank</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-gray-700 font-mono text-[11px]">{item.refNumber || 'REF-883912048'}</span>
                <button 
                  onClick={() => handleCopy(item.refNumber || 'REF-883912048', 'ref')} 
                  className="text-gray-400 hover:text-emerald-700 p-0.5"
                  title="Salin No Referensi"
                >
                  {copiedField === 'ref' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-500 font-medium">Metode Pembayaran</span>
              <span className="font-bold text-gray-800">{item.paymentMethod || 'QRIS Digital (GPN)'}</span>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-500 font-medium">Nominal Wakaf Pokok</span>
              <span className="font-bold text-gray-800">Rp {item.amount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-gray-500 font-medium">Biaya Administrasi & Layanan</span>
              <span className="font-bold text-emerald-700">Rp 0 (Gratis)</span>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-2.5 mt-2 flex justify-between items-center">
              <span className="font-bold text-sm text-gray-800">Total Pembayaran</span>
              <span className="font-extrabold text-base text-emerald-800">
                Rp {item.amount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Syariah Ijab Qabul Card */}
        <div className="bg-emerald-50/70 rounded-2xl border border-emerald-100 p-4 text-emerald-900 space-y-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck size={15} />
            <span>Akad Ijab Qabul Syariah</span>
          </div>
          <p className="text-[11px] font-serif italic text-emerald-800/90 leading-relaxed">
            "Saya menyatakan mewakafkan harta sejumlah Rp {item.amount.toLocaleString('id-ID')} secara ikhlas karena Allah Ta'ala untuk dikelola oleh Nazhir {item.nazhir || 'terkait'} sesuai peruntukan program {item.campaignTitle}."
          </p>
        </div>

        {/* Help / Support Section */}
        <div className="p-3 bg-white rounded-2xl border border-gray-150 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <HelpCircle size={17} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Punya kendala transaksi?</p>
              <p className="text-[10px] text-gray-400 font-medium">Bantuan Resmi: 021-27874080</p>
            </div>
          </div>
          <button 
            onClick={() => handleCopy('support@serambiwakaf.id', 'cs')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
          >
            {copiedField === 'cs' ? 'Tersalin!' : 'Hubungi CS'}
          </button>
        </div>

      </div>

      {/* Floating Bottom Bar: Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-150 p-3.5 z-30 shadow-lg flex items-center space-x-3">
        <button
          onClick={() => navigate('history')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs transition text-center"
        >
          Kembali ke Riwayat
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
        >
          <Download size={16} />
          <span>{isDownloading ? 'Mengunduh...' : 'Unduh Bukti Wakaf (PDF)'}</span>
        </button>
      </div>

      {/* Certificate Modal Preview */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl relative animate-scaleUp">
            
            {/* Close Button */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="font-extrabold text-xs text-gray-800 uppercase tracking-wide">Pratinjau Kuitansi Wakaf</span>
              <button 
                onClick={() => setShowCertificateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Certificate Visual Box */}
            <div className="border-4 border-double border-emerald-700 rounded-2xl p-4 bg-emerald-50/20 text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-emerald-200">
                <QrCode size={38} className="opacity-25" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  <span>Serambi Wakaf Indonesia</span>
                </div>
                <h2 className="text-sm font-black text-gray-900 tracking-tight">KUITANSI & SERTIFIKAT WAKAF</h2>
                <p className="text-[9.5px] text-gray-400 font-mono">No: {item.id}</p>
              </div>

              <div className="py-2 border-y border-dashed border-emerald-200 text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-[10.5px]">Wakif:</span>
                  <span className="font-bold text-gray-800">{item.wakifName || 'Ahmad Dani Prasetyo'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-[10.5px]">Program:</span>
                  <span className="font-bold text-gray-800 truncate max-w-[170px]">{item.campaignTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-[10.5px]">Nazhir:</span>
                  <span className="font-bold text-gray-800">{item.nazhir || 'Yayasan Amanah'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-[10.5px]">Tanggal:</span>
                  <span className="font-bold text-gray-800">{item.date}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                  <span className="font-bold text-gray-700">Nominal Wakaf:</span>
                  <span className="font-black text-emerald-800 text-sm">Rp {item.amount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <p className="text-[9.5px] italic text-gray-500 font-serif leading-tight">
                "Pahala sedekah jariyah senantiasa mengalir selama harta wakaf dimanfaatkan untuk kemaslahatan ummat."
              </p>

              <div className="flex justify-between items-center pt-2 text-[9px] text-gray-400 border-t border-gray-150">
                <span>Status: <b>{item.status.toUpperCase()}</b></span>
                <span className="font-bold text-emerald-800">BWI Terakreditasi ✓</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs transition"
              >
                <Download size={15} />
                <span>Unduh File PDF Sekarang</span>
              </button>

              <button
                onClick={() => setShowCertificateModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition"
              >
                Tutup Pratinjau
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
