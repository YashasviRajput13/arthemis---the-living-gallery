
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Eye, Microscope, ShieldCheck, Sparkles, Loader2, Info } from 'lucide-react';
import { analyzeArtDNA } from '../services/geminiService';

const RestorationLab: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dna, setDna] = useState<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        runAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulating deep scan
    const res = await analyzeArtDNA("Restoration Target", "Archival scan in progress");
    setDna(res);
    setIsAnalyzing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const insights = [
    "Pigment erosion suggests exposure to ultraviolet spectrums.",
    "Layered glazing indicates an iterative process of emotional refinement.",
    "Thermal mapping reveals hidden underlying charcoal foundations.",
    "The chromatic balance shifts toward the melancholic in the shadow regions.",
    "Texture density peaks at the focal point of the composition."
  ];

  const currentInsightIndex = Math.floor((mousePos.x / (containerRef.current?.offsetWidth || 1)) * insights.length);
  const currentInsight = insights[currentInsightIndex % insights.length];

  return (
    <div className="min-h-screen p-8 md:p-20 bg-[#050505] flex flex-col items-center">
      <header className="w-full max-w-6xl mb-16">
        <div className="flex items-center gap-3 text-white/20 mb-4">
          <Microscope size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Restoration Lab</span>
        </div>
        <h2 className="text-5xl font-serif tracking-tight mb-4">The <span className="italic text-white/30">Gaze Lens.</span></h2>
        <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed font-serif italic">
          Upload a piece to begin the protocol. Use your cursor to pierce the veil of time and witness the underlying archival truth.
        </p>
      </header>

      {!image ? (
        <motion.label 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl aspect-video rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer group hover:bg-white/[0.04] hover:border-white/20 transition-all duration-700"
        >
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
            <Upload size={28} className="text-white/30" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">Select Archival Target</p>
        </motion.label>
      ) : (
        <div className="w-full max-w-6xl space-y-12">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full aspect-[16/9] rounded-[4rem] overflow-hidden bg-black shadow-[0_50px_100px_rgba(0,0,0,1)] border border-white/10 cursor-none"
          >
            {/* The "Blurred/Aged" Background Image */}
            <div className="absolute inset-0 grayscale contrast-125 brightness-50">
              <img src={image} className="w-full h-full object-cover blur-xl opacity-40" alt="Restoration" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* The "Sharpened" Lens View */}
            {isHovering && (
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: `circle(120px at ${mousePos.x}px ${mousePos.y}px)`,
                }}
              >
                <img src={image} className="w-full h-full object-cover brightness-110 contrast-110 scale-[1.05]" alt="Restoration Lens" />
                <div className="absolute inset-0 border-[2px] border-white/40 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.2)]" 
                     style={{ left: mousePos.x - 120, top: mousePos.y - 120, width: 240, height: 240 }} />
              </motion.div>
            )}

            {/* Scanning Lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-full h-px bg-white mb-8" />
              ))}
            </div>

            {/* Floating Insight Cursor Info */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute pointer-events-none z-50 p-6 backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl max-w-[240px]"
                  style={{ left: mousePos.x + 40, top: mousePos.y - 60 }}
                >
                  <div className="flex items-center gap-2 mb-3 text-orange-200/40">
                    <Info size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Gaze Analysis</span>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed font-serif italic">
                    {isAnalyzing ? "Processing visual metadata..." : currentInsight}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner UI elements */}
            <div className="absolute top-12 left-12 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Restorative Stream</span>
            </div>
            
            <div className="absolute bottom-12 right-12 flex items-center gap-6 px-8 py-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
               <div className="text-right">
                 <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Optical Depth</p>
                 <p className="text-xs font-mono text-white/60">{(mousePos.x + mousePos.y).toString(16).toUpperCase().substring(0, 4)}nm</p>
               </div>
               <ShieldCheck size={20} className="text-white/40" />
            </div>
          </div>

          <footer className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-white/20">
                  <Eye size={16} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Protocol status</h4>
               </div>
               <p className="text-2xl font-serif text-white/80 italic">Verified.</p>
               <p className="text-xs text-white/30 leading-relaxed font-light">The integrity of the digital artifact has been confirmed through optical inspection.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
               <div className="flex items-center gap-3 text-white/20">
                  <Sparkles size={16} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest">AI Curation</h4>
               </div>
               <div className="flex flex-wrap gap-2">
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin text-white/10" size={24} />
                  ) : (
                    dna?.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-bold text-white/30 border border-white/5">{tag}</span>
                    ))
                  )}
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <button onClick={() => setImage(null)} className="w-full py-5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                  Discard & Clear Lab
               </button>
               <button className="w-full py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all">
                  Archive Findings
               </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default RestorationLab;
