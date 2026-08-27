import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User, RefreshCw, ShieldCheck, HandHeart } from 'lucide-react';
import { ScreenRoute } from '../types';

interface Props {
  navigate: (route: ScreenRoute) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export function AIChatScreen({ navigate }: Props) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Saya **Konsultan AI Wakaf Amwal**.\n\nSaya siap membantu Anda memahami seluk-beluk **Wakaf Uang**, **Wakaf Produktif**, rukun akad wakaf, perhitungan simulasi jariyah, maupun rekomendasi program wakaf amanah. Ada yang ingin Anda tanyakan seputar wakaf?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    "Apa hukum wakaf uang menurut Fatwa MUI?",
    "Bagaimana dana wakaf produktif dikelola?",
    "Apa perbedaan wakaf dengan sedekah biasa?",
    "Bagaimana cara memastikan Nazhir terpercaya?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customPrompt) setInputText('');
    setIsLoading(true);

    try {
      // Send message history to wakaf-chat server
      const payload = newMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/gemini/wakaf-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload })
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi server AI');
      }

      const data = await res.json();
      const aiReply = data.reply || "Mohon maaf, saat ini asisten AI sedang mengalami kendala. Silakan coba kembali sesaat lagi.";

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Error fetching AI wakaf response:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: "Mohon maaf, terjadi kendala saat memproses pertanyaan wakaf Anda. Mohon periksa koneksi atau coba pertanyaan lainnya.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let clean = line.trim();
      if (!clean) return <div key={index} className="h-1.5" />;

      const isBullet = clean.startsWith('- ') || clean.startsWith('* ');
      if (isBullet) {
        clean = clean.substring(2);
      }

      // Handle bold
      const parts = clean.split(/\*\*([\s\S]*?)\*\*/g);
      const formatted = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-bold text-gray-900">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={index} className="ml-4 list-disc text-xs text-gray-750 leading-relaxed mb-1">
            {formatted}
          </li>
        );
      }

      return (
        <p key={index} className="text-xs text-gray-800 leading-relaxed mb-1.5">
          {formatted}
        </p>
      );
    });
  };

  return (
    <div className="flex-1 bg-slate-50/60 flex flex-col h-full relative font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100 shadow-xs">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('catalog')} 
            className="text-slate-600 hover:text-emerald-800 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Sparkles size={18} className="text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="font-extrabold text-sm text-slate-900 tracking-tight">Konsultan AI Wakaf</h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold text-[9px] px-2 py-0.5 rounded-full">
                  BWI Verified
                </span>
              </div>
              <p className="text-[10.5px] text-emerald-700 font-medium flex items-center mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1.5 animate-pulse"></span>
                Online • Asisten Syariah Wakaf
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setMessages([
              {
                id: 'welcome-reset',
                role: 'assistant',
                content: "Percakapan telah direset. Silakan tanyakan hal seputar wakaf uang, wakaf produktif, atau rekomendasi program wakaf.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          title="Mulai Ulang Percakapan"
          className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Info Banner */}
        <div className="bg-emerald-50/70 border border-emerald-100/80 rounded-2xl p-3.5 text-emerald-950 text-xs flex items-start space-x-3 shadow-xs">
          <div className="w-7 h-7 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <HandHeart size={16} />
          </div>
          <p className="leading-relaxed text-[11px] text-emerald-900 pt-0.5">
            Konsultan AI siap menjawab fiqih wakaf, akad ikrar wakaf uang, dan transparansi penyaluran dana sesuai regulasi Badan Wakaf Indonesia (BWI).
          </p>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mr-2 mt-1 shrink-0 border border-emerald-100 shadow-2xs">
                <Sparkles size={14} />
              </div>
            )}
            
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-xs ${
              msg.role === 'user' 
                ? 'bg-emerald-700 text-white rounded-tr-xs shadow-emerald-700/10' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-xs'
            }`}>
              {msg.role === 'user' ? (
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="space-y-1.5">
                  {renderMarkdown(msg.content)}
                </div>
              )}
              <p className={`text-[9.5px] mt-2 font-medium ${msg.role === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mr-2 mt-1 shrink-0 border border-emerald-100 shadow-2xs">
              <Sparkles size={14} />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              <span className="text-[11px] text-slate-500 font-medium pl-1">Konsultan AI sedang menelaah dalil wakaf...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="bg-white border-t border-slate-100 px-4 py-2.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pertanyaan Populer Seputar Wakaf:</p>
        <div className="flex overflow-x-auto space-x-2 pb-1 hide-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-emerald-50 px-3.5 py-1.5 rounded-full border border-slate-200/70 hover:border-emerald-300 whitespace-nowrap transition cursor-pointer disabled:opacity-50 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-slate-100 p-3 sticky bottom-0 z-20">
        <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl px-3.5 py-1.5 border border-slate-200/80 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-emerald-500/20 transition shadow-2xs">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Tanyakan fatwa wakaf uang, nazhir, rukun akad..." 
            className="flex-1 bg-transparent text-xs outline-none text-slate-800 placeholder:text-slate-400 py-1.5"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="w-8.5 h-8.5 bg-emerald-700 text-white rounded-xl flex items-center justify-center hover:bg-emerald-800 transition disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shrink-0 shadow-xs cursor-pointer"
          >
            <Send size={14} className={inputText.trim() ? 'ml-0.5' : ''}/>
          </button>
        </div>
      </div>
    </div>
  );
}
