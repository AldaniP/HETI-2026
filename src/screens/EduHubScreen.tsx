import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  PlayCircle, 
  BookOpen, 
  Sparkles, 
  Clock, 
  GraduationCap, 
  ChevronRight, 
  Video, 
  Flame, 
  Award, 
  Play
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { ALL_EDU_VIDEOS } from './EduVideoScreen';

interface Props {
  navigate: (route: ScreenRoute) => void;
  setSelectedArticleId: (id: string) => void;
  setSelectedVideoId?: (id: string) => void;
}

const CATEGORIES = [
  'Semua',
  'Finansial Pintar',
  'Fiqih Muamalah',
  'Zakat Maal'
];

interface EduArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  img: string;
  summary: string;
  rewardXp: number;
  quizCount: number;
  popular?: boolean;
}

const EDU_ARTICLES: EduArticle[] = [
  {
    id: 'syariah_milenial',
    title: 'Manajemen Keuangan Syariah untuk Milenial',
    category: 'Finansial Pintar',
    readTime: '6 mnt baca',
    author: 'Ust. Ahmad Hasan',
    img: 'https://images.unsplash.com/photo-1579621970588-a3f5ece89634?auto=format&fit=crop&w=800&q=80',
    summary: 'Kunci penting mengelola finansial generasi muda yang bebas riba, gharar, dan maysir menuju keberkahan aset abadi.',
    rewardXp: 50,
    quizCount: 2,
    popular: true
  },
  {
    id: 'wakaf_infaq_sedekah',
    title: 'Perbedaan Mendasar Wakaf, Infaq, dan Sedekah',
    category: 'Fiqih Muamalah',
    readTime: '5 mnt baca',
    author: 'Ustazah Dr. Sarah Maulida',
    img: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80',
    summary: 'Memahami prinsip penahanan aset pokok pada wakaf dibandingkan fleksibilitas infaq dan sedekah harian.',
    rewardXp: 50,
    quizCount: 2,
    popular: true
  },
  {
    id: 'emas_perak',
    title: 'Memahami Zakat Emas dan Perak secara Detil',
    category: 'Zakat Maal',
    readTime: '8 mnt baca',
    author: 'K.H. Fakhruddin',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    summary: 'Ketahui nishab 85 gram emas murni, syarat haul 1 tahun, serta cara kalkulasi 2.5% zakat logam mulia.',
    rewardXp: 50,
    quizCount: 2,
    popular: false
  }
];

export function EduHubScreen({ navigate, setSelectedArticleId, setSelectedVideoId }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredArticles = EDU_ARTICLES.filter(item => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = filteredArticles.find(a => a.popular) || filteredArticles[0] || EDU_ARTICLES[0];

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    navigate('edu_detail');
  };

  const handleOpenVideo = (id: string) => {
    if (setSelectedVideoId) {
      setSelectedVideoId(id);
    }
    navigate('edu_video');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white flex flex-col h-full relative font-sans">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-gray-100 shadow-xs">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('home')} 
            className="p-1 -ml-1 text-gray-700 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="font-extrabold text-base text-gray-900 leading-tight">Edukasi Wakaf</h1>
            <p className="text-[10px] text-gray-400 font-medium">Literasi Fiqih & Manajemen Harta Syariah</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <GraduationCap size={18} />
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari topik fiqih, zakat, atau wakaf..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500 transition"
          />
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
        </div>

        {/* Gamified XP Reward Highlight */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-600/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 bg-emerald-700/80 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full w-fit">
                <Sparkles size={11} />
                <span>KUIS LITERASI BERKAH</span>
              </div>
              <h3 className="font-extrabold text-sm text-white pt-1">Belajar & Kumpulkan Poin</h3>
              <p className="text-[11px] text-emerald-200/90 leading-relaxed max-w-[240px]">
                Selesaikan artikel & jawab kuis untuk meraih <span className="font-bold text-amber-300">+50 XP</span> per materi!
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/15 text-amber-400">
              <Award size={24} />
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex overflow-x-auto space-x-2 hide-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Hero Article */}
        {!searchQuery && featured && (
          <div 
            onClick={() => handleOpenArticle(featured.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-2xs border border-gray-100 cursor-pointer group hover:border-emerald-200 transition"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img 
                src={featured.img} 
                referrerPolicy="no-referrer"
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                <Flame size={12} className="text-amber-300" />
                <span>{selectedCategory === 'Semua' ? 'Paling Populer' : selectedCategory}</span>
              </div>
              <div className="absolute top-3 right-3 bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                +{featured.rewardXp} XP
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-0.5">
                  {featured.category}
                </span>
                <h3 className="font-extrabold text-sm text-white leading-snug line-clamp-1">
                  {featured.title}
                </h3>
              </div>
            </div>
            
            <div className="p-3.5 bg-white">
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {featured.summary}
              </p>
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50 text-[11px]">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock size={12} />
                  <span>{featured.readTime}</span>
                  <span>•</span>
                  <span>{featured.author}</span>
                </div>
                <div className="flex items-center space-x-1 text-emerald-700 font-extrabold">
                  <span>Mulai Belajar</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Learning Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Video size={16} className="text-emerald-600" />
              <h3 className="font-extrabold text-xs text-gray-850 uppercase tracking-wider">Video Pembelajaran</h3>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">Buka Video & Diskusi</span>
          </div>

          <div className="flex overflow-x-auto space-x-3.5 hide-scrollbar pb-1">
            {ALL_EDU_VIDEOS.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => handleOpenVideo(vid.id)}
                className="min-w-[200px] max-w-[200px] bg-gray-50 rounded-2xl overflow-hidden cursor-pointer group shadow-2xs hover:shadow-xs transition"
              >
                <div className="relative h-28 w-full overflow-hidden bg-gray-900">
                  <img 
                    src={vid.thumbnail} 
                    referrerPolicy="no-referrer"
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-85 transition duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <Play size={18} className="ml-0.5 fill-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-2.5">
                  <h4 className="font-bold text-xs text-gray-850 leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1.5 font-medium">
                    <span className="truncate max-w-[110px]">{vid.speaker}</span>
                    <span>{vid.views.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Articles Section */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <BookOpen size={16} className="text-emerald-600" />
              <h3 className="font-extrabold text-xs text-gray-850 uppercase tracking-wider">
                {selectedCategory === 'Semua' ? 'Semua Modul & Artikel Fiqih' : `Kategori: ${selectedCategory}`}
              </h3>
            </div>
            <span className="text-[10px] text-gray-400 font-bold">{filteredArticles.length} Materi</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl text-gray-400 text-xs">
              Tidak ada materi untuk kategori ini.
            </div>
          ) : (
            filteredArticles.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenArticle(item.id)}
                className="flex space-x-3.5 p-3 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/50 transition cursor-pointer group"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-2xs">
                  <img 
                    src={item.img} 
                    referrerPolicy="no-referrer"
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition" 
                  />
                  <span className="absolute bottom-1 right-1 bg-amber-400 text-emerald-950 text-[8.5px] font-black px-1.5 py-0.5 rounded-md">
                    +{item.rewardXp} XP
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[9.5px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.readTime}</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10.5px] text-gray-500 pt-1">
                    <span className="text-[10px] text-gray-400 truncate">{item.author}</span>
                    <div className="flex items-center space-x-1 text-emerald-700 font-bold shrink-0">
                      <span>Buka Materi</span>
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
