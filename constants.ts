import { Project, SystemStat } from './types';

export const GITHUB_HANDLE = "@Fraaail";
export const GITHUB_LINK = "https://github.com/Fraaail";
export const LINKEDIN_LINK = "https://ph.linkedin.com/in/keayon-ivan-romero-59571418a";

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Dace-Website',
    description: 'A responsive single-page website for Dace\'s Samgyeopsal, implemented with React, Vite, and TypeScript.',
    techStack: ['React', 'Vite', 'TypeScript'],
    link: 'https://github.com/Fraaail/Dace-Website',
    stars: 0
  },
  {
    id: '2',
    name: 'SPLWD',
    description: 'SPLWD: Student Profiling for Learners with Disabilities in Sta. Cruz District of Laguna.',
    techStack: ['PHP', 'MySQL', 'CSS'],
    link: 'https://github.com/Fraaail/SPLWD',
    stars: 0
  },
  {
    id: '3',
    name: 'CCS Student Achievements Portfolio',
    description: 'A Windows Forms (.NET Framework 4.8) application for tracking CCS students and their achievements.',
    techStack: ['C#', '.NET Framework 4.8'],
    link: 'https://github.com/Fraaail/CCS-Student-Achievements-Portfolio',
    stars: 0
  },
  {
    id: '4',
    name: 'DogCat Information System',
    description: 'A simple Tkinter GUI for browsing short, consistent information about dog and cat breeds.',
    techStack: ['Python', 'Tkinter'],
    link: 'https://github.com/Fraaail/DogCat-Information-System',
    stars: 0
  },
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
