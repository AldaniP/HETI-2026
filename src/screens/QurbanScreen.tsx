import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  User, 
  Plus, 
  Minus, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  Landmark, 
  Smartphone, 
  CreditCard, 
  Clock, 
  Trash2,
  Edit2,
  Users,
  ShieldCheck,
  Share2,
  CheckCheck
} from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export interface QurbanPackage {
  id: string;
  type: 'kambing' | 'sapi';
  subType?: 'individu' | 'kolektif';
  title: string;
  farmLocation: string;
  weight: string;
  gender: string;
  grade: string;
  price: number;
  remainingQuota: number;
  totalQuota: number;
  patunganFilled?: number; // for collective cow (max 7)
  slaughterEstimate: string;
  description: string;
  imageUrl: string;
  isPopular?: boolean;
}

const QURBAN_PACKAGES: QurbanPackage[] = [
  {
    id: 'kambing-premium',
    type: 'kambing',
    title: 'Paket Kambing Qurban Premium',
    farmLocation: 'Peternakan Al-Hidayah, Boyolali',
    weight: '25–30 kg',
    gender: 'Jantan',
    grade: 'A',
    price: 2950000,
    remainingQuota: 12,
    totalQuota: 50,
    slaughterEstimate: 'H+2 setelah Idul Adha',
    description: 'Kambing qurban pilihan dari peternakan lokal bersertifikat, dirawat dengan pakan organik dan diperiksa kesehatannya oleh dokter hewan. Daging segar diolah dan didistribusikan kepada masyarakat yang berhak sesuai syariat.',
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'kambing-standar',
    type: 'kambing',
    title: 'Paket Kambing Qurban Standar',
    farmLocation: 'Sentra Ternak Berkah, Tasikmalaya',
    weight: '21–24 kg',
    gender: 'Jantan',
    grade: 'B',
    price: 2150000,
    remainingQuota: 18,
    totalQuota: 60,
    slaughterEstimate: 'H+1 setelah Idul Adha',
    description: 'Kambing sehat dan cukup umur sesuai syariat Islam. Sangat cocok untuk qurban pelosok, disalurkan ke desa-desa terpencil yang jarang menikmati daging qurban.',
    imageUrl: 'https://images.unsplash.com/photo-1484557985045-eaa252be761c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kambing-super',
    type: 'kambing',
    title: 'Paket Domba / Kambing Super',
    farmLocation: 'Peternakan Al-Azhar, Sukabumi',
    weight: '33–38 kg',
    gender: 'Jantan',
    grade: 'Super A+',
    price: 3850000,
    remainingQuota: 6,
    totalQuota: 30,
    slaughterEstimate: 'Hari Raya Idul Adha (Hari H)',
    description: 'Domba bertanduk gagah berbobot besar dengan rasio daging optimal. Dirawat intensif dan bersertifikat bebas penyakit kuku dan mulut (PMK).',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80'
  },
  // Sapi Kolektif 1/7
  {
    id: 'sapi-patungan-std',
    type: 'sapi',
    subType: 'kolektif',
    title: '1/7 Sapi Patungan Standar',
    farmLocation: 'Sentra Ternak Sapi Nusantara, Boyolali',
    weight: '35–40 kg (1/7 dari ~260 kg)',
    gender: 'Jantan',
    grade: 'A',
    price: 2600000,
    remainingQuota: 4, // 4 packages of cows available
    totalQuota: 20,
    patunganFilled: 4, // 4 filled, sisa 3 slot
    slaughterEstimate: 'H+1 setelah Idul Adha',
    description: 'Program patungan qurban sapi kolektif 7 orang. Panitia Amwal menggabungkan niat shohibul qurban menjadi 1 ekor sapi utuh yang disembelih dan didistribusikan secara transparan.',
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'sapi-patungan-prem',
    type: 'sapi',
    subType: 'kolektif',
    title: '1/7 Sapi Patungan Premium',
    farmLocation: 'Peternakan Limousin Mandiri, Malang',
    weight: '50–55 kg (1/7 dari ~360 kg)',
    gender: 'Jantan',
    grade: 'Super A+',
    price: 3650000,
    remainingQuota: 7,
    totalQuota: 15,
    patunganFilled: 5, // 5 filled, sisa 2 slot
    slaughterEstimate: 'Hari Raya Idul Adha (Hari H)',
    description: 'Qurban patungan sapi jenis Limousin / Simmental berbobot jumbo. Daging tebal dan sehat, memberikan manfaat konsumsi daging qurban untuk ratusan dhuafa.',
    imageUrl: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80'
  },
  // Sapi Individu (1 Ekor Utuh)
  {
    id: 'sapi-individu-std',
    type: 'sapi',
    subType: 'individu',
    title: 'Paket Sapi Individu Standar (1 Ekor)',
    farmLocation: 'Peternakan Sapi Limousin Nusantara, Boyolali',
    weight: '250–270 kg',
    gender: 'Jantan',
    grade: 'A',
    price: 18200000,
    remainingQuota: 5,
    totalQuota: 25,
    slaughterEstimate: 'H+2 setelah Idul Adha',
    description: '1 Ekor Sapi utuh atas nama pribadi, keluarga besar, atau rombongan (maksimal 7 shohibul qurban). Penyaluran menjangkau kantong-kantong kemiskinan dan pondok pesantren pelosok.',
    imageUrl: 'https://images.unsplash.com/photo-1545155986-e7e0e49ca248?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sapi-individu-prem',
    type: 'sapi',
    subType: 'individu',
    title: 'Paket Sapi Individu Premium Jumbo (1 Ekor)',
    farmLocation: 'Sentra Ternak Sapi Pasundan, Garut',
    weight: '360–400 kg',
    gender: 'Jantan',
    grade: 'Super A+',
    price: 25500000,
    remainingQuota: 3,
    totalQuota: 15,
    slaughterEstimate: 'Hari Raya Idul Adha (Hari H)',
    description: 'Sapi kualitas premium berbobot raksasa dengan perawatan istimewa. Sangat direkomendasikan untuk qurban representatif instansi, keluarga besar, maupun komunitas.',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80'
  }
];

export function QurbanScreen({ navigate }: Props) {
  // Views: 'list' | 'detail' | 'checkout' | 'success'
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'checkout' | 'success'>('list');
  const [activeCategory, setActiveCategory] = useState<'kambing' | 'sapi'>('kambing');
  const [activeCowType, setActiveCowType] = useState<'kolektif' | 'individu'>('kolektif');
  
  const [selectedPkg, setSelectedPkg] = useState<QurbanPackage>(QURBAN_PACKAGES[0]);
  
  // Checkout states
  const [shohibulList, setShohibulList] = useState<string[]>(['']);
  const [isDistributed100, setIsDistributed100] = useState(true);
  const [isEditingWakalah, setIsEditingWakalah] = useState(false);
  const [wakalahText, setWakalahText] = useState(
    "Saya niat berkurban tahun ini karena Allah Ta'ala, dan saya wakilkan penyembelihan serta pembagiannya kepada Anda/Panitia."
  );
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bsi' | 'card'>('qris');
  const [transactionId, setTransactionId] = useState('');

  const filteredList = QURBAN_PACKAGES.filter(item => {
    if (item.type !== activeCategory) return false;
    if (activeCategory === 'sapi') {
      return item.subType === activeCowType;
    }
    return true;
  });

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Open detail
  const handleSelectPackage = (pkg: QurbanPackage) => {
    setSelectedPkg(pkg);
    setViewMode('detail');
  };

  // Start checkout from detail
  const handleStartCheckout = () => {
    // Initial shohibul list
    setShohibulList(['']);
    setIsEditingWakalah(false);
    setViewMode('checkout');
  };

  const handleAddShohibul = () => {
    // Limits: Sapi Kolektif allows 1 per slot (or user can book multiple slots if available)
    // Sapi Individu max 7
    // Kambing 1 per hewan
    const maxAllowed = selectedPkg.subType === 'individu' ? 7 : (selectedPkg.subType === 'kolektif' ? (7 - (selectedPkg.patunganFilled || 0)) : 10);
    if (shohibulList.length < maxAllowed) {
      setShohibulList(prev => [...prev, '']);
    }
  };

  const handleRemoveShohibul = (index: number) => {
    if (shohibulList.length > 1) {
      setShohibulList(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  const handleShohibulChange = (index: number, val: string) => {
    setShohibulList(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const calculateTotalPrice = () => {
    const qty = Math.max(1, shohibulList.length);
    // If Sapi Individu, the package price is for the whole cow (fixed)
    if (selectedPkg.subType === 'individu') {
      return selectedPkg.price;
    }
    // For Kambing or Sapi Kolektif, price multiplies with number of shohibul (slots)
    return selectedPkg.price * qty;
  };

  const handlePay = () => {
    const randId = 'AMW-QRB-' + Math.floor(100000 + Math.random() * 900000);
    setTransactionId(randId);
    setViewMode('success');
  };

  /* =======================================================================
     VIEW 1: DETAIL PAKET QURBAN (Matches User's Provided UI Design 1)
     ======================================================================= */
  if (viewMode === 'detail') {
    const isCollectiveCow = selectedPkg.type === 'sapi' && selectedPkg.subType === 'kolektif';
    const filledSlots = selectedPkg.patunganFilled || 0;
    const remainingSlots = 7 - filledSlots;

    return (
      <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full relative font-sans">
        {/* Header */}
        <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
          <button 
            onClick={() => setViewMode('list')} 
            className="mr-2 text-emerald-700 hover:text-emerald-800 p-1 rounded-full hover:bg-emerald-50 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-extrabold text-base text-emerald-700">Detail Paket Qurban</h1>
        </div>

        <div className="flex-1 pb-28">
          {/* Hero Animal Image with Remaining Quota Badge */}
          <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
            <img 
              src={selectedPkg.imageUrl} 
              alt={selectedPkg.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Badge Kuota Tersisa (e.g. Tersisa 12 paket) */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-sm">
              <span>Tersisa {selectedPkg.remainingQuota} paket</span>
            </div>

            {selectedPkg.isPopular && (
              <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 text-xs font-extrabold px-3 py-1 rounded-xl shadow-md flex items-center space-x-1">
                <Sparkles size={13} />
                <span>Paling Diminati</span>
              </div>
            )}
          </div>

          <div className="px-5 pt-4 space-y-4">
            {/* Title & Farm Location */}
            <div>
              <h2 className="font-extrabold text-lg text-gray-900 leading-snug">
                {selectedPkg.title}
              </h2>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin size={13} className="text-gray-400 mr-1 shrink-0" />
                <span>{selectedPkg.farmLocation}</span>
              </div>
            </div>

            {/* Special Collective Patungan Slot Info (Max 7) */}
            {isCollectiveCow && (
              <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-100/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-emerald-900 font-extrabold text-xs">
                    <Users size={16} className="text-emerald-700" />
                    <span>Slot Patungan Sapi (Maksimal 7 Orang)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                    Sisa {remainingSlots} dari 7 slot
                  </span>
                </div>

                {/* Visual 7 Slots Indicator */}
                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((slotNum) => {
                    const isFilled = slotNum <= filledSlots;
                    return (
                      <div 
                        key={slotNum}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-[10px] font-bold transition ${
                          isFilled 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs' 
                            : 'bg-white text-gray-400 border-dashed border-gray-300'
                        }`}
                      >
                        <span>#{slotNum}</span>
                        <span className="text-[8.5px] mt-0.5">{isFilled ? 'Terisi' : 'Kosong'}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-emerald-800 leading-relaxed font-medium">
                  *Niat Anda akan digabungkan dengan {filledSlots} shohibul qurban lainnya untuk melengkapi 1 ekor sapi utuh sesuai syariat.
                </p>
              </div>
            )}

            {/* 3 Metric Specification Cards (Berat, Kelamin, Grade) */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100/80 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium mb-1">Berat</span>
                <span className="text-xs font-bold text-gray-900">{selectedPkg.weight}</span>
              </div>
              <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100/80 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium mb-1">Kelamin</span>
                <span className="text-xs font-bold text-gray-900">{selectedPkg.gender}</span>
              </div>
              <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100/80 flex flex-col justify-center">
                <span className="text-[11px] text-gray-500 font-medium mb-1">Grade</span>
                <span className="text-xs font-bold text-gray-900">{selectedPkg.grade}</span>
              </div>
            </div>

            {/* Estimasi Waktu Penyembelihan Box */}
            <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-100/60 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-emerald-800 block">Estimasi Waktu Penyembelihan</span>
                <span className="text-xs font-bold text-gray-900">{selectedPkg.slaughterEstimate}</span>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5 pt-1">
              <h3 className="font-extrabold text-sm text-gray-900">Deskripsi</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                {selectedPkg.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-5 py-3.5 flex items-center justify-between z-30 shadow-lg">
          <div>
            <span className="text-[11px] text-gray-500 font-medium block">Total Pembayaran</span>
            <span className="text-lg font-black text-gray-900">{formatRupiah(selectedPkg.price)}</span>
          </div>
          <button 
            onClick={handleStartCheckout}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md active:scale-95 transition cursor-pointer"
          >
            Bayar
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 2: PEMBAYARAN QURBAN (Matches User's Provided UI Design 2)
     ======================================================================= */
  if (viewMode === 'checkout') {
    const isCollectiveCow = selectedPkg.type === 'sapi' && selectedPkg.subType === 'kolektif';
    const isIndividuCow = selectedPkg.type === 'sapi' && selectedPkg.subType === 'individu';
    const totalPrice = calculateTotalPrice();

    return (
      <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full relative font-sans">
        {/* Header */}
        <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
          <button 
            onClick={() => setViewMode('detail')} 
            className="mr-2 text-emerald-700 hover:text-emerald-800 p-1 rounded-full hover:bg-emerald-50 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-extrabold text-base text-emerald-700">Pembayaran</h1>
        </div>

        <div className="flex-1 pb-28 px-5 pt-4 space-y-5">
          {/* Package Summary Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900 leading-tight">
                  {selectedPkg.title}
                </h3>
                <div className="flex items-center text-[11px] text-gray-500 mt-1">
                  <MapPin size={12} className="text-gray-400 mr-1 shrink-0" />
                  <span>{selectedPkg.farmLocation}</span>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                Grade {selectedPkg.grade}
              </span>
            </div>

            {/* Mini 3-column specs inside summary */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 text-center">
              <div className="bg-gray-50 rounded-xl p-2">
                <span className="text-[10px] text-gray-400 block">Berat</span>
                <span className="text-xs font-bold text-gray-800">{selectedPkg.weight}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-2">
                <span className="text-[10px] text-gray-400 block">Kelamin</span>
                <span className="text-xs font-bold text-gray-800">{selectedPkg.gender}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-2">
                <span className="text-[10px] text-gray-400 block">Grade</span>
                <span className="text-xs font-bold text-gray-800">{selectedPkg.grade}</span>
              </div>
            </div>
          </div>

          {/* Nama Pengkurban Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-gray-900">Nama Pengkurban</h3>
              {isIndividuCow && (
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Maks. 7 Nama
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {shohibulList.map((name, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => handleShohibulChange(index, e.target.value)}
                    placeholder="Nama lengkap pengkurban"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  {shohibulList.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveShohibul(index)}
                      className="w-8 h-8 rounded-full border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center shrink-0 cursor-pointer transition"
                    >
                      <Minus size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Tombol Tambah Pengkurban */}
            {(!isCollectiveCow || shohibulList.length < (7 - (selectedPkg.patunganFilled || 0))) && (
              <button 
                type="button"
                onClick={handleAddShohibul}
                className="w-full bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-700 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <Plus size={15} />
                <span>Tambah Pengkurban</span>
              </button>
            )}
          </div>

          {/* Disalurkan 100% Toggle Section */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
            <div className="pr-3">
              <h4 className="font-bold text-xs text-gray-900">Disalurkan 100%?</h4>
              <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                Aktifkan jika disalurkan 100% dan nonaktifkan jika hak 1/3 bagian diambil.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => setIsDistributed100(!isDistributed100)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 ${
                isDistributed100 ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </button>
          </div>

          {/* Akad Wakalah Section */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-xs text-gray-900">Akad Wakalah</h3>
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100/50 relative">
              {isEditingWakalah ? (
                <div className="space-y-2">
                  <textarea 
                    value={wakalahText}
                    onChange={(e) => setWakalahText(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-xs text-emerald-950 font-medium italic outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setIsEditingWakalah(false)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-lg cursor-pointer"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-emerald-950 italic leading-relaxed pr-14 font-medium">
                    "{wakalahText}"
                  </p>
                  <button 
                    onClick={() => setIsEditingWakalah(true)}
                    className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition cursor-pointer"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Metode Pembayaran Syariah */}
          <div className="space-y-2.5 pt-1">
            <h3 className="font-extrabold text-xs text-gray-900">Metode Pembayaran</h3>
            <div className="space-y-2">
              {[
                { id: 'qris', name: 'QRIS Syariah (GoPay, OVO, ShopeePay)', icon: <Smartphone size={16} /> },
                { id: 'bsi', name: 'Bank Syariah Indonesia (BSI Virtual Account)', icon: <Landmark size={16} /> },
                { id: 'card', name: 'Kartu Debit / Kredit Syariah', icon: <CreditCard size={16} /> }
              ].map((met) => (
                <div 
                  key={met.id}
                  onClick={() => setPaymentMethod(met.id as any)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                    paymentMethod === met.id 
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="text-emerald-700">{met.icon}</div>
                    <span className="text-xs font-bold text-gray-800">{met.name}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === met.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === met.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-5 py-3.5 flex items-center justify-between z-30 shadow-lg">
          <div>
            <span className="text-[11px] text-gray-500 font-medium block">Total Pembayaran</span>
            <span className="text-lg font-black text-gray-900">{formatRupiah(totalPrice)}</span>
          </div>
          <button 
            onClick={handlePay}
            disabled={shohibulList.some(n => n.trim() === '')}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md active:scale-95 transition cursor-pointer"
          >
            Bayar
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 3: SUCCESS CONFIRMATION MODAL / SCREEN
     ======================================================================= */
  if (viewMode === 'success') {
    return (
      <div className="flex-1 overflow-y-auto bg-white flex flex-col items-center justify-center p-6 text-center font-sans h-full">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm animate-bounce">
          <CheckCircle2 size={36} />
        </div>

        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Qurban Terverifikasi
        </span>

        <h2 className="font-extrabold text-xl text-gray-900 mt-2">Niat Qurban Diterima!</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
          Jazaakumullah khairan katsiran. Hewan qurban telah dialokasikan dan akad wakalah telah dicatat dalam sistem.
        </p>

        {/* Receipt Details Card */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 mt-5 border border-gray-100 text-left space-y-2.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-400 font-medium">No. Transaksi</span>
            <span className="font-mono font-bold text-gray-900">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Paket</span>
            <span className="font-bold text-gray-900 text-right">{selectedPkg.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Peternakan</span>
            <span className="font-semibold text-gray-800">{selectedPkg.farmLocation}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-400">Pengkurban ({shohibulList.length})</span>
            <div className="text-right font-bold text-emerald-800">
              {shohibulList.map((name, i) => (
                <div key={i}>{i + 1}. {name || 'Shohibul Qurban'}</div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Penyaluran</span>
            <span className="font-bold text-emerald-700">{isDistributed100 ? '100% Disalurkan ke Dhuafa' : '1/3 Hak Diambil'}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-bold text-gray-800">Total Dibayar</span>
            <span className="font-extrabold text-sm text-emerald-700">{formatRupiah(calculateTotalPrice())}</span>
          </div>
        </div>

        <div className="w-full space-y-2 mt-6">
          <button 
            onClick={() => {
              setViewMode('list');
              navigate('history');
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow-xs"
          >
            Lihat Riwayat & Sertifikat
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl transition cursor-pointer"
          >
            Kembali ke Beranda Qurban
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================================
     VIEW 0: LIST OF QURBAN PACKAGES
     ======================================================================= */
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative font-sans pb-24">
      {/* Top sticky header */}
      <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('home')} 
          className="mr-3 text-gray-700 hover:text-emerald-700 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1">
          <h1 className="font-extrabold text-base text-gray-900 leading-tight">Qurban Berkah</h1>
          <p className="text-[10px] text-gray-400 font-medium">Mudah, Syar'i & Tepat Sasaran</p>
        </div>
        <div className="flex items-center space-x-1 bg-emerald-50 px-2.5 py-1 rounded-full text-emerald-800 text-[10px] font-bold">
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>Sertifikasi MUI</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="p-4">
        <div className="relative rounded-2xl overflow-hidden h-36 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 shadow-sm flex items-center p-4">
          <div className="relative z-10 text-white max-w-[75%] space-y-1">
            <span className="bg-amber-400 text-emerald-950 font-black tracking-wider text-[9px] px-2 py-0.5 rounded-full uppercase shadow-xs">
              Idul Adha 1447 H
            </span>
            <h2 className="text-base font-extrabold leading-tight">Tebarkan Qurban Hingga Pelosok Negeri</h2>
            <p className="text-[10px] text-emerald-200 leading-relaxed font-normal">
              Hewan sehat terawat, laporan penimbangan & dokumentasi video pemotongan transparan.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs (Kambing vs Sapi) */}
      <div className="px-4 pb-2">
        <div className="bg-white p-1 rounded-2xl shadow-xs border border-gray-100 flex">
          <button 
            type="button"
            onClick={() => setActiveCategory('kambing')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeCategory === 'kambing'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span>Kambing / Domba</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveCategory('sapi')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeCategory === 'sapi'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span>Sapi</span>
          </button>
        </div>
      </div>

      {/* Sapi Sub-Tabs (Kolektif 1/7 vs Individu 1 Ekor) */}
      {activeCategory === 'sapi' && (
        <div className="px-4 pb-3 flex justify-center">
          <div className="inline-flex bg-gray-200/80 p-1 rounded-full">
            <button
              type="button"
              onClick={() => setActiveCowType('kolektif')}
              className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition cursor-pointer ${
                activeCowType === 'kolektif'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Patungan Kolektif (1/7)
            </button>
            <button
              type="button"
              onClick={() => setActiveCowType('individu')}
              className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition cursor-pointer ${
                activeCowType === 'individu'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              1 Ekor Utuh
            </button>
          </div>
        </div>
      )}

      {/* Package List Grid */}
      <div className="px-4 space-y-4">
        {filteredList.map((pkg) => {
          const isCollective = pkg.type === 'sapi' && pkg.subType === 'kolektif';
          const remainingSlots = 7 - (pkg.patunganFilled || 0);

          return (
            <div 
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg)}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden hover:border-emerald-300 transition duration-150 cursor-pointer group flex flex-col"
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                
                {/* Quota Badge (Tersisa X paket) */}
                <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  Tersisa {pkg.remainingQuota} paket
                </div>

                {isCollective && (
                  <div className="absolute bottom-3 left-3 bg-emerald-800/90 backdrop-blur-xs text-amber-300 text-[10.5px] font-extrabold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                    <Users size={12} />
                    <span>Sisa {remainingSlots} dari 7 slot patungan</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-white/95 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                  Grade {pkg.grade}
                </div>
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-emerald-700 transition">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center text-[11px] text-gray-500 mt-1">
                    <MapPin size={11} className="text-gray-400 mr-1 shrink-0" />
                    <span className="truncate">{pkg.farmLocation}</span>
                  </div>

                  {/* 3 mini specs pills */}
                  <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2 border-t border-gray-100 text-center">
                    <div className="bg-gray-50 rounded-lg py-1.5 px-1">
                      <span className="text-[9.5px] text-gray-400 block">Berat</span>
                      <span className="text-[11px] font-bold text-gray-800">{pkg.weight}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-1.5 px-1">
                      <span className="text-[9.5px] text-gray-400 block">Kelamin</span>
                      <span className="text-[11px] font-bold text-gray-800">{pkg.gender}</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg py-1.5 px-1">
                      <span className="text-[9.5px] text-gray-400 block">Waktu Sembelih</span>
                      <span className="text-[11px] font-bold text-emerald-800 truncate block">{pkg.slaughterEstimate.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-medium block">Harga Paket</span>
                    <span className="text-base font-black text-emerald-700">{formatRupiah(pkg.price)}</span>
                  </div>
                  <button 
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
