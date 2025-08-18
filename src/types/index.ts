// types/index.ts
export interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
  alt: string;
  timestamp: Date;
  category?: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  profileImage?: string;
  verified?: boolean;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}