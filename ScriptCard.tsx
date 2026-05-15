import React from 'react';
import { Script } from '../types';
import { Gamepad2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ScriptCardProps {
  script: Script;
  onClick?: (script: Script) => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick?.(script)}
      className="group bg-[#16161A] border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all cursor-pointer shadow-lg shadow-black/20"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/10 group-hover:border-violet-500/50 transition-all overflow-hidden">
          {script.thumbnailUrl ? (
            <img src={script.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
          ) : (
            <Gamepad2 size={20} />
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase mb-0.5">Price</span>
          <span className={`text-sm font-bold ${script.price === 0 ? 'text-emerald-400' : 'text-zinc-100'}`}>
            {script.price === 0 ? 'FREE' : `$${script.price.toFixed(2)}`}
          </span>
        </div>
      </div>

      <h4 className="font-bold text-sm text-zinc-100 mb-1 group-hover:text-violet-400 transition-colors truncate">{script.title}</h4>
      <p className="text-xs text-zinc-500 mb-3 line-clamp-2 h-8 leading-relaxed font-medium">{script.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-5">
        {script.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[9px] font-bold text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded-md border border-zinc-800 group-hover:border-violet-500/30 transition-colors">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4 mt-auto">
        <div className="flex gap-1.5">
          <span className="text-[9px] bg-zinc-900 text-zinc-400 px-1.5 py-0.5 border border-zinc-800 rounded uppercase font-bold tracking-wider">v1.2.0</span>
          {script.isPremium ? (
            <span className="text-[9px] bg-violet-500/10 text-violet-500 px-1.5 py-0.5 border border-violet-500/20 rounded uppercase font-black tracking-wider">PRO</span>
          ) : (
            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Safe</span>
          )}
        </div>
        <button className="text-[10px] font-bold text-violet-400 flex items-center gap-1 hover:text-violet-300 transition-colors">
          DETAILS
          <ChevronRight size={10} />
        </button>
      </div>
    </motion.div>
  );
};

export default ScriptCard;
