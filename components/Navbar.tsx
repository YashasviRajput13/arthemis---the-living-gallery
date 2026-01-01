
import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onEnter?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onEnter }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center bg-transparent"
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/5 mask-gradient-b pointer-events-none" />
      
      <div className="relative flex items-baseline gap-2 cursor-pointer group">
        <span className="text-xl font-black tracking-tighter">ARTHEMIS</span>
        <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase group-hover:text-white/40 transition-colors">Est. 2026</span>
      </div>

      <div className="relative hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
        <a href="#how-it-works" className="hover:text-white transition-colors relative group">
          Experience
          <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
        </a>
        <a href="#collections" className="hover:text-white transition-colors relative group">
          Collections
          <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
        </a>
        <a href="#journey" className="hover:text-white transition-colors relative group">
          Journey
          <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
        </a>
        <a href="#daily-mix" className="hover:text-white transition-colors relative group">
          Daily Mix
          <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
        </a>
      </div>

      <div className="relative">
        <button 
          onClick={onEnter}
          className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-700 hover:border-white hover:scale-105"
        >
          Curator Mode
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
