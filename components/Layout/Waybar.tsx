import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Cpu, Clock, LayoutGrid } from 'lucide-react';
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
    <div className="w-full h-10 bg-black/80 border-b border-neutral-800 flex items-center justify-between px-2 text-sm z-50 backdrop-blur-sm select-none">
      
      {/* Left: Workspaces */}
      <div className="flex items-center gap-2">
        <div className="bg-neutral-900 px-3 py-1 text-neutral-400 flex items-center gap-2 rounded-sm border border-neutral-800">
           <LayoutGrid size={14} />
        </div>
        
        <div className="flex gap-1 bg-neutral-900 p-1 rounded-sm border border-neutral-800">
          {[Workspace.HOME, Workspace.PROJECTS, Workspace.STATS, Workspace.CHAT].map((ws) => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`
                w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold transition-all
                ${activeWorkspace === ws 
                  ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' 
                  : 'text-neutral-500 hover:bg-neutral-800 hover:text-white'}
              `}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Window Title (Simulated) */}
      <div className="hidden md:flex items-center text-neutral-500 font-medium">
         ~/fraaail/{activeWorkspace === Workspace.HOME ? 'home' : activeWorkspace === Workspace.PROJECTS ? 'projects' : activeWorkspace === Workspace.STATS ? 'system-monitor' : 'ai-chat'}
      </div>

      {/* Right: Modules */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 bg-neutral-900 px-3 py-1 rounded-sm border border-neutral-800 text-neutral-300">
           <div className="flex items-center gap-1">
              <Cpu size={14} />
              <span className="text-xs">12%</span>
           </div>
           <div className="flex items-center gap-1">
              <Volume2 size={14} />
              <span className="text-xs">65%</span>
           </div>
           <div className="flex items-center gap-1">
              <Battery size={14} />
              <span className="text-xs">98%</span>
           </div>
           <div className="flex items-center gap-1">
              <Wifi size={14} />
              <span className="text-xs">WLAN</span>
           </div>
        </div>

        <div className="bg-white text-black px-3 py-1 rounded-sm font-bold flex items-center gap-2 border border-white">
          <Clock size={14} />
          <span>{formatDate(time)} {formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
