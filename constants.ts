import { Project, SystemStat } from './types';

export const GITHUB_HANDLE = "@Fraaail";
export const GITHUB_LINK = "https://github.com/Fraaail";
export const LINKEDIN_LINK = "https://ph.linkedin.com/in/keayon-ivan-romero-59571418a";

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Dace-Website',
    description: 'A responsive single-page website for Dace\'s Samgyeopsal, implemented with React, Vite, and TypeScript. The site includes a responsive navigation bar, menu listing, location/contact section, and testimonials.',
    techStack: ['React', 'Vite', 'TypeScript'],
    link: 'https://github.com/Fraaail/Dace-Website',
    stars: 0
  }
];

export const SKILL_STATS: SystemStat[] = [
  { name: 'Python', value: 95, max: 100, unit: '%' },
  { name: 'Laravel', value: 90, max: 100, unit: '%' },
  { name: 'Windows', value: 65, max: 100, unit: '%' },
  { name: 'Linux', value: 85, max: 100, unit: '%' },
  { name: 'UI Design', value: 80, max: 100, unit: '%' },
];

export const MOCK_TERMINAL_HISTORY = [
  "Initializing ZSH...",
  "Loading plugins: git, zsh-autosuggestions, syntax-highlighting...",
  "Theme: powerlevel10k (custom purple configuration)",
  "System check: OK",
  "Welcome back, @fraaail"
];

export const FILES: Record<string, string> = {
  "about.md": "# About Me\nI am a Full Stack Computer Science Student obsessed with performance and design.\nI build things that look good and run fast.",
  "skills.txt": "Python, Laravel, Go, Windows, Linux, Hyprland, Docker, Kubernetes",
  "contact.json": "{\n  \"github\": \"@Fraaail\",\n  \"email\": \"yonkeaako@gmail.com\",\n  \"discord\": \"fraaail#0001\"\n}"
};
