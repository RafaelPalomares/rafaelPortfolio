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
    text: "'Impossible' is a word to be found only in the dictionary of fools.",
    author: 'Napoleon Bonaparte',
    reason:
      "This quote resonates with me because it reframes limiting beliefs — the moment you label a goal or a problem as 'impossible', you've already given up control. Whether it's mastering a tough play on the court, debugging a system that keeps breaking, or taking on a project everyone says is too ambitious — 'impossible' is just an excuse for people who aren't willing to find another way.",
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
        'I listen to almost everything, from 50s jazz to modern trap, but I have a few special favorites that define my vibe—check out the music section for a deeper look into my playlist.',
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
      name: 'Sun Tzu',
      role: 'Military Strategist & Author',
      category: 'historical',
      reason:
        'Sun Tzu inspires me because of his deep understanding of strategy, timing, and psychology. He teaches that true victory comes from intelligence, preparation, and winning without unnecessary conflict.',
      imageUrl: 'suntzu.jpeg',
      copyright:
        '© Von Autor/-in unbekannt - Qing Palace Collection Picture Book. Beijing: Palace Museum Press. 1994., Gemeinfrei, https://commons.wikimedia.org/w/index.php?curid=57088337',
    },
    {
      number: '03',
      name: 'Socrates',
      role: 'Philosopher',
      category: 'historical',
      reason:
        'Socrates inspires me because he valued truth, critical thinking, and self-awareness above everything else. His way of questioning everything reminds me to think deeper and never accept things blindly.',
      imageUrl: 'socrates.jpeg',
      copyright:
        '© Von Copy of Lysippos (?) - Eric Gaba (User:Sting), July 2005., Gemeinfrei, https://commons.wikimedia.org/w/index.php?curid=3569936',
    },
    {
      number: '04',
      name: 'Cristiano Ronaldo',
      role: 'Professional Footballer',
      category: 'sports',
      reason:
        'Cristiano Ronaldo inspires me because of his insane discipline, mentality, and work ethic. He proved that hard work and dedication can push someone beyond natural talent and turn them into one of the greatest athletes ever.',
      imageUrl: 'cristianoronaldo.jpg',
      copyright:
        '© by AtilaTheHun from Manchester, England, This file is licensed under the Creative Commons Attribution 2.0 Generic license.',
    },
    {
      number: '05',
      name: 'Simeon Nikolov',
      role: 'Professional Volleyball Player',
      category: 'sports',
      reason:
        'Simeon Nikolov inspires me because of his calm confidence, creativity, and high-level volleyball IQ. As a setter, I admire how he controls the game, creates opportunities for his team, and stays composed in important moments.',
      imageUrl: 'simeonnikolov.jpeg',
      copyright: '© Volleybox.net · All rights reserved',
    },
    {
      number: '06',
      name: 'Tyrese Haliburton',
      role: 'Professional Basketball Player',
      category: 'sports',
      reason:
        'Tyrese Haliburton inspires me because of his unselfish playstyle, leadership, and confidence. He always looks to make his teammates better, stays calm under pressure, and proves that intelligence and teamwork can be just as valuable as pure athleticism.',
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

  readingList: [
    {
      isbn: '9781501142970',
      title: 'It',
      author: 'Stephen King',
      pages: 1168,
      status: 'completed',
      note: "One of the most terrifying and emotionally complex horror novels ever written. Stephen King builds an entire world in Derry, Maine — the friendships, the fears, the childhood trauma — and makes you feel every single page of those 1,100+ pages. Pennywise is iconic, but the real horror is how real the human parts feel.",
      coverUrl: 'it.jpeg',
    },
    {
      isbn: '9780140439199',
      title: 'The Art of War',
      author: 'Sun Tzu',
      pages: 384,
      status: 'completed',
      note: "Written over 2,500 years ago and still completely relevant. Every chapter reads like advice for volleyball, business, or life in general. It taught me that strategy isn't about brute force — it's about positioning, patience, and knowing when to act. I keep coming back to it.",
      coverUrl: 'artofwar.jpeg',
    },
    {
      isbn: '9781474600842',
      title: "The Queen's Gambit",
      author: 'Walter Tevis',
      pages: 272,
      status: 'completed',
      note: "Beth Harmon's obsession with chess mirrors how I feel about volleyball and coding — that drive to master something completely, to see patterns others don't, and to sacrifice comfort for greatness. The writing is sharp, the pacing is perfect, and it shows that genius without discipline means nothing.",
      coverUrl: 'queensgambit.jpeg',
    },
  ],

  filmList: [
    {
      title: '(500) Days of Summer',
      year: 2009,
      director: 'Marc Webb',
      posterUrl: '500daysofsummer.png',
      status: 'watched',
      rating: 10,
      note: "This is my all-time favourite film. It completely changed how I think about love and expectations. The non-linear storytelling, the soundtrack, the honesty — it doesn't romanticize heartbreak, it just shows it as it is. Tom's journey from obsession to self-awareness hits differently every time I rewatch it.",
    },
    {
      title: 'Back to the Future',
      year: 1985,
      director: 'Robert Zemeckis',
      posterUrl: 'back2thefuture.jpeg',
      status: 'watched',
      rating: 10,
      note: "Pure cinema magic. The pacing is flawless, the chemistry between Marty and Doc is legendary, and the concept of time travel has never been executed more perfectly in a film. It's funny, thrilling, and emotionally satisfying — and it never gets old no matter how many times you watch it.",
    },
    {
      title: 'Inglourious Basterds',
      year: 2009,
      director: 'Quentin Tarantino',
      posterUrl: 'inglouriusbasterds.jpeg',
      status: 'watched',
      rating: 10,
      note: 'Christoph Waltz as Hans Landa is one of the greatest performances in cinema history. The tension in every scene is unbearable — especially the opening and the bar scene. Tarantino rewrites history with style, and every frame drips with masterful dialogue, suspense, and dark humour.',
    },
  ],

  artGallery: [

    {
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      wikipediaTitle: 'Mona_Lisa',
      reason: 'Ever since childhood, seeing her in person was a dream waiting to be fulfilled. Standing before her this spring was pure joy—an unforgettable moment where years of anticipation finally met reality. Beyond that personal connection, her subtle, impossible-to-pin-down expression and sfumato depth make her the ultimate masterpiece.'
    },
    {
      title: 'The Son of Man',
      artist: 'René Magritte',
      wikipediaTitle: 'The_Son_of_Man',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg',
      reason: "It nails that surreal, mysterious aura—reminiscent of the eerie, calm authority of Wonder of U from JoJo's Bizarre Adventure. The suited man with the floating green apple obscures what's right in front of you, capturing a sense of unstoppable, quiet calamity and existential mystery."
    },
    {
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      wikipediaTitle: 'The_Starry_Night',
      reason: "It turns raw emotion and psychological turmoil into movement. The swirling night sky doesn't feel static; it vibrates with energy, making you feel the weight of Van Gogh's inner world through vivid blues and burning yellows."
    },
    {
      title: 'Sunflowers',
      artist: 'Vincent van Gogh',
      wikipediaTitle: 'Sunflowers_(Van_Gogh_series)',
      reason: 'A masterclass in texture and warmth. It takes a simple subject and gives it raw, textured vitality—showing beauty in different stages of life and decay with thick, confident impasto strokes.'
    },
    {
      title: 'The Kiss',
      artist: 'Gustav Klimt',
      wikipediaTitle: 'The_Kiss_(Klimt)',
      reason: 'The golden radiance and geometric patterns create a sense of timeless love. It feels less like a standard painting and more like an icon glowing from within, blending intimacy with decorative splendor.'
    },
    {
      title: 'The Great Wave off Kanagawa',
      artist: 'Hokusai',
      wikipediaTitle: 'The_Great_Wave_off_Kanagawa',
      reason: 'The composition is legendary: the overwhelming force of nature framing Mount Fuji in the background. It perfectly captures tension, scale, and the contrast between momentary chaos and permanent stability.'
    },
    {
      title: 'The Scream',
      artist: 'Edvard Munch',
      wikipediaTitle: 'The_Scream',
      reason: "It visually translates pure anxiety. The wavy lines of the environment echo the figure's internal panic, making the landscape itself feel like it’s vibrating with terror."
    },
    {
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli',
      wikipediaTitle: 'The_Birth_of_Venus',
      reason: 'Pure classical elegance and mythological grace. The flowing lines, soft colors, and effortless movement give it an ethereal, dreamlike quality that stands out across art history.'
    },
    {
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      wikipediaTitle: 'The_Persistence_of_Memory',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
      reason: 'It distorts reality in the best way possible. The melting clocks in a stark, barren landscape capture the fluid, nonsensical nature of time and dreams.'
    },
    {
      title: 'The School of Athens',
      artist: 'Raphael',
      wikipediaTitle: 'The_School_of_Athens',
      reason: "A grand celebration of intellect, symmetry, and perspective. Gathering history's greatest philosophers into one perfectly proportioned architectural space gives it incredible depth and monumental scale."
    },
    {
      title: 'The Coronation of Napoleon',
      artist: 'Jacques-Louis David',
      wikipediaTitle: 'Coronation_of_Napoleon',
      reason: 'Pure theatrical propaganda on a massive scale. The sheer detail, grand lighting, and meticulous crowd rendering make you feel the weight of empire and political drama.'
    },
    {
      title: 'Napoleon Crossing the Alps',
      artist: 'Jacques-Louis David',
      wikipediaTitle: 'Napoleon_Crossing_the_Alps',
      reason: 'The ultimate image of power, motion, and heroism. The rearing horse, dramatic cloak, and ideal posture scream unshakeable confidence and historical destiny.'
    },
    {
      title: 'Napoleon I on his Imperial Throne',
      artist: 'Jean-Auguste-Dominique Ingres',
      wikipediaTitle: 'Napoleon_I_on_his_Imperial_Throne',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Ingres%2C_Napoleon_on_his_Imperial_throne.jpg',
      reason: 'It presents Napoleon almost as a deity or Roman emperor. The rigid symmetry, opulent robes, and cold gaze create a breathtaking display of absolute authority.'
    },
    {
      title: "C'est fini (It is finished)",
      artist: 'Oskar Rex',
      wikimediaFile: "File:Oskar_Rex_-_C'est_fini.jpg",
      reason: 'A haunting contrast to the imperial portraits. Showing Napoleon isolated, looking out at the ocean on Saint Helena, it captures the melancholic end of an era and the quiet weight of fallen ambition.'
    }
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],
};
