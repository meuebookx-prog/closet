export type StyleProfile = {
  lifestyle: string;
  routine: string;
  profession: string;
  preferences: string[];
  difficulties: string[];
  goals: string[];
};

export type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';

export type ClothingItem = {
  id: string;
  imageUrl: string;
  category: ClothingCategory;
  color?: string;
  style?: string;
};

export type Look = {
  id: string;
  items: ClothingItem[];
  occasion: 'work' | 'casual' | 'date' | 'travel' | 'event' | 'weekend';
  explanation: string;
  benefits: string[];
  isFavorite?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  bodyImageUrl?: string;
  styleProfile?: StyleProfile;
  closet: ClothingItem[];
  isPremium: boolean;
};
