
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_CARDS } from '../constants';
import { Loader2 } from 'lucide-react';

interface HeroProps {
  onDiscover: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDiscover }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const line1 = "Discover Art".split("");
  const line2 = "the way you discover music".split(" ");

  const handleStart = () => {
    setIsTransitioning(true);
    // Simulate a brief "loading visual DNA" phase
    setTimeout(() => {
      onDiscover();
    }, 2000);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[60] bg-white pointer-events-none"
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Animated Background Art Cards */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-20 transform -rotate-12 scale-150">
          {HERO_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -40, 0],
                rotate: [idx % 2 === 0 ? 0 : 5, idx % 2 === 0 ? 5 : 0],
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: 0, 
                opacity: 0.9, 
                zIndex: 50,
                boxShadow: "0 20px 60px rgba(255,255,255,0.2)"
              }}
              transition={{
                duration: card.speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              }}
              className="w-48 h-64 rounded-xl overflow-hidden shadow-2xl pointer-events-auto cursor-pointer border border-white/5 bg-neutral-900"
            >
              <img 
                src={card.url} 
                alt="Art" 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-4 pointer-events-none">
        <motion.div 
          animate={isTransitioning ? { opacity: 0, y: -20, filter: 'blur(10px)' } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 overflow-hidden">
            <motion.h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
              {line1.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div className="mt-4 flex flex-wrap justify-center gap-2">
              {line2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.8 + (i * 0.1), ease: "easeOut" }}
                  className="text-xl md:text-3xl font-light text-white/50 tracking-tight"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
          className="mt-12 pointer-events-auto relative flex justify-center"
        >
          <motion.button
            onClick={handleStart}
            disabled={isTransitioning}
            layout
            initial={{ width: "auto" }}
            animate={isTransitioning ? { 
              width: 80, 
              height: 80, 
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000"
            } : {}}
            transition={{ duration: 0.6, type: "spring", damping: 15 }}
            className="group relative px-10 py-5 bg-white text-black font-black text-[11px] tracking-[0.25em] uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center min-w-[240px]"
          >
            <AnimatePresence mode="wait">
              {isTransitioning ? (
                <motion.span
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <Loader2 size={24} className="animate-spin text-black" />
                </motion.span>
              ) : (
                <motion.span 
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10 whitespace-nowrap"
                >
                  Enter the Gallery
                </motion.span>
              )}
            </AnimatePresence>
            {!isTransitioning && (
              <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            )}
          </motion.button>

          {/* Calm Pulse Glow when loading */}
          {isTransitioning && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: [0, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full blur-xl pointer-events-none z-0"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
