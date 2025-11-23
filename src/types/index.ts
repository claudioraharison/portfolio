export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  level?: number;
  category: 'frontend' | 'backend' | 'tools' | 'autres';
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}