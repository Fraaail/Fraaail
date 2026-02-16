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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // Apple-like easeOutExpo roughly
      className={`
        relative flex flex-col bg-black border 
        ${isActive ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-neutral-800'} 
        rounded-sm overflow-hidden transition-colors duration-300 h-full w-full
        ${className}
      `}
    >
      {/* Title Bar */}
      <div className={`
        flex items-center justify-between px-3 py-2 border-b 
        ${isActive ? 'bg-white text-black border-white' : 'bg-neutral-950 text-neutral-500 border-neutral-800'}
        transition-colors duration-300
      `}>
        <span className="text-xs font-bold tracking-wider uppercase">{title}</span>
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-neutral-700'}`}></div>
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black/50' : 'bg-neutral-700'}`}></div>
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black/30' : 'bg-neutral-700'}`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-0 scrollbar-hide">
        {children}
      </div>
    </motion.div>
  );
};
