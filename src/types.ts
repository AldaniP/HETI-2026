export type ScreenRoute = 
  | 'login' 
  | 'register' 
  | 'home' 
  | 'catalog' 
  | 'history' 
  | 'edu_hub' 
  | 'edu_detail' 
  | 'wakaf_detail' 
  | 'payment' 
  | 'profile'
  | 'nazhir'
  | 'document'
  | 'payment_success'
  | 'notification'
  | 'setting'
  | 'ai_chat'
  | 'qurban'
  | 'zakat'
  | 'infaq'
  | 'points';

export interface Campaign {
  id: string;
  title: string;
  nazhir: string;
  description: string;
  target: number;
  collected: number;
  daysLeft: number;
  imageUrl: string;
  category: string;
}

export interface EducationArticle {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  content?: string;
}

export interface HistoryItem {
  id: string;
  campaignTitle: string;
  date: string;
  amount: number;
  status: 'Proses' | 'Berhasil' | 'Gagal';
}
