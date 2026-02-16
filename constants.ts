import { Project, SystemStat } from './types';

export const GITHUB_HANDLE = "@Fraaail";
export const GITHUB_LINK = "https://github.com/Fraaail";

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'dotfiles',
    description: 'My personal Arch Linux Hyprland configuration. Optimized for workflow speed and aesthetics.',
    techStack: ['Lua', 'Shell', 'Hyprlang'],
    link: 'https://github.com/Fraaail/dotfiles',
    stars: 1240
  },
  {
    id: '2',
    name: 'nvim-astral',
    description: 'A blazing fast Neovim configuration built for React and TypeScript development.',
    techStack: ['Lua', 'VimScript'],
    link: 'https://github.com/Fraaail/nvim-astral',
    stars: 850
  },
  {
    id: '3',
    name: 'react-tiling-grid',
    description: 'A React component library that mimics the behavior of tiling window managers for the web.',
    techStack: ['React', 'TypeScript', 'Framer Motion'],
    link: 'https://github.com/Fraaail/react-tiling-grid',
    stars: 430
  },
  {
    id: '4',
    name: 'void-term',
    description: 'GPU-accelerated terminal emulator built with Rust and WGPU.',
    techStack: ['Rust', 'WGPU', 'OpenGL'],
    link: 'https://github.com/Fraaail/void-term',
    stars: 2100
  }
];

export const SKILL_STATS: SystemStat[] = [
  { name: 'TypeScript', value: 95, max: 100, unit: '%' },
  { name: 'React', value: 90, max: 100, unit: '%' },
  { name: 'Rust', value: 65, max: 100, unit: '%' },
  { name: 'Linux/Unix', value: 85, max: 100, unit: '%' },
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
  "about.md": "# About Me\nI am a Full Stack Engineer obsessed with performance and design.\nI build things that look good and run fast.",
  "skills.txt": "TypeScript, React, Rust, Go, Linux, Hyprland, Docker, Kubernetes",
  "contact.json": "{\n  \"github\": \"@Fraaail\",\n  \"email\": \"contact@fraaail.dev\",\n  \"discord\": \"fraaail#0001\"\n}"
};
