export type ContentType = 'article' | 'research' | 'resource' | 'opportunity' | 'campaign';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  count: number;
  suffix: string;
  description: string;
}

export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'GraduationCap' | 'FolderGit2' | 'Boxes' | 'Sparkles' | 'Flag';
  route: string;
  actionText: string;
  highlights: string[];
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  featuredTopics: string[];
  gradient: string;
  accentColor: string;
  icon: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ContentType;
  date: string;
  authorOrSource: string;
  badge: string;
  url?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  researchQuestion: string;
  objectives: string[];
  status: 'In Progress' | 'Peer Review' | 'Completed' | 'Published';
  sourcesCount: number;
  notesCount: number;
  findingsCount: number;
  updatedAt: string;
  tags: string[];
}

export interface ApiStatus {
  online: boolean;
  endpoint: string;
  latencyMs?: number;
  version?: string;
  mode: 'connected' | 'mock-fallback';
}
