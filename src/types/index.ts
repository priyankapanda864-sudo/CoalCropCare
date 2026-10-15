export type Language = 'en' | 'hi' | 'or';

export interface FieldObservation {
  id: string;
  farmerName: string;
  village: string;
  crop: string;
  date: string;
  fieldLocation: string;
  distanceFromMine: string; // e.g., '< 500m', '500m - 1km', '1km - 3km', '> 3km'
  leafCondition: string;
  soilCondition: string;
  waterCondition: string;
  additionalNotes: string;
  createdAt: number;
}

export interface KnowledgeItem {
  id: string;
  category: 'coal' | 'soil' | 'water' | 'crops' | 'sustainability' | 'monitoring';
  title: string;
  simpleExplanation: string;
  whyItMatters: string;
  whatFarmersCanObserve: string;
  scientificContext?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface CropGuideItem {
  name: string;
  scientificName: string;
  category: 'cereal' | 'vegetable' | 'pulse' | 'oilseed';
  leafTexture: string;
  typicalSeason: string;
  vulnerabilityFactors: string[];
  keyObservationPoints: string[];
}

export interface UserProfile {
  name: string;
  grade: string;
  school: string;
  role: string;
  guideTeacher: string;
  bio: string;
  photoUrl: string | null;
}
