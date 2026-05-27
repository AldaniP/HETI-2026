import React from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

export function DocumentScreen({ navigate }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate('wakaf_detail')} className="mr-3 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg flex-1 truncate pr-2">Rencana Anggaran Biaya (RAB)</h1>
        <button className="text-gray-600 outline-none">
          <Download size={22} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col items-center justify-center bg-gray-200">
        <div className="bg-white w-full max-w-sm aspect-[1/1.414] shadow-md flex items-center justify-center rounded-sm">
            <div className="text-center text-gray-400 flex flex-col items-center p-8">
                <FileText size={48} className="mb-3 text-gray-300" />
                <p className="font-medium text-gray-500">Pratinjau Dokumen PDF</p>
                <p className="text-xs mt-2 text-center text-gray-400">Rekomendasi Dokumen RAB - Pembangunan Gedung Sekolah Yatim.pdf</p>
                
                <div className="mt-8 border border-gray-200 rounded text-xs p-3 w-full bg-gray-50">
                    <div className="bg-gray-200 h-2 w-full rounded mb-2"></div>
                    <div className="bg-gray-200 h-2 w-5/6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-2 w-4/6 rounded mb-2"></div>
                    <div className="bg-gray-200 h-2 w-full rounded mb-2"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
