export interface Script {
  id: string;
  title: string;
  description: string;
  price: number;
  game: string;
  tags: string[];
  features: string[];
  authorId: string;
  authorName: string;
  thumbnailUrl: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  purchaseCount: number;
  rating: number;
  reviewCount: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  balance: number;
  purchasedScriptIds: string[];
  role: 'user' | 'vendor' | 'admin';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  scriptId: string;
  rating: number;
  comment: string;
  timestamp: string;
}
