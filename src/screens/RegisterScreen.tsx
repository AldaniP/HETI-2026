import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { ScreenRoute } from '../types';
import { AmwalLogo } from '../components/AmwalLogo';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function RegisterScreen({ navigate }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-white overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center items-center py-8">
        <AmwalLogo className="mb-4" size={160} showText={false} />
        <p className="text-gray-500 mb-6 font-medium">Buat Akun Baru Amwal</p>
        
        <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('home'); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Masukkan password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pr-10"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ulangi Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Konfirmasi password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pr-10"
                required
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-3.5 rounded-lg mt-6 hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>

        <div className="w-full mt-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">Atau</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="flex space-x-6 mt-6">
          <button 
            type="button" 
            onClick={() => navigate('home')}
            className="w-12 h-12 rounded-full border border-gray-200 shadow-xs flex items-center justify-center bg-white hover:bg-gray-50 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Daftar dengan Google"
          >
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.67-.35-1.37-.35-2.09z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
          </button>
          <button 
            type="button" 
            onClick={() => navigate('home')}
            className="w-12 h-12 rounded-full border border-gray-200 shadow-xs flex items-center justify-center bg-white hover:bg-gray-50 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Daftar dengan Facebook"
          >
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
              <circle cx="12" cy="12" r="11" fill="#1877F2" />
              <path d="M14.5 9H13V7.5C13 6.67 13.67 6 14.5 6H15.5V3H13.5C11.57 3 10 4.57 10 6.5V9H8.5V12H10V21H13V12H14.5L15.5 9Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="text-center pb-4">
        <p className="text-sm text-gray-600">
          Sudah punya akun? <button onClick={() => navigate('login')} className="text-green-600 font-bold">Masuk</button>
        </p>
      </div>
    </div>
  );
}
