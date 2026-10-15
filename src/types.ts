export interface AudioTrack {
  id: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
  status: 'In Studio / Demo' | 'Sonic Prototype' | 'Unreleased Archive';
  bpm: number;
  key: string;
  sonicMood: string;
  lyricsExcerpt: string;
  description: string;
  credits: string;
  recordedAt: string;
  externalUrl?: string;
  isPrivateTrack?: boolean;
}

export interface VisualEntry {
  id: string;
  title: string;
  category: 'Fashion Experiments' | 'Studio Journal' | 'Paintings' | 'Moodboards';
  medium: string;
  year: string;
  imageSrc: string;
  altText: string;
  caption: string;
  notes: string;
  dimensions?: string;
}

export interface VideoEntry {
  id: string;
  title: string;
  type: 'Visual Study' | 'Studio Session' | 'Experimental Film';
  duration: string;
  director: string;
  description: string;
  aspectRatio: string;
  previewImage: string;
  synopsis: string;
}

export interface PinterestBoard {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  coverImage?: string;
  curatorNotes: string;
}

export interface NotebookEntry {
  id: string;
  title: string;
  category: 'Lyric Draft' | 'Midnight Fragment' | 'Reflection';
  writtenIn: string;
  stanzas: string[];
  artistReflection: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  status: 'Active' | 'Pending Release' | 'Pre-Save Active';
  note: string;
}
