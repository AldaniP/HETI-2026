import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Newspaper, 
  Clock, 
  Tag, 
  Share2, 
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ScreenRoute, NewsItem } from '../types';
import { NEWS_DATABASE } from '../data/newsData';

interface Props {
  navigate: (route: ScreenRoute) => void;
  setSelectedNewsId: (id: string) => void;
}

const CATEGORIES = [
  'Semua',
  'Regulasi BWI',
  'Penyaluran',
  'Inspirasi Umat',
  'Ekonomi Syariah'
];

export function NewsScreen({ navigate, setSelectedNewsId }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredNews = NEWS_DATABASE.filter(item => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredNews = NEWS_DATABASE.find(item => item.featured) || NEWS_DATABASE[0];

  const handleOpenNews = (id: string) => {
    setSelectedNewsId(id);
    navigate('news_detail');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white flex flex-col h-full relative font-sans">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3.5 flex items-center sticky top-0 z-20 border-b border-gray-100 shadow-xs justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('home')} 
            className="p-1 -ml-1 text-gray-700 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="font-extrabold text-base text-gray-900 leading-tight">Portal Berita</h1>
            <p className="text-[10px] text-gray-400 font-medium">Kabar, Penyaluran & Regulasi Wakaf Terkini</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Newspaper size={17} />
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari berita & kabar wakaf..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>

        {/* Category Filter Chips */}
        <div className="flex overflow-x-auto space-x-2 hide-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured News Hero Card (when not searching specifically) */}
        {!searchQuery && selectedCategory === 'Semua' && (
          <div 
            onClick={() => handleOpenNews(featuredNews.id)}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-sm cursor-pointer group relative"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={featuredNews.imageUrl} 
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                <Sparkles size={11} />
                <span>Berita Utama</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-950 text-white">
              <div className="flex items-center space-x-2 text-[10.5px] text-emerald-300 font-medium mb-1.5">
                <span>{featuredNews.category}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock size={11} />
                  <span>{featuredNews.readTime}</span>
                </div>
              </div>
              <h2 className="font-extrabold text-sm text-white leading-snug group-hover:text-emerald-300 transition line-clamp-2">
                {featuredNews.title}
              </h2>
              <p className="text-xs text-gray-300 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                {featuredNews.summary}
              </p>
            </div>
          </div>
        )}

        {/* News List */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-gray-800 uppercase tracking-wider">
              {searchQuery ? `Hasil Pencarian (${filteredNews.length})` : 'Kabar Terkini'}
            </h3>
          </div>

          {filteredNews.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl text-gray-400 text-xs">
              Tidak ada berita yang cocok dengan kata kunci "{searchQuery}"
            </div>
          ) : (
            filteredNews.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenNews(item.id)}
                className="flex space-x-3.5 p-3 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/50 transition cursor-pointer group"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition shadow-2xs" 
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2">
                    <span className="truncate">{item.author}</span>
                    <div className="flex items-center space-x-1 text-emerald-700 font-bold shrink-0">
                      <span>Baca</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
