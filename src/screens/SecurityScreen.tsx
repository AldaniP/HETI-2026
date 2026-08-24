import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Lock, 
  KeyRound, 
  Fingerprint, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Laptop, 
  LogOut, 
  AlertCircle 
} from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function SecurityScreen({ navigate }: Props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [pinRequired, setPinRequired] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('Password baru minimal harus 8 karakter');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Konfirmasi password baru tidak cocok');
      return;
    }

    setIsSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
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
        <h1 className="font-extrabold text-base text-gray-850">Keamanan & Password</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Security Status Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="font-bold text-xs text-emerald-950">Status Akun: Sangat Aman</h2>
            <p className="text-[10.5px] text-emerald-700 mt-0.5">2FA aktif, enkripsi transaksi end-to-end</p>
          </div>
        </div>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3.5">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <KeyRound size={16} className="text-emerald-600" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Ubah Kata Sandi</h3>
          </div>

          {/* Password Saat Ini */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Kata Sandi Saat Ini</label>
            <div className="relative">
              <input 
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi lama"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Minimal 8 karakter kombinasi"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Konfirmasi Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Ulangi kata sandi baru"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 p-2.5 rounded-xl text-xs flex items-center space-x-1.5 border border-red-200 font-medium">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs flex items-center space-x-1.5 border border-emerald-200 font-bold">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Kata sandi berhasil diperbarui!</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer shadow-xs"
          >
            Perbarui Kata Sandi
          </button>
        </form>

        {/* Two-Factor & Biometrics Preferences */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
            <Lock size={16} className="text-emerald-600" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Metode Keamanan Tambahan</h3>
          </div>

          {/* Biometrik */}
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Fingerprint size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Login Biometrik / Face ID</h4>
                <p className="text-[10px] text-gray-400">Masuk cepat menggunakan sidik jari atau sensor wajah</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                biometricEnabled ? 'bg-emerald-600 justify-end' : 'bg-gray-200 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </button>
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Smartphone size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">Verifikasi 2 Langkah (2FA)</h4>
                <p className="text-[10px] text-gray-400">Kirim kode OTP ke WhatsApp/SMS saat login baru</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                twoFactorEnabled ? 'bg-emerald-600 justify-end' : 'bg-gray-200 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </button>
          </div>

          {/* PIN Transaksi */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <KeyRound size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800">PIN Transaksi Wakaf</h4>
                <p className="text-[10px] text-gray-400">PIN 6-digit untuk konfirmasi pembayaran & ikrar</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setPinRequired(!pinRequired)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
                pinRequired ? 'bg-emerald-600 justify-end' : 'bg-gray-200 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </button>
          </div>
        </div>

        {/* Active Devices / Sessions */}
        <div className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Perangkat Aktif</h3>

          <div className="space-y-2.5">
            {/* Current device */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-150">
              <div className="flex items-center space-x-3">
                <Laptop size={18} className="text-emerald-700" />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-gray-800">Chrome / Web Preview</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Sesi Ini</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Jakarta, Indonesia • Aktif Sekarang</p>
                </div>
              </div>
            </div>

            {/* Other device */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-150">
              <div className="flex items-center space-x-3">
                <Smartphone size={18} className="text-gray-600" />
                <div>
                  <span className="text-xs font-bold text-gray-800">Samsung Galaxy S24 (Android)</span>
                  <p className="text-[10px] text-gray-400">Jakarta • Terakhir aktif 2 jam lalu</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="button"
            className="w-full text-center text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2.5 rounded-xl border border-red-200 transition cursor-pointer flex items-center justify-center space-x-1.5 mt-2"
          >
            <LogOut size={14} />
            <span>Keluar dari Semua Perangkat Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
