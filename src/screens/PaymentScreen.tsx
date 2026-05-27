import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Smartphone, CreditCard, Landmark } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function PaymentScreen({ navigate }: Props) {
  const [nominal, setNominal] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('qris');

  const presetNominals = [50000, 100000, 200000, 500000, 1000000, 5000000];

  const handleNominalClick = (amount: number) => {
    setNominal(amount.toString());
  };

  const formatRupiah = (value: string) => {
    if (!value) return '';
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('wakaf_detail')} className="mr-3 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg">Pembayaran Wakaf</h1>
      </div>

      <div className="p-4 bg-white mb-2 shadow-sm border-b border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Anda akan berwakaf untuk program:</p>
        <h2 className="font-bold text-sm text-gray-800">Pembangunan Gedung Sekolah Yatim</h2>
      </div>

      <div className="p-4 bg-white mb-2 shadow-sm border-b border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">Nominal Wakaf</h3>
        
        <div className="relative mb-4">
            <span className="absolute left-4 top-3.5 font-bold text-gray-500">Rp</span>
            <input 
                type="text" 
                value={formatRupiah(nominal)}
                onChange={(e) => setNominal(e.target.value.replace(/\./g, ''))}
                placeholder="0"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
            {presetNominals.map(preset => (
                <button 
                  key={preset}
                  onClick={() => handleNominalClick(preset)}
                  className={`py-2 rounded-lg text-xs font-bold border transition ${
                    nominal === preset.toString() 
                      ? 'bg-green-50 border-green-500 text-green-700' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                    {preset / 1000}K
                </button>
            ))}
        </div>

        <label className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" 
            />
            <span className="text-sm font-medium text-gray-700 flex-1">Sembunyikan Nama (Hamba Allah)</span>
        </label>
      </div>

      <div className="p-4 bg-white mb-24 shadow-sm border-b border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">Metode Pembayaran</h3>
        
        <div className="space-y-3">
            {[
                { id: 'qris', label: 'QRIS (Gopay, OVO, ShopeePay)', icon: <Smartphone size={18} className="text-blue-500" /> },
                { id: 'va', label: 'Virtual Account (BCA, Mandiri, BSI)', icon: <Landmark size={18} className="text-orange-500" /> },
                { id: 'card', label: 'Kartu Kredit / Debit', icon: <CreditCard size={18} className="text-purple-500" /> }
            ].map(method => (
                <div 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)} 
                    className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === method.id 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-white border-gray-200'
                    }`}
                >
                    <div className="mr-3">{method.icon}</div>
                    <span className="flex-1 text-sm font-medium text-gray-800">{method.label}</span>
                    {paymentMethod === method.id ? <CheckCircle2 size={20} className="text-green-600" /> : <Circle size={20} className="text-gray-300" />}
                </div>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 z-30 shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-3 px-2">
            <span className="text-sm font-medium text-gray-500">Total Pembayaran</span>
            <span className="text-lg font-bold text-green-700">Rp {formatRupiah(nominal) || '0'}</span>
        </div>
        <button 
            onClick={() => navigate('payment_success')} 
            disabled={!nominal || parseInt(nominal) < 10000}
            className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
}
