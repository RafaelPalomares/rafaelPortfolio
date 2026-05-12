import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

// ─── Raw API shapes ───────────────────────────────────────────────────────────

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; effort: number; stat: { name: string } }[];
  moves: {
    move: { name: string };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: { name: string };
      version_group: { name: string };
    }[];
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': { front_default: string; front_shiny: string };
      home: { front_default: string; front_shiny: string };
      dream_world: { front_default: string };
      showdown: { front_default: string; front_shiny: string; back_default: string };
    };
    versions: {
      'generation-vii': {
        'ultra-sun-ultra-moon': { front_default: string; front_shiny: string };
        icons: { front_default: string };
      };
    };
  };
  cries: { latest: string; legacy: string | null };
}

interface SpeciesData {
  id: number;
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string }; version: { name: string } }[];
  capture_rate: number;
  base_happiness: number;
  hatch_counter: number;
  gender_rate: number;
  egg_groups: { name: string }[];
  growth_rate: { name: string };
  generation: { name: string };
  shape: { name: string };
  color: { name: string };
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: { url: string };
}

interface EvolutionNode {
  species: { name: string; url: string };
  evolution_details: { trigger: { name: string }; min_level: number | null; item: { name: string } | null }[];
  evolves_to: EvolutionNode[];
}

interface EvolutionChain {
  chain: EvolutionNode;
}

interface AbilityData {
  name: string;
  effect_entries: { short_effect: string; language: { name: string } }[];
}

// ─── Processed shapes ─────────────────────────────────────────────────────────

export interface EvolutionStep {
  name: string;
  id: number;
  artworkUrl: string;
  trigger: string;
  level: number | null;
  item: string | null;
}

export interface MoveEntry {
  name: string;
  level: number;
  method: string;
  game: string;
}

export interface RowletInfo {
  // Identity
  id: number;
  name: string;
  genus: string;
  generation: string;
  color: string;
  shape: string;
  // Flavor texts per game
  flavorTexts: { game: string; text: string }[];
  // Physical
  height: string;
  weight: string;
  // Training
  baseExp: number;
  captureRate: number;
  baseHappiness: number;
  growthRate: string;
  evYield: { stat: string; value: number }[];
  // Breeding
  genderRatio: { male: number; female: number } | null;
  eggGroups: string[];
  hatchSteps: number;
  // Types & abilities
  types: string[];
  abilities: { name: string; hidden: boolean; effect: string }[];
  // Stats
  stats: { name: string; value: number; max: number }[];
  totalStats: number;
  // Moves (Sun/Moon level-up)
  levelUpMoves: MoveEntry[];
  machineMoves: string[];
  eggMoves: string[];
  tutorMoves: string[];
  // Evolution
  evolutionChain: EvolutionStep[];
  // Sprites
  artworkUrl: string;
  shinyUrl: string;
  homeUrl: string;
  homeShinyUrl: string;
  dreamWorldUrl: string;
  showdownGif: string;
  showdownShinyGif: string;
  showdownBackGif: string;
  spriteDefault: string;
  spriteShiny: string;
  spriteBack: string;
  spriteBackShiny: string;
  iconUrl: string;
  // Cry
  cryUrl: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STAT_MAX: Record<string, number> = {
  hp: 255, attack: 190, defense: 230,
  'special-attack': 194, 'special-defense': 230, speed: 200,
};

const STAT_LABEL: Record<string, string> = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', speed: 'SPD',
};

const GAME_LABEL: Record<string, string> = {
  'sun': 'Sun', 'moon': 'Moon', 'ultra-sun': 'Ultra Sun', 'ultra-moon': 'Ultra Moon',
  'sword': 'Sword', 'shield': 'Shield', 'legends-arceus': 'Legends: Arceus',
  'scarlet': 'Scarlet', 'violet': 'Violet',
};

function idFromUrl(url: string): number {
  return parseInt(url.split('/').filter(Boolean).pop() ?? '0', 10);
}

@Component({
  selector: 'app-rowlet',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './rowlet.html',
  styleUrl: './rowlet.scss',
})
export class RowletComponent implements OnInit {
  private http = inject(HttpClient);

  rowlet = signal<RowletInfo | null>(null);
  loading = signal(true);
  error = signal(false);

  // UI state
  showShiny = signal(false);
  activeTab = signal<'overview' | 'moves' | 'sprites' | 'evolution'>('overview');
  activeMoveTab = signal<'level-up' | 'machine' | 'egg' | 'tutor'>('level-up');
  playingCry = signal(false);
  activeFlavorIdx = signal(0);

  currentArtwork = computed(() =>
    this.showShiny() ? this.rowlet()?.shinyUrl : this.rowlet()?.artworkUrl
  );

  currentShowdown = computed(() =>
    this.showShiny() ? this.rowlet()?.showdownShinyGif : this.rowlet()?.showdownGif
  );

  ngOnInit() {
    forkJoin({
      pokemon: this.http.get<PokemonData>('https://pokeapi.co/api/v2/pokemon/rowlet'),
      species: this.http.get<SpeciesData>('https://pokeapi.co/api/v2/pokemon-species/rowlet'),
      overgrow: this.http.get<AbilityData>('https://pokeapi.co/api/v2/ability/65/'),
      longReach: this.http.get<AbilityData>('https://pokeapi.co/api/v2/ability/203/'),
    }).subscribe({
      next: ({ pokemon, species, overgrow, longReach }) => {
        // Flavor texts — unique per game, English only
        const seen = new Set<string>();
        const flavorTexts: { game: string; text: string }[] = [];
        for (const e of species.flavor_text_entries) {
          if (e.language.name !== 'en') continue;
          const text = e.flavor_text.replace(/[\n\f]/g, ' ');
          if (!seen.has(text)) {
            seen.add(text);
            flavorTexts.push({ game: GAME_LABEL[e.version.name] ?? e.version.name, text });
          }
        }

        // Abilities with effects
        const abilityEffects: Record<string, string> = {
          overgrow: overgrow.effect_entries.find(e => e.language.name === 'en')?.short_effect ?? '',
          'long-reach': longReach.effect_entries.find(e => e.language.name === 'en')?.short_effect ?? '',
        };

        // Moves grouped by method (Sun/Moon for level-up, all games for others)
        const levelUpMoves: MoveEntry[] = [];
        const machineMoves = new Set<string>();
        const eggMoves = new Set<string>();
        const tutorMoves = new Set<string>();

        for (const m of pokemon.moves) {
          const name = m.move.name.replace(/-/g, ' ');
          for (const vg of m.version_group_details) {
            const method = vg.move_learn_method.name;
            const game = vg.version_group.name;
            if (method === 'level-up' && (game === 'sun-moon' || game === 'sword-shield')) {
              if (!levelUpMoves.find(x => x.name === name && x.game === game)) {
                levelUpMoves.push({ name, level: vg.level_learned_at, method, game });
              }
            } else if (method === 'machine') {
              machineMoves.add(name);
            } else if (method === 'egg') {
              eggMoves.add(name);
            } else if (method === 'tutor') {
              tutorMoves.add(name);
            }
          }
        }
        levelUpMoves.sort((a, b) => a.level - b.level);

        // EV yield
        const evYield = pokemon.stats
          .filter(s => s.effort > 0)
          .map(s => ({ stat: STAT_LABEL[s.stat.name] ?? s.stat.name, value: s.effort }));

        // Gender ratio (gender_rate is in eighths female; -1 = genderless)
        const genderRatio = species.gender_rate === -1 ? null : {
          female: Math.round((species.gender_rate / 8) * 100),
          male: Math.round(((8 - species.gender_rate) / 8) * 100),
        };

        // Hatch steps
        const hatchSteps = (species.hatch_counter + 1) * 255;

        // Stats
        const stats = pokemon.stats.map(s => ({
          name: STAT_LABEL[s.stat.name] ?? s.stat.name,
          value: s.base_stat,
          max: STAT_MAX[s.stat.name] ?? 255,
        }));
        const totalStats = stats.reduce((sum, s) => sum + s.value, 0);

        // Evolution chain — fetch separately
        this.http.get<EvolutionChain>(species.evolution_chain.url).subscribe(evo => {
          const chain: EvolutionStep[] = [];
          const walk = (node: EvolutionNode) => {
            const id = idFromUrl(node.species.url);
            const detail = node.evolution_details[0];
            chain.push({
              name: node.species.name,
              id,
              artworkUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              trigger: detail?.trigger?.name ?? 'base',
              level: detail?.min_level ?? null,
              item: detail?.item?.name?.replace(/-/g, ' ') ?? null,
            });
            for (const child of node.evolves_to) walk(child);
          };
          walk(evo.chain);

          this.rowlet.set({
            id: pokemon.id,
            name: 'Rowlet',
            genus: species.genera.find(g => g.language.name === 'en')?.genus ?? '',
            generation: species.generation.name.replace('generation-', 'Gen ').toUpperCase(),
            color: species.color.name,
            shape: species.shape.name,
            flavorTexts,
            height: `${(pokemon.height * 0.1).toFixed(1)} m`,
            weight: `${(pokemon.weight * 0.1).toFixed(1)} kg`,
            baseExp: pokemon.base_experience,
            captureRate: species.capture_rate,
            baseHappiness: species.base_happiness,
            growthRate: species.growth_rate.name.replace(/-/g, ' '),
            evYield,
            genderRatio,
            eggGroups: species.egg_groups.map(g => g.name),
            hatchSteps,
            types: pokemon.types.map(t => t.type.name),
            abilities: pokemon.abilities.map(a => ({
              name: a.ability.name.replace(/-/g, ' '),
              hidden: a.is_hidden,
              effect: abilityEffects[a.ability.name] ?? '',
            })),
            stats,
            totalStats,
            levelUpMoves,
            machineMoves: [...machineMoves].sort(),
            eggMoves: [...eggMoves].sort(),
            tutorMoves: [...tutorMoves].sort(),
            evolutionChain: chain,
            artworkUrl: pokemon.sprites.other['official-artwork'].front_default,
            shinyUrl: pokemon.sprites.other['official-artwork'].front_shiny,
            homeUrl: pokemon.sprites.other.home.front_default,
            homeShinyUrl: pokemon.sprites.other.home.front_shiny,
            dreamWorldUrl: pokemon.sprites.other.dream_world.front_default,
            showdownGif: pokemon.sprites.other.showdown.front_default,
            showdownShinyGif: pokemon.sprites.other.showdown.front_shiny,
            showdownBackGif: pokemon.sprites.other.showdown.back_default,
            spriteDefault: pokemon.sprites.front_default,
            spriteShiny: pokemon.sprites.front_shiny,
            spriteBack: pokemon.sprites.back_default,
            spriteBackShiny: pokemon.sprites.back_shiny,
            iconUrl: pokemon.sprites.versions['generation-vii'].icons.front_default,
            cryUrl: pokemon.cries.latest,
          });
          this.loading.set(false);
        });
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  toggleShiny() { this.showShiny.update(v => !v); }
  setTab(tab: 'overview' | 'moves' | 'sprites' | 'evolution') { this.activeTab.set(tab); }
  setMoveTab(tab: 'level-up' | 'machine' | 'egg' | 'tutor') { this.activeMoveTab.set(tab); }

  nextFlavor() {
    const r = this.rowlet();
    if (!r) return;
    this.activeFlavorIdx.update(i => (i + 1) % r.flavorTexts.length);
  }
  prevFlavor() {
    const r = this.rowlet();
    if (!r) return;
    this.activeFlavorIdx.update(i => (i - 1 + r.flavorTexts.length) % r.flavorTexts.length);
  }

  playCry(url: string) {
    if (this.playingCry()) return;
    this.playingCry.set(true);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => this.playingCry.set(false);
  }

  statPercent(value: number, max: number): number {
    return Math.round((value / max) * 100);
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
