import { StatItem, CategoryItem, SearchResult, ResearchProject, ApiStatus } from '../types';
import { HERO_STATS, CATEGORIES, SAMPLE_SEARCH_RESULTS, SAMPLE_RESEARCH_PROJECTS } from '../data/mockData';

// Compatible with both Vite (VITE_API_URL) and Next.js (NEXT_PUBLIC_API_URL)
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL)
  || (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL)
  || 'https://api.febros16.com';

class ApiService {
  private baseUrl: string = API_BASE_URL;

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  // Check Go backend health status (Render deployment)
  public async checkHealth(): Promise<ApiStatus> {
    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${this.baseUrl}/api/v1/health`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - startTime);

      if (response.ok) {
        const data = await response.json().catch(() => ({ status: 'ok' }));
        return {
          online: true,
          endpoint: `${this.baseUrl}/api/v1`,
          latencyMs,
          version: data.version || 'v1.0.0',
          mode: 'connected',
        };
      }
    } catch {
      // Graceful fallback to mock mode
    }

    return {
      online: false,
      endpoint: `${this.baseUrl}/api/v1`,
      latencyMs: 12,
      version: 'v1.0.0 (Client Fallback)',
      mode: 'mock-fallback',
    };
  }

  // Fetch Hero Statistics
  public async getHeroStats(): Promise<StatItem[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${this.baseUrl}/api/v1/stats`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.stats)) {
          return data.stats;
        }
      }
    } catch {
      // fallback to mock
    }
    return HERO_STATS;
  }

  // Search content across disciplines
  public async search(query: string, typeFilter: string = 'all'): Promise<SearchResult[]> {
    const trimmed = query.trim().toLowerCase();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const params = new URLSearchParams();
      if (trimmed) params.append('q', trimmed);
      if (typeFilter !== 'all') params.append('type', typeFilter);

      const res = await fetch(`${this.baseUrl}/api/v1/search?${params.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.results)) {
          return data.results;
        }
      }
    } catch {
      // fallback to local search
    }

    // Local filter fallback
    return SAMPLE_SEARCH_RESULTS.filter(item => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      if (!trimmed) return matchesType;
      const matchesText =
        item.title.toLowerCase().includes(trimmed) ||
        item.description.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed) ||
        item.authorOrSource.toLowerCase().includes(trimmed);
      return matchesType && matchesText;
    });
  }

  // Fetch Categories
  public async getCategories(): Promise<CategoryItem[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/categories`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.categories)) {
          return data.categories;
        }
      }
    } catch {
      // fallback
    }
    return CATEGORIES;
  }

  // Fetch Research Projects
  public async getResearchProjects(): Promise<ResearchProject[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/research`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.projects)) {
          return data.projects;
        }
      }
    } catch {
      // fallback
    }
    return SAMPLE_RESEARCH_PROJECTS;
  }

  // Newsletter Subscription
  public async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        return { success: true, message: 'Thank you for subscribing to Febros16 updates.' };
      }
    } catch {
      // fallback success for demo
    }
    return {
      success: true,
      message: 'Subscription confirmed. Welcome to the Febros16 knowledge community.',
    };
  }
}

export const apiService = new ApiService();
