
export interface ArtCard {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  mood: string;
  style?: string;
  medium?: string;
  tags?: string[];
  // Ethical Metrics
  gazeTime?: number; // Total seconds viewed in Examine mode
  archiveCount?: number; // Number of times added to a collection
  citationCount?: number; // Number of times selected by featured curators
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  achievedAt?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  accent: string;
  items: ArtCard[];
  curator?: string;
}

export type ViewState = 'landing' | 'home' | 'upload' | 'library' | 'discovery' | 'explore' | 'milestones' | 'news' | 'gaze' | 'profile' | 'sanctuary';
