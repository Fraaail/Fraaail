import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Cpu, Clock, LayoutGrid, Terminal } from 'lucide-react';
import { Workspace } from '../../types';

interface WaybarProps {
  activeWorkspace: Workspace;
  setActiveWorkspace: (ws: Workspace) => void;
}

export const Waybar: React.FC<WaybarProps> = ({ activeWorkspace, setActiveWorkspace }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full h-10 bg-black/90 border-b border-purple-900/30 flex items-center justify-between px-3 text-sm z-50 backdrop-blur-md select-none">
      
      {/* Left: Workspaces */}
      <div className="flex items-center gap-3">
        <div className="bg-[#1a0b2e] px-3 py-1 text-purple-400 flex items-center gap-2 rounded-md border border-purple-900/50">
           <LayoutGrid size={14} />
        </div>
        
        <div className="flex gap-1 bg-black p-1 rounded-md border border-neutral-800">
          {[Workspace.HOME, Workspace.PROJECTS, Workspace.STATS, Workspace.CHAT].map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`
                w-7 h-6 flex items-center justify-center rounded text-xs font-bold transition-all
                ${activeWorkspace === ws 
                  ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
                  : 'text-neutral-500 hover:bg-neutral-900 hover:text-purple-300'}
              `}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Window Title */}
      <div className="hidden md:flex items-center text-neutral-500 font-mono text-xs tracking-wider">
         <span className="text-purple-500 mr-2">➜</span>
         ~/fraaail/{activeWorkspace === Workspace.HOME ? 'home' : activeWorkspace === Workspace.PROJECTS ? 'projects' : activeWorkspace === Workspace.STATS ? 'system-monitor' : 'ai-chat'}
      </div>

      {/* Right: Modules */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-4 bg-[#1a0b2e] px-4 py-1 rounded-md border border-purple-900/50 text-purple-200">
           <div className="flex items-center gap-2">
              <Cpu size={14} className="text-purple-400" />
              <span className="text-xs font-mono">12%</span>
           </div>
           <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-purple-400" />
              <span className="text-xs font-mono">65%</span>
           </div>
           <div className="flex items-center gap-2">
              <Battery size={14} className="text-purple-400" />
              <span className="text-xs font-mono">98%</span>
           </div>
           <div className="flex items-center gap-2">
              <Wifi size={14} className="text-purple-400" />
              <span className="text-xs font-mono">WLAN</span>
           </div>
        </div>

        <div className="bg-purple-600 text-white px-3 py-1 rounded-md font-bold flex items-center gap-2 shadow-lg shadow-purple-900/20">
          <Clock size={14} />
          <span className="text-xs font-mono">{formatDate(time)} {formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
