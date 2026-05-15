import React from 'react';
import { Script } from '../types';
import ScriptCard from './ScriptCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FeaturedSectionProps {
  scripts: Script[];
  onScriptClick?: (script: Script) => void;
}

export default function FeaturedSection({ scripts, onScriptClick }: FeaturedSectionProps) {
  // Sort by rating or purchase count for "featured"
  const featuredScripts = [...scripts]
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, 3);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Marketplace Featured</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] opacity-80">Our most trusted and high-performance solutions</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-all group">
          VIEW ALL TOP RATED
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredScripts.map((script, idx) => (
          <motion.div
            key={script.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <ScriptCard script={script} onClick={onScriptClick} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
