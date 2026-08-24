import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

interface FAQItem {
  id: number;
  question: string;
  category: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 1,
    category: 'Wakaf',
    question: 'Bagaimana cara menunaikan wakaf uang di Amwal?',
    answer: 'Pilih program wakaf yang ingin Anda danai dari katalog, tentukan nominal wakaf (mulai dari Rp 10.000), isi niat/ikrar wakaf, lalu pilih metode pembayaran yang tersedia (QRIS, Transfer Virtual Account Bank Syariah, atau E-Wallet). Setelah pembayaran terverifikasi, akad ikrar wakaf Anda otomatis tercatat.'
  },
  {
    id: 2,
    category: 'Sertifikat',
    question: 'Kapan saya mendapatkan Sertifikat Wakaf Uang (SWU)?',
    answer: 'Sertifikat Wakaf resmi akan terbit otomatis di menu Dokumen / Profil Anda segera setelah pembayaran berhasil diverifikasi. Untuk wakaf bernilai di atas Rp 1.000.000, Anda juga dapat mengunduh format Sertifikat Resmi berstempel Nazhir dan BWI.'
  },
  {
    id: 3,
    category: 'Legalitas',
    question: 'Apakah seluruh Nazhir di Amwal telah resmi terdaftar di BWI?',
    answer: 'Ya, seluruh mitra Nazhir pengelola wakaf di platform Amwal telah melalui proses verifikasi dan memiliki tanda bukti pendaftaran resmi dari Badan Wakaf Indonesia (BWI) serta diawasi oleh Dewan Pengawas Syariah (DPS).'
  },
  {
    id: 4,
    category: 'Transaksi',
    question: 'Bagaimana jika pembayaran saya sudah dipotong tetapi status masih tertunda?',
    answer: 'Verifikasi otomatis melalui QRIS dan Virtual Account biasanya berlangsung dalam waktu 1-5 menit. Jika dalam 15 menit status belum berubah, silakan hubungi tim CS kami melalui WhatsApp dengan menyertakan bukti transfer / nomor transaksi Anda.'
  },
  {
    id: 5,
    category: 'Wakaf',
    question: 'Apakah pokok harta wakaf uang dapat berkurang atau dibagikan?',
    answer: 'Sesuai UU No. 41 Tahun 2004 dan Fatwa MUI, pokok harta wakaf uang dijamin keabadiannya dan tidak boleh berkurang atau dihibahkan. Dana diinvestasikan pada portofolio produktif aman (sukuk/sektor riil), dan hanya hasil surplus investasinya yang disalurkan kepada penerima manfaat (mauquf \'alaih).'
  },
  {
    id: 6,
    category: 'Zakat',
    question: 'Bagaimana cara menghitung zakat penghasilan atau zakat maal?',
    answer: 'Gunakan fitur Kalkulator Zakat Pintar di menu Zakat. Masukkan nominal penghasilan bulanan, tabungan emas, atau aset produktif Anda, dan sistem akan mengalkulasikan batas nishab serta kewajiban zakat 2.5% secara otomatis sesuai kaidah fiqih.'
  }
];

export function HelpCenterScreen({ navigate }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const categories = ['Semua', 'Wakaf', 'Sertifikat', 'Transaksi', 'Legalitas', 'Zakat'];

  const filteredFaqs = FAQ_LIST.filter(item => {
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchQuery = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative font-sans">
      {/* Top App Bar */}
      <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('setting')} 
          className="mr-3 text-gray-700 hover:text-emerald-700 p-1 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-extrabold text-base text-gray-850">Pusat Bantuan</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 shadow-xs space-y-3">
          <div>
            <h2 className="font-extrabold text-base">Halo, ada yang bisa kami bantu?</h2>
            <p className="text-xs text-emerald-200 mt-0.5">Temukan solusi seputar wakaf, zakat, dan panduan transaksi</p>
          </div>

          <div className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik bantuan atau pertanyaan..."
              className="w-full bg-white text-gray-850 text-xs rounded-xl pl-9 pr-4 py-3 font-medium outline-none shadow-xs placeholder:text-gray-400"
            />
            <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Contact Channels Grid */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Layanan Bantuan Resmi</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {/* WhatsApp */}
            <div 
              onClick={() => handleCopy('+62 812-3456-7890', 'wa')}
              className="bg-white p-3 rounded-2xl shadow-xs flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition active:scale-98"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                <MessageCircle size={20} />
              </div>
              <span className="text-[11px] font-bold text-gray-850">WhatsApp</span>
              <span className="text-[9.5px] text-gray-400 mt-0.5 font-medium">
                {copiedKey === 'wa' ? 'Tersalin!' : '0812-3456-7890'}
              </span>
            </div>

            {/* Email */}
            <div 
              onClick={() => handleCopy('support@amwal.id', 'email')}
              className="bg-white p-3 rounded-2xl shadow-xs flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition active:scale-98"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                <Mail size={20} />
              </div>
              <span className="text-[11px] font-bold text-gray-850">Email</span>
              <span className="text-[9.5px] text-gray-400 mt-0.5 font-medium">
                {copiedKey === 'email' ? 'Tersalin!' : 'support@amwal.id'}
              </span>
            </div>

            {/* Call Center */}
            <div 
              onClick={() => handleCopy('021-27874080', 'phone')}
              className="bg-white p-3 rounded-2xl shadow-xs flex flex-col items-center text-center cursor-pointer hover:bg-gray-50 transition active:scale-98"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                <Phone size={20} />
              </div>
              <span className="text-[11px] font-bold text-gray-850">Call Center</span>
              <span className="text-[9.5px] text-gray-400 mt-0.5 font-medium">
                {copiedKey === 'phone' ? 'Tersalin!' : '021-27874080'}
              </span>
            </div>
          </div>
        </div>

        {/* FAQ Filter Chips */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kategori FAQ</h3>
          <div className="flex overflow-x-auto gap-2 pb-1 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 shadow-2xs hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-xs shadow-xs">
              Tidak ada hasil yang cocok dengan pencarian "{searchQuery}"
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs transition"
                >
                  <button 
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50/50"
                  >
                    <div className="flex items-start space-x-2.5 pr-2">
                      <HelpCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-gray-850 leading-snug">{faq.question}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* AI Wakaf Consultant recommendation banner */}
        <div 
          onClick={() => navigate('ai_chat')}
          className="bg-emerald-50 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-emerald-100/80 transition shadow-xs"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-emerald-950">Konsultasi Fiqih Wakaf via AI</h4>
              <p className="text-[10px] text-emerald-700">Tanya langsung kaidah wakaf uang & produktif 24/7</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-850 bg-white px-2.5 py-1 rounded-lg shadow-2xs">
            Tanya AI →
          </span>
        </div>
      </div>
    </div>
  );
}
