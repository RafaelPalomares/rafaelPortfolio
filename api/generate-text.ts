import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── Custom Error Classes ────────────────────────────────────────────────────

class TimeoutError extends Error {
  constructor() {
    super('Gemini API request timed out');
    this.name = 'TimeoutError';
  }
}

class ValidationError extends Error {
  field: string;
  constructor(field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey || apiKey.trim().length === 0) {
    res.status(500).json({ error: 'Service configuration error' });
    return;
  }

  try {
    const prompt = buildPrompt();
    const rawText = await callGeminiApi(prompt, apiKey);
    const dynamicFields = parseAndValidate(rawText);
    res.status(200).json(dynamicFields);
  } catch (error) {
    if (error instanceof TimeoutError) {
      res.status(502).json({ error: 'Text generation service unavailable' });
    } else if (error instanceof ValidationError) {
      res.status(502).json({ error: 'Invalid response structure', field: error.field });
    } else {
      res.status(502).json({ error: 'Text generation service unavailable' });
    }
  }
}

// ─── Prompt Construction ─────────────────────────────────────────────────────

function buildPrompt(): string {
  return `You are a creative writing assistant generating portfolio website text for Rafael Palomares.

ABOUT RAFAEL:
- 18 years old, based in Bern, Switzerland
- Software Developer apprentice
- Passionate volleyball player (setter position)
- Interests: coding, gaming, fitness, anime, football, music, traveling

PORTFOLIO CONTEXT (static facts — do NOT invent anything beyond these):

Person: Rafael Palomares, Software Developer apprentice, Bern Switzerland

Hobbies (8 total):
1. Volleyball — setter, strategic side of the game, controlling tempo
2. Programming — building projects, experimenting, learning technologies
3. Fitness — gym, discipline, athletic performance
4. Gaming — strategy, teamwork, fast decision-making
5. Music — wide range from 50s jazz to modern trap
6. Football — inspired by Cristiano Ronaldo, mentality and passion
7. Traveling — visiting places, especially Spain
8. Anime & Movies — deep characters, mindset growth, strategic thinking

Idols (6 total):
1. Napoleon Bonaparte — Military Strategist & Emperor, strategic mind, confidence, fearless
2. Sun Tzu — Military Strategist & Author, strategy, timing, psychology
3. Socrates — Philosopher, truth, critical thinking, self-awareness
4. Cristiano Ronaldo — Professional Footballer, discipline, mentality, work ethic
5. Simeon Nikolov — Professional Volleyball Player, calm confidence, creativity, volleyball IQ
6. Tyrese Haliburton — Professional Basketball Player, unselfish playstyle, leadership, intelligence

Favourite Characters (3 total):
1. Oikawa Tooru from Haikyuu!! — work ethic, not a natural genius, outworks everyone, setter
2. Satoru Gojo from Jujutsu Kaisen — stays composed, relaxed perspective, calm under pressure
3. Jax from The Amazing Digital Circus — unpredictable, doesn't follow the script, lighthearted individuality

Projects (3 total):
1. "This Portfolio" — Angular 21, dark aesthetic, modular components, live
2. "Unity Game" — a videogame, currently in planning
3. "VolleyStats Tracker" — volleyball training data, match stats, player performance

Books (3 total):
1. "It" by Stephen King — 1168 pages, horror, complex characters
2. "The Art of War" by Sun Tzu — 384 pages, strategy, positioning, patience
3. "The Queen's Gambit" by Walter Tevis — 272 pages, obsession with mastery, discipline

Films (3 total):
1. "(500) Days of Summer" (2009) by Marc Webb — all-time favourite, love, expectations, non-linear
2. "Back to the Future" (1985) by Robert Zemeckis — time travel, pacing, chemistry
3. "Inglourious Basterds" (2009) by Quentin Tarantino — tension, dialogue, dark humour

Quote: "In order to find your autumn, you have to go through summer." — (500) Days of Summer

TONE INSTRUCTIONS:
- Write in first person as Rafael
- Casual, personal English — like a young developer writing naturally
- Authentic, not corporate or overly formal
- Reference real facts from above, do NOT invent credentials, experiences, or achievements

LENGTH CONSTRAINTS:
- person.bio: exactly 3 paragraphs, each 2–4 sentences
- person.greeting: 1 short sentence (casual greeting)
- person.availableFor: 1 short phrase or sentence
- Each hobby description: 1–3 sentences
- Each idol reason: 1–3 sentences
- Each character reason: 1–3 sentences
- Each project description: 1–3 sentences
- Each project tagline: max 10 words
- Each book note: 2–4 sentences
- Each film note: 2–4 sentences
- quote.reason: 2–4 sentences

REQUIRED OUTPUT FORMAT — return ONLY this JSON object, nothing else:
{
  "person": {
    "greeting": "string",
    "bio": ["paragraph1", "paragraph2", "paragraph3"],
    "availableFor": "string"
  },
  "quote": {
    "reason": "string"
  },
  "hobbies": [
    {"description": "string"},
    {"description": "string"},
    {"description": "string"},
    {"description": "string"},
    {"description": "string"},
    {"description": "string"},
    {"description": "string"},
    {"description": "string"}
  ],
  "idols": [
    {"reason": "string"},
    {"reason": "string"},
    {"reason": "string"},
    {"reason": "string"},
    {"reason": "string"},
    {"reason": "string"}
  ],
  "favCharacters": [
    {"reason": "string"},
    {"reason": "string"},
    {"reason": "string"}
  ],
  "projects": [
    {"description": "string", "tagline": "string"},
    {"description": "string", "tagline": "string"},
    {"description": "string", "tagline": "string"}
  ],
  "readingList": [
    {"note": "string"},
    {"note": "string"},
    {"note": "string"}
  ],
  "filmList": [
    {"note": "string"},
    {"note": "string"},
    {"note": "string"}
  ]
}

CRITICAL: Return ONLY valid JSON. No markdown code fences. No extra text. No comments.`;
}

// ─── Gemini API Call ─────────────────────────────────────────────────────────

async function callGeminiApi(prompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No text in Gemini response');
    }

    return text;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new TimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ─── Response Parsing & Validation ───────────────────────────────────────────

function parseAndValidate(rawText: string): any {
  // Strip markdown fences and extraneous text
  let cleaned = rawText.trim();

  // Remove markdown code fences
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

  // Extract JSON object: find first { and last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new ValidationError('root', 'No JSON object found in response');
  }
  cleaned = cleaned.slice(firstBrace, lastBrace + 1);

  // Parse JSON
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new ValidationError('root', 'Failed to parse JSON');
  }

  // Validate structure
  validateNonEmptyString(parsed?.person?.greeting, 'person.greeting');
  validateNonEmptyString(parsed?.person?.availableFor, 'person.availableFor');
  validateStringArray(parsed?.person?.bio, 3, 'person.bio');
  validateNonEmptyString(parsed?.quote?.reason, 'quote.reason');
  validateObjectArray(parsed?.hobbies, 8, ['description'], 'hobbies');
  validateObjectArray(parsed?.idols, 6, ['reason'], 'idols');
  validateObjectArray(parsed?.favCharacters, 3, ['reason'], 'favCharacters');
  validateObjectArray(parsed?.projects, 3, ['description', 'tagline'], 'projects');
  validateObjectArray(parsed?.readingList, 3, ['note'], 'readingList');
  validateObjectArray(parsed?.filmList, 3, ['note'], 'filmList');

  return parsed;
}

function validateNonEmptyString(value: any, field: string): void {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ValidationError(field, `${field} must be a non-empty string`);
  }
}

function validateStringArray(value: any, expectedLength: number, field: string): void {
  if (!Array.isArray(value) || value.length !== expectedLength) {
    throw new ValidationError(field, `${field} must be an array of length ${expectedLength}`);
  }
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'string' || value[i].trim().length === 0) {
      throw new ValidationError(`${field}[${i}]`, `${field}[${i}] must be a non-empty string`);
    }
  }
}

function validateObjectArray(value: any, expectedLength: number, requiredKeys: string[], field: string): void {
  if (!Array.isArray(value) || value.length !== expectedLength) {
    throw new ValidationError(field, `${field} must be an array of length ${expectedLength}`);
  }
  for (let i = 0; i < value.length; i++) {
    for (const key of requiredKeys) {
      if (typeof value[i]?.[key] !== 'string' || value[i][key].trim().length === 0) {
        throw new ValidationError(`${field}[${i}].${key}`, `${field}[${i}].${key} must be a non-empty string`);
      }
    }
  }
}
