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

export interface SocialLink {
  label: string;
  url: string;
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
  socials: SocialLink[];
}
