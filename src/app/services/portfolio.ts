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
      "I'm a 17-year-old developer and athlete from Switzerland with Spanish roots from Madrid. I'm currently learning application development while building my own projects, improving my skills in programming, and pushing myself both mentally and physically every day.",
      "What drives me most is growth — whether it's in coding, volleyball, or life in general. I admire discipline, strategy, and ambition, which is why people like Cristiano Ronaldo, Napoleon Bonaparte, and Simeon Nikolov inspire me. Right now, I'm focused on becoming a better setter, creating projects I'm proud of, and building a future where I can turn my ideas into something real.",
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
      skills: ['Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'PostgreSQL'],
    },
    {
      category: 'Development',
      skills: ['Frontend Development', 'Game Development', 'UI Design', 'Problem Solving'],
    },
    {
      category: 'Sports & Leadership',
      skills: ['Volleyball', 'Setter Coordination', 'Team Communication', 'Strategic Thinking'],
    },
    {
      category: 'Languages',
      skills: ['German', 'English', 'Spanish'],
    },
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
      description: 'Music is something I listen to every day. I especially enjoy 70s and 80s music because of the atmosphere, emotion, and timeless feeling those songs have.',
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
      reason: 'Napoleon inspires me because of his unmatched strategic mind, confidence, and ability to lead under pressure. Even when the odds were against him, he stayed fearless and always thought several steps ahead of everyone else.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg/960px-Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg?utm_source=commons.wikimedia.org&utm_campaign=parser&utm_content=thumbnail',
      copyright: '© By Jacques-Louis David - Google Art Project, Public Domain, https://commons.wikimedia.org/w/index.php?curid=38872895',
    },
    {
      number: '02',
      name: 'Cristiano Ronaldo',
      role: 'Professional Footballer',
      reason: 'Cristiano Ronaldo inspires me because of his insane discipline, mentality, and work ethic. He proved that hard work and dedication can push someone beyond natural talent and turn them into one of the greatest athletes ever.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Cristiano_Ronaldo_%28cropped%29.jpg/960px-Cristiano_Ronaldo_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
      copyright: '© by 	AtilaTheHun from Manchester, England, This file is licensed under the Creative Commons Attribution 2.0 Generic license.',
    },
    {
      number: '03',
      name: 'Simeon Nikolov',
      role: 'Professional Volleyball Player',
      reason: 'Simeon Nikolov inspires me because of his calm confidence, creativity, and high-level volleyball IQ. As a setter, I admire how he controls the game, creates opportunities for his team, and stays composed in important moments.',
      imageUrl: 'https://volleybox.net/media/upload/players/1775922422wy4kN.png',
      copyright: '© Volleybox.net · All rights reserved',
    }
  ],

  favCharacters: [
    {
      name: 'Oikawa Tooru',
      media: 'Haikyuu!!',
      mediaType: 'Anime',
      reason: "Oikawa is the character I relate to most. His obsession with improvement, his pride, and the way he carries the weight of being the best setter — it mirrors how I think about volleyball and life.",
      imageUrl: 'https://static.wikia.nocookie.net/haikyuu/images/8/80/Haikyuu-19_04.jpg/revision/latest/scale-to-width-down/1000?cb=20160722031233',
      copyright: '© Haruichi Furudate / Shueisha · Image via haikyuu.fandom.com',
    },
    {
      name: 'Satoru Gojo',
      media: 'Jujutsu Kaisen',
      mediaType: 'Anime',
      reason: "Gojo stands out because of his overwhelming confidence, power, and relaxed attitude even in high-pressure situations. I admire how he carries responsibility while still staying calm and almost playful.",
      imageUrl: 'https://images.steamusercontent.com/ugc/2104926844235375918/180EFB00FE1E3E6972B1C5BC32E24DC0B3C1BB63/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
      copyright: '© Gege Akutami / Shueisha · Image via Steam',
    },
    {
      name: 'Tom Hansen',
      media: '(500) Days of Summer',
      mediaType: 'Movie',
      reason: "Tom resonates with me because of his emotional honesty and how he reflects on relationships and expectations. His journey shows how growth often comes from misunderstandings and self-realization.",
      imageUrl: 'https://i.pinimg.com/736x/f2/8d/ea/f28deaf52ce88b7360c93e02d5fd2615.jpg',
      copyright: '© Fox Searchlight Pictures (2009) · Image via Pinterest ',
    },
    
    {
      name: 'Jax',
      media: 'The Amazing Digital Circus',
      mediaType: 'Series',
      reason: "Jax stands out because of his chaotic, unpredictable personality. I find him interesting as a character who doesn't follow rules and constantly disrupts the system around him.",
      imageUrl: 'https://preview.redd.it/why-was-jax-so-pissed-here-v0-q4dwkl7nbtjf1.png?auto=webp&s=a070e6250897c0f8ad691a65397458a37e595c5b',
      copyright: '© Gooseworx / GLITCH Productions · Image via Reddit',
    },
    {
      name: 'Bill Cipher',
      media: 'Gravity Falls',
      mediaType: 'Series',
      reason: "Bill Cipher is fascinating because of his intelligence, manipulation, and chaotic nature. He represents pure unpredictability and strategic thinking taken to an extreme level.",
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/77/Bill_Cipher_Gravity_Falls.webp',
      copyright: '© Alex Hirsch / Disney Television Animation · Image via Wikimedia',
    },
    {
      name: 'Rowlet',
      media: 'Pokémon',
      mediaType: 'Game / Anime',
      reason: "Rowlet resonates with me because of its calm, focused energy and surprising strength despite its cute appearance. I like how it stays composed and precise in its actions.",
      imageUrl: 'https://pbs.twimg.com/profile_images/1236314610862624772/PJg5OGA2_400x400.jpg',
      copyright: '© Nintendo / Game Freak / Creatures Inc. · Image via X',
    },
  ],

  musicIdols: [
  {
    name: 'Elvis Presley',
    genre: 'Rock and Roll',
    reason: 'Elvis Presley means something to me because he basically shaped modern music. His stage presence, voice, and energy made him a legend who changed how performers express themselves.',
    imageUrl: 'https://lh3.googleusercontent.com/XuiIxgO8ml5EN_kL-Z6oOLZpPwUyQQUjN5i70lrvsJ0BxRokj6R7adxcY5HQw1g1tS7tocvM1JqzP_H8=w1920-h800-p-l90-rjs',
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
    imageUrl: 'https://lh3.googleusercontent.com/Rqn8EFeRW9WN7Hv3BZSSA1PrKa8EvcKjk5TbfChs-dKhJPoiuzvk54-u8Xd0ScyaFtpTxYCeHZrliv4=w1920-h800-p-l90-rj',
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
    imageUrl: 'https://yt3.googleusercontent.com/_Qx50zW4-diO8SuAKhaccaNLyTvObgE-TQv1jYS4M9Kma6llb3s-IHpBBvuZAkPh88lHvXTQGaWS7aE=w1920-h800-p-l90-rj',
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
    imageUrl: 'https://lh3.googleusercontent.com/QM50T3vF6Hvr3coPEdwB7OImuH6f2ktU3-X6LgjpCnrSukGj9fmDkY84rOcR3Ye8OWToWwGWA9QaE5Q=w1920-h800-p-l90-rj',
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
    imageUrl: 'https://lh3.googleusercontent.com/FMh1mOI0ufvUCAkbUM6aUmU5WK7O5PnndyyXKP1-DCEip20SQz5eeYn3lZ29p-ASb-19ZfBVc_NKe5Ko=w1920-h800-p-l90-rj',
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
    imageUrl: 'https://lh3.googleusercontent.com/1UeTp2cTje797NGcJ6IOXs6BjAtf3kBkoD4P7BLN6d-arHigrzlFL8UpF3YbmbkQwXYwWtHuiZczEvGG=w1920-h800-p-l90-rj',
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
      liveUrl: 'https://your-portfolio-url.com',
      repoUrl: 'https://github.com/rafaelpalomares/portfolio',
    },
    {
      number: '02',
      name: 'Project Name',
      tagline: 'Short one-liner about what this does.',
      description: 'Describe what you built, why you built it, and what problem it solves. Keep it honest and direct — people can tell when it\'s filler.',
      stack: ['Java', 'PostgreSQL', 'Spring Boot'],
      status: 'wip',
      repoUrl: 'https://github.com/rafaelpalomares/project',
    },
    {
      number: '03',
      name: 'Another Project',
      tagline: 'Another thing you made that you\'re proud of.',
      description: 'What did you learn building this? What was the hardest part? That\'s the stuff worth writing about.',
      stack: ['JavaScript', 'HTML', 'CSS'],
      status: 'archived',
      repoUrl: 'https://github.com/rafaelpalomares/another-project',
    },
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],
};
