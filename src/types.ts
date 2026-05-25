export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
  available: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Advertisement {
  id: string;
  title: string;
  image: string;
  videoUrl?: string;
  redirectUrl: string;
  popupTiming: number; // ms
  active: boolean;
  priority: number;
  scheduleStart: string;
  scheduleEnd: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface BrandSettings {
  address: string;
  phone: string;
  bookingPhone: string;
  whatsapp: string;
  businessHours: string;
  facebook: string;
  instagram: string;
  twitter: string;
  logoUrl?: string;
  bannerText: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface CMSData {
  products: Product[];
  categories: Category[];
  advertisements: Advertisement[];
  reviews: Review[];
  gallery: GalleryItem[];
  offers: Offer[];
  seo: SEOSettings;
  settings: BrandSettings;
}

export interface AdminAnalytics {
  totalProducts: number;
  totalCategories: number;
  totalOffers: number;
  totalReviews: number;
  avgRating: string;
  adsCount: number;
  recentReviews: Review[];
  systemInfo: {
    nodeVersion: string;
    databaseType: string;
    environment: string;
    uptimeSeconds: number;
  };
}
