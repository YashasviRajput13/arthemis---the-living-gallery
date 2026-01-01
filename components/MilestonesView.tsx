
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Eye, Archive, Map, Sparkles, MessageSquareQuote, ShieldCheck } from 'lucide-react';

const ImpactMetric: React.FC<{ icon: any; label: string; value: string; trend?: string }> = ({ icon: Icon, label, value, trend }) => (
  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
    <Icon className="text-white/20 mb-6 group-hover:text-orange-200/40 transition-colors" size={24} />
    <p className="text-4xl font-serif text-white mb-2">{value}</p>
    <div className="flex justify-between items-center">
      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{label}</p>
      {trend && <span className="text-[8px] text-green-400 font-bold uppercase tracking-widest">{trend}</span>}
    </div>
  </div>
);

const MilestoneToken: React.FC<{ title: string; desc: string; icon: any; locked?: boolean }> = ({ title, desc, icon: Icon, locked }) => (
  <motion.div 
    whileHover={!locked ? { y: -5 } : {}}
    className={`p-8 rounded-[3rem] border flex flex-col items-center text-center transition-all ${
      locked ? 'bg-black/40 border-white/5 opacity-40 grayscale' : 'bg-white/[0.03] border-white/10 shadow-xl'
    }`}
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${locked ? 'bg-white/5' : 'bg-gradient-to-br from-orange-200/20 to-transparent border border-white/10'}`}>
       <Icon size={28} className={locked ? 'text-white/10' : 'text-orange-100'} />
    </div>
    <h4 className="font-serif text-xl mb-2">{title}</h4>
    <p className="text-[10px] text-white/40 leading-relaxed px-4">{desc}</p>
    {locked && <div className="mt-4 px-4 py-1.5 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-white/20">Locked</div>}
  </motion.div>
);

const MilestonesView: React.FC = () => {
  return (
    <div className="min-h-screen pb-40 px-8 md:px-20 pt-32 bg-[#050505]">
      <header className="max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-white/20 mb-4"
        >
          <Award size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Global Impact Ledger</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-6xl md:text-8xl tracking-tight"
        >
          Archival <span className="italic text-white/30">Recognition.</span>
        </motion.h2>
        <p className="mt-8 text-white/40 max-w-2xl font-light text-lg leading-relaxed">
          Arthemis celebrates the depth of your vision. 
          Here is how your work is achieving legendary status within the collective archive.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        <ImpactMetric icon={Eye} label="Gaze Time (Total)" value="428h 12m" trend="+12% Depth" />
        <ImpactMetric icon={Archive} label="Archival Placements" value="1,204" trend="14 New Galleries" />
        <ImpactMetric icon={Map} label="Global Footprint" value="32 Cities" trend="New: Tokyo" />
        <ImpactMetric icon={Sparkles} label="Citations" value="18" trend="Featured Picks" />
      </div>

      <section className="max-w-7xl mx-auto mb-32">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <ShieldCheck size={18} className="text-white/20" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Impact Milestones</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <MilestoneToken title="Visual Pioneer" desc="First 100 artists to explore the 'Cyber-Brutalism' tag." icon={Sparkles} />
          <MilestoneToken title="Deep Resident" desc="Achieved 1,000 hours of Gaze Time across all works." icon={Eye} />
          <MilestoneToken title="The Bridge" desc="Work has been archived in both Classical and Modern galleries." icon={Map} />
          <MilestoneToken title="Movement Leader" desc="Your technique has influenced 5 newly emerging artists." icon={Award} locked />
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <MessageSquareQuote size={18} className="text-white/20" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Curator Citations</h3>
        </div>
        
        <div className="space-y-6">
          {[
            { curator: "Lia Bloom", wing: "The Ethereal Wing", text: "A masterful use of chiaroscuro that feels both ancient and futuristic. Truly ground-breaking." },
            { curator: "Studio Resident #4", wing: "Neon Shadows", text: "The texture in 'Midnight Vigil' has defined our color palette for the entire season." }
          ].map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 relative group"
            >
              <p className="font-serif italic text-2xl text-white/60 mb-8 leading-relaxed">"{c.text}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                 <div>
                    <p className="text-xs font-bold text-white tracking-tight">{c.curator}</p>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Added to {c.wing}</p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Atmospheric Background Haze */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-orange-200/[0.01] blur-[200px] pointer-events-none -z-10" />
    </div>
  );
};

export default MilestonesView;
