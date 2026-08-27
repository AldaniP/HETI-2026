export type ScreenRoute = 
  | 'login' 
  | 'register' 
  | 'home' 
  | 'catalog' 
  | 'history' 
  | 'history_detail'
  | 'edu_hub' 
  | 'edu_detail' 
  | 'edu_video'
  | 'news'
  | 'news_detail'
  | 'wakaf_detail' 
  | 'payment' 
  | 'profile'
  | 'nazhir'
  | 'document'
  | 'payment_success'
  | 'notification'
  | 'notification_detail'
  | 'setting'
  | 'edit_profile'
  | 'security'
  | 'help_center'
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

export interface NewsItem {
  id: string;
  title: string;
  category: 'Kabar Wakaf' | 'Penyaluran' | 'Regulasi BWI' | 'Inspirasi Umat' | 'Ekonomi Syariah';
  date: string;
  readTime: string;
  author: string;
  imageUrl: string;
  summary: string;
  paragraphs: string[];
  location?: string;
  featured?: boolean;
}

export interface HistoryItem {
  id: string;
  campaignTitle: string;
  category?: string;
  nazhir?: string;
  date: string;
  amount: number;
  status: 'Proses' | 'Berhasil' | 'Gagal';
  paymentMethod?: string;
  wakifName?: string;
  wakifEmail?: string;
  wakifPhone?: string;
  intendedFor?: string;
  prayer?: string;
  refNumber?: string;
  vaNumber?: string;
  fee?: number;
  imageUrl?: string;
  akadType?: string;
  notes?: string;
}

export interface NotificationItem {
  id: number;
  type: 'transaction' | 'update' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  fullContent?: {
    date: string;
    subtitle?: string;
    description: string;
    highlights?: Array<{ label: string; value: string }>;
    image?: string;
    actionLabel?: string;
    actionRoute?: ScreenRoute;
    badge?: string;
  };
}
