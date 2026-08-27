import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, CheckCircle2, User, Plus, Minus, Info, AlertCircle, Landmark, Smartphone, CreditCard, Coins, Calendar, HelpCircle } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function ZakatScreen({ navigate }: Props) {
  const [activeTab, setActiveTab] = useState<'fitrah' | 'maal'>('fitrah');
  
  // Fitrah States
  const [fitrahPricePerPerson, setFitrahPricePerPerson] = useState<number>(45000); // Standard BAZNAS / person
  const [fitrahQty, setFitrahQty] = useState<number>(1);
  const [fitrahNames, setFitrahNames] = useState<string[]>(['']);
  
  // Maal States (Wealth Calculator)
  const [maalType, setMaalType] = useState<'penghasilan' | 'perusahaan' | 'perdagangan' | 'emas'>('penghasilan');
  
  // 1. Zakat Penghasilan States
  const [incomeSalary, setIncomeSalary] = useState<string>('');
  const [incomeOther, setIncomeOther] = useState<string>('');
  
  // 2. Zakat Perusahaan States
  const [companyTab, setCompanyTab] = useState<'jasa' | 'dagang'>('jasa');
  const [companyRevenue, setCompanyRevenue] = useState<string>(''); // Pendapatan sebelum pajak
  const [companyAssets, setCompanyAssets] = useState<string>(''); // Aktiva Lancar
  const [companyLiabilities, setCompanyLiabilities] = useState<string>(''); // Pasiva Lancar
  
  // 3. Zakat Perdagangan States
  const [tradeAssets, setTradeAssets] = useState<string>(''); // Aset Lancar
  const [tradeProfit, setTradeProfit] = useState<string>(''); // Laba
  
  // 4. Zakat Emas States
  const [goldQty, setGoldQty] = useState<string>(''); // Jumlah Emas (gram)
  const [goldPrice, setGoldPrice] = useState<string>('1200000'); // Harga Emas per Gram

  const goldPricePerGram = 1200000; // gold price in IDR
  const nishabGoldGrams = 85;
  const nishabLimit = goldPricePerGram * nishabGoldGrams; // ~ Rp 102.000.000
  
  // Calculated Maal States
  const [totalMaalWealth, setTotalMaalWealth] = useState<number>(0);
  const [netMaalWealth, setNetMaalWealth] = useState<number>(0);
  const [maalZakatDue, setMaalZakatDue] = useState<number>(0);
  const [reachesNishab, setReachesNishab] = useState<boolean>(false);

  // Unified Checkout States
  const [checkoutItem, setCheckoutItem] = useState<{
    type: 'fitrah' | 'maal';
    title: string;
    amount: number;
    details: string;
  } | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bsi' | 'card'>('qris');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');

  // Auto calculate Maal Zakat whenever input fields change
  useEffect(() => {
    if (maalType === 'penghasilan') {
      const salary = parseFloat(incomeSalary) || 0;
      const other = parseFloat(incomeOther) || 0;
      const total = salary + other;
      setTotalMaalWealth(total);
      setNetMaalWealth(total);
      
      const nishabProfesiBulan = 7640114; // SK BAZNAS 2026
      if (total >= nishabProfesiBulan) {
        setReachesNishab(true);
        setMaalZakatDue(Math.round(total * 0.025));
      } else {
        setReachesNishab(false);
        setMaalZakatDue(0);
      }
    } 
    else if (maalType === 'perusahaan') {
      if (companyTab === 'jasa') {
        const rev = parseFloat(companyRevenue) || 0;
        setTotalMaalWealth(rev);
        setNetMaalWealth(rev);
        
        // Nishab Perusahaan setara 85 gr emas
        if (rev >= nishabLimit) {
          setReachesNishab(true);
          setMaalZakatDue(Math.round(rev * 0.025));
        } else {
          setReachesNishab(false);
          setMaalZakatDue(0);
        }
      } else {
        const assets = parseFloat(companyAssets) || 0;
        const liab = parseFloat(companyLiabilities) || 0;
        const net = assets - liab;
        const finalNet = net < 0 ? 0 : net;
        setTotalMaalWealth(assets);
        setNetMaalWealth(finalNet);
        
        if (finalNet >= nishabLimit) {
          setReachesNishab(true);
          setMaalZakatDue(Math.round(finalNet * 0.025));
        } else {
          setReachesNishab(false);
          setMaalZakatDue(0);
        }
      }
    }
    else if (maalType === 'perdagangan') {
      const assets = parseFloat(tradeAssets) || 0;
      const profit = parseFloat(tradeProfit) || 0;
      const total = assets + profit;
      setTotalMaalWealth(total);
      setNetMaalWealth(total);
      
      const nishabPerdaganganTahun = 91681728; // SK BAZNAS 2026
      if (total >= nishabPerdaganganTahun) {
        setReachesNishab(true);
        setMaalZakatDue(Math.round(total * 0.025));
      } else {
        setReachesNishab(false);
        setMaalZakatDue(0);
      }
    }
    else if (maalType === 'emas') {
      const qty = parseFloat(goldQty) || 0;
      const price = parseFloat(goldPrice) || 1200000;
      const value = qty * price;
      setTotalMaalWealth(value);
      setNetMaalWealth(value);
      
      // Nishab is 85 grams of gold
      if (qty >= 85) {
        setReachesNishab(true);
        setMaalZakatDue(Math.round(value * 0.025));
      } else {
        setReachesNishab(false);
        setMaalZakatDue(0);
      }
    }
  }, [
    maalType, 
    incomeSalary, incomeOther, 
    companyTab, companyRevenue, companyAssets, companyLiabilities, 
    tradeAssets, tradeProfit, 
    goldQty, goldPrice, nishabLimit
  ]);

  // Adjust Fitrah Shohibul Name Inputs matching count
  const handleFitrahQtyChange = (newQty: number) => {
    if (newQty < 1) return;
    setFitrahQty(newQty);
    setFitrahNames(prev => {
      const copy = [...prev];
      if (newQty > copy.length) {
        while (copy.length < newQty) {
          copy.push('');
        }
      } else {
        copy.splice(newQty);
      }
      return copy;
    });
  };

  const handleFitrahNameChange = (index: number, val: string) => {
    setFitrahNames(prev => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handlePayFitrah = () => {
    const totalAmount = fitrahQty * fitrahPricePerPerson;
    const activeNames = fitrahNames.filter(n => n.trim() !== '').join(', ');
    setCheckoutItem({
      type: 'fitrah',
      title: 'Zakat Fitrah ' + fitrahQty + ' Jiwa',
      amount: totalAmount,
      details: activeNames || 'Shohibul Zakat Fitrah Keluarga'
    });
  };

  const handlePayMaal = () => {
    if (maalZakatDue <= 0) return;
    let details = '';
    let title = '';
    if (maalType === 'penghasilan') {
      title = 'Zakat Penghasilan / Profesi';
      details = `Zakat atas penghasilan bulanan ${formatRupiah(totalMaalWealth)}`;
    } else if (maalType === 'perusahaan') {
      title = 'Zakat Perusahaan';
      details = `Zakat perusahaan (${companyTab === 'jasa' ? 'Sektor Jasa' : 'Sektor Dagang/Industri'}) dengan nilai terkena zakat ${formatRupiah(netMaalWealth)}`;
    } else if (maalType === 'perdagangan') {
      title = 'Zakat Perdagangan';
      details = `Zakat perdagangan dengan nilai total omset & laba ${formatRupiah(totalMaalWealth)}`;
    } else if (maalType === 'emas') {
      title = 'Zakat Emas / Logam Mulia';
      details = `Zakat emas seberat ${goldQty} gram senilai ${formatRupiah(totalMaalWealth)}`;
    }
    setCheckoutItem({
      type: 'maal',
      title: title,
      amount: maalZakatDue,
      details: details
    });
  };

  const handlePaymentSubmit = () => {
    if (!checkoutItem) return;
    const randId = 'AMW-ZKT-' + Math.floor(100000 + Math.random() * 900000);
    setTransactionId(randId);
    setIsSuccess(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    setCheckoutItem(null);
    navigate('history');
  };

  const handleResetMaal = () => {
    setIncomeSalary('');
    setIncomeOther('');
    setCompanyRevenue('');
    setCompanyAssets('');
    setCompanyLiabilities('');
    setTradeAssets('');
    setTradeProfit('');
    setGoldQty('');
    setGoldPrice('1200000');
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      {/* Top sticky header */}
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-slate-100 shadow-xs">
        <button onClick={() => navigate('home')} className="mr-3 text-slate-600 hover:text-emerald-800 p-1 rounded-full transition cursor-pointer">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-base text-slate-900 tracking-tight">Zakat Amwal</h1>
          <p className="text-[11px] text-slate-500">Kalkulator digital & penyaluran zakat amanah BAZNAS</p>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/80 text-emerald-800 shadow-2xs">
          <Coins size={14} className="text-emerald-600" />
          <span className="text-[11px] font-extrabold">2.5% Berkah</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="p-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-850 to-slate-900 shadow-sm p-5 flex items-center">
          <div className="relative z-10 text-white max-w-[85%]">
            <span className="bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold tracking-wider text-[9.5px] px-2.5 py-0.5 rounded-full uppercase">
              Pembersih Jiwa & Harta
            </span>
            <h2 className="text-base md:text-lg font-extrabold mt-1.5 leading-tight tracking-tight">
              Tunaikan Zakat Tepat Sasaran bagi 8 Asnaf
            </h2>
            <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
              Kalkulasi zakat fitrah & zakat maal secara transparan dan salurkan langsung kepada mustahik yang berhak.
            </p>
          </div>
        </div>
      </div>

      {/* Modern Segmented Tab Selector */}
      <div className="px-4 pb-2">
        <div className="bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 flex">
          <button 
            type="button"
            onClick={() => setActiveTab('fitrah')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'fitrah'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Zakat Fitrah</span>
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('maal')}
            className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'maal'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Zakat Maal (Harta)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 pb-6 space-y-4">
        
        {/* TAB 1: ZAKAT FITRAH */}
        {activeTab === 'fitrah' && (
          <div className="space-y-4">
            
            {/* Guide Info Banner */}
            <div className="bg-emerald-50/70 border border-emerald-100/80 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
                <AlertCircle size={16} className="text-emerald-700 shrink-0" />
                <span>Ketentuan Zakat Fitrah</span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Zakat Fitrah adalah kewajiban bagi setiap jiwa muslim menjelang Idul Fitri. 
                Nilai setara makanan pokok seberat <strong>2.5 kg atau 3.5 liter beras</strong> per orang. 
                Sesuai ketetapan BAZNAS, konversi tunai berkisar <strong>Rp 45.000 / jiwa</strong>.
              </p>
            </div>

            {/* Config & Shohibul Form Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">Hitung & Daftarkan Anggota Keluarga</h3>

              {/* Price level select options */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 block">Pilihan Kualitas Beras per Jiwa</span>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => setFitrahPricePerPerson(45000)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-center transition ${
                      fitrahPricePerPerson === 45000 
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500/30' 
                        : 'border-slate-200/70 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-800 block">Beras Standar</span>
                    <span className="text-[10px] text-slate-400 block mb-1">Nasi pulen umum</span>
                    <span className="text-xs font-extrabold text-emerald-800">Rp 45.000 / jiwa</span>
                  </div>

                  <div 
                    onClick={() => setFitrahPricePerPerson(55000)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-center transition ${
                      fitrahPricePerPerson === 55000 
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500/30' 
                        : 'border-slate-200/70 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-800 block">Beras Premium</span>
                    <span className="text-[10px] text-slate-400 block mb-1">Organik / Basmati</span>
                    <span className="text-xs font-extrabold text-emerald-800">Rp 55.000 / jiwa</span>
                  </div>
                </div>
              </div>

              {/* Quantity setting */}
              <div className="flex items-center justify-between border-t border-b border-slate-100 py-3.5">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">Jumlah Tanggungan (Jiwa)</span>
                  <span className="text-[11px] text-slate-400">Termasuk diri Anda sendiri</span>
                </div>
                
                <div className="flex items-center space-x-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
                  <button 
                    onClick={() => handleFitrahQtyChange(fitrahQty - 1)}
                    disabled={fitrahQty <= 1}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 shadow-xs transition cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-extrabold text-xs text-slate-800 px-1.5 w-5 text-center">{fitrahQty}</span>
                  <button 
                    onClick={() => handleFitrahQtyChange(fitrahQty + 1)}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 shadow-xs transition cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Names input group */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-500 block">Nama-Nama Shohibul Zakat Fitrah</span>
                {fitrahNames.map((name, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute left-3 top-2.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100/80 w-5 h-5 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => handleFitrahNameChange(idx, e.target.value)}
                      placeholder={`Nama Lengkap Jiwa #${idx + 1}`}
                      className="w-full bg-slate-50/60 border border-slate-200/80 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition"
                    />
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/80 flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Total Zakat Fitrah</span>
                  <div className="text-lg font-extrabold text-emerald-900">{formatRupiah(fitrahQty * fitrahPricePerPerson)}</div>
                </div>

                <button
                  type="button"
                  onClick={handlePayFitrah}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl transition active:scale-95 shadow-xs cursor-pointer"
                >
                  Bayar Fitrah
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ZAKAT MAAL */}
        {activeTab === 'maal' && (
          <div className="space-y-4">
            
            {/* Guide Info Banner */}
            <div className="bg-amber-50/70 border border-amber-100/80 p-4 rounded-2xl space-y-2 shadow-xs">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <Info size={16} className="text-amber-700 shrink-0" />
                <span>Panduan & Batas Nishab Umum</span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                Zakat Maal wajib dikeluarkan atas kepemilikan harta yang mencapai haul (1 tahun) 
                dan bernilai minimum setara <strong>85 gram emas</strong> (tarif zakat 2.5%).
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="text-[10.5px] text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                  <span className="text-slate-400 block text-[9.5px]">Acuan Emas BAZNAS:</span>
                  <span className="font-extrabold text-slate-800">{formatRupiah(goldPricePerGram)}/gr</span>
                </div>
                <div className="text-[10.5px] text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                  <span className="text-slate-400 block text-[9.5px]">Nishab Minimum:</span>
                  <span className="font-extrabold text-emerald-800">{formatRupiah(nishabLimit)}</span>
                </div>
              </div>
            </div>

            {/* Jenis Zakat Selection Pill Tabs */}
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-500 block">Pilih Kategori Zakat Maal:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'penghasilan', label: 'Penghasilan' },
                  { id: 'perusahaan', label: 'Perusahaan' },
                  { id: 'perdagangan', label: 'Perdagangan' },
                  { id: 'emas', label: 'Emas/Logam' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMaalType(item.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer text-center ${
                      maalType === item.id 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Input Fields Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-xs">
              
              {/* CASE 1: PENGHASILAN */}
              {maalType === 'penghasilan' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Gaji / Pendapatan Utama per Bulan
                    </label>
                    <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                      <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                      <input 
                        type="number"
                        value={incomeSalary}
                        onChange={(e) => setIncomeSalary(e.target.value)}
                        placeholder="0"
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Penghasilan Tambahan / Bonus per Bulan
                    </label>
                    <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                      <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                      <input 
                        type="number"
                        value={incomeOther}
                        onChange={(e) => setIncomeOther(e.target.value)}
                        placeholder="0"
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Total Penghasilan per Bulan
                    </label>
                    <div className="relative rounded-xl border border-slate-200/60 flex items-center bg-slate-100/70 shadow-2xs overflow-hidden">
                      <span className="px-3.5 text-xs font-bold text-slate-400 border-r border-slate-200/60 bg-slate-100 h-10 flex items-center">Rp</span>
                      <input 
                        type="text"
                        readOnly
                        value={formatRupiah((parseFloat(incomeSalary) || 0) + (parseFloat(incomeOther) || 0)).replace('Rp ', '')}
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block">
                        Nisab per Bulan
                      </label>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs font-extrabold text-slate-700">
                        Rp 7.640.114
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 block">
                        Nisab per Tahun
                      </label>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs font-extrabold text-slate-700">
                        Rp 91.681.728
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    *Sesuai SK Ketua BAZNAS No. 15 Tahun 2026
                  </span>
                </div>
              )}

              {/* CASE 2: PERUSAHAAN */}
              {maalType === 'perusahaan' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Company Subtab Selector (Jasa vs Dagang/Industri) */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setCompanyTab('jasa')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                        companyTab === 'jasa'
                          ? 'bg-white text-emerald-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Sektor Jasa
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompanyTab('dagang')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                        companyTab === 'dagang'
                          ? 'bg-white text-emerald-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Dagang / Industri
                    </button>
                  </div>

                  {companyTab === 'jasa' ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        Pendapatan Sebelum Pajak
                      </label>
                      <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                        <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                        <input 
                          type="number"
                          value={companyRevenue}
                          onChange={(e) => setCompanyRevenue(e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Aktiva Lancar
                        </label>
                        <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                          <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                          <input 
                            type="number"
                            value={companyAssets}
                            onChange={(e) => setCompanyAssets(e.target.value)}
                            placeholder="0"
                            className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Pasiva Lancar
                        </label>
                        <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                          <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                          <input 
                            type="number"
                            value={companyLiabilities}
                            onChange={(e) => setCompanyLiabilities(e.target.value)}
                            placeholder="0"
                            className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Nilai Bersih Terkena Zakat
                        </label>
                        <div className="relative rounded-xl border border-slate-200/60 flex items-center bg-slate-100/70 shadow-2xs overflow-hidden">
                          <span className="px-3.5 text-xs font-bold text-slate-400 border-r border-slate-200/60 bg-slate-100 h-10 flex items-center">Rp</span>
                          <input 
                            type="text"
                            readOnly
                            value={formatRupiah(Math.max(0, (parseFloat(companyAssets) || 0) - (parseFloat(companyLiabilities) || 0))).replace('Rp ', '')}
                            className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-[10.5px] text-slate-400 leading-relaxed font-medium">
                    *Zakat Perusahaan dihitung setara nishab emas 85 gram per tahun ({formatRupiah(nishabLimit)}) dengan tarif 2.5%.
                  </div>
                </div>
              )}

              {/* CASE 3: PERDAGANGAN */}
              {maalType === 'perdagangan' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Aset Lancar (Modal & Stok)
                    </label>
                    <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                      <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                      <input 
                        type="number"
                        value={tradeAssets}
                        onChange={(e) => setTradeAssets(e.target.value)}
                        placeholder="0"
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Laba Bersih Usaha
                    </label>
                    <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                      <span className="px-3.5 text-xs font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                      <input 
                        type="number"
                        value={tradeProfit}
                        onChange={(e) => setTradeProfit(e.target.value)}
                        placeholder="0"
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">
                      Total Aset & Laba
                    </label>
                    <div className="relative rounded-xl border border-slate-200/60 flex items-center bg-slate-100/70 shadow-2xs overflow-hidden">
                      <span className="px-3.5 text-xs font-bold text-slate-400 border-r border-slate-200/60 bg-slate-100 h-10 flex items-center">Rp</span>
                      <input 
                        type="text"
                        readOnly
                        value={formatRupiah((parseFloat(tradeAssets) || 0) + (parseFloat(tradeProfit) || 0)).replace('Rp ', '')}
                        className="flex-1 bg-transparent py-2.5 px-3.5 text-xs font-extrabold text-slate-800 outline-none w-full cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="text-[10.5px] text-slate-400 font-medium">
                    *Nishab perdagangan tahunan adalah setara 85 gr emas ({formatRupiah(91681728)}/th).
                  </div>
                </div>
              )}

              {/* CASE 4: EMAS */}
              {maalType === 'emas' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50/70 border border-amber-100/80 p-3.5 rounded-xl space-y-1 text-xs">
                    <p className="font-extrabold text-amber-950">
                      Formula: <span className="font-normal text-slate-700">Jumlah Emas (gram) × Harga Emas × 2.5%</span>
                    </p>
                    <p className="font-extrabold text-amber-950">
                      Batas Nishab: <span className="font-normal text-slate-700">85 gram emas murni</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block leading-tight">
                        Jumlah Emas Dimiliki
                      </label>
                      <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                        <input 
                          type="number"
                          value={goldQty}
                          onChange={(e) => setGoldQty(e.target.value)}
                          placeholder="0"
                          className="flex-1 bg-transparent py-2.5 pl-3 pr-1 text-xs font-extrabold text-slate-800 outline-none w-full text-right"
                        />
                        <span className="px-2.5 text-[10px] font-bold text-slate-400 bg-slate-100/60 border-l border-slate-200/80 h-10 flex items-center">gr</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block leading-tight">
                        Harga Emas per Gram
                      </label>
                      <div className="relative rounded-xl border border-slate-200/80 flex items-center bg-slate-50/40 shadow-2xs overflow-hidden focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
                        <span className="px-2 text-[10px] font-bold text-slate-400 bg-slate-100/60 border-r border-slate-200/80 h-10 flex items-center">Rp</span>
                        <input 
                          type="number"
                          value={goldPrice}
                          onChange={(e) => setGoldPrice(e.target.value)}
                          placeholder="1.200.000"
                          className="flex-1 bg-transparent py-2.5 px-2 text-xs font-extrabold text-slate-800 outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-400 font-medium">
                    *Dihitung untuk emas simpanan yang telah mengendap selama 1 tahun (haul).
                  </p>
                </div>
              )}

              {/* Dynamic Calculation Receipt Summary */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold">Total Harta Terkena Zakat:</span>
                  <span className="font-extrabold text-slate-800">{formatRupiah(netMaalWealth)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold">Status Kewajiban:</span>
                  {reachesNishab ? (
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full flex items-center space-x-1 border border-emerald-200">
                      <CheckCircle2 size={11} className="text-emerald-700" />
                      <span>Wajib Zakat</span>
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                      Belum Wajib Zakat
                    </span>
                  )}
                </div>

                {reachesNishab ? (
                  <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100/80 text-center shadow-2xs">
                    <span className="text-[10px] text-emerald-800 block font-bold mb-0.5 uppercase tracking-wide">
                      Kalkulasi Nilai Zakat (2.5%):
                    </span>
                    <span className="text-lg font-extrabold text-emerald-900">{formatRupiah(maalZakatDue)}</span>
                  </div>
                ) : netMaalWealth > 0 ? (
                  <p className="text-[10.5px] text-slate-500 italic text-center leading-relaxed font-medium pt-1">
                    Harta belum mencapai batas nishab minimum. Anda belum diwajibkan zakat maal, namun disunnahkan berinfaq.
                  </p>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetMaal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-3 rounded-xl cursor-pointer transition active:scale-95 text-center"
                >
                  Reset Form
                </button>
                <button
                  type="button"
                  onClick={handlePayMaal}
                  disabled={!reachesNishab}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl disabled:opacity-40 disabled:scale-100 cursor-pointer transition active:scale-95 text-center shadow-xs"
                >
                  Tunaikan Zakat
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Checkout Drawer bottom overlay sheet */}
      {checkoutItem && !isSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="flex-1" onClick={() => setCheckoutItem(null)}></div>
          
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto flex flex-col w-full max-w-md mx-auto shadow-2xl relative animate-slide-up pb-6">
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-3 cursor-pointer" onClick={() => setCheckoutItem(null)}></div>
            
            <div className="px-5 pb-3 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Konfirmasi Penyaluran Zakat</h3>
                <p className="text-xs text-emerald-800 font-bold">{checkoutItem.title}</p>
              </div>
              <button 
                onClick={() => setCheckoutItem(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
            </div>

            <div className="p-5 space-y-4">
              
              {/* Target info */}
              <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/80 space-y-1">
                <span className="text-[10px] text-emerald-800 uppercase font-extrabold tracking-wider block">Sifat Akad & Penyaluran</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  Zakat disalurkan secara amanah melalui BAZNAS ke program pemberdayaan asnaf dan beasiswa dhuafa.
                </p>
                <div className="text-[10.5px] text-slate-500 pt-1 border-t border-emerald-100 mt-1">
                  <strong>Detil:</strong> {checkoutItem.details}
                </div>
              </div>

              {/* Payment selection */}
              <div className="space-y-2.5">
                <h4 className="font-extrabold text-xs text-slate-800">Pilih Metode Transaksi</h4>
                <div className="space-y-2">
                  {[
                    { id: 'qris', label: 'QRIS (GoPay, OVO, ShopeePay, Dana)', icon: <Smartphone size={16} className="text-emerald-700" /> },
                    { id: 'bsi', label: 'Bank Syariah Indonesia (BSI Virtual Account)', icon: <Landmark size={16} className="text-emerald-700" /> },
                    { id: 'card', label: 'Kartu Debit / Kredit Syariah', icon: <CreditCard size={16} className="text-emerald-700" /> }
                  ].map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)} 
                      className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === method.id 
                          ? 'bg-emerald-50/50 border-emerald-600 shadow-2xs ring-1 ring-emerald-500/20' 
                          : 'bg-white border-slate-200/70 hover:border-slate-300'
                      }`}
                    >
                      <div className="mr-3 bg-slate-50 p-2 rounded-lg border border-slate-100">{method.icon}</div>
                      <span className="flex-1 text-xs font-bold text-slate-800">{method.label}</span>
                      {paymentMethod === method.id ? (
                        <CheckCircle2 size={18} className="text-emerald-700" />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action and pricing */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">TOTAL ZAKAT</span>
                  <div className="text-lg font-extrabold text-emerald-900">{formatRupiah(checkoutItem.amount)}</div>
                </div>
                
                <button
                  type="button"
                  onClick={handlePaymentSubmit}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 px-6 rounded-xl transition active:scale-95 shadow-xs cursor-pointer"
                >
                  Bayar & Tunaikan Akad
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Payment Success Screen Overlay */}
      {isSuccess && checkoutItem && (
        <div className="fixed inset-0 z-55 bg-white/95 backdrop-blur-xs flex flex-col justify-center items-center p-6 animate-fade-in">
          <div className="w-full max-w-sm text-center space-y-5">
            <div className="inline-flex p-4 bg-emerald-100 text-emerald-800 rounded-full animate-bounce">
              <CheckCircle2 size={44} />
            </div>

            <div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                Zakat Terbayar
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">Ibadah Zakat Sempurna</h2>
              <p className="text-xs text-slate-500 mt-1 px-3 leading-relaxed">
                Alhamdulillah, zakat Anda sebesar {formatRupiah(checkoutItem.amount)} berhasil diterima dan tercatat di mitra BAZNAS.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-3 shadow-xs">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/80">
                <span className="text-slate-400 font-medium">NO TRANSAKSI</span>
                <span className="font-mono font-bold text-slate-800">{transactionId}</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Jenis Alokasi</span>
                  <span className="font-bold text-slate-800 capitalize">Zakat {checkoutItem.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Kategori Paket</span>
                  <span className="font-bold text-slate-800">{checkoutItem.title}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-slate-400 font-medium">Muzakki / Pembayar</span>
                  <p className="font-bold text-emerald-900 text-xs text-right break-words max-w-[180px]">
                    {checkoutItem.details}
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Metode</span>
                  <span className="font-bold uppercase text-slate-700">{paymentMethod}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-slate-200/80 text-xs">
                <span className="text-slate-500 font-bold">Total Terbayar</span>
                <span className="text-base font-extrabold text-emerald-900">{formatRupiah(checkoutItem.amount)}</span>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-400 px-4 leading-relaxed">
              *Bukti setoran zakat digital resmi BAZNAS tersimpan di tab Riwayat Transaksi Anda.
            </p>

            <button 
              onClick={handleCloseSuccess}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl transition active:scale-95 shadow-xs cursor-pointer text-xs"
            >
              Lihat di Riwayat Transaksi
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
