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

  favAnimal: {
    name: 'Octopus',
    icon: '🐙',
    tagline: 'Eight arms, nine brains, zero fear — the ocean’s ultimate problem-solver',
    reason: [
      "The octopus is my favorite animal because it’s basically a living cheat code. No shell, no claws, no armor — and it still rules its world by being the smartest thing in the room. It doesn’t overpower problems, it dismantles them. That’s exactly how I want to play: win with the brain, not the muscle, whether I’m reading a defense on the court or untangling a nasty bug in my code.",
      "And it’s ruthless about adapting. An octopus can morph its color and texture in a heartbeat, pour its entire body through a gap the size of a coin, and rewrite its plan mid-move without ever panicking. That cold, creative composure — stay calm, read the situation, find the way through — is the energy I try to bring to every challenge I take on.",
    ],
    traits: [
      'Nine brains and eight independently-thinking arms',
      'Shape-shifting master of camouflage and disguise',
      'Escape artist that squeezes through almost any gap',
      'Cracks puzzles, opens jars, and plots its way to the goal',
      'Stays ice-cold and improvises the instant the plan breaks',
    ],
  },

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
      videoUrl: 'simeonnikolov.mp4',
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
      videoUrl: 'micahchristenson.mp4',
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
      videoUrl: 'ezevazquez.mp4',
    },
  ],

  socials: [
    { label: 'GitHub', url: 'https://github.com/rafaelpalomares' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/rafaelpalomaresbill' },
  ],

  legal: {
    pageTitle: 'Legal Notice & Privacy Policy',
    pageSubtitle: 'Impressum · Datenschutzerklärung · Urheberrecht — gemäss Schweizer Recht',
    backLinkLabel: '← Back to portfolio',

    impressum: {
      heading: 'Impressum',
      intro:
        'Diese Website ist ein persönliches, nicht-kommerzielles Portfolio und wird betrieben von:',
      notice:
        'Es werden keine Waren oder Dienstleistungen angeboten. Die Website dient ausschliesslich der persönlichen Präsentation. Eine Pflicht zur Angabe einer Handelsregisternummer oder Mehrwertsteuernummer besteht nicht, da keine gewerbliche Tätigkeit ausgeübt wird (Art. 2 UWG; Art. 10 DSG).',
    },

    copyright: {
      heading: 'Urheberrecht (Art. 2 ff. URG)',
      disclaimer: [
        {
          text: 'Allgemeiner Hinweis: Ich, Rafael Palomares, beanspruche kein Eigentum an den auf dieser Website gezeigten Inhalten Dritter. Sämtliche Bilder, Videos, Charaktere, Namen, Logos und sonstigen Medien gehören ihren jeweiligen Rechteinhabern. Die Darstellung erfolgt ausschliesslich zu privaten, nicht-kommerziellen Fan- und Präsentationszwecken.',
        },
        {
          text: 'General notice: I, Rafael Palomares, do not own any of the third-party content shown on this website. All images, videos, characters, names and logos belong to their respective owners. They are displayed solely for private, non-commercial purposes.',
          emphasised: true,
        },
      ],
      intro:
        'Alle auf dieser Website verwendeten Inhalte Dritter — Bilder, Charaktere, Namen, Logos und Medien — sind geistiges Eigentum ihrer jeweiligen Rechteinhaber. Diese Website erhebt keinerlei Eigentumsansprüche daran. Die Verwendung erfolgt ausschliesslich zu privaten, nicht-kommerziellen Zwecken im Sinne von Art. 19 Abs. 1 lit. a URG (Privatgebrauch).',
      idolsHeading: 'Vorbilder — Bilder',
      volleyballHeading: 'Lieblings-Volleyballspieler — Bilder',
      volleyballUsageNote:
        'Verwendung zu nicht-kommerziellen Fan-Zwecken gemäss Art. 19 URG.',
      videosHeading: 'Videos der Lieblings-Volleyballspieler',
      videosIntro:
        'Bei den folgenden Lieblings-Volleyballspielern werden Videoclips angezeigt, die lokal auf dieser Website gehostet werden:',
      videosOutro:
        'Alle an den Videos bestehenden Rechte liegen bei den jeweiligen Urhebern und Rechteinhabern. Diese Website erhebt daran keine Eigentumsansprüche; die Verwendung erfolgt ausschliesslich zu privaten, nicht-kommerziellen Fan-Zwecken gemäss Art. 19 URG.',
      charactersHeading: 'Lieblingscharaktere — Bilder',
      characterUsageNote:
        'Verwendung zu nicht-kommerziellen Fan-Zwecken gemäss Art. 19 URG.',
      favAnimalHeading: 'Lieblingstier',
      favAnimalNoteBefore:
        'Das auf dieser Website angezeigte Lieblingstier',
      favAnimalNoteAfter:
        'wird ausschliesslich durch ein Standard-Unicode-Emoji sowie durch eigene, von Rafael Palomares verfasste Texte dargestellt. Es werden hierfür keine Bilder, Videos oder sonstigen Inhalte Dritter verwendet, weshalb diesbezüglich keine Urheberrechte Dritter betroffen sind.',
      quoteHeading: 'Zitat',
      quoteNoteBefore: 'Das auf dieser Website angezeigte Zitat stammt von',
      quoteNoteAfter:
        '(gemeinfrei). Verwendung zu persönlichen, nicht-kommerziellen Zwecken im Rahmen des Zitatrechts gemäss Art. 25 URG.',
    },

    privacy: {
      heading: 'Datenschutzerklärung',
      lawRef:
        'Gemäss Bundesgesetz über den Datenschutz (DSG / nDSG, SR 235.1), in Kraft seit 1. September 2023.',
      blocks: [
        {
          heading: 'Verantwortliche Person (Art. 5 lit. j nDSG)',
          paragraphs: [],
        },
        {
          heading: 'Grundsatz der Datensparsamkeit (Art. 6 nDSG)',
          paragraphs: [
            {
              text: 'Diese Website erhebt, speichert und verarbeitet keine personenbezogenen Daten. Es werden keine Cookies gesetzt, kein Tracking durchgeführt, keine Analysetools (z. B. Google Analytics) eingesetzt und keine Nutzerprofile erstellt.',
            },
            {
              text: 'Die Website verfügt über kein Registrierungs- oder Login-System und kein Kontaktformular. Eine Datenbearbeitung im Sinne von Art. 5 lit. d nDSG findet durch den Websitebetreiber nicht statt.',
            },
          ],
        },
        {
          heading: 'Externe Links (Social Media)',
          paragraphs: [
            {
              text: 'Diese Website enthält Links zu externen Profilen auf Drittplattformen. Für die Inhalte und den Datenschutz dieser verlinkten Seiten sind ausschliesslich deren jeweilige Anbieter verantwortlich. Beim Anklicken eines Links verlassen Sie diese Website.',
            },
          ],
        },
        {
          heading: 'Bilder (lokal gehostet)',
          paragraphs: [
            {
              text: 'Die auf dieser Website angezeigten Bilder werden lokal gehostet. Für den Abruf der Bilder findet keine Verbindung zu Drittanbietern statt.',
            },
          ],
        },
        {
          heading: 'Videos (lokal gehostet)',
          paragraphs: [
            {
              text: 'Die auf dieser Website angezeigten Videos werden lokal gehostet. Für den Abruf der Videos findet keine Verbindung zu Drittanbietern statt, und es werden keine personenbezogenen Daten an Dritte übermittelt.',
            },
          ],
        },
        {
          heading: 'Hosting (Art. 9 nDSG)',
          paragraphs: [
            {
              text: 'Diese Website wird bei Vercel (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Vercel erhebt beim Aufruf der Seite automatisch technische Daten (sog. System Data), wie IP-Adressen und Zugriffs-Logs, um den Betrieb und die Sicherheit der Plattform zu gewährleisten. Vercel ist unter dem Swiss-U.S. Data Privacy Framework zertifiziert, womit der Datentransfer in die USA gemäss nDSG zulässig ist. Details entnehmen Sie bitte der Datenschutzerklärung von Vercel.',
            },
          ],
        },
        {
          heading: 'Betroffenenrechte (Art. 25 ff. nDSG)',
          paragraphs: [
            {
              text: 'Da diese Website keine personenbezogenen Daten erhebt oder speichert, sind Auskunfts-, Berichtigungs- und Löschungsansprüche gegenüber dem Websitebetreiber gegenstandslos. Bei Fragen wenden Sie sich an die oben genannte E-Mail-Adresse.',
            },
          ],
        },
      ],
    },

    liability: {
      heading: 'Haftungsausschluss (Art. 41 ff. OR)',
      paragraphsBefore: [
        'Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Eine Haftung für Schäden, die durch die Nutzung dieser Website entstehen, ist gemäss Art. 100 OR ausgeschlossen, soweit gesetzlich zulässig.',
        'Alle auf dieser Website verwendeten Marken, Charakternamen, Bilder und sonstigen Inhalte Dritter sind Eigentum ihrer jeweiligen Rechteinhaber. Die Verwendung erfolgt ausschliesslich zu privaten, nicht-kommerziellen Zwecken im Rahmen des Privatgebrauchs (Art. 19 URG) und des Zitatrechts (Art. 25 URG).',
      ],
      contactNoteBefore:
        'Sollten Sie der Ansicht sein, dass durch Inhalte dieser Website Ihre Rechte verletzt werden, nehmen Sie bitte Kontakt auf unter',
      contactNoteAfter:
        'Ich werde die betreffenden Inhalte umgehend prüfen und gegebenenfalls entfernen (Notice-and-Takedown-Prinzip).',
    },

    footerLawRefs: 'DSG/nDSG (SR 235.1) · URG (SR 231.1) · OR (SR 220) · UWG (SR 241)',
  },
};
