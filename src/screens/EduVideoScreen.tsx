import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  Check, 
  MessageSquare, 
  Send, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  User, 
  Clock, 
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ScreenRoute } from '../types';

export interface EduVideoItem {
  id: string;
  title: string;
  duration: string;
  speaker: string;
  speakerRole?: string;
  views: string;
  date: string;
  thumbnail: string;
  videoEmbedUrl: string;
  description: string;
  channelAvatar: string;
}

export const ALL_EDU_VIDEOS: EduVideoItem[] = [
  {
    id: 'v1',
    title: 'Panduan Lengkap Wakaf Uang bagi Pemula & Generasi Muda',
    duration: '04:15',
    speaker: 'Prof. Dr. KH. Mohammad Nuh, DEA',
    speakerRole: 'Ketua Pelaksana BWI • Narasumber Utama',
    views: '2.4 rb x ditonton',
    date: '3 hari yang lalu',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Video tutorial ringkas dan padat tentang bagaimana mekanisme wakaf uang bekerja di Indonesia. Mulai dari setoran awal minimal Rp10.000 melalui LKS-PWU, penerbitan sertifikat digital BWI, hingga pengelolaan dana abadi untuk fasilitas umum.',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'v2',
    title: 'Cara Hitung Zakat Penghasilan & Tabungan Syariah',
    duration: '03:40',
    speaker: 'Ust. Farhan Siddiq, M.A.',
    speakerRole: 'Konsultan Fiqih & Zakat Maal',
    views: '1.8 rb x ditonton',
    date: '1 minggu yang lalu',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Simulasi praktis menghitung nishab zakat profesi (setara 85 gram emas per tahun atau 524 kg beras per bulan) dengan potongan kebutuhan pokok keluarga.',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'v3',
    title: 'Potensi Wakaf Produktif Mengentaskan Kemiskinan',
    duration: '05:20',
    speaker: 'Dr. Hendri Tanjung, M.M.',
    speakerRole: 'Pakar Ekonomi Syariah & Komisioner BWI',
    views: '3.1 rb x ditonton',
    date: '2 minggu yang lalu',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    description: 'Kisah nyata perkebunan sawit dan rumah sakit berbasis wakaf yang mampu membiayai pengobatan ribuan pasien dhuafa setiap tahun secara mandiri.',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

interface CommentItem {
  id: string;
  userName: string;
  avatarBg: string;
  time: string;
  text: string;
  likes: number;
  isLiked?: boolean;
  isOfficial?: boolean;
  officialRole?: string;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    userName: 'Ust. Farhan Siddiq',
    avatarBg: 'bg-emerald-700 text-white',
    time: '2 jam lalu',
    text: 'Alhamdulillah penjelasannya sangat aplikatif. Inti wakaf uang adalah pokok dananya tidak boleh berkurang, hanya hasil pengelolaannya yang disalurkan.',
    likes: 24,
    isLiked: false,
    isOfficial: true,
    officialRole: 'Konsultan Fiqih'
  },
  {
    id: 'c2',
    userName: 'Rian Pratama',
    avatarBg: 'bg-blue-600 text-white',
    time: '5 jam lalu',
    text: 'Apakah kalau wakaf lewat aplikasi Amwal ini langsung dapat sertifikat resmi atas nama kita pribadi?',
    likes: 8,
    isLiked: false
  },
  {
    id: 'c3',
    userName: 'Admin BWI Edukasi',
    avatarBg: 'bg-emerald-800 text-white',
    time: '3 jam lalu',
    text: '@Rian Pratama Betul sekali, sertifikat wakaf digital dengan QR Code verifikasi langsung terbit di menu Riwayat & Sertifikat.',
    likes: 15,
    isLiked: true,
    isOfficial: true,
    officialRole: 'Nazhir Resmi'
  }
];

interface Props {
  navigate: (route: ScreenRoute) => void;
  videoId?: string;
  setSelectedVideoId?: (id: string) => void;
}

export function EduVideoScreen({ navigate, videoId = 'v1', setSelectedVideoId }: Props) {
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(148);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(true);
  const [copied, setCopied] = useState(false);

  // Discussion comments
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');

  const currentVideo = ALL_EDU_VIDEOS.find(v => v.id === currentVideoId) || ALL_EDU_VIDEOS[0];
  const otherVideos = ALL_EDU_VIDEOS.filter(v => v.id !== currentVideo.id);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const item: CommentItem = {
      id: 'c_' + Date.now(),
      userName: 'Anda (Wakif)',
      avatarBg: 'bg-emerald-600 text-white',
      time: 'Baru saja',
      text: newCommentText.trim(),
      likes: 0,
      isLiked: false
    };

    setComments(prev => [item, ...prev]);
    setNewCommentText('');
  };

  const handleToggleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleChangeVideo = (id: string) => {
    setCurrentVideoId(id);
    if (setSelectedVideoId) {
      setSelectedVideoId(id);
    }
    setIsPlaying(true);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-white flex flex-col h-full relative font-sans">
      {/* Sticky Clean Top Header */}
      <div className="bg-white px-4 py-3 flex items-center sticky top-0 z-30 border-b border-gray-100 shadow-xs">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('edu_hub')} 
            className="p-1 -ml-1 text-gray-700 hover:text-emerald-700 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>
          <span className="font-extrabold text-sm text-gray-900 truncate max-w-[240px]">
            Edukasi Video
          </span>
        </div>
      </div>

      {/* Video Player Section (YouTube Style Aspect 16:9) */}
      <div className="relative w-full aspect-video bg-black sticky top-[49px] z-20 shadow-md">
        {isPlaying ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-950 text-white relative">
            <img 
              src={currentVideo.thumbnail} 
              alt={currentVideo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60" 
            />
            {/* Interactive simulated player controls overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-3">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-bold truncate max-w-[260px] drop-shadow">{currentVideo.title}</span>
                <span className="bg-red-600 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">LIVE EDU</span>
              </div>
              
              <div className="self-center flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl animate-pulse">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className="w-2/5 h-full bg-red-600"></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-300 font-mono">
                  <span>01:42</span>
                  <span>{currentVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative cursor-pointer group"
          >
            <img 
              src={currentVideo.thumbnail} 
              alt={currentVideo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition">
                <Play size={28} className="ml-1 fill-white" />
              </div>
            </div>
            <span className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              {currentVideo.duration}
            </span>
          </div>
        )}
      </div>

      {/* Video Details & Interaction Section */}
      <div className="p-4 space-y-4">
        {/* Title & Metadata */}
        <div>
          <h1 className="font-extrabold text-base text-gray-900 leading-snug">
            {currentVideo.title}
          </h1>
          <div className="flex items-center space-x-2 text-[11px] text-gray-400 mt-1 font-medium">
            <span>{currentVideo.views}</span>
            <span>•</span>
            <span>{currentVideo.date}</span>
          </div>
        </div>

        {/* Pemateri Row */}
        <div className="flex items-center py-2 border-y border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-emerald-200">
              <img 
                src={currentVideo.channelAvatar} 
                alt={currentVideo.speaker}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="text-[9.5px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                Pemateri
              </span>
              <h3 className="font-bold text-xs text-gray-900 leading-tight">
                {currentVideo.speaker}
              </h3>
              <span className="text-[10px] text-gray-400 block font-medium">
                {currentVideo.speakerRole || 'Narasumber Ahli Syariah'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row (Like, Share) */}
        <div className="flex items-center space-x-2 pb-1">
          <button 
            onClick={handleToggleLike}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              isLiked 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ThumbsUp size={14} className={isLiked ? 'fill-emerald-800' : ''} />
            <span>{likeCount}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
            <span>{copied ? 'Tersalin' : 'Bagikan'}</span>
          </button>
        </div>

        {/* Collapsible Clean Description Box */}
        <div className="bg-gray-50 rounded-2xl p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800">
            <span>Ringkasan Materi</span>
            <button 
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-gray-500 hover:text-gray-800 text-[11px] font-semibold flex items-center cursor-pointer"
            >
              {showFullDesc ? 'Sembunyikan' : 'Selengkapnya'}
              {showFullDesc ? <ChevronUp size={14} className="ml-0.5" /> : <ChevronDown size={14} className="ml-0.5" />}
            </button>
          </div>
          <p className={`text-xs text-gray-600 leading-relaxed ${showFullDesc ? '' : 'line-clamp-2'}`}>
            {currentVideo.description}
          </p>
        </div>

        {/* Discussion / Comments Section (Simpel & Interaktif & Bisa Disembunyikan) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowDiscussion(!showDiscussion)}
              className="flex items-center space-x-1.5 text-left group cursor-pointer"
            >
              <MessageSquare size={16} className="text-emerald-700" />
              <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider group-hover:text-emerald-700 transition">
                Diskusi & Tanya Jawab ({comments.length})
              </h3>
            </button>
            <button 
              onClick={() => setShowDiscussion(!showDiscussion)}
              className="text-[11px] text-gray-500 hover:text-emerald-700 font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>{showDiscussion ? 'Sembunyikan' : 'Tampilkan Diskusi'}</span>
              {showDiscussion ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {showDiscussion && (
            <>
              {/* Comment Input Box */}
              <form onSubmit={handleAddComment} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  <User size={15} />
                </div>
                <input 
                  type="text" 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Tulis pertanyaan atau tanggapan..." 
                  className="flex-1 bg-transparent text-xs font-medium text-gray-800 placeholder-gray-400 outline-none"
                />
                <button 
                  type="submit" 
                  disabled={!newCommentText.trim()}
                  className="p-2 bg-emerald-600 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl transition cursor-pointer shadow-2xs shrink-0"
                >
                  <Send size={13} />
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 pt-1">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 bg-gray-50/60 p-3 rounded-2xl text-left">
                    <div className={`w-8 h-8 rounded-full ${comment.avatarBg} font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {comment.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <span className="font-bold text-xs text-gray-900">{comment.userName}</span>
                          {comment.isOfficial && (
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded-md">
                              {comment.officialRole}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">{comment.time}</span>
                      </div>
                      
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {comment.text}
                      </p>

                      <div className="flex items-center space-x-3 pt-1 text-[11px] text-gray-500">
                        <button 
                          onClick={() => handleToggleCommentLike(comment.id)}
                          className={`flex items-center space-x-1 cursor-pointer transition ${comment.isLiked ? 'text-emerald-700 font-bold' : 'hover:text-gray-800'}`}
                        >
                          <ThumbsUp size={12} className={comment.isLiked ? 'fill-emerald-700' : ''} />
                          <span>{comment.likes}</span>
                        </button>
                        <button 
                          onClick={() => setNewCommentText(`@${comment.userName} `)}
                          className="hover:text-emerald-700 font-semibold cursor-pointer"
                        >
                          Balas
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Video Rekomendasi Terkait (Up Next) */}
        <div className="pt-4 space-y-3 border-t border-gray-100">
          <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider">
            Video Edukasi Lainnya
          </h3>

          <div className="space-y-2.5">
            {otherVideos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => handleChangeVideo(vid.id)}
                className="flex space-x-3 p-2 rounded-2xl bg-gray-50/70 hover:bg-emerald-50/50 transition cursor-pointer group"
              >
                <div className="relative w-28 h-18 rounded-xl overflow-hidden shrink-0 bg-gray-900">
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition" 
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play size={18} className="text-white fill-white opacity-80 group-hover:opacity-100" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8.5px] font-bold px-1 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                  <h4 className="font-bold text-xs text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition">
                    {vid.title}
                  </h4>
                  <div className="text-[10px] text-gray-400">
                    <p className="truncate">{vid.speaker}</p>
                    <p>{vid.views}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
