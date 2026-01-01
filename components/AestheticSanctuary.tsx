
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Wind, Sparkles } from 'lucide-react';

const InkDroplet: React.FC<{ 
  color: string; 
  duration: number; 
  delay: number; 
  size: number;
  initialPos: { x: string; y: string } 
}> = ({ color, duration, delay, size, initialPos }) => (
  <motion.div
    initial={{ 
      x: initialPos.x, 
      y: initialPos.y, 
      opacity: 0,
      scale: 0.6,
      filter: 'blur(80px)'
    }}
    animate={{ 
      opacity: [0, 0.2, 0.3, 0.2, 0],
      scale: [0.6, 1.1, 1.3, 1.1, 0.6],
      x: [`calc(${initialPos.x} - 12%)`, `calc(${initialPos.x} + 8%)`, `calc(${initialPos.x} - 4%)`],
      y: [`calc(${initialPos.y} - 8%)`, `calc(${initialPos.y} + 12%)`, `calc(${initialPos.y} + 6%)`],
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "40% 60% 70% 30% / 40% 50% 60% 50%"
      ]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none"
    style={{ 
      width: size, 
      height: size, 
      backgroundColor: color,
      boxShadow: `0 0 100px ${color}`,
    }}
  />
);

const AestheticSanctuary: React.FC = () => {
  const blobs = useMemo(() => {
    const palette = [
      '#536b59', // Muted Moss Green
      '#8e81a3', // Lavender Bloom
      '#e5ddd3', // Warm Cotton Beige
      '#3a4d3f', // Dark Fern
      '#6a5f7d', // Dusk Violet
      '#cfc4b7', // Antique Parchment
    ];

    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: palette[i % palette.length],
      duration: 20 + Math.random() * 15,
      delay: Math.random() * -40,
      size: 500 + Math.random() * 900,
      initialPos: {
        x: `${(i % 5) * 20 + Math.random() * 10}%`,
        y: `${Math.floor(i / 5) * 25 + Math.random() * 15}%`
      }
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080908] overflow-hidden flex flex-col items-center justify-center">
      {/* Texture Layer - Base Wash */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#0a0c0a] via-[#0d0f0d] to-[#0a0c0a]" />

      {/* Ink Bleeds Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {blobs.map((blob) => (
          <InkDroplet key={blob.id} {...blob} />
        ))}
      </div>

      {/* Artistic Canvas Overlay */}
      <div 
        className="absolute inset-0 z-2 opacity-[0.08] pointer-events-none mix-blend-overlay" 
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: 'contrast(120%) brightness(120%)'
        }} 
      />
      
      {/* Subtle Watercolor Texture Pattern */}
      <div className="absolute inset-0 z-3 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Content Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center px-12"
      >
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <Wind className="text-white" size={24} strokeWidth={1} />
          <span className="text-[11px] font-black text-white/40 uppercase tracking-[1em]">Sanctuary of Vision</span>
          <Sparkles className="text-white" size={20} strokeWidth={1} />
        </motion.div>
        
        <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] text-white/95 tracking-tighter mb-10 max-w-5xl mx-auto leading-[0.8] selection:bg-lavender-200 selection:text-black">
          Art is <br />
          <span className="italic text-white/20 font-light">Quietude.</span>
        </h1>
        
        <p className="text-white/40 font-serif italic text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed font-light">
          "Where the soul breathes, the colors bleed. <br className="hidden md:block" /> Let the rhythm of the paint be your only guide."
        </p>

        <div className="mt-24 flex flex-col items-center gap-16">
           <motion.div 
             animate={{ height: [40, 120, 40], opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="w-[1.5px] bg-white rounded-full" 
           />
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10 italic">Observe the drift</p>
        </div>
      </motion.div>

      {/* Edge Softening Vignette */}
      <div className="absolute inset-0 z-15 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      
      {/* Ambient Floating Particle Layer */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`, 
              opacity: 0 
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 10}%`],
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * -20
            }}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
};

export default AestheticSanctuary;
