import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  has_readme: boolean;
  fork: boolean;
  updated_at: string;
}

interface RoastResult {
  roast: string;
  scores: { label: string; score: number }[];
  mode: 'roast' | 'praise';
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

@Component({
  selector: 'app-github-roast',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './github-roast.html',
  styleUrl: './github-roast.scss',
})
export class GitHubRoastComponent {
  username = '';
  loading = signal(false);
  error = signal('');
  result = signal<RoastResult | null>(null);
  user = signal<GitHubUser | null>(null);
  apiKeySet = signal(!!localStorage.getItem('groq_api_key'));

  private apiKey = localStorage.getItem('groq_api_key') ?? '';

  setApiKey(key: string) {
    this.apiKey = key.trim();
    localStorage.setItem('groq_api_key', this.apiKey);
    this.apiKeySet.set(true);
  }

  async analyze(mode: 'roast' | 'praise') {
    const name = this.username.trim();
    if (!name) {
      this.error.set('Enter a GitHub username!');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.result.set(null);

    try {
      // Fetch user
      const userRes = await fetch(`https://api.github.com/users/${name}`);
      if (!userRes.ok) throw new Error('User not found');
      const userData: GitHubUser = await userRes.json();
      this.user.set(userData);

      // Fetch repos (up to 30)
      const reposRes = await fetch(`https://api.github.com/users/${name}/repos?per_page=30&sort=updated`);
      const repos: GitHubRepo[] = await reposRes.json();

      // Build analysis
      const analysis = this.buildAnalysis(userData, repos);

      // Generate roast/praise via Groq
      const text = await this.generateWithAI(analysis, mode);
      const scores = this.generateScores(userData, repos, mode);

      this.result.set({ roast: text, scores, mode });
    } catch (e: any) {
      this.error.set(e.message ?? 'Something went wrong');
    } finally {
      this.loading.set(false);
    }
  }

  private buildAnalysis(user: GitHubUser, repos: GitHubRepo[]): string {
    const languages = repos.map((r) => r.language).filter(Boolean);
    const langCount: Record<string, number> = {};
    languages.forEach((l) => { langCount[l!] = (langCount[l!] || 0) + 1; });
    const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'None';

    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
    const ownRepos = repos.filter((r) => !r.fork);
    const repoNames = ownRepos.map((r) => r.name);
    const noDesc = ownRepos.filter((r) => !r.description).length;
    const accountAge = new Date().getFullYear() - new Date(user.created_at).getFullYear();

    return `GitHub Profile Analysis for ${user.login}:
- Name: ${user.name ?? 'Not set'}
- Bio: ${user.bio ?? 'Empty'}
- Public repos: ${user.public_repos}
- Own repos (not forks): ${ownRepos.length}
- Followers: ${user.followers}
- Following: ${user.following}
- Account age: ${accountAge} years
- Top language: ${topLang}
- Total stars: ${totalStars}
- Total forks: ${totalForks}
- Repos without description: ${noDesc}/${ownRepos.length}
- Sample repo names: ${repoNames.slice(0, 10).join(', ')}
- Languages used: ${Object.keys(langCount).join(', ')}`;
  }

  private async generateWithAI(analysis: string, mode: 'roast' | 'praise'): Promise<string> {
    if (!this.apiKey) {
      return this.generateFallback(mode);
    }

    const prompt = mode === 'roast'
      ? `You are a brutally funny coding roast comedian. Based on this GitHub profile data, write a short, savage roast (3-5 punchy lines). Be creative, specific to their data, and hilarious. No intro, just the roast. Keep it fun, not mean-spirited.\n\n${analysis}`
      : `You are an encouraging developer mentor. Based on this GitHub profile data, write a short, genuine praise (3-5 lines). Highlight what they're doing right. Be specific to their data. No intro, just the praise.\n\n${analysis}`;

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 250,
          temperature: 0.9,
        }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() ?? this.generateFallback(mode);
    } catch {
      return this.generateFallback(mode);
    }
  }

  private generateFallback(mode: 'roast' | 'praise'): string {
    const user = this.user();
    if (!user) return 'Could not generate text.';

    if (mode === 'roast') {
      const roasts = [
        `${user.public_repos} repositories and ${user.followers} followers. The math isn't mathing.`,
        `Your bio is ${user.bio ? '"' + user.bio + '"' : 'empty'}. At least commit to something in life.`,
        `Account created in ${new Date(user.created_at).getFullYear()}. That's a lot of years for ${user.followers} followers.`,
      ];
      return roasts.join('\n');
    } else {
      return `${user.public_repos} public repos shows real dedication. Keep shipping!`;
    }
  }

  private generateScores(user: GitHubUser, repos: GitHubRepo[], mode: 'roast' | 'praise'): { label: string; score: number }[] {
    const ownRepos = repos.filter((r) => !r.fork);
    const noDesc = ownRepos.filter((r) => !r.description).length;
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

    // Base scores (semi-random but data-influenced)
    const docScore = Math.max(0, Math.min(100, Math.round(((ownRepos.length - noDesc) / Math.max(ownRepos.length, 1)) * 100)));
    const namingScore = Math.max(5, Math.min(95, 50 + Math.round(Math.random() * 30) - 15));
    const consistencyScore = Math.max(10, Math.min(100, Math.round((user.public_repos / Math.max(new Date().getFullYear() - new Date(user.created_at).getFullYear(), 1)) * 8)));
    const starScore = Math.min(100, Math.round(totalStars * 2));

    if (mode === 'praise') {
      return [
        { label: 'Documentation', score: Math.min(100, docScore + 20) },
        { label: 'Consistency', score: Math.min(100, consistencyScore + 15) },
        { label: 'Community Impact', score: Math.min(100, starScore + 10) },
        { label: 'Dedication', score: Math.min(100, 60 + Math.round(Math.random() * 30)) },
      ];
    }

    return [
      { label: 'Code Quality', score: Math.max(10, 40 + Math.round(Math.random() * 40)) },
      { label: 'Naming Skills', score: namingScore },
      { label: 'Documentation', score: docScore },
      { label: 'Touch Grass', score: Math.max(0, Math.min(30, 30 - Math.round(user.public_repos / 3))) },
    ];
  }

  scoreColor(score: number): string {
    if (score >= 70) return '#4ade80';
    if (score >= 40) return '#facc15';
    return '#ef4444';
  }
}
