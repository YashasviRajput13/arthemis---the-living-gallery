
import React from 'react';
import { motion } from 'framer-motion';
import { ART_COLLECTIONS } from '../constants';
import { Collection } from '../types';

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="flex-shrink-0 w-[300px] md:w-[400px] group cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:border-white/20">
        <img 
          src={collection.items[0].imageUrl} 
          alt={collection.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
           <div className="w-12 h-1 bg-white/30 mb-4 group-hover:w-full transition-all duration-500" />
           <h4 className="text-3xl font-bold text-white mb-2">{collection.name}</h4>
           <p className="text-white/50 text-sm font-medium">{collection.items.length} Works</p>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
             style={{ background: `radial-gradient(circle at center, ${collection.accent}22 0%, transparent 70%)` }} />
      </div>
      <p className="text-white/60 text-sm italic pr-8 leading-relaxed line-clamp-2">
        "{collection.description}"
      </p>
    </motion.div>
  );
};

const Collections: React.FC = () => {
  return (
    <div className="py-32 overflow-hidden bg-[#080808]">
      <div className="px-8 mb-16 flex justify-between items-end">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-white/30 block mb-4"
          >
            Curated Playlists
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Mood Collections
          </motion.h2>
        </div>
      </div>

      <div className="relative">
        <motion.div 
          className="flex gap-8 px-8 pb-12 overflow-x-auto no-scrollbar"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {ART_COLLECTIONS.map(col => (
            <CollectionCard key={col.id} collection={col} />
          ))}
          {/* Duplicate for visual fullness */}
          {ART_COLLECTIONS.map(col => (
            <CollectionCard key={`${col.id}-dup`} collection={col} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Collections;
