
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CanvasProps {
  delay: number;
  duration: number;
  initialX: string;
  initialY: string;
  size: { width: number; height: number };
  color: string;
  isTyping: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ delay, duration, initialX, initialY, size, color, isTyping }) => {
  const currentDuration = isTyping ? duration * 0.8 : duration;

  return (
    <motion.div
      initial={{ 
        x: initialX, 
        y: initialY, 
        opacity: 0, 
        rotate: Math.random() * 20 - 10,
        scale: 0.8
      }}
      animate={{ 
        opacity: [0, 0.15, 0.15, 0],
        scale: [0.8, 1, 1.1, 0.9],
        rotate: [Math.random() * 10, Math.random() * -10, Math.random() * 10],
        x: [initialX, `calc(${initialX} + 40px)`, `calc(${initialX} - 20px)`, initialX],
        y: [initialY, `calc(${initialY} - 50px)`, `calc(${initialY} + 30px)`, initialY],
      }}
      transition={{
        duration: currentDuration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none"
      style={{ 
        width: size.width, 
        height: size.height,
        backgroundColor: color,
        filter: 'blur(100px)',
        borderRadius: '4px'
      }}
    />
  );
};

const MandalaLayer: React.FC<{ rotationDuration: number; scale: number; opacity: number; color: string }> = ({ rotationDuration, scale, opacity, color }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: rotationDuration, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ scale }}
    >
      <svg viewBox="0 0 1000 1000" className="w-[1600px] h-[1600px]" style={{ color, opacity }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Complex Radial Pattern */}
        {[...Array(48)].map((_, i) => (
          <g key={i} transform={`rotate(${i * (360 / 48)} 500 500)`}>
            {/* The "Spikes" and "Houses" shapes from the reference */}
            <path 
              d="M 500 50 L 540 150 L 500 250 L 460 150 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <path 
              d="M 500 80 L 525 140 L 500 200 L 475 140 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              opacity="0.6"
            />
            {/* Inner linework patterns */}
            <path d="M 475 120 L 525 120" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 480 135 L 520 135" stroke="currentColor" strokeWidth="0.8" />
            <path d="M 485 150 L 515 150" stroke="currentColor" strokeWidth="0.8" />
            
            {/* Outer decorative arcs */}
            <path 
              d="M 440 110 Q 500 10 560 110" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              opacity="0.8"
            />
            <circle cx="500" cy="30" r="5" fill="currentColor" opacity="0.9" />
          </g>
        ))}

        {/* Concentric rings with varied styles */}
        <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 15" />
        <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="500" cy="500" r="320" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 20" />
        
        {/* Inner detailed mandala core */}
        {[...Array(24)].map((_, i) => (
          <path 
            key={`inner-${i}`}
            d="M 500 350 Q 525 400 500 450 Q 475 400 500 350" 
            transform={`rotate(${i * 15} 500 500)`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            opacity="0.8"
          />
        ))}
      </svg>
    </motion.div>
  );
};

const PatternedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
      {/* Background Mandala Layer - Slow & Large - Primary Visibility */}
      <MandalaLayer 
        rotationDuration={150} 
        scale={1.3} 
        opacity={0.55} 
        color="#2a446b" 
      />
      
      {/* Middle Mandala Layer - Contrasting rotation */}
      <MandalaLayer 
        rotationDuration={-100} 
        scale={0.9} 
        opacity={0.4} 
        color="#3b5a8c" 
      />
      
      {/* Inner Subtle Layer */}
      <MandalaLayer 
        rotationDuration={200} 
        scale={0.6} 
        opacity={0.3} 
        color="#1a2b42" 
      />

      {/* Center Soft Fade to keep the UI readable without crushing the pattern */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

export const ArtDroplets: React.FC<{ isTyping: boolean }> = ({ isTyping }) => {
  const elements = useMemo(() => {
    const colors = [
      'rgba(125, 169, 192, 0.3)', // Muted Blue
      'rgba(217, 168, 98, 0.1)',  // Warm Ochre
      'rgba(161, 146, 192, 0.2)', // Moody Purple
      'rgba(193, 193, 193, 0.1)', // Soft Gray
      'rgba(128, 164, 132, 0.15)', // Sage Green
    ];
    
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      delay: Math.random() * -20,
      duration: 35 + Math.random() * 25,
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      size: {
        width: 400 + Math.random() * 500,
        height: 500 + Math.random() * 600
      },
      color: colors[i % colors.length]
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 bg-[#010101] pointer-events-none">
      {/* The Tribal/Mandala Pattern from Reference - Now highly visible */}
      <PatternedBackground />

      {/* Cinematic Vignette Overlay - Slightly reduced to show pattern edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.75)_100%)] z-10" />
      
      {/* Atmospheric Blur Canvases - Pushed behind pattern a bit more */}
      {elements.map((e) => (
        <Canvas key={e.id} {...e} isTyping={isTyping} />
      ))}
      
      {/* Global soft haze - reduced to keep pattern sharp */}
      <div className="absolute inset-0 backdrop-blur-[2px] opacity-10 z-[5]" />
    </div>
  );
};
