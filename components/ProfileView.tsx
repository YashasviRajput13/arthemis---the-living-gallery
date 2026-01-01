
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Grid, History, ShieldCheck, Share2, Eye, MapPin, Calendar, Sparkles, Box } from 'lucide-react';
import { ART_COLLECTIONS } from '../constants';
import { ArtCard } from '../types';

interface ProfileViewProps {
  onExamine: (art: ArtCard) => void;
  onUpload: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onExamine, onUpload }) => {
  const [activeTab, setActiveTab] = useState<'grid' | 'timeline'>('grid');
  
  // Combine items for the demo artist identity "Lia Bloom"
  const artistWorks = ART_COLLECTIONS.flatMap(c => c.items).filter(i => i.artist === 'Lia Bloom' || i.id.startsWith('m'));

  const timelineEvents = [
    { date: 'Oct 2026', title: 'Permanent Archival', desc: 'Composition "Fractured Reality" accepted into The Modern Wing.' },
    { date: 'Aug 2026', title: 'Restoration Protocol', desc: 'Digital restoration of legacy charcoal sketches completed.' },
    { date: 'May 2026', title: 'The Gaze Milestone', desc: 'Collective gaze time exceeded 1,000 hours across all archived works.' },
    { date: 'Jan 2026', title: 'Genesis Citation', desc: 'Initial entry into the Arthemis Registry.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] pb-40">
      {/* Profile Header */}
      <header className="px-8 md:px-20 pt-32 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-700 p-1 bg-black">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300" 
                alt="Lia Bloom" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-white/5 pointer-events-none"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Lia Bloom</h1>
              <div className="flex gap-3">
                <button 
                  onClick={onUpload}
                  className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                >
                  New Submission
                </button>
                <button className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              <div className="flex items-center gap-2">
                <Box size={14} className="text-white/20" /> 
                <span className="text-white">{artistWorks.length}</span> Works Archived
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-white/20" />
                <span className="text-white">1.2k</span> Gaze Hours
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-white/20" />
                <span className="text-white">Tier II</span> Curator
              </div>
            </div>

            <p className="text-lg text-white/60 font-serif italic leading-relaxed max-w-2xl">
              Exploring the intersection of geometric abstraction and emotional resonance. Dedicated to the preservation of digital artifacts that speak when the noise subsides.
            </p>

            <div className="flex items-center gap-6 text-[10px] font-bold text-white/30 uppercase tracking-widest">
              <div className="flex items-center gap-2"><MapPin size={12} /> Berlin, DE</div>
              <div className="flex items-center gap-2"><Calendar size={12} /> Registry Est. 2026</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-y border-white/5 px-8 md:px-20 mb-12">
        <div className="max-w-7xl mx-auto flex gap-12">
          <button 
            onClick={() => setActiveTab('grid')}
            className={`flex items-center gap-3 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === 'grid' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            <Grid size={14} /> Gallery
            {activeTab === 'grid' && <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
          </button>
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-3 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === 'timeline' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
          >
            <History size={14} /> Journey
            {activeTab === 'timeline' && <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />}
          </button>
        </div>
      </div>

      <main className="px-8 md:px-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4"
            >
              {artistWorks.map((art, i) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onExamine(art)}
                  className="aspect-square bg-neutral-900 overflow-hidden relative group cursor-pointer"
                >
                  <img 
                    src={art.imageUrl} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                    alt={art.title}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Archived</p>
                    <h5 className="text-sm font-serif text-white">{art.title}</h5>
                  </div>
                </motion.div>
              ))}
              
              {/* Empty state / Prompt to upload */}
              <motion.button
                onClick={onUpload}
                whileHover={{ scale: 0.98 }}
                className="aspect-square border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-white/10 hover:text-white/30 hover:border-white/20 transition-all group"
              >
                <Plus size={32} strokeWidth={1} className="group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-black uppercase tracking-widest">Archival submission</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-3xl mx-auto space-y-16 py-12"
            >
              {timelineEvents.map((event, i) => (
                <div key={i} className="relative flex gap-12 group">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-full bg-white/5 group-last:h-0" />
                    <div className="w-3 h-3 rounded-full bg-white/20 border border-white/10 shrink-0 group-hover:bg-white transition-colors duration-500 shadow-[0_0_15px_white]" />
                  </div>
                  <div className="pb-16">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-2">{event.date}</span>
                    <h4 className="text-2xl font-serif text-white/90 mb-4">{event.title}</h4>
                    <p className="text-white/40 font-light leading-relaxed italic">{event.desc}</p>
                    
                    {i === 0 && (
                      <div className="mt-8 p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl overflow-hidden grayscale">
                          <img src={artistWorks[0]?.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Recent Registry</p>
                          <p className="text-xs text-white/60 font-serif">Verified as unique cultural artifact.</p>
                        </div>
                        <ShieldCheck size={20} className="ml-auto text-white/20" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/20 text-[9px] font-black uppercase tracking-widest">
                  <Sparkles size={12} /> Journey Ongoing
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Aura */}
      <div className="fixed bottom-0 right-0 w-[50rem] h-[50rem] bg-white/[0.01] blur-[150px] pointer-events-none -z-10" />
    </div>
  );
};

export default ProfileView;
