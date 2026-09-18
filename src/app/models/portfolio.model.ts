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

export interface Skill {
  name: string;
  /** 1 = beginner, 2 = basic, 3 = intermediate, 4 = advanced, 5 = native/expert */
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Language {
  name: string;
  /** e.g. 'Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic' */
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
  /** 0–100 for the progress bar */
  level: number;
  flag: string;
}

export interface Idol {
  number: string;
  name: string;
  role: string;
  reason: string;
  /** 'historical' | 'sports' */
  category: 'historical' | 'sports';
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
  /** Voice actor (anime/game) or live-action actor */
  voiceActor?: string;
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

export interface ReadingItem {
  isbn: string;
  title: string;
  author: string;
  pages?: number;
  status: 'reading' | 'completed' | 'want-to-read';
  progress?: number;
  note?: string;
  coverUrl?: string;
}

export interface FilmItem {
  /** TMDb poster path or full URL */
  posterUrl: string;
  title: string;
  year: number;
  director: string;
  /** 'watched' | 'watching' | 'want-to-watch' */
  status: 'watched' | 'watching' | 'want-to-watch';
  /** Your rating out of 10 (optional) */
  rating?: number;
  /** Optional short note */
  note?: string;
}

export interface TopSong {
  title: string;
  artist: string;
  /** Spotify embed URL */
  spotifyEmbed: string;
  note?: string;
  /** Local cover image path */
  coverUrl?: string;
}

export interface Artwork {
  title: string;
  artist: string;
  reason: string;
  wikipediaTitle?: string;
  wikimediaFile?: string;
  imageUrl?: string;
}

export interface PortfolioData {
  person: PersonInfo;
  quote: {
    text: string;
    author: string;
    reason: string;
  };
  skills: SkillCategory[];
  languages: Language[];
  idols: Idol[];
  hobbies: Hobby[];
  favCharacters: FavCharacter[];
  projects: Project[];
  readingList: ReadingItem[];
  filmList: FilmItem[];
  artGallery: Artwork[];
  socials: SocialLink[];
}
