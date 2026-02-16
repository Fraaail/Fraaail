import React from 'react';
import { WindowFrame } from '../Layout/WindowFrame';
import { SKILL_STATS } from '../../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Cpu, Activity, HardDrive } from 'lucide-react';

export const StatsView: React.FC = () => {
  return (
    <div className="p-4 h-full grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-4">
      
      {/* Main Stats Graph */}
      <WindowFrame title="btop - skill_monitor" className="col-span-1 lg:col-span-2 row-span-2" isActive={true}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-lg font-bold text-white">System Resources</h3>
                <p className="text-neutral-500 text-sm">Real-time proficiency metrics</p>
             </div>
             <Activity className="text-green-400 animate-pulse" />
          </div>

          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_STATS} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fill: '#a3a3a3', fontSize: 12, fontFamily: 'JetBrains Mono' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#262626' }}
                  contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                  {SKILL_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#fff' : '#525252'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs font-mono text-neutral-500 border-t border-neutral-800 pt-4">
            <div>Processes: 142</div>
            <div>Uptime: 4d 2h 12m</div>
            <div>Load Avg: 0.42 0.58 0.55</div>
          </div>
        </div>
      </WindowFrame>

      {/* Info Blocks */}
      <WindowFrame title="neofetch" className="col-span-1 row-span-1">
         <div className="p-6 font-mono text-sm leading-relaxed text-neutral-300">
            <div className="flex gap-4">
                <div className="text-blue-500 hidden sm:block">
<pre>{`       /\\
      /  \\
     /    \\
    /      \\
   /   ,,   \\
  /   |  |   \\
 /_-''    ''-_\\`}</pre>
                </div>
                <div className="space-y-1">
                    <div><span className="text-blue-400 font-bold">fraaail</span>@<span className="text-blue-400 font-bold">arch</span></div>
                    <div>----------------</div>
                    <div><span className="text-yellow-400 font-bold">OS</span>: Arch Linux x86_64</div>
                    <div><span className="text-yellow-400 font-bold">Host</span>: Portfolio v2.0</div>
                    <div><span className="text-yellow-400 font-bold">Kernel</span>: 6.6.7-arch1-1</div>
                    <div><span className="text-yellow-400 font-bold">Shell</span>: zsh 5.9</div>
                    <div><span className="text-yellow-400 font-bold">WM</span>: Hyprland</div>
                    <div><span className="text-yellow-400 font-bold">Theme</span>: Catppuccin [GTK3]</div>
                </div>
            </div>
         </div>
      </WindowFrame>

      <WindowFrame title="disk_usage" className="col-span-1 row-span-1">
         <div className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
                <HardDrive size={32} className="text-neutral-400" />
                <div>
                    <div className="text-xl font-bold">/dev/nvme0n1p2</div>
                    <div className="text-xs text-neutral-500">Total: 1TB | Used: 420GB</div>
                </div>
            </div>
            
            <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>/ (root)</span>
                        <span>42%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-sm overflow-hidden">
                        <div className="h-full bg-white w-[42%]"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>/home</span>
                        <span>84%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-sm overflow-hidden">
                        <div className="h-full bg-neutral-500 w-[84%]"></div>
                    </div>
                 </div>
            </div>
         </div>
      </WindowFrame>

    </div>
  );
};
