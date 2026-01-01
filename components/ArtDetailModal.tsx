
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Plus, Share2, Sparkles, Loader2, Volume2, ShieldCheck } from 'lucide-react';
import { ArtCard } from '../types';
import { analyzeArtDNA, generateCuratorVoice } from '../services/geminiService';

interface ArtDetailModalProps {
  art: ArtCard | null;
  onClose: () => void;
}

const ArtDetailModal: React.FC<ArtDetailModalProps> = ({ art, onClose }) => {
  const [dna, setDna] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (art) {
      setLoading(true);
      analyzeArtDNA(art.title, art.mood).then(res => {
        setDna(res);
        setLoading(false);
      });
    } else {
      setDna(null);
    }
  }, [art]);

  if (!art) return null;

  const getInterpretation = () => {
    if (loading) return null;
    const style = (dna?.style || 'masterpiece').toLowerCase();
    const mood = (dna?.mood || art.mood).toLowerCase();
    return `This ${style} evokes a profound sense of ${mood}. The artist utilizes a restricted yet impactful vocabulary to explore the boundaries of perception and legacy.`;
  };

  const handleListen = async () => {
    const text = getInterpretation();
    if (!text) return;
    
    setAudioLoading(true);
    const base64Audio = await generateCuratorVoice(text);
    setAudioLoading(false);

    if (base64Audio) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const frameCount = dataInt16.length;
      const buffer = ctx.createBuffer(1, frameCount, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.9, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full h-full max-w-7xl bg-[#0a0a0a] rounded-[3rem] border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Main Visual */}
          <div className="w-full md:w-3/5 h-[40vh] md:h-full bg-black relative group flex items-center justify-center">
             <img src={art.imageUrl} alt={art.title} className="w-full h-full object-contain" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
             
             {/* Preservation Stamp */}
             <div className="absolute bottom-12 right-12 flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <ShieldCheck size={18} className="text-white/40" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Archival Integrity Verified</span>
             </div>

             <button 
                onClick={onClose}
                className="absolute top-8 left-8 p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all"
             >
               <X size={20} />
             </button>
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-2/5 h-full p-8 md:p-16 flex flex-col justify-between overflow-y-auto no-scrollbar">
             <div className="space-y-12">
                <header>
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-white/20 mb-4"
                  >
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Visual Identification</span>
                  </motion.div>
                  <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-none mb-4">{art.title}</h2>
                  <p className="text-xl text-white/40 font-serif italic">by {art.artist}</p>
                </header>

                <div className="space-y-6">
                   <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Artistic Interpretation</h3>
                      <button 
                        onClick={handleListen}
                        disabled={loading || audioLoading}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors disabled:opacity-20"
                      >
                        {audioLoading ? <Loader2 size={12} className="animate-spin" /> : <Volume2 size={12} />}
                        {audioLoading ? 'Calibrating Voice...' : 'Listen to Curator'}
                      </button>
                   </div>
                   <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 italic font-light text-white/60 leading-relaxed relative overflow-hidden">
                      {loading ? (
                        <div className="flex items-center gap-4 text-white/20">
                           <Loader2 className="animate-spin" size={16} />
                           <span className="text-xs uppercase tracking-widest font-black">AI Curating Thought...</span>
                        </div>
                      ) : (
                        getInterpretation()
                      )}
                      {/* Sub-text for "another thing" - Internal Provenance */}
                      {!loading && (
                        <div className="mt-6 pt-6 border-t border-white/5">
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 mb-2">Provenance Note</p>
                           <p className="text-[11px] font-serif opacity-30">This work originates from a legacy of preservation, contributed to the Arthemis archive for permanent cultural residence.</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Movement</h4>
                      <p className="text-lg font-serif">{dna?.style || 'Unknown'}</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Aura</h4>
                      <p className="text-lg font-serif">{dna?.mood || art.mood}</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Dominant DNA Tags</h4>
                   <div className="flex flex-wrap gap-2">
                      {(dna?.tags || []).map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/40">
                          {t}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="pt-12 flex gap-4">
                <button className="flex-1 py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:scale-[1.02] transition-transform">
                   Preserve in Vault
                </button>
                <button className="p-5 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                   <Heart size={20} />
                </button>
                <button className="p-5 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                   <Share2 size={20} />
                </button>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtDetailModal;
