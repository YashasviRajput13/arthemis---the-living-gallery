
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Eye, HardDrive, Box, ShieldCheck, Database, Sparkles, Zap, Layers } from 'lucide-react';

const FeatureDetail: React.FC<{ 
  icon: any; 
  title: string; 
  desc: string; 
  isActive: boolean; 
  index: number;
  imageUrl?: string;
}> = ({ icon: Icon, title, desc, isActive, index, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    animate={{ 
      opacity: isActive ? 1 : 0.05, 
      scale: isActive ? 1 : 0.98,
      y: isActive ? 0 : 20,
    }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="mb-32 last:mb-0 relative py-8"
  >
    <div className="flex items-center gap-6 mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-1000 ${isActive ? 'text-white border-white/30 scale-110 shadow-[0_0_40px_rgba(255,255,255,0.1)] bg-white/10' : 'text-white/20'}`}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">Phase 0{index + 1}</span>
        <span className="text-[10px] font-medium text-white/40 italic tracking-wider">Arthemis Protocol 2026</span>
      </div>
    </div>
    
    <h3 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white leading-[0.9]">
      {title}
    </h3>

    <AnimatePresence>
      {isActive && imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', y: 40 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
          transition={{ 
            duration: 1.4, 
            ease: [0.19, 1, 0.22, 1],
            opacity: { duration: 1 }
          }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]"
        >
          {/* Static high-quality painting image */}
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover brightness-110 contrast-[1.05]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
          
          {/* Subtle Scanning Light Overlay (Purely UI animation) */}
          <motion.div 
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>

    <p className="text-lg text-white/40 max-w-sm leading-relaxed font-serif italic font-light">
      {desc}
    </p>
    
    {isActive && (
      <motion.div 
        layoutId="active-indicator"
        className="absolute -left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/10 to-transparent rounded-full"
      />
    )}
  </motion.div>
);

const HowItWorks: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  const stageRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const stageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const stageY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  useEffect(() => {
    return scrollYProgress.onChange(v => {
      if (v < 0.35) setActiveStep(0);
      else if (v < 0.7) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-[#050505] overflow-hidden">
      {/* Dynamic Background Aura */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            backgroundColor: activeStep === 0 ? "rgba(125, 169, 192, 0.04)" : activeStep === 1 ? "rgba(217, 168, 98, 0.04)" : "rgba(161, 146, 192, 0.04)"
          }}
          className="absolute inset-0 transition-colors duration-[2000ms] blur-[150px]"
        />
        
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.015, 0.03]),
            scale: useTransform(scrollYProgress, [0, 1], [0.9, 1.1])
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2 className="text-[35vw] font-black text-white uppercase tracking-tighter leading-none select-none blur-3xl opacity-20">
            {activeStep === 0 ? 'SOUL' : activeStep === 1 ? 'VAULT' : 'LEAF'}
          </h2>
        </motion.div>
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-between px-10 md:px-24 max-w-[1440px] mx-auto">
        
        {/* The Narrative Column */}
        <div className="w-full lg:w-5/12 z-20 pt-10 pb-20">
          <FeatureDetail 
            index={0}
            icon={Eye}
            title="Sincere Discovery" 
            desc="Our visual engine bypasses the algorithmic noise. It senses the emotional texture of every pixel, curating art that doesn't just catch the eye, but finds the soul." 
            isActive={activeStep === 0}
            imageUrl="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80"
          />
          <FeatureDetail 
            index={1}
            icon={HardDrive}
            title="Eternal Preservation" 
            desc="Your archival vault is a sanctuary for fame. We stabilize digital art against the erosion of platform decay, ensuring that what you save today remains a pillar of culture forever." 
            isActive={activeStep === 1} 
          />
          <FeatureDetail 
            index={2}
            icon={Layers}
            title="Living Archive" 
            desc="Archive contribution is an act of legacy. By documenting and citing rare works, you fuel the collective memory that keeps these art movements breathing." 
            isActive={activeStep === 2}
            imageUrl="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80"
          />
        </div>

        {/* The Visual Stage */}
        <div className="w-full lg:w-6/12 h-full flex items-center justify-center relative perspective-2000">
          <motion.div
            style={{ 
              rotateY: stageRotateY, 
              rotateX: stageRotateX,
              y: stageY, 
              scale: stageScale,
            }}
            className="relative w-full max-w-[500px] aspect-[4/5] rounded-[4rem] bg-[#0a0a0a] border border-white/10 shadow-[0_100px_200px_-80px_rgba(0,0,0,1)] overflow-hidden group/stage"
          >
            {/* The Lab Screen */}
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(40px)', transition: { duration: 0.8 } }}
                  className="absolute inset-0 bg-black p-10 flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/5 bg-neutral-900">
                    <img 
                      src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1000" 
                      className="w-full h-full object-cover brightness-[0.9] contrast-[1.1]" 
                      alt="Discovery Art"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* The Scan Effect */}
                    <motion.div 
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[20%] bg-gradient-to-b from-transparent via-white/[0.1] to-transparent pointer-events-none z-20"
                    />
                    
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
                        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="h-full w-1/2 bg-white/40" 
                           />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 text-center">Emotional Depth Mapping</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(30px)' }}
                  className="absolute inset-0 bg-black p-10 flex flex-col items-center justify-center"
                >
                  <div className="grid grid-cols-2 gap-6 w-full h-full p-6 rounded-[3rem] bg-white/[0.01] border border-white/5">
                    {[
                      'https://images.unsplash.com/photo-1549490349-8643362247b5',
                      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
                      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342',
                      'https://images.unsplash.com/photo-1541701494587-cb58502866ab'
                    ].map((url, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="relative rounded-2xl overflow-hidden border border-white/5"
                      >
                         <img src={`${url}?auto=format&fit=crop&w=400`} className="w-full h-full object-cover grayscale opacity-40" alt="Vaulted Art" />
                         <div className="absolute inset-0 bg-black/40" />
                         <div className="absolute bottom-3 left-3">
                            <ShieldCheck size={12} className="text-white/20" />
                         </div>
                      </motion.div>
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <Database size={32} className="text-white/10" strokeWidth={1} />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, rotateX: -20 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  className="absolute inset-0 bg-black p-10 flex flex-col items-center justify-center"
                >
                  <div className="w-full h-full rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                    
                    <div className="flex justify-between items-start">
                       <Box size={32} strokeWidth={1} className="text-white/40" />
                       <div className="text-right">
                          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-1">Registry Citation</p>
                          <p className="text-[11px] font-mono text-white/40">BLOCK-H01-ARCHIVE-2026</p>
                       </div>
                    </div>

                    <div className="py-8">
                       <div className="w-12 h-[1px] bg-white/10 mb-6" />
                       <h5 className="text-4xl font-serif text-white/90 italic mb-4 leading-tight">Contribution <br />Stored</h5>
                       <p className="text-sm text-white/30 leading-relaxed font-light font-serif">
                         Permanently cited in the Arthemis record. You are the curator of this visual lineage for the next era.
                       </p>
                    </div>

                    <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Sparkles size={20} strokeWidth={1} className="text-white/40" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-baseline mb-2">
                             <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em]">Status</p>
                             <p className="text-[10px] font-bold text-white tracking-widest">VERIFIED</p>
                          </div>
                          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: "100%" }}
                               transition={{ duration: 2.5 }}
                               className="h-full bg-white/60" 
                             />
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glass Finish */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.02] opacity-30" />
          </motion.div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -60, 0],
                  opacity: [0, 0.1, 0] 
                }}
                transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, delay: i * 0.5 }}
                className="absolute w-px h-12 bg-white/20"
                style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-50">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex flex-col items-center gap-2">
             <motion.div 
               animate={{ 
                 height: activeStep === i ? 40 : 8,
                 backgroundColor: activeStep === i ? "#fff" : "rgba(255,255,255,0.1)",
                 width: 1.5
               }}
               className="rounded-full transition-all duration-700"
             />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
