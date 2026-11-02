import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioData } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  getData(): Observable<PortfolioData> {
    return of(portfolioData);
  }
}

const portfolioData: PortfolioData = {
  person: {
    name: 'Rafael Palomares',
    title: 'Apprenticeship as a Software-Developer',
    greeting: "Hi, I'm Rafael, nice to meet you!",
    bio: [
      "I'm an 18-year-old developer from Switzerland focused on building things that actually mean something—whether that's a game, a site, or just a side project that started as a random idea. I've always appreciated people who lean into their own identity and discipline, and I try to bring that same mindset to my own work: constantly learning and improving without losing my own style.",
      "For me, coding is as creative as it is technical. When I'm not at my desk, I'm usually on the volleyball court. Playing as a setter has definitely influenced how I work; it's taught me how to stay composed and keep the bigger picture in mind, even when things get fast-paced.",
      "I'm still very much in the middle of the learning process, but that's the part I enjoy most. My goal is simple: keep building, keep evolving, and create work that leaves a lasting impression.",
    ],
    location: 'Bern, Switzerland',
    email: 'rafael.palomares0607@gmail.com',
    availableFor: '',
    avatarInitials: 'RP',
  },


  quote: {
    text: "If you know the enemy and know yourself, you need not fear the result of a hundred battles.",
    author: 'Sun Tzu',
    reason:
      "This quote from Sun Tzu reflects my philosophy toward both software development and competitive volleyball. True confidence doesn't come from arrogance or brute force — it comes from deep preparation, objective self-awareness, and understanding what you are up against. Whether analyzing edge cases and architecture in code, or reading opposing blockers and defensive rotations on the court, knowing both your own capabilities and the opponent's patterns guarantees you stay composed and make the decisive play.",
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
        { name: 'VS Code', level: 4 },
        { name: 'npm', level: 3 },
        { name: 'Debugging', level: 3 },
        { name: 'Agile Basics', level: 2 },
      ],
    },
  ],

  languages: [
    { name: 'German', proficiency: 'Native', level: 90, flag: '🇩🇪' },
    { name: 'Spanish', proficiency: 'Advanced', level: 70, flag: '🇪🇸' },
    { name: 'English', proficiency: 'Fluent', level: 80, flag: '🇬🇧' },
    { name: 'French', proficiency: 'Basic', level: 25, flag: '🇫🇷' },
  ],

  hobbies: [
    {
      icon: '🏐',
      name: 'Volleyball',
      description:
        'Volleyball is one of the biggest parts of my life. I mainly play as a setter and love the strategic side of the game — controlling the tempo, creating plays, and connecting the whole team together.',
    },
    {
      icon: '💻',
      name: 'Programming',
      description:
        'I enjoy building projects, experimenting with ideas, and learning new technologies. Coding feels like creating something from nothing, and I like the challenge of solving problems creatively.',
    },
    {
      icon: '🏋️',
      name: 'Fitness',
      description:
        'Going to the gym helps me stay disciplined and improve my athletic performance. I enjoy pushing my limits and becoming stronger both physically and mentally.',
    },
    {
      icon: '🎮',
      name: 'Gaming',
      description:
        'Gaming has always been a way for me to relax, compete, and enjoy good stories. I especially enjoy games that require strategy, teamwork, or fast decision-making.',
    },
    {
      icon: '🎵',
      name: 'Music',
      description:
        'I listen to almost everything, from 50s jazz to modern trap, but I have a few special favorites that define my vibe.',
    },
    {
      icon: '⚽',
      name: 'Football',
      description:
        'Football has inspired me for years, especially through players like Cristiano Ronaldo. I enjoy the mentality, passion, and competitive energy that comes with the sport.',
    },
    {
      icon: '🌍',
      name: 'Traveling',
      description:
        'I enjoy visiting different places and experiencing new environments, especially spending time in Spain. Traveling helps me clear my mind and gain new perspectives.',
    },
    {
      icon: '📺',
      name: 'Anime & Movies',
      description:
        'I enjoy anime because of the deep characters, mindset growth, and strategic thinking behind many stories. It also inspires me in how I see teamwork, ambition, and personal development in both sports and real life.',
    },
  ],

  idols: [
    {
      number: '01',
      name: 'Napoleon Bonaparte',
      role: 'Military Strategist & Emperor',
      category: 'historical',
      reason:
        'Napoleon inspires me because of his unmatched strategic mind, confidence, and ability to lead under pressure. Even when the odds were against him, he stayed fearless and always thought several steps ahead of everyone else.',
      imageUrl: 'Napoleon_at_the_Great_St._Bernard_-_Jacques-Louis_David_-_Google_Cultural_Institute.jpg',
      copyright:
        '© By Jacques-Louis David - Google Art Project, Public Domain, https://commons.wikimedia.org/w/index.php?curid=38872895',
    },

    {
      number: '02',
      name: 'Alexander the Great',
      role: 'King & Military Strategist',
      category: 'historical',
      reason:
        'Alexander the Great inspires me because of his ambition, adaptability, and ability to lead from the front. He reminds me to think beyond limitations, take calculated risks, and pursue goals others consider impossible. His legacy represents the combination of vision, courage, and leadership needed to turn ambitious plans into reality.',
      imageUrl: 'alexander.jpeg',
      copyright:
        '©',
    },
    {
      number: '03',
      name: 'Sun Tzu',
      role: 'Military Strategist & Author',
      category: 'historical',
      reason:
        'Sun Tzu inspires me because of his understanding of strategy, timing, and psychology. He teaches me that winning is not always about being the strongest, but about understanding the situation, preparing better than the competition, and making the right move at the right time. His philosophy reminds me to stay adaptable, anticipate challenges, and use intelligence rather than force to gain an advantage.',
      imageUrl: 'suntzu.jpeg',
      copyright:
        '© Von Autor/-in unbekannt - Qing Palace Collection Picture Book. Beijing: Palace Museum Press. 1994., Gemeinfrei, https://commons.wikimedia.org/w/index.php?curid=57088337',
    },
  ],

  favCharacters: [
    {
      name: 'Oikawa Tooru',
      media: 'Haikyuu!!',
      mediaType: 'Anime',
      voiceActor: 'Daisuke Namikawa',
      reason:
        "I'm really inspired by Oikawa's work ethic. Since he isn't a 'natural genius,' he has to outwork everyone to stay competitive. As a setter, I relate to that constant push to improve and the challenge of managing the pressure that comes with the position.",
      imageUrl: 'oikawa.webp',
      copyright: '© Haruichi Furudate / Shueisha · Image via haikyuu.fandom.com',
    },
    {
      name: 'Satoru Gojo',
      media: 'Jujutsu Kaisen',
      mediaType: 'Anime',
      voiceActor: 'Yuichi Nakamura',
      reason:
        "I admire Gojo's ability to stay composed. Even when things get intense, he keeps a relaxed perspective and doesn't let the weight of his responsibilities get to him. It's a level of calm that I try to bring into my own high-pressure moments.",
      imageUrl: 'satorugojo.jpeg',
      copyright: '© Gege Akutami / Shueisha · Image via Steam',
    },
    {
      name: 'Jax',
      media: 'The Amazing Digital Circus',
      mediaType: 'Series',
      voiceActor: 'Alex Rochon',
      reason:
        "Jax is interesting because he's completely unpredictable. I like that he doesn't just follow the script; he's a reminder to keep things lighthearted and to value a bit of individuality in a world that often feels too structured.",
      imageUrl: 'jax.webp',
      copyright: '© Gooseworx / GLITCH Productions · Image via Reddit',
    },
  ],

  projects: [
    {
      number: '01',
      name: 'This Portfolio',
      tagline: "The site you're looking at right now.",
      description:
        'A personal portfolio built with Angular 21, designed from scratch with a dark aesthetic, smooth scroll navigation, and modular components. Every section reflects something real about me.',
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
      description:
        'A personal project built to track volleyball training data, match stats and player performance over time. Focused on setters and team coordination metrics, helping visualize improvement and consistency.',
      stack: ['JavaScript', 'HTML', 'CSS'],
      status: 'wip',
      repoUrl: '',
    },
  ],

  volleyballPlayers: [
    {
      name: 'Simeon Nikolov',
      position: 'Setter',
      team: 'Lube Civitanova / Bulgaria',
      nationality: 'Bulgaria',
      flag: '🇧🇬',
      highlights: [
        'Teenage prodigy who became a starting setter at the senior international level',
        'Key playmaker in Bulgaria\'s silver medal run at the 2025 Nations League',
        'Deceptive, fast tempo distribution that keeps opposing middle blockers guessing',
      ],
      reason:
        'Simeon Nikolov is the player I study most. As a fellow setter, I admire his calm confidence, creativity, and absurd volleyball IQ at such a young age. The way he controls tempo, hides his sets, and stays composed in clutch moments is exactly the game I want to grow into.',
      imageUrl: 'simeonnikolov.jpeg',
      copyright: '© Volleybox.net · All rights reserved',
    },
    {
      name: 'Micah Christenson',
      position: 'Setter',
      team: 'USA National Team',
      nationality: 'United States',
      flag: '🇺🇸',
      highlights: [
        'Olympic bronze medalist with Team USA (Rio 2016)',
        'Renowned for pinpoint set location and elite back-row attacking as a setter',
        'Masterclass in reading blockers and running a balanced, unpredictable offense',
      ],
      reason:
        'Micah Christenson is the blueprint for a modern setter: technically flawless hands, incredible court awareness, and the composure to run a world-class offense under pressure. I look to him for how to distribute the ball efficiently and keep every hitter involved.',
      imageUrl: 'micahchristenson.jpeg',
      copyright: '© FIVB · All rights reserved',
    },
    {
      name: 'Eze Vazquez',
      position: 'Setter',
      team: 'Argentina National Team',
      nationality: 'Argentina',
      flag: '🇦🇷',
      highlights: [
        'Creative South American setter known for his flair and quick decision-making',
        'Drives a fast, aggressive tempo that energizes the whole team',
        'Brings passion and leadership that lifts his teammates in big moments',
      ],
      reason:
        'Eze Vazquez plays with a fearless, expressive style that I love. His quick hands and willingness to take risks show me that being a setter isn\'t just about safe plays — it\'s about creativity, tempo, and setting the emotional tone for the team.',
      imageUrl: 'ezevazquez.jpeg',
      copyright: '© All rights reserved by respective owner',
    },
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],
};
