
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderHeart, Clock, LayoutGrid, List, Plus, Settings, User, Eye } from 'lucide-react';
import { ART_COLLECTIONS } from '../constants';
import { ArtCard } from '../types';

interface LibraryViewProps {
  initialTab?: 'collections' | 'artists' | 'recent';
  onExamine: (art: ArtCard) => void;
}

const CurationStack: React.FC<{ collection: any, index: number }> = ({ collection, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group cursor-pointer"
  >
    <div className="relative aspect-square mb-6">
      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-700" />
      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl translate-x-2 translate-y-2 -z-[5] group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-700" />
      
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl">
        <img 
          src={collection.items[0].imageUrl} 
          alt={collection.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Curation</p>
          <h4 className="text-xl font-serif text-white">{collection.name}</h4>
        </div>
      </div>
    </div>
  </motion.div>
);

const LibraryView: React.FC<LibraryViewProps> = ({ initialTab = 'collections', onExamine }) => {
  const [tab, setTab] = useState<'collections' | 'artists' | 'recent'>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const recentItems = ART_COLLECTIONS[0].items.concat(ART_COLLECTIONS[1].items.slice(0, 2));

  return (
    <div className="min-h-screen pb-40 px-8 md:px-20 pt-32 bg-[#050505]">
      <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-white/20 mb-4"
          >
            <FolderHeart size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Permanent Archive</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl md:text-8xl tracking-tight"
          >
            Your <span className="italic text-white/30">Archive.</span>
          </motion.h2>
        </div>

        <div className="flex gap-4">
           <button className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              <Plus size={20} />
           </button>
           <button className="px-8 py-4 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
              New Exhibition
           </button>
        </div>
      </header>

      <div className="flex gap-12 border-b border-white/5 mb-16 px-4">
        {[
          { id: 'collections', label: 'Galleries', icon: LayoutGrid },
          { id: 'artists', label: 'Following', icon: User },
          { id: 'recent', label: 'Recently Viewed', icon: Clock },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-3 pb-6 text-[10px] font-black uppercase tracking-widest transition-all relative ${
              tab === t.id ? 'text-white' : 'text-white/20 hover:text-white/40'
            }`}
          >
            <t.icon size={14} />
            {t.label}
            {tab === t.id && (
              <motion.div layoutId="lib-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'collections' && (
          <motion.div 
            key="col"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {ART_COLLECTIONS.map((col, idx) => (
              <CurationStack key={col.id} collection={col} index={idx} />
            ))}
            
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="aspect-square rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-white/20 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all">
                <Plus size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Start Exhibition</span>
            </motion.div>
          </motion.div>
        )}

        {tab === 'artists' && (
          <motion.div 
            key="art"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
             <div className="flex flex-col items-center justify-center h-64 border border-white/5 rounded-[3rem] text-white/10 text-xs font-black uppercase tracking-widest italic col-span-full">
                <User size={40} className="mb-4 opacity-10" />
                You aren't following any artists yet.
             </div>
          </motion.div>
        )}

        {tab === 'recent' && (
          <motion.div 
            key="recent"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
             {recentItems.map((art, i) => (
               <motion.div 
                key={art.id + i}
                onClick={() => onExamine(art)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer"
               >
                 <img src={art.imageUrl} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">{art.artist}</p>
                    <h5 className="text-sm font-serif">{art.title}</h5>
                 </div>
               </motion.div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32 pt-20 border-t border-white/5">
         <div className="flex items-center justify-between">
           <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Archive Statistics</h3>
           <Settings size={16} className="text-white/20 cursor-pointer hover:text-white transition-colors" />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              { label: 'Archived Works', value: '1,248' },
              { label: 'Exhibitions', value: '4' },
              { label: 'Patron Tier', value: 'Gold' },
              { label: 'Cloud Space', value: '4.2 TB' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-serif text-white mb-1">{s.value}</p>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default LibraryView;
