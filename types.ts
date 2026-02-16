export enum Workspace {
  HOME = 1,
  PROJECTS = 2,
  STATS = 3,
  CHAT = 4
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  stars: number;
}

export interface SystemStat {
  name: string;
  value: number;
  max: number;
  unit: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
