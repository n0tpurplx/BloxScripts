import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { ShoppingCart, LogIn, Zap } from 'lucide-react';

export default function Navbar() {
  const { user, profile, signIn, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E11] border-b border-zinc-800 px-8 h-16 flex items-center">
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-violet-600 rounded flex items-center justify-center group-hover:bg-violet-500 transition-all">
              <Zap className="text-white fill-current" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">SCRIPT<span className="text-violet-500">.IO</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="text-zinc-100">Marketplace</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Executors</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Community</a>
            <a href="#" className="hover:text-zinc-100 transition-colors">Documentation</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Balance</span>
                <span className="text-sm font-mono font-bold text-violet-400">${profile?.balance.toFixed(2)}</span>
              </div>
              <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                <ShoppingCart size={18} />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 p-0.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full border border-zinc-800" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#0E0E11] border border-zinc-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1 z-50">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white">Profile Settings</button>
                  <button className="w-full text-left px-4 py-2 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white">My Purchases</button>
                  <div className="h-[1px] bg-zinc-800 my-1" />
                  <button 
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-500/5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={signIn}
              className="flex items-center gap-2 px-5 py-2 bg-zinc-100 text-black rounded-lg font-bold text-xs hover:bg-violet-500 hover:text-white transition-all active:scale-95"
            >
              <LogIn size={14} />
              Connect
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
