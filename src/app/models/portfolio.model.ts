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

export interface VolleyballPlayer {
  name: string;
  position: string;
  team: string;
  nationality: string;
  flag: string;
  /** Short highlight reel of what makes this player special */
  highlights: string[];
  /** Why Rafael looks up to this player */
  reason: string;
  imageUrl?: string;
  /** Copyright notice shown below the image, e.g. "© Source / License" */
  copyright?: string;
  /** Optional path to a locally hosted highlight clip for this player, e.g. "player.mp4" */
  videoUrl?: string;
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

export interface FavAnimal {
  name: string;
  /** Emoji shown as the visual marker, e.g. '🐙' */
  icon: string;
  /** Short tagline shown under the name */
  tagline: string;
  /** One or more paragraphs explaining why this animal resonates */
  reason: string[];
  /** Short standout facts about the animal */
  traits: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

/**
 * A single paragraph of legal copy. Supports an optional emphasised variant
 * (rendered in italics) for translated/secondary notices.
 */
export interface LegalParagraph {
  text: string;
  /** When true, the paragraph is rendered emphasised (e.g. the English notice) */
  emphasised?: boolean;
}

/**
 * A generic legal content block with an optional subheading and paragraphs.
 */
export interface LegalBlock {
  /** Optional subheading (rendered as an h3) */
  heading?: string;
  paragraphs: LegalParagraph[];
}

/**
 * Structured legal content for the legal/privacy page. All copy lives here so
 * the template renders purely from data and nothing is hard-coded in HTML.
 */
export interface LegalContent {
  pageTitle: string;
  pageSubtitle: string;
  backLinkLabel: string;

  /** Impressum section */
  impressum: {
    heading: string;
    intro: string;
    notice: string;
  };

  /** Copyright (Urheberrecht) section */
  copyright: {
    heading: string;
    disclaimer: LegalParagraph[];
    intro: string;
    idolsHeading: string;
    volleyballHeading: string;
    volleyballUsageNote: string;
    videosHeading: string;
    videosIntro: string;
    videosOutro: string;
    charactersHeading: string;
    characterUsageNote: string;
    favAnimalHeading: string;
    favAnimalNoteBefore: string;
    favAnimalNoteAfter: string;
    quoteHeading: string;
    quoteNoteBefore: string;
    quoteNoteAfter: string;
  };

  /** Privacy (Datenschutz) section */
  privacy: {
    heading: string;
    lawRef: string;
    blocks: LegalBlock[];
  };

  /** Liability (Haftungsausschluss) section */
  liability: {
    heading: string;
    paragraphsBefore: string[];
    contactNoteBefore: string;
    contactNoteAfter: string;
  };

  /** Footer line (law references etc.) */
  footerLawRefs: string;
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
    reason: string;
  };
  skills: SkillCategory[];
  languages: Language[];
  idols: Idol[];
  hobbies: Hobby[];
  favCharacters: FavCharacter[];
  favAnimal: FavAnimal;
  projects: Project[];
  volleyballPlayers: VolleyballPlayer[];
  socials: SocialLink[];
  legal: LegalContent;
}
