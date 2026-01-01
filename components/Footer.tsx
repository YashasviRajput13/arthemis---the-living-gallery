
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-40 pb-20 px-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter mb-4">ARTHEMIS</h2>
          <p className="text-white/30 text-sm max-w-xs font-medium leading-relaxed">
            Revolutionizing art discovery through visual intelligence and emotional resonance.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 text-sm text-white/40 font-medium tracking-wide">
          <div className="flex flex-col gap-3">
            <span className="text-white/60 font-bold mb-2">Platform</span>
            <a href="#" className="hover:text-white transition-colors">Exploration</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Mobile App</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white/60 font-bold mb-2">Support</span>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <a href="#" className="hover:text-white transition-colors">Creators</a>
            <a href="#" className="hover:text-white transition-colors">Safety</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white/60 font-bold mb-2">Legal</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">License</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
        <p>© 2026 Arthemis Interactive. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 text-center">
        <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.5em] transition-colors hover:text-white/30 cursor-default">
          Created by <span className="text-white/40">yashasvi singh rajput</span> • <a href="mailto:ryashasvi77@gmail.com" className="hover:text-white transition-colors">ryashasvi77@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
