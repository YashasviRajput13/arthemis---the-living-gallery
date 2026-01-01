
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDailyArtMix } from '../services/geminiService';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';

const DailyMix: React.FC = () => {
  const [mood, setMood] = useState('Nostalgic');
  const [loading, setLoading] = useState(false);
  const [mixData, setMixData] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await getDailyArtMix(mood);
    setMixData(data);
    setLoading(false);
  };

  return (
    <div className="py-32 px-8 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold tracking-widest text-white/50 mb-8"
        >
          <Sparkles size={14} className="text-white" />
          AI CURATED
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Your Daily Art Mix</h2>
        <p className="text-white/40 text-lg mb-12">How are you feeling today?</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['Quiet', 'Electric', 'Melancholic', 'Dreamy', 'Vibrant'].map(m => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-8 py-3 rounded-full border transition-all duration-500 text-sm font-medium ${
                mood === m ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="group px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl flex items-center gap-4 mx-auto transition-all duration-500 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="text-white/70 group-hover:text-white" />}
          <span className="font-bold tracking-tight">Generate My Mix for {mood}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mixData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl grid md:grid-cols-2 gap-8"
          >
            {/* Main Card */}
            <div className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center text-[8px] font-bold text-white/20"
                  >
                    AI MIXING
                  </motion.div>
               </div>
               
               <h3 className="text-4xl font-black mb-6 tracking-tighter">{mixData.playlistTitle}</h3>
               <p className="text-white/60 leading-relaxed mb-10 text-lg italic">
                 "{mixData.poeticDescription}"
               </p>
               
               <div className="flex flex-wrap gap-2">
                 {mixData.themes.map((t: string) => (
                   <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white/40">
                     {t}
                   </span>
                 ))}
               </div>
               
               <div className="mt-12 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
               </div>
            </div>

            {/* Visual Tease Cards */}
            <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-white/5"
                 >
                   <img src={`https://picsum.photos/seed/mix${i}/400/500`} alt="Art" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-700" />
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyMix;
