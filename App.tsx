import React, { useState } from 'react';
import { Workspace } from './types';
import { Waybar } from './components/Layout/Waybar';
import { TerminalHero } from './components/Views/TerminalHero';
import { ProjectGrid } from './components/Views/ProjectGrid';
import { StatsView } from './components/Views/StatsView';
import { AiChat } from './components/Views/AiChat';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(Workspace.HOME);

  // Background pattern for the "Hyprland" desktop feel
  const backgroundStyle = {
    backgroundImage: 'radial-gradient(circle at 1px 1px, #262626 1px, transparent 0)',
    backgroundSize: '40px 40px',
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col font-mono relative overflow-hidden">
      
      {/* Desktop Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={backgroundStyle}></div>

      {/* Top Bar (Waybar) */}
      <Waybar activeWorkspace={activeWorkspace} setActiveWorkspace={setActiveWorkspace} />

      {/* Main Workspace Area */}
      <main className="flex-1 relative overflow-hidden p-2 md:p-4 z-10">
        <AnimatePresence mode="wait">
          {activeWorkspace === Workspace.HOME && (
            <motion.div
              key="home"
              className="h-full w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.2 }}
            >
              <TerminalHero />
            </motion.div>
          )}

          {activeWorkspace === Workspace.PROJECTS && (
            <motion.div
              key="projects"
              className="h-full w-full"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ProjectGrid />
            </motion.div>
          )}

          {activeWorkspace === Workspace.STATS && (
            <motion.div
              key="stats"
              className="h-full w-full"
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <StatsView />
            </motion.div>
          )}

          {activeWorkspace === Workspace.CHAT && (
            <motion.div
              key="chat"
              className="h-full w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AiChat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button (Mobile Only context) - Not strictly needed for Hyprland vibe but good for UX if needed. 
          Skipping to keep clean aesthetic. */}
      
    </div>
  );
};

export default App;
