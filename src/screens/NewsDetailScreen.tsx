import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Clock, 
  Calendar, 
  User, 
  MapPin, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { NEWS_DATABASE } from '../data/newsData';

interface Props {
  navigate: (route: ScreenRoute) => void;
  newsId: string;
  setSelectedNewsId?: (id: string) => void;
}

export function NewsDetailScreen({ navigate, newsId, setSelectedNewsId }: Props) {
  const [copied, setCopied] = useState(false);

  const newsItem = NEWS_DATABASE.find(item => item.id === newsId) || NEWS_DATABASE[0];
  const relatedNews = NEWS_DATABASE.filter(item => item.id !== newsItem.id).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white flex flex-col h-full relative font-sans">
      {/* Header Bar */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <button 
          onClick={() => navigate('news')} 
          className="p-1.5 -ml-1 text-gray-700 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          Portal Berita
        </span>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleShare}
            className="p-1.5 text-gray-600 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            {copied ? <Check size={20} className="text-emerald-600" /> : <Share2 size={20} />}
          </button>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Category & Date */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
            {newsItem.category}
          </span>
          <span className="text-xs text-gray-400 font-medium">•</span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock size={12} />
            <span>{newsItem.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-black text-lg text-gray-900 leading-snug">
          {newsItem.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center justify-between py-2 border-y border-gray-100 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-[11px]">
              {newsItem.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-800">{newsItem.author}</p>
              {newsItem.location && (
                <div className="flex items-center text-[10px] text-gray-400">
                  <MapPin size={10} className="mr-0.5" />
                  <span>{newsItem.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-[11px] text-gray-400">
            <Calendar size={12} className="mr-1" />
            <span>{newsItem.date}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-xs">
          <img 
            src={newsItem.imageUrl} 
            alt={newsItem.title} 
            className="w-full h-52 object-cover"
          />
        </div>

        {/* Lead / Summary */}
        <div className="bg-emerald-50/70 p-3.5 rounded-xl border-l-4 border-emerald-600 text-xs font-semibold text-emerald-950 leading-relaxed">
          {newsItem.summary}
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed font-normal pt-1">
          {newsItem.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Action / Share banner */}
        <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-800">Bagikan Berita Ini</p>
            <p className="text-[10px] text-gray-500">Sebarkan kabar baik dan literasi wakaf</p>
          </div>
          <button 
            onClick={handleShare}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition cursor-pointer"
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
          </button>
        </div>

        {/* Related News */}
        <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
          <h3 className="font-extrabold text-xs text-gray-800 uppercase tracking-wider">
            Berita Terkait Lainnya
          </h3>
          <div className="space-y-2.5">
            {relatedNews.map((rel) => (
              <div 
                key={rel.id}
                onClick={() => {
                  if (setSelectedNewsId) {
                    setSelectedNewsId(rel.id);
                  }
                  window.scrollTo(0, 0);
                }}
                className="flex items-center justify-between p-3 bg-gray-50/70 hover:bg-gray-100 rounded-xl transition cursor-pointer"
              >
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <img src={rel.imageUrl} alt={rel.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9.5px] font-bold text-emerald-700">{rel.category}</span>
                    <h4 className="text-xs font-bold text-gray-900 truncate">{rel.title}</h4>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
