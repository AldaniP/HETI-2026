import React, { useState, useEffect } from 'react';
import { addPoints } from '../utils/points';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MessageSquare, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  RotateCw, 
  BookOpen, 
  User, 
  Calendar,
  AlertCircle,
  XCircle,
  Sparkles
} from 'lucide-react';
import { ScreenRoute } from '../types';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ArticleData {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  paragraphs: string[];
  subheading?: string;
  subParagraphs?: string[];
  quiz: QuizQuestion[];
}

const articlesDatabase: Record<string, ArticleData> = {
  syariah_milenial: {
    id: 'syariah_milenial',
    title: 'Manajemen Keuangan Syariah untuk Milenial',
    category: 'Finansial Pintar',
    author: 'Ust. Ahmad Hasan',
    date: '12 Mei 2026',
    imageUrl: 'https://images.unsplash.com/photo-1579621970588-a3f5ece89634?auto=format&fit=crop&w=800&q=80',
    paragraphs: [
      'Mengelola keuangan sejak usia muda merupakan kunci penting untuk menjamin kestabilan hidup di masa depan. Namun, sebagai seorang Muslim, merencanakan keuangan tidak hanya bertujuan untuk menimbun kekayaan materi, melainkan juga berfokus pada keberkahan harta dalam bingkai syar\'i.',
      'Ada tiga prinsip utama dalam keuangan syariah yang wajib dipahami oleh milenial. Pertama, kelayakan aset harus terbebas dari unsur Riba (tambahan tanpa imbalan), Gharar (ketidakjelasan atau penipuan), dan Maysir (perjudian atau spekulasi tinggi). Segala instrumen investasi yang dipilih wajib disaring berdasarkan prinsip halal ini.'
    ],
    subheading: 'Alokasi Berkah Al-Amwal',
    subParagraphs: [
      'Kedua adalah mengutamakan pengeluaran wajib syariah sebelum konsumsi pribadi, seperti mengalokasikan Zakat Maal sebesar 2.5% jika simpanan atau penghasilan tahunan telah mencapai nishabnya. Ketiga adalah membiasakan diri berdonasi sukarela melalui infaq dan wakaf agar harta yang dimiliki terus mengalirkan manfaat bagi umat.'
    ],
    quiz: [
      {
        question: 'Prinsip manakah yang mutlak wajib dipatuhi dalam transaksi komersial berbasis syariah?',
        options: [
          'Transaksi mengandung bunga bank tinggi',
          'Bebas dari unsur Riba, Gharar, dan Maysir',
          'Penjualan barang fiktif yang tidak konkret',
          'Investasi murni spekulatif tanpa kejelasan akad'
        ],
        correctIndex: 1,
        explanation: 'Transaksi keuangan syariah wajib bersih dari Riba (bunga/tambahan bathil), Gharar (ketidakjelasan informasi), dan Maysir (judi/spekulasi tidak berdasar).'
      },
      {
        question: 'Berapakah persentase kadar Zakat Maal yang wajib ditunaikan dari total aset tersimpan apabila telah genap haul dan nishab?',
        options: [
          '1.0% dari total aset',
          '5.0% dari total aset',
          '2.5% dari total aset',
          '10.0% dari total aset'
        ],
        correctIndex: 2,
        explanation: 'Kadar kewajiban zakat maal atas simpanan uang, tabungan, perdagangan, emas, dan perak adalah 2.5% tiap kali jatuh tempo satu tahun hijriah.'
      }
    ]
  },
  wakaf_infaq_sedekah: {
    id: 'wakaf_infaq_sedekah',
    title: 'Perbedaan Mendasar Wakaf, Infaq, dan Sedekah',
    category: 'Fiqih Muamalah',
    author: 'Ustazah Dr. Sarah Maulida',
    date: '26 Apr 2026',
    imageUrl: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&w=800&q=80',
    paragraphs: [
      'Banyak umat Muslim yang masih sering menyamakan arti dari wakaf, infaq, dan sedekah karena ketiganya sama-sama merupakan aktivitas menyalurkan harta untuk kebaikan di jalan Allah. Padahal, ditinjau dari aspek fikih muamalah, ketiganya memiliki aturan hukum dan mekanisme pemanfaatan yang sangat berbeda secara fundamental.',
      'Perbedaan yang paling fundamental terletak pada status pokok hartanya. Wakaf mensyaratkan pokok harta harus ditahan (tidak boleh dijual, diwariskan, atau didepresiasi nilainya), dan hanya manfaat atau hasil surplus dari pengelolaan harta tersebut yang disalurkan secara konstan kepada para penerima manfaat (mauquf \'alaih).'
    ],
    subheading: 'Fleksibilitas Sedekah dan Infaq',
    subParagraphs: [
      'Sementara itu, infaq dan sedekah biasa tidak memiliki syarat wajib penahanan aset pokok. Harta yang diniatkan sebagai sedekah akan langsung habis dikonsumsi oleh penerimanya saat itu juga, seperti makanan, pakaian, atau uang tunai bantuan sosial dasar. Infaq bernilai materi, sedangkan sedekah mencakup kebaikan non-materi juga seperti senyuman tulus atau bantuan tenaga.'
    ],
    quiz: [
      {
        question: 'Manakah perbedaan utama berwakaf (Wakaf) dibandingkan dengan sedekah biasa?',
        options: [
          'Wakaf wajib habis sekali pakai saat disalurkan',
          'Wakaf menahan harta pokok dan menyalurkan hasil/manfaatnya secara abadi',
          'Wakaf hanya boleh diajukan oleh instansi kementerian negara',
          'Sedekah memerlukan proses akta notaris yang rumit'
        ],
        correctIndex: 1,
        explanation: 'Secara fikih syariah, wakaf menahan pokok aset fisik (abadi/tidak berpindah kepemilikan) untuk dimanfaatkan produktivitasnya tanpa mengurangi nilai pokoknya.'
      },
      {
        question: 'Hukum dasar pelaksanaan amalan Wakaf dalam syariah Islam bersifat...',
        options: [
          'Wajib fardhu ain bagi setiap bayi lahir',
          'Makruh jika dikelola oleh lembaga non-pemerintah',
          'Sunnah Muakkadah (sangat dianjurkan) sebagai amal jariyah',
          'Haram bagi milenial berpenghasilan dasar'
        ],
        correctIndex: 2,
        explanation: 'Hukum wakaf adalah sunnah muakkadah yang dianjurkan berdasarkan hadis shahih mengenai aliran pahala jariyah yang tidak terputus selepas wafat.'
      }
    ]
  },
  emas_perak: {
    id: 'emas_perak',
    title: 'Memahami Zakat Emas dan Perak secara Detil',
    category: 'Zakat Maal',
    author: 'K.H. Fakhruddin',
    date: '18 Mei 2026',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    paragraphs: [
      'Emas dan perak merupakan jenis logam mulia yang menjadi rujukan fundamental penyimpanan nilai sepanjang sejarah peradaban Islam. Oleh karena itu, hukum fikih Islam menetapkan ketentuan zakat yang sangat spesifik atas kepemilikan kedua logam mulia ini sebagai sarana mensucikan simpanan pribadi Anda.',
      'Kewajiban zakat atas kepemilikan emas murni simpanan timbul apabila berat simpanan Anda telah menyentuh batas nishabnya, yaitu sebesar 85 gram emas murni, dan telah mengendap stabil tanpa berkurang selama satu tahun kalender penuh (haul).'
    ],
    subheading: 'Nishab Perak dan Kadar Wajib Zakat',
    subParagraphs: [
      'Sementara untuk perak murni, batas nishabnya adalah 595 gram perak murni. Apabila simpanan perak atau emas Anda telah mencapai/melampaui nishab dan haul tersebut, kadar zakat yang wajib ditarik dan disalurkan kepada mustahik zakat adalah sebesar 2.5%.'
    ],
    quiz: [
      {
        question: 'Berapakah batas nishab (nilai minimum kepemilikan) agar emas simpanan wajib dizakati?',
        options: [
          '40 gram emas murni',
          '85 gram emas murni',
          '135 gram emas murni',
          '200 gram emas murni'
        ],
        correctIndex: 1,
        explanation: 'Nishab zakat emas murni simpanan non-hiasan adalah 85 gram sesuai dengan acuan syariah dan kesepakatan jumhur ulama.'
      },
      {
        question: 'Berapakah nisbah kadar emas atau perak wajib dizakatkan saat masa haul terpenuhi?',
        options: [
          '10% dari berat emas',
          '5% dari berat emas',
          '2.5% dari nilai/berat emas',
          '15% dari nilai/berat emas'
        ],
        correctIndex: 2,
        explanation: 'Zakat emas simpanan yang mencapai nishab dipotong sebesar 2.5% demi pembersihan harta.'
      }
    ]
  }
};

interface Props {
  navigate: (route: ScreenRoute) => void;
  articleId?: string;
}

export function EduDetailScreen({ navigate, articleId = 'syariah_milenial' }: Props) {
  const article = articlesDatabase[articleId] || articlesDatabase.syariah_milenial;
  
  // Tab control state
  const [activeTab, setActiveTab] = useState<'article' | 'quiz'>('article');
  
  // Quiz states
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(234);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Reset quiz states when article changes
  useEffect(() => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setActiveTab('article'); // Default to article reading
  }, [articleId]);

  const handleSelectOption = (qIndex: number, oIndex: number) => {
    if (submitted) return; // Prevent change after answer submit
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleSubmitQuiz = () => {
    // Score calculation
    let currentScore = 0;
    article.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);

    const pointsAwarded = currentScore * 50;
    const finalPoints = pointsAwarded > 0 ? pointsAwarded : 20;
    addPoints(finalPoints, `Menyelesaikan Kuis: ${article.title} (${currentScore}/${article.quiz.length} Benar)`);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const answeredAll = Object.keys(selectedAnswers).length === article.quiz.length;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col h-full relative">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100 shadow-3xs">
        <button onClick={() => navigate('edu_hub')} className="text-gray-600 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <ArrowLeft size={22} />
        </button>
        <span className="text-xs font-bold font-sans text-gray-500 uppercase tracking-widest bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
          Ulasan Artikel & Kuis
        </span>
        <button className="text-gray-600 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition">
          <Share2 size={19} />
        </button>
      </div>

      {/* Tab Selector Segment */}
      <div className="flex border-b border-slate-100 bg-white sticky top-[60px] z-10">
        <button 
          onClick={() => setActiveTab('article')}
          className={`flex-1 py-3 text-xs font-extrabold transition-all duration-200 border-b-2 flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'article'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
              : 'border-transparent text-gray-400 hover:text-gray-700'
          }`}
        >
          <BookOpen size={14} className={activeTab === 'article' ? 'text-emerald-700' : 'text-gray-400'} />
          <span>Materi & Diskusi</span>
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-3 text-xs font-extrabold transition-all duration-200 border-b-2 flex items-center justify-center space-x-2 cursor-pointer relative ${
            activeTab === 'quiz'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
              : 'border-transparent text-gray-400 hover:text-gray-700'
          }`}
        >
          <HelpCircle size={14} className={activeTab === 'quiz' ? 'text-emerald-700' : 'text-gray-400'} />
          <span>Kuis Interaktif</span>
          {submitted ? (
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full scale-90">
              {score}/{article.quiz.length}
            </span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
          )}
        </button>
      </div>

      {/* CONDITIONAL CONTROLLER AREA */}
      {activeTab === 'article' ? (
        <>
          {/* Hero Banner Image (only shown in reading/article mode) */}
          <div className="w-full relative h-48 bg-gray-200">
            <img 
              src={article.imageUrl} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
              alt={article.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="p-5 pb-28 bg-white flex-1 shadow-3xs">
            {/* Meta Header */}
            <div className="mb-5">
              <span className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase bg-emerald-50 border border-emerald-100/60 px-2.5 py-1 rounded-full inline-block">
                {article.category}
              </span>
              <h1 className="text-lg font-bold text-gray-900 leading-snug mt-2.5 mb-3">
                {article.title}
              </h1>
              <div className="flex flex-col space-y-1.5 text-xs text-gray-400 border-b border-gray-100 pb-4">
                <div className="flex items-center space-x-1.5 font-medium">
                  <User size={13} className="text-gray-400" />
                  <span className="text-gray-600">{article.author}</span>
                </div>
                <div className="flex items-center space-x-1.5 font-medium">
                  <Calendar size={13} className="text-gray-400" />
                  <span>{article.date} • 5 menit memahami</span>
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="text-gray-750 text-xs md:text-sm space-y-4 text-justify leading-relaxed font-normal">
              {article.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              
              {article.subheading && (
                <h3 className="font-bold text-sm text-gray-900 pt-3.5 mb-1.5 flex items-center">
                  <BookOpen size={15} className="mr-1.5 text-emerald-600 animate-pulse" />
                  {article.subheading}
                </h3>
              )}

              {article.subParagraphs?.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* CALL TO ACTION (CTA) to testing knowledge */}
            <div className="mt-8 bg-gradient-to-r from-emerald-50/90 via-emerald-50/60 to-teal-50/50 border border-emerald-100/70 p-4.5 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="space-y-1 pr-3 flex-1">
                <h4 className="text-xs font-extrabold text-emerald-950 flex items-center tracking-tight">
                  <Sparkles size={14} className="mr-1.5 text-amber-500 shrink-0" />
                  Uji Pemahaman Hukum Muamalah?
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Yuk selesaikan kuis interaktif singkat seputar materi di atas dan dapatkan 100 XP Berkah!
                </p>
              </div>
              <button 
                type="button"
                onClick={() => {
                  setActiveTab('quiz');
                  const mainContainer = document.querySelector('.overflow-y-auto');
                  if (mainContainer) {
                    mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition duration-200 shrink-0 cursor-pointer shadow-xs hover:shadow-sm"
              >
                Mulai Kuis
              </button>
            </div>

            {/* Diskusi Section */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-905 mb-4 text-sm flex items-center">
                <MessageSquare size={15} className="mr-1.5 text-gray-500" /> Diskusi (24)
              </h3>
              
              <div className="flex space-x-3 mb-5">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full shadow-3xs border border-gray-50" alt="Avatar reader" />
                <div className="bg-gray-50 p-3 rounded-tr-xl rounded-b-xl flex-1 text-xs text-justify">
                  <p className="font-bold text-gray-800 mb-0.5">Budi Setiawan</p>
                  <p className="text-gray-600 leading-normal">Artikel yang sangat bermanfaat. Bagaimana dengan reksadana syariah?</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&q=80" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full shadow-3xs border border-gray-50" alt="Avatar reader" />
                <div className="bg-gray-50 p-3 rounded-tr-xl rounded-b-xl flex-1 text-xs text-justify">
                  <p className="font-bold text-gray-800 mb-0.5">Siti Aminah</p>
                  <p className="text-gray-600 leading-normal">Terima kasih atas penjelasannya ustadz, kuis di atas sangat membantu menguji niyat dan pemahaman hukum asnaf kami.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* CLEAN & MODERN QUIZ TAB */
        <div className="p-4 pb-28 bg-slate-50/60 flex-1 flex flex-col space-y-4">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <HelpCircle size={16} />
                </div>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Kuis Interaktif
                </span>
              </div>
              <span className="text-[11px] text-amber-800 font-extrabold flex items-center bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full shadow-2xs">
                <Sparkles size={12} className="mr-1 text-amber-600" /> +100 XP Berkah
              </span>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100/70 rounded-xl px-3.5 py-2 mb-2.5">
              <span className="text-[11px] text-emerald-900 font-semibold block leading-tight">
                Topik: <span className="font-bold">{article.title}</span>
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Uji Pemahaman Syariah Anda
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Jawab kuis evaluasi singkat di bawah ini secara saksama berdasarkan materi yang telah dibaca sebelumnya.
            </p>
          </div>

          {/* Questions list */}
          <div className="space-y-4">
            {article.quiz.map((q, qIdx) => {
              const isSelected = selectedAnswers[qIdx] !== undefined;
              const selectedOption = selectedAnswers[qIdx];

              return (
                <div key={qIdx} className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-xs transition duration-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-xs">
                        {qIdx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Pertanyaan {qIdx + 1} dari {article.quiz.length}
                      </span>
                    </div>
                    {submitted && (
                      <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md ${
                        selectedAnswers[qIdx] === q.correctIndex 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {selectedAnswers[qIdx] === q.correctIndex ? 'Benar (+50 XP)' : 'Kurang Tepat'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs md:text-sm font-bold text-slate-850 leading-snug mb-3.5">
                    {q.question}
                  </p>

                  {/* Options list */}
                  <div className="space-y-2.5">
                    {q.options.map((option, oIdx) => {
                      const isCurrentSelected = selectedOption === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      
                      // Modern option styles
                      let optionStyle = "border-slate-200/80 bg-slate-50/60 text-slate-700 hover:bg-emerald-50/40 hover:border-emerald-300";
                      let radioStyle = "border-slate-300 bg-white";
                      let checkIcon = null;

                      if (submitted) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/20";
                          radioStyle = "border-emerald-600 bg-emerald-600 text-white";
                          checkIcon = <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-auto" />;
                        } else if (isCurrentSelected && !isCorrect) {
                          optionStyle = "bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-1 ring-rose-400/20";
                          radioStyle = "border-rose-500 bg-rose-500 text-white";
                          checkIcon = <XCircle size={16} className="text-rose-600 shrink-0 ml-auto" />;
                        } else {
                          optionStyle = "border-slate-100 bg-slate-50/30 text-slate-400 opacity-60 cursor-not-allowed";
                          radioStyle = "border-slate-200 bg-transparent";
                        }
                      } else {
                        if (isCurrentSelected) {
                          optionStyle = "bg-emerald-50/70 border-emerald-600 text-emerald-950 font-semibold shadow-2xs ring-1 ring-emerald-600/20";
                          radioStyle = "border-emerald-600 bg-emerald-600";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleSelectOption(qIdx, oIdx)}
                          className={`w-full flex items-center p-3.5 rounded-xl text-xs text-left border transition-all duration-200 cursor-pointer ${optionStyle}`}
                        >
                          <span className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center mr-3 shrink-0 transition-colors ${radioStyle}`}>
                            {isCurrentSelected && !submitted && (
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                            )}
                            {submitted && isCorrect && (
                              <span className="w-2 h-2 rounded-full bg-white"></span>
                            )}
                          </span>
                          <span className="flex-1 leading-normal">{option}</span>
                          {checkIcon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation text block */}
                  {submitted && (
                    <div className="mt-3.5 bg-emerald-50/70 border border-emerald-100/90 p-3.5 rounded-xl text-[11px] text-emerald-950 flex items-start space-x-2 leading-relaxed">
                      <AlertCircle size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-emerald-900 block mb-0.5">Penjelasan Fikih & Hukum:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Reward Results block */}
          {!submitted ? (
            <button
              type="button"
              disabled={!answeredAll}
              onClick={handleSubmitQuiz}
              className={`w-full mt-2 py-3.5 px-4 rounded-xl text-xs font-extrabold shadow-xs flex items-center justify-center space-x-2 transition cursor-pointer ${
                answeredAll 
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Periksa Jawaban Kuis</span>
            </button>
          ) : (
            <div className="mt-2 bg-white p-5 rounded-2xl border border-emerald-100 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-700 shadow-2xs">
                {score === article.quiz.length ? <Award size={30} className="text-amber-500 animate-bounce" /> : <Sparkles size={26} className="text-emerald-600" />}
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-1.5">
                  Hasil Evaluasi Belajar
                </span>
                <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Skor: {score} dari {article.quiz.length} Benar
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mt-1.5">
                  {score === article.quiz.length 
                    ? "Masyaallah, luar biasa! Anda sudah memahami pokok materi ini dengan sempurna." 
                    : "Alhamdulillah kuis telah diselesaikan. Silakan baca ulang materi jika ingin memperdalam pemahaman."
                  }
                </p>
              </div>

              <div className="flex flex-col space-y-2 max-w-xs mx-auto pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('article');
                    const mainContainer = document.querySelector('.overflow-y-auto');
                    if (mainContainer) {
                      mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white rounded-xl shadow-xs transition cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>Baca Ulang Materi</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-xl transition cursor-pointer"
                >
                  <RotateCw size={12} />
                  <span>Ulangi Kuis</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom action bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 px-4 py-3.5 flex items-center justify-between z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
          onClick={handleLike}
          className={`flex items-center font-bold text-xs bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 transition duration-200 cursor-pointer ${
            isLiked ? 'text-rose-600 bg-rose-50/50 border-rose-100' : 'text-gray-600 hover:text-rose-500'
          }`}
        >
          <Heart size={16} className={`mr-2 transition ${isLiked ? 'text-rose-600 fill-rose-600' : ''}`} /> 
          <span>{likeCount} Suka</span>
        </button>
        <button 
          onClick={() => {
            if (activeTab === 'quiz') {
              setActiveTab('article');
              setTimeout(() => {
                const comments = document.querySelector('.mt-10');
                if (comments) {
                  comments.scrollIntoView({ behavior: 'smooth' });
                }
              }, 150);
            } else {
              const comments = document.querySelector('.mt-10');
              if (comments) {
                comments.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="flex items-center text-white bg-emerald-800 hover:bg-emerald-950 font-extrabold text-xs px-5 py-2.5 rounded-full flex-1 ml-3.5 justify-center shadow-xs hover:shadow-sm transition cursor-pointer"
        >
          <MessageSquare size={16} className="mr-2" /> Tulis Komentar
        </button>
      </div>
    </div>
  );
}
