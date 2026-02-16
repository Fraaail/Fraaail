import React from 'react';
import { PROJECTS } from '../../constants';
import { WindowFrame } from '../Layout/WindowFrame';
import { Folder, Star, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectGrid: React.FC = () => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min pb-20">
        
        {/* Header Block */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
             <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold mb-2 flex items-center gap-2"
             >
                <Folder className="text-yellow-400" />
                ~/projects
             </motion.h2>
             <div className="h-px bg-neutral-800 w-full"></div>
        </div>

        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-64"
          >
            <WindowFrame title={project.name} className="group hover:border-neutral-500 transition-colors">
              <div className="p-5 flex flex-col h-full justify-between bg-neutral-900/20 group-hover:bg-neutral-900/40 transition-colors">
                
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Folder size={32} className="text-neutral-400 group-hover:text-white transition-colors" />
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Star size={14} />
                      <span className="text-xs font-mono">{project.stars}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-sm border border-neutral-700">
                        {tech}
                        </span>
                    ))}
                    </div>
                    
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors group/link">
                        View Source <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        ))}

        {/* Placeholder for 'Work in Progress' */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-64 border border-dashed border-neutral-800 rounded-sm flex items-center justify-center text-neutral-600 hover:border-neutral-600 hover:text-neutral-400 transition-all cursor-not-allowed bg-black"
        >
            <div className="text-center">
                <div className="text-4xl mb-2 font-thin">+</div>
                <div className="text-xs font-mono uppercase tracking-widest">New Project</div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};
