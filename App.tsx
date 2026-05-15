/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScriptCard from './components/ScriptCard';
import FeaturedSection from './components/FeaturedSection';
import { MOCK_SCRIPTS } from './mockData';
import { LayoutGrid, List, Filter, SlidersHorizontal, Sparkles, Activity, ShieldCheck, Clock, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAiSearching, setIsAiSearching] = useState(false);

  const categories = [
    "All", 
    "Combat & PvP", 
    "Auto-Farming", 
    "Visual / ESP", 
    "Admin Commands", 
    "Economy & Trading"
  ];

  const categoryToTagMap: { [key: string]: string[] } = {
    "Combat & PvP": ["PvP", "Combat", "Aimbot"],
    "Auto-Farming": ["Auto-Farm"],
    "Visual / ESP": ["ESP", "Visual"],
    "Admin Commands": ["Admin"],
    "Economy & Trading": ["Economy", "Trading"]
  };

  const filteredScripts = useMemo(() => {
    return MOCK_SCRIPTS.filter(script => {
      const matchesQuery = !searchQuery || 
                          script.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          script.tags.some(t => t.toLowerCase() === searchQuery.toLowerCase());
      
      const tagsToMatch = categoryToTagMap[activeCategory] || [];
      const matchesCategory = activeCategory === "All" || 
                             tagsToMatch.some(tag => script.tags.includes(tag));
      
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleAiSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) return;

    setIsAiSearching(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      const response = await fetch('/api/ai/suggest-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: query, game: query })
      });
      const data = await response.json();
      console.log("AI Suggested Tags:", data.tags);
    } catch (err) {
      console.error("AI Search Error:", err);
    } finally {
      setIsAiSearching(false);
    }
  };

  return (
    <div className="h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans overflow-hidden selection:bg-violet-500/30">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden pt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-zinc-800 bg-[#0E0E11] p-8 flex-col gap-10 overflow-y-auto">
          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6 font-black opacity-80">Marketplace</h3>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold flex items-center gap-3 cursor-pointer transition-all ${
                    activeCategory === cat ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeCategory === cat ? 'bg-violet-400 scale-125' : 'bg-transparent'
                  }`} />
                  {cat}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6 font-black opacity-80">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["Best-Seller", "PvP", "Auto-Farm", "Economy", "Anti-Ban", "ESP", "Visual"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className={`px-2 py-1 rounded border text-[9px] font-bold transition-all ${
                    searchQuery === tag 
                    ? "bg-violet-500 border-violet-500 text-white" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6 font-black opacity-80">Security Status</h3>
            <div className="space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 group hover:border-violet-500/30 transition-colors">
                <div className="flex items-center gap-2 text-[9px] text-zinc-500 mb-2 font-bold tracking-widest uppercase">
                  <ShieldCheck size={10} />
                  Engine Integrity
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-zinc-100">Undetected</span>
                  <span className="text-violet-400">98%</span>
                </div>
                <div className="mt-2 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[98%]" />
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center gap-2 text-[9px] text-zinc-500 mb-2 font-bold tracking-widest uppercase">
                  <Activity size={10} />
                  System Load
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-zinc-100">Latency</span>
                  <span className="text-emerald-500 font-mono">24ms</span>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              CORE OPERATIONAL
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
            <Hero onSearch={handleAiSearch} />

            {!searchQuery && activeCategory === "All" && (
              <FeaturedSection scripts={MOCK_SCRIPTS} />
            )}

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold tracking-tight text-white">
                  {activeCategory === "All" ? "Browse All" : activeCategory}
                </h3>
                {(searchQuery || activeCategory !== "All") && (
                  <span className="px-2 py-0.5 bg-violet-500/10 text-violet-400 text-[10px] font-bold rounded uppercase border border-violet-500/20">
                    {filteredScripts.length} results
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 transition-all hover:text-zinc-100 hover:border-zinc-700">
                  <Filter size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Advanced</span>
                </button>
              </div>
            </div>

            {isAiSearching ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Synchronizing Neural Grid...</span>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredScripts.length > 0 ? (
                    filteredScripts.map(script => (
                      <ScriptCard key={script.id} script={script} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-zinc-500 text-sm font-medium">No system matches found in the current directory.</p>
                      <button 
                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        className="mt-4 text-violet-400 text-xs font-bold hover:text-white underline transition-all"
                      >
                        Reset Application State
                      </button>
                    </div>
                  )}
                </div>
              </AnimatePresence>
            )}
          </main>

          {/* Mini Footer */}
          <footer className="h-10 border-t border-zinc-800 bg-[#0E0E11] px-8 flex items-center justify-between text-[10px] text-zinc-500 flex-shrink-0">
            <div className="flex items-center gap-6">
              <span className="font-mono flex items-center gap-1.5">
                <Clock size={10} />
                UPTIME: 99.98%
              </span>
              <span className="hidden sm:inline">ACTIVE USERS: 12,492</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-zinc-300 cursor-pointer">TERMS</span>
              <span className="hover:text-zinc-300 cursor-pointer">API</span>
              <span className="text-zinc-700 font-mono">© 2024 SCRIPT.IO SYSTEM</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
