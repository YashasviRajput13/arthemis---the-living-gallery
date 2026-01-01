
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Library, PlusSquare, Heart, Sparkles, Search, Award, Newspaper, Fingerprint, Microscope, User, Wind } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onNavigateLibrary: (tab: 'collections' | 'artists' | 'recent') => void;
}

const SIDEBAR_THOUGHTS = [
  "Build for the 1,000-hour gaze.",
  "Impact is found in stillness.",
  "Protect the artist's legacy.",
  "Virality is noise; growth is soul.",
  "Foster citations, not just saves."
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onNavigateLibrary }) => {
  const [thoughtIndex, setThoughtIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % SIDEBAR_THOUGHTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Front Page' },
    { id: 'explore', icon: Search, label: 'Browse' },
    { id: 'discovery', icon: Sparkles, label: 'Daily Mix' },
    { id: 'news', icon: Newspaper, label: 'Journal' },
    { id: 'library', icon: Library, label: 'Your Archive' },
    { id: 'milestones', icon: Award, label: 'Impact' },
    { id: 'profile', icon: User, label: 'Your Profile' },
  ];

  return (
    <div className="w-72 bg-[#050505] h-screen flex flex-col p-8 border-r border-white/5 shrink-0 z-50 overflow-y-auto no-scrollbar">
      <div 
        className="flex flex-col gap-1 mb-16 group cursor-pointer" 
        onClick={() => setView('home')}
      >
        <span className="font-serif text-2xl font-black tracking-tighter text-white/90">ARTHEMIS</span>
        <span className="text-[8px] font-black text-white/20 tracking-[0.4em] uppercase">Visual Intelligence</span>
      </div>
      
      <nav className="space-y-12">
        <div className="space-y-3">
          <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-4">Navigation</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'library') onNavigateLibrary('collections');
                else setView(item.id as ViewState);
              }}
              className={`flex items-center gap-5 w-full px-5 py-3.5 text-sm font-bold tracking-tight rounded-2xl transition-all duration-500 ${
                currentView === item.id 
                  ? 'bg-white/5 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/10' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
              }`}
            >
              <item.icon size={18} strokeWidth={currentView === item.id ? 2.5 : 2} className={currentView === item.id ? 'text-orange-100' : 'text-white/20'} />
              {item.label}
            </button>
          ))}
          <button
              onClick={() => setView('sanctuary')}
              className={`flex items-center gap-5 w-full px-5 py-3.5 text-sm font-bold tracking-tight rounded-2xl transition-all duration-500 ${
                currentView === 'sanctuary' 
                  ? 'bg-white/5 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/10' 
                  : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
              }`}
            >
              <Wind size={18} strokeWidth={currentView === 'sanctuary' ? 2.5 : 2} className={currentView === 'sanctuary' ? 'text-orange-100' : 'text-white/20'} />
              Sanctuary
            </button>
        </div>

        <div className="space-y-3">
          <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-4">Studio Tools</div>
          <button 
            onClick={() => setView('gaze')}
            className={`flex items-center gap-5 w-full px-5 py-3.5 text-sm font-bold tracking-tight rounded-2xl transition-all duration-500 ${
              currentView === 'gaze' 
                ? 'bg-white/5 text-white ring-1 ring-white/10' 
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
            }`}
          >
            <Microscope size={18} className={currentView === 'gaze' ? 'text-orange-100' : 'text-white/20'} />
            Restoration Lab
          </button>
          <button 
            onClick={() => setView('upload')}
            className={`flex items-center gap-5 w-full px-5 py-3.5 text-sm font-bold tracking-tight rounded-2xl transition-all duration-500 ${
              currentView === 'upload' 
                ? 'bg-white/5 text-white ring-1 ring-white/10' 
                : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
            }`}
          >
            <PlusSquare size={18} />
            Publish Work
          </button>
          <button 
            onClick={() => onNavigateLibrary('artists')}
            className="flex items-center gap-5 w-full px-5 py-3.5 text-sm font-bold text-white/30 hover:text-white/60 transition-colors"
          >
            <Heart size={18} />
            Saved Artists
          </button>
        </div>

        <div className="space-y-2 pt-4">
           <div className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] px-4 mb-4">Recent Collections</div>
           {['The Brutalist Era', 'Neon Tokyo', 'Renaissance Study'].map(collection => (
             <button key={collection} className="w-full text-left px-4 py-2 text-xs font-medium text-white/20 hover:text-white transition-colors truncate">
               {collection}
             </button>
           ))}
        </div>
      </nav>

      <div className="mt-auto pt-10">
        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group">
          <Fingerprint className="absolute -top-2 -right-2 text-white/5 group-hover:text-white/20 transition-colors" size={60} />
          <p className="text-[8px] font-black text-orange-200/40 uppercase tracking-widest mb-3">Studio Intent</p>
          
          <div className="h-10">
            <AnimatePresence mode="wait">
              <motion.p 
                key={thoughtIndex}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="text-[11px] text-white/60 leading-relaxed font-serif italic"
              >
                "{SIDEBAR_THOUGHTS[thoughtIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[9px] text-white/20 leading-tight">
              You are building for <strong>enduring legacy</strong>, not just volume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
