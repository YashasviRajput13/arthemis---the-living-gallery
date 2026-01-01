
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Milestone: React.FC<{ year: string; title: string; desc: string; image: string; side: 'left' | 'right' }> = ({ year, title, desc, image, side }) => (
  <div className={`relative flex items-center justify-between mb-48 w-full ${side === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className="w-[45%]">
      <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative group"
      >
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl bg-neutral-900 border border-white/10">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </div>
        <span className="text-3xl font-black text-white/10 mb-2 block">{year}</span>
        <h4 className="text-3xl font-bold mb-4">{title}</h4>
        <p className="text-white/50 leading-relaxed text-sm max-w-sm">{desc}</p>
      </motion.div>
    </div>
    
    <div className="w-[10%] flex justify-center">
      <motion.div 
        whileInView={{ scale: [0, 1.2, 1] }}
        className="w-4 h-4 rounded-full bg-white z-10 shadow-[0_0_20px_white]" 
      />
    </div>
    
    <div className="w-[45%] hidden md:block" />
  </div>
);

const Journey: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={ref} className="relative py-32 px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-40">
           <motion.h2 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6"
           >
             Artist Journey
           </motion.h2>
           <p className="text-white/40 max-w-lg mx-auto text-lg font-light">
             Trace the evolution of vision. From the first charcoal sketch to the digital masterpiece.
           </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white to-transparent" 
          />

          <Milestone 
            year="The Genesis"
            title="Raw Sketches"
            desc="The birth of an idea, captured in frantic charcoal lines and graphite shades."
            image="https://picsum.photos/seed/journey1/800/450"
            side="left"
          />
          <Milestone 
            year="The Transition"
            title="Chromatic Bloom"
            desc="Introduction of color as a narrative tool. Exploring the boundaries of light."
            image="https://picsum.photos/seed/journey2/800/450"
            side="right"
          />
          <Milestone 
            year="The Refined"
            title="Digital Resonance"
            desc="The intersection of soul and software. A complete immersion into the unseen."
            image="https://picsum.photos/seed/journey3/800/450"
            side="left"
          />
        </div>
      </div>
    </div>
  );
};

export default Journey;
