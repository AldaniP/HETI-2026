import React, { useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, User, Mail, Phone, MapPin, ShieldCheck, Save } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function EditProfileScreen({ navigate }: Props) {
  const [fullName, setFullName] = useState('Ahmad Abdullah');
  const [email, setEmail] = useState('ahmad.abdullah@email.com');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [address, setAddress] = useState('Jl. Tebet Raya No. 42, Jakarta Selatan, DKI Jakarta');
  const [gender, setGender] = useState('Laki-laki');
  const [birthDate, setBirthDate] = useState('1994-05-15');
  const [nik, setNik] = useState('3174************');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate('setting');
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('setting')} 
          className="mr-3 text-gray-700 hover:text-emerald-700 p-1 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-extrabold text-base text-gray-850">Ubah Profil</h1>
      </div>

      <form onSubmit={handleSave} className="p-4 space-y-4">
        {/* Profile Avatar Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
              alt="Foto Profil" 
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border-2 border-emerald-500 object-cover p-0.5"
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-full shadow-md border-2 border-white transition cursor-pointer"
              title="Ubah Foto Profil"
            >
              <Camera size={14} />
            </button>
          </div>
          <h2 className="font-bold text-sm text-gray-900">{fullName}</h2>
          <div className="mt-1 inline-flex items-center bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-[10.5px] font-bold rounded-full border border-emerald-200">
            <ShieldCheck size={12} className="mr-1 text-emerald-600" />
            Terverifikasi KYC BWI
          </div>
        </div>

        {/* Form Fields Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3.5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Informasi Pribadi</h3>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap Sesuai KTP</label>
            <div className="relative">
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <User size={16} className="absolute right-3.5 top-3 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Email</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <Mail size={16} className="absolute right-3.5 top-3 text-gray-400" />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Digunakan untuk pengiriman bukti & sertifikat wakaf</p>
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Telepon / WhatsApp</label>
            <div className="relative">
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <Phone size={16} className="absolute right-3.5 top-3 text-gray-400" />
            </div>
          </div>

          {/* NIK / KTP (Readonly verified) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nomor Induk Kependudukan (NIK)</label>
            <div className="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-600 font-mono">
              <span>{nik}</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Tervalidasi</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">NIK terikat pada sertifikat wakaf resmi dan tidak dapat diubah</p>
          </div>

          {/* Jenis Kelamin & Tanggal Lahir */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Jenis Kelamin</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tanggal Lahir</label>
              <input 
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Alamat Domisili */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Domisili</label>
            <div className="relative">
              <textarea 
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {isSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center space-x-2 text-xs font-bold">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>Perubahan profil berhasil disimpan! Mengalihkan...</span>
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2"
        >
          <Save size={16} />
          <span>Simpan Perubahan</span>
        </button>
      </form>
    </div>
  );
}
