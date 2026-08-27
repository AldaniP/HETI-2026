import React, { useState } from 'react';
import { 
  ArrowLeft, 
  KeyRound, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Lock
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
    }, 3500);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full relative font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('setting')} 
          className="mr-3 text-gray-700 hover:text-emerald-700 p-1 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-extrabold text-base text-gray-850">Ubah Password</h1>
      </div>

      <div className="px-5 py-6">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex items-center space-x-2 pb-1 border-b border-gray-100">
            <KeyRound size={16} className="text-emerald-600" />
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Ubah Kata Sandi</h3>
          </div>

          {/* Password Saat Ini */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Kata Sandi Saat Ini</label>
            <div className="relative">
              <input 
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Masukkan kata sandi lama"
                className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none pr-10 transition"
              />
              <button 
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Minimal 8 karakter kombinasi"
                className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none pr-10 transition"
              />
              <button 
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Konfirmasi Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Ulangi kata sandi baru"
                className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none pr-10 transition"
              />
              <button 
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-700 p-2.5 rounded-xl text-xs flex items-center space-x-1.5 font-medium shadow-2xs">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-xs flex items-center space-x-1.5 font-bold shadow-2xs">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Kata sandi berhasil diperbarui!</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition cursor-pointer shadow-sm flex items-center justify-center space-x-2 mt-2"
          >
            <Lock size={15} />
            <span>Perbarui Kata Sandi</span>
          </button>
        </form>
      </div>
    </div>
  );
}
