import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  /**
   * Returns portfolio data.
   * Swap `of(portfolioData)` with an HttpClient call to load from an API,
   * e.g.: return this.http.get<PortfolioData>('/api/portfolio');
   */
  getData(): Observable<PortfolioData> {
    return of(portfolioData);
  }
}

// ─── Fill in your data below ────────────────────────────────────────────────

const portfolioData: PortfolioData = {
  person: {
    name: 'Rafael Palomares',
    title: 'Apprenticeship as a Software-Developer @ Swisscom',
    greeting: "Hi, I'm Rafael, nice to meet you!",
    bio: [
      "I’m a 17-year-old developer from Switzerland focused on building things that actually mean something—whether that’s a game, a site, or just a side project that started as a random idea. I’ve always appreciated people who lean into their own identity and discipline, and I try to bring that same mindset to my own work: constantly learning and improving without losing my own style." 
      , 
      "For me, coding is as creative as it is technical.  When I’m not at my desk, I’m usually on the volleyball court. Playing as a setter has definitely influenced how I work; it’s taught me how to stay composed and keep the bigger picture in mind, even when things get fast-paced." 
      ,
      "I’m still very much in the middle of the learning process, but that’s the part I enjoy most. My goal is simple: keep building, keep evolving, and create work that leaves a lasting impression."
      ],
    location: 'Bern, Switzerland',
    email: 'rafael.palomares0607@gmail.com',
    availableFor: '',
    avatarInitials: 'RP',
  },

  quote: {
    text: "In order to find your autumn, you have to go through summer.",
    author: '(500) Days of Summer (2009)',
    reason: "This quote resonates with me because it captures something I genuinely believe — that the hard, uncomfortable phases in life aren't obstacles, they're the path. You don't skip summer to get to autumn. You live through it. Whether it's a tough season in volleyball, a project that isn't working yet, or just a period where nothing feels right — it's all part of finding where you're supposed to be.",
  },


  skills: [
  {
    category: 'Programming',
    skills: [
      { name: 'Java', level: 3 },
      { name: 'JavaScript', level: 3 },
      { name: 'TypeScript', level: 3 },
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'PostgreSQL', level: 2 },
      { name: 'SQL', level: 2 },
      { name: 'OOP', level: 3 },
      { name: 'Arduino & Raspberry Pi', level: 2 },
    ],
  },
  {
    category: 'Frontend & Development',
    skills: [
      { name: 'Angular', level: 3 },
      { name: 'SCSS', level: 4 },
      { name: 'UI Design', level: 3 },
      { name: 'Responsive Design', level: 4 },
      { name: 'REST APIs', level: 3 },
      { name: 'Game Development', level: 2 },
      { name: 'Clean Code', level: 3 },
      { name: 'Problem Solving', level: 4 },
      { name: 'Frontend Architecture', level: 3 },
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', level: 2 },
      { name: 'Express.js', level: 2 },
      { name: 'REST API Design', level: 3 },
      { name: 'Database Design', level: 2 },
      { name: 'PostgreSQL Integration', level: 2 },
      { name: 'API Security Basics', level: 2 },
    ],
  },
  {
    category: 'Tools & Workflow',
    skills: [
      { name: 'Git', level: 3 },
      { name: 'GitHub', level: 3 },
      { name: 'VS Code', level: 4},
      { name: 'npm', level: 3 },
      { name: 'Debugging', level: 3 },
      { name: 'Agile Basics', level: 2 },
    ],
  }
],

  languages: [
    { name: 'German',  proficiency: 'Native',       level: 90, flag: '🇩🇪' },
    { name: 'Spanish', proficiency: 'Advanced',        level: 70, flag: '🇪🇸' },
    { name: 'English', proficiency: 'Fluent',        level: 80, flag: '🇬🇧' },
    { name: 'French',  proficiency: 'Basic',         level: 25, flag: '🇫🇷' },
  ],

  hobbies: [
    {
      icon: '🏐',
      name: 'Volleyball',
      description: 'Volleyball is one of the biggest parts of my life. I mainly play as a setter and love the strategic side of the game — controlling the tempo, creating plays, and connecting the whole team together.',
    },
    {
      icon: '💻',
      name: 'Programming',
      description: 'I enjoy building projects, experimenting with ideas, and learning new technologies. Coding feels like creating something from nothing, and I like the challenge of solving problems creatively.',
    },
    {
      icon: '🏋️',
      name: 'Fitness',
      description: 'Going to the gym helps me stay disciplined and improve my athletic performance. I enjoy pushing my limits and becoming stronger both physically and mentally.',
    },
    {
      icon: '🎮',
      name: 'Gaming',
      description: 'Gaming has always been a way for me to relax, compete, and enjoy good stories. I especially enjoy games that require strategy, teamwork, or fast decision-making.',
    },
    {
      icon: '🎵',
      name: 'Music',
      description: 'I listen to almost everything, from 50s jazz to modern trap, but I have a few special favorites that define my vibe—check out the music section for a deeper look into my playlist.',
    },
    {
      icon: '⚽',
      name: 'Football',
      description: 'Football has inspired me for years, especially through players like Cristiano Ronaldo. I enjoy the mentality, passion, and competitive energy that comes with the sport.',
    },
    {
      icon: '🌍',
      name: 'Traveling',
      description: 'I enjoy visiting different places and experiencing new environments, especially spending time in Spain. Traveling helps me clear my mind and gain new perspectives.',
    },
    {
      icon: '📺',
      name: 'Anime & Movies',
      description: 'I enjoy anime because of the deep characters, mindset growth, and strategic thinking behind many stories. It also inspires me in how I see teamwork, ambition, and personal development in both sports and real life.',
    },
  ],

  idols: [
    {
      number: '01',
      name: 'Napoleon Bonaparte',
      role: 'Military Strategist & Emperor',
      category: 'historical',
      reason: 'Napoleon inspires me because of his unmatched strategic mind, confidence, and ability to lead under pressure. Even when the odds were against him, he stayed fearless and always thought several steps ahead of everyone else.',
      imageUrl: 'Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg',
      copyright: '© By Jacques-Louis David - Google Art Project, Public Domain, https://commons.wikimedia.org/w/index.php?curid=38872895',
    },
    {
  number: '02',
  name: 'Sun Tzu',
  role: 'Military Strategist & Author',
  category: 'historical',
  reason: 'Sun Tzu inspires me because of his deep understanding of strategy, timing, and psychology. He teaches that true victory comes from intelligence, preparation, and winning without unnecessary conflict.',
  imageUrl: 'suntzu.jpeg',
  copyright: '© Von Autor/-in unbekannt - Qing Palace Collection Picture Book. Beijing: Palace Museum Press. 1994., Gemeinfrei, https://commons.wikimedia.org/w/index.php?curid=57088337',
},
{
  number: '03',
  name: 'Socrates',
  role: 'Philosopher',
  category: 'historical',
  reason: 'Socrates inspires me because he valued truth, critical thinking, and self-awareness above everything else. His way of questioning everything reminds me to think deeper and never accept things blindly.',
  imageUrl: 'socrates.jpeg',
  copyright: '© Von Copy of Lysippos (?) - Eric Gaba (User:Sting), July 2005., Gemeinfrei, https://commons.wikimedia.org/w/index.php?curid=3569936',
},
    {
      number: '04',
      name: 'Cristiano Ronaldo',
      role: 'Professional Footballer',
      category: 'sports',
      reason: 'Cristiano Ronaldo inspires me because of his insane discipline, mentality, and work ethic. He proved that hard work and dedication can push someone beyond natural talent and turn them into one of the greatest athletes ever.',
      imageUrl: 'cristianoronaldo.jpg',
      copyright: '© by AtilaTheHun from Manchester, England, This file is licensed under the Creative Commons Attribution 2.0 Generic license.',
    },
    {
      number: '05',
      name: 'Simeon Nikolov',
      role: 'Professional Volleyball Player',
      category: 'sports',
      reason: 'Simeon Nikolov inspires me because of his calm confidence, creativity, and high-level volleyball IQ. As a setter, I admire how he controls the game, creates opportunities for his team, and stays composed in important moments.',
      imageUrl: 'simeonnikolov.jpeg',
      copyright: '© Volleybox.net · All rights reserved',
    },
    {
      number: '06',
      name: 'Tyrese Haliburton',
      role: 'Professional Basketball Player',
      category: 'sports',
      reason: 'Tyrese Haliburton inspires me because of his unselfish playstyle, leadership, and confidence. He always looks to make his teammates better, stays calm under pressure, and proves that intelligence and teamwork can be just as valuable as pure athleticism.',
      imageUrl: 'tyresehaliburton.jpeg',
      copyright: '© The New York Times · All rights reserved',
    },
  ],

favCharacters: [
  {
    name: 'Oikawa Tooru',
    media: 'Haikyuu!!',
    mediaType: 'Anime',
    voiceActor: 'Daisuke Namikawa',
    reason: "I’m really inspired by Oikawa’s work ethic. Since he isn’t a 'natural genius,' he has to outwork everyone to stay competitive. As a setter, I relate to that constant push to improve and the challenge of managing the pressure that comes with the position.",
    imageUrl: 'oikawa.webp',
    copyright: '© Haruichi Furudate / Shueisha · Image via haikyuu.fandom.com',
  },
  {
    name: 'Satoru Gojo',
    media: 'Jujutsu Kaisen',
    mediaType: 'Anime',
    voiceActor: 'Yuichi Nakamura',
    reason: "I admire Gojo’s ability to stay composed. Even when things get intense, he keeps a relaxed perspective and doesn’t let the weight of his responsibilities get to him. It’s a level of calm that I try to bring into my own high-pressure moments.",
    imageUrl: 'satorugojo.jpeg',
    copyright: '© Gege Akutami / Shueisha · Image via Steam',
  },

  {
    name: 'Marty McFly',
    media: 'Back to the Future',
    mediaType: 'Movie',
    voiceActor: 'Michael J. Fox',
    reason: "Marty resonates with me because of his courage under pressure and his loyalty. He gets thrown into impossible situations and still finds a way through — not because he's the smartest in the room, but because he doesn't give up.",
    imageUrl: 'martymcfly.webp',
    copyright: '© Universal Pictures / Amblin Entertainment · Image via Fandom',
  },
  {
    name: 'Tom Hansen',
    media: '(500) Days of Summer',
    mediaType: 'Movie',
    voiceActor: 'Joseph Gordon-Levitt',
    reason: "Tom is a great reminder that we don't always have everything figured out. His story resonates with me because it shows how important it is to be honest with yourself and to learn from your own mistakes and misunderstandings.",
    imageUrl: 'tom.jpg',
    copyright: '© Fox Searchlight Pictures (2009) · Image via Pinterest',
  },
  {
    name: 'Jax',
    media: 'The Amazing Digital Circus',
    mediaType: 'Series',
    voiceActor: 'Alex Rochon',
    reason: "Jax is interesting because he’s completely unpredictable. I like that he doesn't just follow the script; he’s a reminder to keep things lighthearted and to value a bit of individuality in a world that often feels too structured.",
    imageUrl: 'jax.webp',
    copyright: '© Gooseworx / GLITCH Productions · Image via Reddit',
  },
  {
    name: 'Bill Cipher',
    media: 'Gravity Falls',
    mediaType: 'Series',
    voiceActor: 'Alex Hirsch',
    reason: "I’m fascinated by the strategic way Bill thinks. While he’s an extreme character, his intelligence and the way he approaches complex problems from outside the box are really interesting from an analytical standpoint.",
    imageUrl: 'billcipher.webp',
    copyright: '© Alex Hirsch / Disney Television Animation · Image via Wikimedia',
  },
],

  musicIdols: [
  {
    name: 'Elvis Presley',
    genre: 'Rock and Roll',
    reason: 'Elvis Presley means something to me because he basically shaped modern music. His stage presence, voice, and energy made him a legend who changed how performers express themselves.',
    imageUrl: 'elvis.jpg',
    copyright: '© Elvis Presley Enterprises / RCA Records · Image via YouTube Music',
    featuredSong: {
      title: 'The Wonder of You',
      audioUrl: 'https://open.spotify.com/embed/track/0LfJkvPNCNEMLpZJgDQiV1?utm_source=generator',
      type: 'embed',
    },
  },
  {
    name: 'Frank Sinatra',
    genre: 'Jazz / Traditional Pop',
    reason: 'Frank Sinatra means something to me because of his timeless voice, confidence, and smooth control. He represents elegance, discipline, and performing under pressure with total calm.',
    imageUrl: 'franksinatra.jpg',
    copyright: '© Frank Sinatra Enterprises / Reprise Records · Image via YouTube Music',
    featuredSong: {
      title: 'Something Stupid',
      audioUrl: 'https://open.spotify.com/embed/track/4feXcsElKIVsGwkbnTHAfV?utm_source=generator',
      type: 'embed',
    },
  },
  {
    name: 'Queen',
    genre: 'Rock',
    reason: 'Queen means something to me because of their creativity, versatility, and powerful performances. They showed how music can be dramatic, emotional, and unforgettable at the same time.',
    imageUrl: 'queen.jpg',
    copyright: '© Queen Productions / Hollywood Records · Image via YouTube Music',
    featuredSong: {
      title: 'Bohemian Rhapsody',
      audioUrl: 'https://open.spotify.com/embed/track/3z8h0TU7ReDPLIbEnYhWZb?utm_source=generator',
      type: 'embed',
    },
  },
  {
    name: 'The Smiths',
    genre: 'Indie Rock',
    reason: 'The Smiths mean something to me because of their emotional depth and raw honesty. Their music captures feelings in a very real, unfiltered way that hits differently.',
    imageUrl: 'thesmiths.jpg',
    copyright: '© The Smiths / Rough Trade Records · Image via YouTube Music',
    featuredSong: {
      title: 'There Is a Light That Never Goes Out',
      audioUrl: 'https://open.spotify.com/embed/track/0WQiDwKJclirSYG9v5tayI?utm_source=generator',
      type: 'embed',
    },
  },
  {
    name: 'Sabrina Carpenter',
    genre: 'Pop',
    reason: 'Sabrina Carpenter means something to me because of her modern pop sound, confidence, and personality in her music. She combines catchy production with strong storytelling.',
    imageUrl: 'sabrinacarpenter.jpg',
    copyright: '© Sabrina Carpenter / Island Records · Image via YouTube Music',
    featuredSong: {
      title: 'Espresso',
      audioUrl: 'https://open.spotify.com/embed/track/2qSkIjg1o9h3YT9RAgYN75?utm_source=generator',
      type: 'embed',
    },
  },
  {
    name: 'Laufey',
    genre: 'Jazz Pop / Indie',
    reason: 'Laufey means something to me because she blends old jazz vibes with modern emotion. Her music feels soft, artistic, and deeply expressive in a unique way.',
    imageUrl: 'Laufey.jpg',
    copyright: '© Laufey / AWAL · Image via YouTube Music',
    featuredSong: {
      title: 'From the Start',
      audioUrl: 'https://open.spotify.com/embed/track/43iIQbw5hx986dUEZbr3eN?utm_source=generator',
      type: 'embed',
    },
  },
  ],

  projects: [
    {
  number: '01',
  name: 'This Portfolio',
  tagline: 'The site you\'re looking at right now.',
  description: 'A personal portfolio built with Angular 21, designed from scratch with a dark aesthetic, smooth scroll navigation, and modular components. Every section reflects something real about me.',
  stack: ['Angular', 'TypeScript', 'SCSS'],
  status: 'live',
  liveUrl: 'https://rafael-portfolio-delta.vercel.app/',
  repoUrl: 'https://github.com/RafaelPalomares/rafaelPortfolio',
},
{
  number: '02',
  name: 'Unity Game',
  tagline: 'My own Videogame',
  description: 'Not gonna lie, im just in the planning right now.',
  stack: ['Unity'],
  status: 'wip',
  repoUrl: 'https://github.com/RafaelPalomares/Unitygame',
},
{
  number: '03',
  name: 'VolleyStats Tracker',
  tagline: 'A simple tool to track volleyball performance and progress.',
  description: 'A personal project built to track volleyball training data, match stats and player performance over time. Focused on setters and team coordination metrics, helping visualize improvement and consistency.',
  stack: ['JavaScript', 'HTML', 'CSS'],
  status: 'wip',
  repoUrl: '',
},
  ],

  readingList: [
    { isbn: '9781501142970', status: 'completed', note: 'Stephen King at his best. Pure horror.' },
    { isbn: '9781501156700', status: 'completed', note: 'Peak' },
    { isbn: '9780140439199', status: 'completed', note: 'Pure strategy and timeless wisdom.' },
    { isbn: '9780312551513', status: 'completed', note: 'Time travel done right.' },
    { isbn: '9780805092660', status: 'completed', note: 'The trilogy keeps getting better.' },
    { isbn: '9780805092677', status: 'completed', note: 'Perfect ending to the trilogy.' },
    { isbn: '9780747532699', status: 'completed', note: 'Where it all began.' },
    { isbn: '9780747538486', status: 'completed', note: 'The Chamber of Secrets has been opened.' },
    { isbn: '9780747542155', status: 'completed', note: 'Time-turners and Sirius Black.' },
    { isbn: '9780747546245', status: 'completed', note: 'The tournament that changed everything.' },
    { isbn: '9780747551003', status: 'completed', note: 'The darkest book in the series.' },
    { isbn: '9780747581086', status: 'completed', note: 'The Half-Blood Prince reveals all.' },
    { isbn: '9780747591054', status: 'completed', note: 'The end. Masterpiece.' },
    { isbn: '9781101871805', status: 'completed', note: 'A perspective everyone needs to read.' },
    { isbn: '9783499252723', status: 'completed', note: 'Honest and real.' },
    { isbn: '9781474600842', status: 'completed', note: 'Strategy, obsession, and brilliance.' },
  { isbn: '9780062315007', status: 'want-to-read', note: 'A gripping dystopian masterpiece about control and individuality.' },
  { isbn: '9780451524935', status: 'want-to-read', note: 'The ultimate cautionary tale about surveillance and totalitarianism.' },
  { isbn: '9780743273565', status: 'want-to-read', note: 'A dazzling critique of the Jazz Age, wealth, and obsession.' },
  { isbn: '9780061120084', status: 'want-to-read', note: 'A beautiful, allegorical journey about following your dreams.' },
  { isbn: '9780446310789', status: 'want-to-read', note: 'A timeless and powerful story about justice, race, and growing up.' },
  { isbn: '9780345391803', status: 'want-to-read', note: 'Pure brilliant absurdity, philosophy, and space travel.' },
  { isbn: '9783426562659', status: 'want-to-read', note: 'Very intereisting looking book' },
    
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],
};




































































































