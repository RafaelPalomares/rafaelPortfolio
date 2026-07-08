export interface DynamicFields {
  person: {
    greeting: string;
    bio: [string, string, string]; // exactly 3 paragraphs
    availableFor: string;
  };
  quote: {
    reason: string;
  };
  hobbies: { description: string }[]; // length: 8
  idols: { reason: string }[]; // length: 6
  favCharacters: { reason: string }[]; // length: 3
  projects: { description: string; tagline: string }[]; // length: 3
  readingList: { note: string }[]; // length: 3
  filmList: { note: string }[]; // length: 3
}
