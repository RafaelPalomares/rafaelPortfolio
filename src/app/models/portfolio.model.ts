export interface PersonInfo {
  name: string;
  title: string;
  greeting: string;
  bio: string[];
  location: string;
  email: string;
  availableFor: string;
  avatarInitials: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Idol {
  number: string;
  name: string;
  role: string;
  reason: string;
  /** Optional: URL to an open-source/public domain image (e.g. Wikimedia Commons) */
  imageUrl?: string;
  /** Copyright notice shown below the image, e.g. "© Author / License" */
  copyright?: string;
}

export interface Hobby {
  icon: string;
  name: string;
  description: string;
}

export interface FavCharacter {
  name: string;
  media: string;
  mediaType: 'Anime' | 'Movie' | 'Series' | 'Game' | 'Book' | 'Manga' | string;
  reason: string;
  imageUrl?: string;
  /** Copyright notice shown below the image, e.g. "© Studio / Author" */
  copyright?: string;
}

export interface MusicIdol {
  name: string;
  genre: string;
  reason: string;
  imageUrl?: string;
  copyright?: string;
  /** Featured song to show a snippet for */
  featuredSong?: {
    title: string;
    /** Direct URL to an audio file (.mp3 / .ogg) OR a SoundCloud/YouTube embed src */
    audioUrl: string;
    /** 'audio' = native <audio> player, 'embed' = iframe (SoundCloud, YouTube, Spotify) */
    type: 'audio' | 'embed';
  };
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Project {
  /** Short number label, e.g. "01" */
  number: string;
  name: string;
  /** One-liner shown on the card */
  tagline: string;
  description: string;
  /** Tech stack badges */
  stack: string[];
  /** 'live' | 'wip' | 'archived' */
  status: 'live' | 'wip' | 'archived';
  /** Optional link to live site */
  liveUrl?: string;
  /** Optional link to source code */
  repoUrl?: string;
  /** Optional cover image URL */
  imageUrl?: string;
}

export interface PortfolioData {
  person: PersonInfo;
  quote: {
    text: string;
    author: string;
    /** Why this quote resonates with you — shown on the back of the flip card */
    reason: string;
  };
  skills: SkillCategory[];
  idols: Idol[];
  hobbies: Hobby[];
  favCharacters: FavCharacter[];
  musicIdols: MusicIdol[];
  projects: Project[];
  socials: SocialLink[];
}
