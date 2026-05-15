import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative h-64 w-full rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/20 mb-8 overflow-hidden flex items-center p-8 md:p-12 group">
      <div className="relative z-10 w-full md:w-2/3">
        <span className="px-2 py-0.5 rounded bg-violet-500 text-[10px] font-bold tracking-tighter mb-3 inline-block uppercase text-white">Featured Release</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white">Nexus Hub Pro v4.2</h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-lg mb-6 leading-relaxed">The ultimate universal hub for 200+ games. Optimized performance with zero frame drops and safe injection technology.</p>
        <div className="flex gap-4">
          <button className="px-8 py-2.5 bg-zinc-100 text-black text-xs font-bold rounded-lg hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-black/20">
            Get Access
          </button>
          <button className="px-8 py-2.5 bg-zinc-800 text-zinc-100 text-xs font-bold rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-all transform active:scale-95">
            Preview
          </button>
        </div>
      </div>
      
      <div className="hidden md:block absolute right-[-50px] top-[-50px] w-96 h-96 bg-violet-500/10 blur-[100px] pointer-events-none group-hover:bg-violet-500/20 transition-all duration-700" />
      
      <div className="absolute top-6 right-8 hidden xl:block">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="AI Search..."
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-2 text-xs w-64 focus:outline-none focus:border-violet-500 transition-all text-white placeholder:text-zinc-600"
          />
          <Search className="absolute right-3 top-2 text-zinc-600" size={14} />
        </form>
      </div>
    </div>
  );
}
