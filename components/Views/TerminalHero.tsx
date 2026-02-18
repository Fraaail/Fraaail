import React, { useState, useEffect, useRef } from 'react';
import { MOCK_TERMINAL_HISTORY, GITHUB_HANDLE, GITHUB_LINK, FILES } from '../../constants';
import { WindowFrame } from '../Layout/WindowFrame';
import { Terminal as TerminalIcon, Github, Mail, Linkedin, Globe } from 'lucide-react';

interface TerminalLine {
  type: 'output' | 'command';
  content: string;
}

export const TerminalHero: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [bootSequence, setBootSequence] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial boot sequence effect
  useEffect(() => {
    let delay = 0;
    MOCK_TERMINAL_HISTORY.forEach((line, index) => {
      delay += 400 + Math.random() * 300;
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', content: line }]);
        if (index === MOCK_TERMINAL_HISTORY.length - 1) {
          setBootSequence(false);
          // Auto-focus input after boot
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootSequence]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'command', content: input } as TerminalLine];
    const args = cmd.split(' ');
    const commandName = args[0];

    let output = "";

    switch (commandName) {
      case 'help':
        output = "Available commands:\n  help      - Show this help message\n  ls        - List files\n  cat [file]- Display file content\n  clear     - Clear terminal\n  whoami    - Display current user\n  open [url]- Open a website (e.g., open github)";
        break;
      case 'ls':
        output = Object.keys(FILES).join('   ');
        break;
      case 'cat':
        if (args[1]) {
          if (FILES[args[1]]) {
             output = FILES[args[1]];
          } else {
             output = `cat: ${args[1]}: No such file or directory`;
          }
        } else {
          output = "usage: cat [file]";
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        output = "fraaail";
        break;
      case 'open':
        if (args[1] === 'github') {
            window.open(GITHUB_LINK, '_blank');
            output = "Opening GitHub...";
        } else {
            output = "usage: open github";
        }
        break;
      case 'sudo':
        output = "user is not in the sudoers file. This incident will be reported.";
        break;
      default:
        output = `zsh: command not found: ${commandName}`;
    }

    if (output) {
        setHistory([...newHistory, { type: 'output', content: output }]);
    } else {
        setHistory(newHistory);
    }
    setInput('');
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-2 md:p-4">
      {/* Left Window: Introduction / Web Browser Look */}
      <WindowFrame title="Firefox Developer Edition" isActive={true} className="md:col-span-1 border-purple-500">
        <div className="p-8 flex flex-col justify-center h-full space-y-8 bg-[#0a0a0a]">
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-purple-900/30 text-purple-400 text-xs font-mono border border-purple-500/30">
               v2.0.0-release
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">
              FRAA<span className="text-purple-500">AIL</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light">
              Designing interfaces that <span className="text-white italic">feel</span> like magic.
            </p>
          </div>
          
          <div className="space-y-4 text-neutral-300 border-l-4 border-purple-500 pl-6 py-2">
            <p className="leading-relaxed">
              Full Stack Computer Science Student specializing in Python, Laravel, and OS Management.
              I create high-performance applications that helps local clients and businesses.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded hover:bg-purple-100 transition-colors">
              <Github size={20} />
              <span>GitHub</span>
            </a>
             <a href="#" className="flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-purple-500 hover:text-purple-400 transition-colors rounded text-neutral-300">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </WindowFrame>

      {/* Right Window: Interactive Terminal */}
      <WindowFrame title="Alacritty - zsh" className="md:col-span-1 bg-[#050505]" isActive={false}>
        <div className="p-4 font-mono text-sm h-full flex flex-col overflow-hidden" onClick={focusInput}>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
            {history.map((line, i) => (
              <div key={i} className="break-words">
                {line.type === 'command' ? (
                   <div className="flex gap-2">
                      <span className="text-purple-500 font-bold">➜</span>
                      <span className="text-cyan-400 font-bold">~</span>
                      <span className="text-neutral-300">{line.content}</span>
                   </div>
                ) : (
                   <div className="text-neutral-400 whitespace-pre-wrap pl-6">{line.content}</div>
                )}
              </div>
            ))}
            
            {!bootSequence && (
               <form onSubmit={handleCommand} className="flex gap-2 items-center mt-2">
                  <span className="text-purple-500 font-bold">➜</span>
                  <span className="text-cyan-400 font-bold">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-neutral-700"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                  />
               </form>
            )}
            <div ref={bottomRef} />
          </div>
          
          {/* Status Bar for Terminal */}
          <div className="mt-2 pt-2 border-t border-neutral-900 flex justify-between text-[10px] text-neutral-600 uppercase tracking-widest">
             <span>zsh 5.9</span>
             <span>utf-8</span>
          </div>
        </div>
      </WindowFrame>
    </div>
  );
};
