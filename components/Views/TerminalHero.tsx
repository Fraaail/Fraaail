import React, { useState, useEffect, useRef } from 'react';
import { MOCK_TERMINAL_HISTORY, GITHUB_HANDLE } from '../../constants';
import { WindowFrame } from '../Layout/WindowFrame';
import { Terminal as TerminalIcon, Github, Mail, Linkedin } from 'lucide-react';

export const TerminalHero: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex < MOCK_TERMINAL_HISTORY.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, MOCK_TERMINAL_HISTORY[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 300 + Math.random() * 400); // Random typing delay
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-4">
      {/* Left Window: Introduction */}
      <WindowFrame title="README.md" isActive={true} className="md:col-span-1">
        <div className="p-6 md:p-10 flex flex-col justify-center h-full space-y-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tighter text-white">
              FRAA<span className="text-neutral-500">AIL</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl">
              Full Stack Engineer &amp; UI Designer
            </p>
          </div>
          
          <div className="space-y-4 text-neutral-300 border-l-2 border-neutral-700 pl-4">
            <p>
              Obsessed with performance, tiling window managers, and pixel-perfect UIs.
              Building digital experiences that feel like native system tools.
            </p>
            <p>
              Currently exploring Rust, WebAssembly, and AI Agents.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <a href="#" className="flex items-center gap-2 px-4 py-2 border border-neutral-700 hover:bg-white hover:text-black hover:border-white transition-all rounded-sm group">
              <Github size={18} />
              <span>{GITHUB_HANDLE}</span>
            </a>
             <a href="#" className="flex items-center gap-2 px-4 py-2 border border-neutral-700 hover:bg-white hover:text-black hover:border-white transition-all rounded-sm group">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
             <a href="#" className="flex items-center gap-2 px-4 py-2 border border-neutral-700 hover:bg-white hover:text-black hover:border-white transition-all rounded-sm group">
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </WindowFrame>

      {/* Right Window: Terminal */}
      <WindowFrame title="Alacritty" className="md:col-span-1 bg-neutral-950/50">
        <div className="p-4 font-mono text-sm md:text-base h-full flex flex-col">
          <div className="flex-1 space-y-2">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-2 text-green-400">
                <span className="text-blue-400">➜</span>
                <span className="text-pink-400">~</span>
                <span>{line}</span>
              </div>
            ))}
            
            {currentLineIndex >= MOCK_TERMINAL_HISTORY.length && (
              <div className="mt-6 space-y-2">
                 <div className="text-neutral-500 mb-4"># Recent Activity</div>
                 <div className="grid grid-cols-2 gap-2 text-neutral-300">
                    <div className="flex items-center gap-2">
                        <TerminalIcon size={14} className="text-yellow-400" />
                        <span>Fixed memory leak in void-term</span>
                    </div>
                     <div className="text-right text-neutral-600 text-xs">2h ago</div>
                     
                     <div className="flex items-center gap-2">
                        <TerminalIcon size={14} className="text-yellow-400" />
                        <span>Refactored grid layout engine</span>
                    </div>
                     <div className="text-right text-neutral-600 text-xs">5h ago</div>

                     <div className="flex items-center gap-2">
                        <TerminalIcon size={14} className="text-yellow-400" />
                        <span>Deployed new docs to edge</span>
                    </div>
                     <div className="text-right text-neutral-600 text-xs">1d ago</div>
                 </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <span className="text-blue-400">➜</span>
            <span className="text-pink-400">~</span>
            <span className="text-white">_</span>
            <span className="cursor-blink w-2 h-5 bg-white block"></span>
          </div>
          <div ref={bottomRef} />
        </div>
      </WindowFrame>
    </div>
  );
};
