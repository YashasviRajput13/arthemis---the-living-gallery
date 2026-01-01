
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtDroplets } from './ArtDroplets';
import { Loader2, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const MANIFESTOS = [
  "True recognition is measured in moments of stillness, not the speed of the thumb.",
  "Your vision deserves a witness, not a count. Build for the depth of the gaze.",
  "Privacy is the soil where true creativity takes root. Welcome to the sanctuary.",
  "In a world of fleeting scrolls, we are building a home for the enduring eye.",
  "Growth is a quiet conversation between the work and the soul. No noise, just art."
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [manifestoIndex, setManifestoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setManifestoIndex((prev) => (prev + 1) % MANIFESTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Perceived work delay for visual DNA mapping
    setTimeout(() => {
      onLogin();
    }, 2800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020202]">
      <ArtDroplets isTyping={isTyping || isLoggingIn} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isLoggingIn 
          ? { opacity: 0, scale: 1.1, filter: 'blur(40px)', transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1] } }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        <div className="relative bg-[#050505]/60 backdrop-blur-[80px] border border-white/10 rounded-[3rem] px-8 py-16 md:px-12 md:py-20 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] overflow-hidden">
          
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em] mb-4 flex items-center justify-center gap-2"
            >
              <Shield size={10} /> Sanctuary Mode Active
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-5xl font-black tracking-tighter text-white uppercase"
            >
              ARTHEMIS
            </motion.h1>
            
            <div className="h-12 mt-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={manifestoIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-[11px] text-white/40 leading-relaxed font-serif italic max-w-[280px] mx-auto"
                >
                  {MANIFESTOS[manifestoIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] ml-1 block">
                Identifier
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder="artist@gallery.com"
                className="w-full px-6 py-5 bg-white/[0.04] border border-white/5 rounded-2xl text-white placeholder:text-white/10 outline-none transition-all duration-500 focus:bg-white/[0.08] focus:border-white/20"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] ml-1 block">
                Access Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder="••••••••"
                className="w-full px-6 py-5 bg-white/[0.04] border border-white/5 rounded-2xl text-white placeholder:text-white/10 outline-none transition-all duration-500 focus:bg-white/[0.08] focus:border-white/20"
                required
              />
            </div>

            <motion.div className="pt-6 relative flex justify-center">
              <motion.button
                layout
                whileHover={!isLoggingIn ? { scale: 1.02 } : {}}
                whileTap={!isLoggingIn ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoggingIn}
                animate={isLoggingIn ? { 
                  width: 80, 
                  height: 80, 
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  color: "#000000"
                } : {}}
                transition={{ duration: 0.8, type: "spring", damping: 18 }}
                className="group relative w-full py-6 bg-white text-black font-black text-[12px] tracking-[0.3em] uppercase rounded-[2.5rem] flex items-center justify-center transition-all duration-700 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                <AnimatePresence mode="wait">
                  {isLoggingIn ? (
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
                      className="relative z-10 block"
                    >
                      Enter The Gallery
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>

          <div className="mt-12 text-center">
            <button className="text-[9px] font-black text-white/10 hover:text-white/40 tracking-[0.4em] uppercase transition-all duration-500">
              Honest Recognition • Safe Harbor
            </button>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Film Grain Overlay (Enhanced for Login) */}
      <div className="film-grain opacity-[0.06] brightness-125" />
    </div>
  );
};

export default Login;
