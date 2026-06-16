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
    { isbn: '9780062315007', status: 'want-to-read', note: 'A gripping dystopian masterpiece about control and individuality.' },
    { isbn: '9780451524935', status: 'want-to-read', note: 'The ultimate cautionary tale about surveillance and totalitarianism.' },
    { isbn: '9780743273565', status: 'want-to-read', note: 'A dazzling critique of the Jazz Age, wealth, and obsession.' },
    { isbn: '9780061120084', status: 'want-to-read', note: 'A beautiful, allegorical journey about following your dreams.' },
    { isbn: '9780345391803', status: 'want-to-read', note: 'Pure brilliant absurdity, philosophy, and space travel.' },
    { isbn: '9781474600842', status: 'completed', note: 'Strategy, obsession, and brilliance.' },
    
  ],

  filmList: [
    // ─── 10/10 (5 stars) ─────────────────────────────────────────────────
    { title: '(500) Days of Summer', year: 2009, director: 'Marc Webb', posterUrl: 'https://image.tmdb.org/t/p/w300/f9mbM0YMLpYemcWx6o2WeiYQLDP.jpg', status: 'watched', rating: 10, note: 'My favourite film ever.' },
    { title: '10 Things I Hate About You', year: 1999, director: 'Gil Junger', posterUrl: 'https://image.tmdb.org/t/p/w300/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg', status: 'watched', rating: 10 },
    { title: 'Back to the Future', year: 1985, director: 'Robert Zemeckis', posterUrl: 'https://image.tmdb.org/t/p/w300/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg', status: 'watched', rating: 10, note: 'Timeless. Literally.' },
    { title: 'The Perks of Being a Wallflower', year: 2012, director: 'Stephen Chbosky', posterUrl: 'https://image.tmdb.org/t/p/w300/aKBilTMkBRCNwMU7UwgunpzRsmN.jpg', status: 'watched', rating: 10 },
    { title: 'It', year: 2017, director: 'Andy Muschietti', posterUrl: 'https://image.tmdb.org/t/p/w300/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg', status: 'watched', rating: 10, note: 'Stephen King on screen at his finest.' },
    { title: 'A Nonsense Christmas with Sabrina Carpenter', year: 2024, director: 'Sam Wrench', posterUrl: 'https://image.tmdb.org/t/p/w300/tXwHMIOwkuaKj0OBVwQZPJKuKiP.jpg', status: 'watched', rating: 10 },
    { title: 'The Muppet Show', year: 2026, director: '', posterUrl: 'https://image.tmdb.org/t/p/w300/zT0pXdxtSMILbyjCnMlJkn2XKRY.jpg', status: 'watched', rating: 10 },
    { title: 'EuroTrip', year: 2004, director: 'Jeff Schaffer', posterUrl: 'https://image.tmdb.org/t/p/w300/aL2jYNOxYRWs0kBqbJIRqpRkCN5.jpg', status: 'watched', rating: 10 },
    { title: 'The Quintessential Quintuplets Movie', year: 2022, director: 'Masato Jinbo', posterUrl: 'https://image.tmdb.org/t/p/w300/sg4xJGSJlSuHTuG0HERHhB9fXkZ.jpg', status: 'watched', rating: 10 },
    { title: 'Inglourious Basterds', year: 2009, director: 'Quentin Tarantino', posterUrl: 'https://image.tmdb.org/t/p/w300/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg', status: 'watched', rating: 10, note: 'Christoph Waltz is unreal.' },

    // ─── 8/10 (4 stars) ──────────────────────────────────────────────────
    { title: 'Interstellar', year: 2014, director: 'Christopher Nolan', posterUrl: 'https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', status: 'watched', rating: 8, note: 'The docking scene is insane.' },
    { title: 'Fight Club', year: 1999, director: 'David Fincher', posterUrl: 'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', status: 'watched', rating: 8 },
    { title: 'The Truman Show', year: 1998, director: 'Peter Weir', posterUrl: 'https://image.tmdb.org/t/p/w300/vuza0WqY239yBXOadKlGwJsZJFE.jpg', status: 'watched', rating: 8 },
    { title: 'Oppenheimer', year: 2023, director: 'Christopher Nolan', posterUrl: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', status: 'watched', rating: 8 },
    { title: 'Inception', year: 2010, director: 'Christopher Nolan', posterUrl: 'https://image.tmdb.org/t/p/w300/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg', status: 'watched', rating: 8 },
    { title: 'Kill Bill: Vol. 1', year: 2003, director: 'Quentin Tarantino', posterUrl: 'https://image.tmdb.org/t/p/w300/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg', status: 'watched', rating: 8 },
    { title: 'How to Lose a Guy in 10 Days', year: 2003, director: 'Donald Petrie', posterUrl: 'https://image.tmdb.org/t/p/w300/aFiHyGJMWJMdzN6fKsmzFJmMkna.jpg', status: 'watched', rating: 8 },
    { title: 'Ratatouille', year: 2007, director: 'Brad Bird', posterUrl: 'https://image.tmdb.org/t/p/w300/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg', status: 'watched', rating: 8 },
    { title: '13 Going on 30', year: 2004, director: 'Gary Winick', posterUrl: 'https://image.tmdb.org/t/p/w300/fYvGFls2MgDnfpmZHuJiEk8IbPi.jpg', status: 'watched', rating: 8 },
    { title: 'Glass Onion', year: 2022, director: 'Rian Johnson', posterUrl: 'https://image.tmdb.org/t/p/w300/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg', status: 'watched', rating: 8 },
    { title: 'Mean Girls', year: 2004, director: 'Mark Waters', posterUrl: 'https://image.tmdb.org/t/p/w300/fXm3YKXAEjx7d2tIlqzEcaPirhm.jpg', status: 'watched', rating: 8 },
    { title: "The Queen's Gambit", year: 2020, director: 'Scott Frank', posterUrl: 'https://image.tmdb.org/t/p/w300/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg', status: 'watched', rating: 8 },
    { title: 'Stranger Things 5', year: 2025, director: 'The Duffer Brothers', posterUrl: 'https://image.tmdb.org/t/p/w300/uOIL0hEAYBLqZwMKNylhtrGOkWa.jpg', status: 'watched', rating: 8 },
    { title: 'Superbad', year: 2007, director: 'Greg Mottola', posterUrl: 'https://image.tmdb.org/t/p/w300/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', status: 'watched', rating: 8 },

    // ─── 6/10 (3 stars) ──────────────────────────────────────────────────
    { title: 'Spider-Man: Into the Spider-Verse', year: 2018, director: 'Peter Ramsey', posterUrl: 'https://image.tmdb.org/t/p/w300/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', status: 'watched', rating: 6 },
    { title: 'Forrest Gump', year: 1994, director: 'Robert Zemeckis', posterUrl: 'https://image.tmdb.org/t/p/w300/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', status: 'watched', rating: 6 },
    { title: 'Kill Bill: Vol. 2', year: 2004, director: 'Quentin Tarantino', posterUrl: 'https://image.tmdb.org/t/p/w300/2yhg0mZQMhDyvUQ4rG1IiMFOFHR.jpg', status: 'watched', rating: 6 },
    { title: 'The Wolf of Wall Street', year: 2013, director: 'Martin Scorsese', posterUrl: 'https://image.tmdb.org/t/p/w300/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg', status: 'watched', rating: 6 },
    { title: 'Avatar: The Way of Water', year: 2022, director: 'James Cameron', posterUrl: 'https://image.tmdb.org/t/p/w300/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', status: 'watched', rating: 6 },
    { title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', posterUrl: 'https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911Ma1zuJFRT4UY.jpg', status: 'watched', rating: 6 },
    { title: 'KPop Demon Hunters', year: 2025, director: '', posterUrl: 'https://image.tmdb.org/t/p/w300/eVSEPTVvDBYi1OElSPnCl1sRcjR.jpg', status: 'watched', rating: 6 },

    // ─── 5/10 (2.5 stars) ────────────────────────────────────────────────
    { title: 'The Fantastic 4: First Steps', year: 2025, director: 'Matt Shakman', posterUrl: 'https://image.tmdb.org/t/p/w300/4Zhg0IjSEcAYU7JyqAnBLrkazXc.jpg', status: 'watched', rating: 5 },

    // ─── 4/10 (2 stars) ──────────────────────────────────────────────────
    { title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', posterUrl: 'https://image.tmdb.org/t/p/w300/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', status: 'watched', rating: 4 },
    { title: "Five Nights at Freddy's 2", year: 2025, director: 'Emma Tammi', posterUrl: 'https://image.tmdb.org/t/p/w300/rSBA3YWKdrOiRCr5tGLXaJYkxyE.jpg', status: 'watched', rating: 4 },
    { title: "Five Nights at Freddy's", year: 2023, director: 'Emma Tammi', posterUrl: 'https://image.tmdb.org/t/p/w300/j1iRoKPoXyRniNvKJlpMhq0iYpz.jpg', status: 'watched', rating: 4 },
    { title: 'Zootopia', year: 2016, director: 'Byron Howard', posterUrl: 'https://image.tmdb.org/t/p/w300/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg', status: 'watched', rating: 4 },
    { title: 'Barbie', year: 2023, director: 'Greta Gerwig', posterUrl: 'https://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', status: 'watched', rating: 4 },
    { title: 'Harry Potter and the Order of the Phoenix', year: 2007, director: 'David Yates', posterUrl: 'https://image.tmdb.org/t/p/w300/7YzFzjMsNWmI6yYvE4pLbRqljdN.jpg', status: 'watched', rating: 4 },

    // ─── 2/10 (1 star) ───────────────────────────────────────────────────
    { title: 'Coraline', year: 2009, director: 'Henry Selick', posterUrl: 'https://image.tmdb.org/t/p/w300/4jeFJGVClBiGGOh0NRmbRmHAfEP.jpg', status: 'watched', rating: 2 },
    { title: 'Avatar', year: 2009, director: 'James Cameron', posterUrl: 'https://image.tmdb.org/t/p/w300/kyeqWdyUXW608qlYkRqosgbbJyK.jpg', status: 'watched', rating: 2 },

    // ─── Watchlist ────────────────────────────────────────────────────────
    { title: 'La La Land', year: 2016, director: 'Damien Chazelle', posterUrl: 'https://image.tmdb.org/t/p/w300/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', status: 'want-to-watch' },
    { title: 'Dead Poets Society', year: 1989, director: 'Peter Weir', posterUrl: 'https://image.tmdb.org/t/p/w300/fia1GRjSEF8lhIOWNMUvCKiEbJf.jpg', status: 'want-to-watch' },
    { title: 'Once Upon a Time... in Hollywood', year: 2019, director: 'Quentin Tarantino', posterUrl: 'https://image.tmdb.org/t/p/w300/8j58iEBw9pOXFV2HjF8V28WfFpY.jpg', status: 'want-to-watch' },
    { title: 'Good Will Hunting', year: 1997, director: 'Gus Van Sant', posterUrl: 'https://image.tmdb.org/t/p/w300/bABCBKYBK7A5G1x0FzmtQKnnq7p.jpg', status: 'want-to-watch' },
    { title: 'Whiplash', year: 2014, director: 'Damien Chazelle', posterUrl: 'https://image.tmdb.org/t/p/w300/7fn624j544zkMfhOkMFyPIvdXlE.jpg', status: 'want-to-watch' },
    { title: 'The Notebook', year: 2004, director: 'Nick Cassavetes', posterUrl: 'https://image.tmdb.org/t/p/w300/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg', status: 'want-to-watch' },
    { title: 'American Psycho', year: 2000, director: 'Mary Harron', posterUrl: 'https://image.tmdb.org/t/p/w300/9uGHEgsiUXjCNq8wdBop4UEBl5x.jpg', status: 'want-to-watch' },
    { title: 'Challengers', year: 2024, director: 'Luca Guadagnino', posterUrl: 'https://image.tmdb.org/t/p/w300/H6vke7zGiuLsz4v4RPjRV6KzgMZ.jpg', status: 'want-to-watch' },
    { title: 'The Hunger Games', year: 2012, director: 'Gary Ross', posterUrl: 'https://image.tmdb.org/t/p/w300/yDbyVT0tlETpCpzNFheF0QZdT4j.jpg', status: 'want-to-watch' },
    { title: 'The Hunger Games: Catching Fire', year: 2013, director: 'Francis Lawrence', posterUrl: 'https://image.tmdb.org/t/p/w300/wEJTgLDQ5sn4DiVnPJjnTOP3dCx.jpg', status: 'want-to-watch' },
    { title: 'The Shining', year: 1980, director: 'Stanley Kubrick', posterUrl: 'https://image.tmdb.org/t/p/w300/nRj5511mZdTl4saWEPoj9QroTIu.jpg', status: 'want-to-watch' },
    { title: 'The Housemaid', year: 2025, director: '', posterUrl: 'https://image.tmdb.org/t/p/w300/cXUqDqSNsLOF1C7uENaKEb7bMwv.jpg', status: 'want-to-watch' },
    { title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', posterUrl: 'https://image.tmdb.org/t/p/w300/9cjIGRiQGbiTxNLI6vfGkDvFpga.jpg', status: 'want-to-watch' },
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],
};




































































































