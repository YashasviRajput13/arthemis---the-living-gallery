
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Plus, Eye, Map, ShieldCheck } from 'lucide-react';
import { ART_COLLECTIONS } from '../constants';
import { ArtCard } from '../types';

interface DiscoveryFeedProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  onExamine: (art: ArtCard) => void;
}

const ArtFrame: React.FC<{ art: ArtCard, index: number, onExamine: (art: ArtCard) => void }> = ({ art, index, onExamine }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group mb-32"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-48 h-80 bg-orange-100/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative p-4 md:p-6 bg-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-sm ring-1 ring-white/10">
        <div className="relative aspect-auto overflow-hidden bg-black">
          <img 
            src={art.imageUrl} 
            alt={art.title} 
            className="w-full h-auto object-cover transition-all duration-[3000ms] group-hover:scale-105 group-hover:brightness-110" 
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-6">
            <div className="flex justify-end gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-white/60">
                <ShieldCheck size={10} /> Verified Vision
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button 
                onClick={() => onExamine(art)}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
              >
                <Eye size={14} /> Examine (Enter Gaze)
              </button>
            </div>
            <div className="flex justify-start">
               <button className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                <Plus size={16} /> <span className="text-[8px] font-black uppercase tracking-widest">Archive</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center text-center space-y-2">
        <h4 className="font-serif text-2xl font-medium tracking-tight text-white/90">{art.title}</h4>
        <div className="w-8 h-px bg-white/10" />
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">{art.artist} — {art.mood}</p>
      </div>

      <div className="absolute top-full left-0 right-0 h-48 gallery-floor-reflection pointer-events-none opacity-20 group-hover:opacity-40 transition-all duration-1000 overflow-hidden">
        <div className="scale-y-[-1] origin-top translate-y-16">
            <img src={art.imageUrl} className="w-full h-auto opacity-40 blur-md" />
        </div>
      </div>
    </motion.div>
  );
};

const GalleryWing: React.FC<{ title: string, id: string, description: string, items: ArtCard[], onExamine: (art: ArtCard) => void }> = ({ title, id, description, items, onExamine }) => (
  <section className="relative px-8 md:px-20 mb-80">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col mb-32 space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-4 text-white/20"
        >
          <div className="w-12 h-px bg-current" />
          <span className="text-[10px] font-black uppercase tracking-[0.6em]">{id} — Wing</span>
        </motion.div>
        <h3 className="font-serif text-6xl md:text-9xl font-light tracking-tighter text-white/90">
          {title}
        </h3>
        <p className="font-serif italic text-2xl text-white/30 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="columns-1 md:columns-2 gap-16 lg:gap-32">
        {items.map((art, idx) => (
          <ArtFrame key={art.id} art={art} index={idx} onExamine={onExamine} />
        ))}
      </div>
    </div>
  </section>
);

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ activeFilter, onFilterChange, onExamine }) => {
  const filteredCollections = useMemo(() => {
    if (!activeFilter) return ART_COLLECTIONS;
    
    return ART_COLLECTIONS.map(col => ({
      ...col,
      items: col.items.filter(item => 
        item.mood.toLowerCase().includes(activeFilter.toLowerCase()) ||
        item.artist.toLowerCase().includes(activeFilter.toLowerCase()) ||
        col.name.toLowerCase().includes(activeFilter.toLowerCase())
      )
    })).filter(col => col.items.length > 0);
  }, [activeFilter]);

  const categoryTags = ['Classic', 'Abstract', 'Digital', 'Raw'];

  return (
    <div className="min-h-screen pb-60 bg-[#080808] relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/[0.05] blur-[200px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/[0.05] blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 px-8 md:px-20 pt-48 pb-56">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 mb-12 text-white/10"
          >
            <Map size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Exploration Mode {activeFilter && `— ${activeFilter}`}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-[10vw] leading-[0.85] font-medium tracking-tighter"
          >
            {activeFilter ? 'Refined' : 'Curated'} <br />
            <span className="text-white/20 italic">{activeFilter ? 'Selection.' : 'Curiosity.'}</span>
          </motion.h2>
          
          <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/30 max-w-xl font-light leading-relaxed font-serif italic"
            >
              The gallery is an ever-shifting landscape. {activeFilter ? `Focusing on the beauty of ${activeFilter}.` : 'As you linger, new wings open.'}
            </motion.p>
            
            <div className="flex gap-4">
               <button 
                onClick={() => onFilterChange(null)}
                className={`px-6 py-2 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all ${!activeFilter ? 'bg-white text-black border-white' : 'bg-white/[0.02] text-white/40 hover:text-white'}`}
               >
                 All
               </button>
               {categoryTags.map((cat) => (
                 <button 
                  key={cat} 
                  onClick={() => onFilterChange(cat)}
                  className={`px-6 py-2 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat ? 'bg-white text-black border-white' : 'bg-white/[0.02] text-white/40 hover:text-white'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incubator Wing - Beginner Safety */}
      <section className="relative px-8 md:px-20 mb-60 overflow-hidden">
        <div className="max-w-7xl mx-auto p-12 rounded-[4rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-orange-200/40 animate-pulse" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Incubator Wing — Emerging DNA</h3>
          </div>
          <p className="text-xl font-serif text-white/40 italic mb-12">Works with high potential, waiting for their first archive citation.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ART_COLLECTIONS[2].items.map((art, i) => (
              <motion.div 
                key={art.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => onExamine(art)}
                className="aspect-square rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 relative group cursor-pointer"
              >
                <img src={art.imageUrl} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Eye size={20} className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((col, idx) => (
            <GalleryWing 
              key={col.id}
              id={`H0${idx + 1}`}
              title={col.name} 
              description={col.description} 
              items={col.items} 
              onExamine={onExamine}
            />
          ))
        ) : (
          <div className="py-60 text-center">
            <h4 className="font-serif text-4xl text-white/20 italic">No halls match your current filter.</h4>
            <button onClick={() => onFilterChange(null)} className="mt-8 text-[10px] font-black uppercase tracking-widest underline underline-offset-8">Clear Filter</button>
          </div>
        )}
      </div>

      <div className="py-60 flex flex-col items-center justify-center text-center">
         <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-8"
         >
           <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">End of This Wing</p>
           <h4 className="font-serif text-4xl italic text-white/40">Shall we explore the next floor?</h4>
           <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-8 px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:scale-110 transition-transform">
             Ascend
           </button>
         </motion.div>
      </div>
    </div>
  );
};

export default DiscoveryFeed;
