import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface WindowFrameProps {
  children: ReactNode;
  title: string;
  className?: string;
  isActive?: boolean;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ children, title, className = "", isActive = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative flex flex-col bg-black border 
        ${isActive ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'border-neutral-800'} 
        rounded-lg overflow-hidden transition-all duration-300 h-full w-full
        ${className}
      `}
    >
      {/* Title Bar */}
      <div className={`
        flex items-center justify-between px-4 py-2 border-b 
        ${isActive ? 'bg-[#0f0518] text-purple-300 border-purple-500/30' : 'bg-neutral-950 text-neutral-500 border-neutral-800'}
        transition-colors duration-300
      `}>
        <span className="text-xs font-bold tracking-wider uppercase font-mono">{title}</span>
        <div className="flex gap-2">
           {/* Ubuntu-ish window controls */}
          <div className="w-3 h-3 rounded-full bg-[#E95420] hover:opacity-80 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-neutral-600 hover:opacity-80 transition-opacity"></div>
          <div className="w-3 h-3 rounded-full bg-neutral-600 hover:opacity-80 transition-opacity"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-0 scrollbar-hide bg-black/90">
        {children}
      </div>
    </motion.div>
  );
};
