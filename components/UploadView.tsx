
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Sparkles, Loader2, CheckCircle2, Palette, Tag, ArrowRight, Share2 } from 'lucide-react';
import { analyzeArtDNA } from '../services/geminiService';

const UploadView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [dnaResult, setDnaResult] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAnalyze = async () => {
    if (!title) return;
    setAnalyzing(true);
    const result = await analyzeArtDNA(title, story);
    setDnaResult(result);
    setAnalyzing(false);
    setStep(2);
  };

  const handleFinish = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setStep(1);
      setTitle('');
      setStory('');
      setDnaResult(null);
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-8 min-h-screen">
      <div className="mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tighter mb-4"
        >
          Studio Upload
        </motion.h2>
        <p className="text-white/40 text-lg">Your art will be discovered by those who share your visual soul.</p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-20 flex flex-col items-center text-center shadow-2xl backdrop-blur-3xl"
          >
             <motion.div
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ type: 'spring', damping: 12, stiffness: 200 }}
               className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-10 text-black shadow-[0_0_50px_rgba(255,255,255,0.2)]"
             >
               <CheckCircle2 size={48} />
             </motion.div>
             <h3 className="text-4xl font-black mb-6 tracking-tight">Masterpiece Published</h3>
             <p className="text-white/40 max-w-sm text-lg leading-relaxed">
               Your visual DNA has been mapped. We'll alert you when curators start saving your work to their collections.
             </p>
             <div className="mt-12 flex gap-4">
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <Share2 size={14} /> Share Preview
                </button>
             </div>
          </motion.div>
        ) : step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="aspect-video w-full rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center group hover:border-white/30 transition-all duration-700 cursor-pointer overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700 shadow-xl border border-white/5">
                 <Upload size={28} className="text-white/40 group-hover:text-white transition-colors" />
               </div>
               <p className="text-xs font-black tracking-[0.3em] text-white/30 uppercase group-hover:text-white/50 transition-colors">Drop High-Res File</p>
               <p className="text-[10px] font-bold text-white/10 mt-4 tracking-widest">RAW • PNG • HEIC (UP TO 100MB)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                   <div className="w-1 h-1 bg-white/40 rounded-full" /> Piece Identity
                 </label>
                 <input 
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className="w-full px-8 py-6 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/10 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all text-lg font-medium"
                   placeholder="Untitled Composition No. 1"
                 />
               </div>
               <div className="space-y-6">
                 <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/40 rounded-full" /> Visual Narrative
                 </label>
                 <textarea 
                   value={story}
                   onChange={(e) => setStory(e.target.value)}
                   className="w-full px-8 py-6 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/10 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all resize-none h-44 text-sm leading-relaxed"
                   placeholder="What was the emotional catalyst for this stroke? (Optional)"
                 />
               </div>
            </div>

            <div className="flex justify-end pt-8">
              <button 
                onClick={handleAnalyze}
                disabled={!title || analyzing}
                className="group px-12 py-6 bg-white text-black rounded-full font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-4 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-500 disabled:opacity-20 disabled:scale-100"
              >
                {analyzing ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Sparkles size={16} className="text-black/40 group-hover:text-black transition-colors" />
                )}
                <span>{analyzing ? 'Reading Visual DNA...' : 'Analyze DNA'}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="relative group">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl relative">
                  <img 
                    src="https://picsum.photos/seed/uploaded/800/1000" 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest border border-white/10">PREVIEW RENDER</span>
                  </div>
                </div>
                {/* Visual indicator of "analysis" */}
                <div className="absolute -inset-4 border border-white/5 rounded-[3rem] -z-10 group-hover:border-white/20 transition-colors duration-1000" />
              </div>
              
              <div className="space-y-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-white/30">
                    <Palette size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Extracted Palette</span>
                  </div>
                  <div className="flex gap-4">
                    {dnaResult?.palette?.map((color: string, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative"
                      >
                        <div 
                          className="w-14 h-14 rounded-2xl border border-white/10 shadow-xl cursor-copy hover:scale-110 transition-transform duration-500" 
                          style={{ backgroundColor: color }} 
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[8px] font-mono text-white/40 tracking-tight">{color}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-white/30">
                    <Tag size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">DNA Archetypes</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {dnaResult?.tags?.map((tag: string, i: number) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold tracking-[0.1em] uppercase text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="px-5 py-3 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                      {dnaResult?.mood}
                    </motion.span>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-50 transition-opacity">
                    <Sparkles size={20} />
                  </div>
                  <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mb-6">AI Interpretation</p>
                  <p className="text-lg text-white/50 leading-relaxed font-light italic">
                    "This work exhibits profound <span className="text-white/80 font-medium">{dnaResult?.style?.toLowerCase()}</span> influences with a dominant focus on <span className="text-white/80 font-medium">{dnaResult?.mood?.toLowerCase()}</span> emotional resonance."
                  </p>
                </motion.div>

                <div className="flex gap-6 pt-10">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-6 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
                  >
                    Adjust Details
                  </button>
                  <button 
                    onClick={handleFinish}
                    className="flex-1 py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-[1.02] transition-all duration-500"
                  >
                    Enter the Pool
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadView;
