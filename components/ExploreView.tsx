
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, History, Filter } from 'lucide-react';

interface ExploreViewProps {
  onSelectMovement: (movement: string) => void;
}

const GenreCard: React.FC<{ title: string; color: string; image: string; onClick: () => void }> = ({ title, color, image, onClick }) => (
  <motion.div
    whileHover={{ scale: 0.96, y: -5 }}
    onClick={onClick}
    className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group"
    style={{ backgroundColor: color }}
  >
    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
       <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={title} />
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/80" />
    <div className="absolute bottom-6 left-6 pr-6">
      <h4 className="text-2xl font-serif text-white font-medium">{title}</h4>
    </div>
  </motion.div>
);

const ExploreView: React.FC<ExploreViewProps> = ({ onSelectMovement }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { title: 'Baroque Masters', filter: 'Classic', color: '#1a1410', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5' },
    { title: 'Cyber-Brutalism', filter: 'Digital', color: '#0a0a0a', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853' },
    { title: 'Impressionist Mornings', filter: 'Dreamy', color: '#2d332d', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342' },
    { title: 'Minimalist Void', filter: 'Abstract', color: '#1a1a1a', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab' },
    { title: 'Street Archeology', filter: 'Raw', color: '#2a2220', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3' },
    { title: 'Digital Ethereal', filter: 'Ethereal', color: '#161d2a', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' },
  ];

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => cat.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-40 px-8 md:px-20 pt-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-24 group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artists, movements, or visual moods..."
            className="w-full h-20 pl-20 pr-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] text-xl font-light text-white outline-none focus:bg-white/[0.05] focus:border-white/10 transition-all placeholder:text-white/10"
          />
        </div>

        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <TrendingUp size={16} className="text-white/20" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Trending Movements</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <GenreCard 
                  key={cat.title} 
                  {...cat} 
                  onClick={() => onSelectMovement(cat.filter)} 
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center opacity-20 italic">No movements found.</div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <History size={16} className="text-white/20" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Emerging Curators</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                onClick={() => onSelectMovement(i === 1 ? 'Lia Bloom' : 'Caravaggio')}
                className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 flex gap-8 items-center group cursor-pointer hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10">
                   <img src={`https://i.pravatar.cc/150?u=artist${i}`} alt="Artist" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-serif text-white/90 group-hover:text-white transition-colors">Arthemis Studio {i === 1 ? 'Curator' : 'Resident'}</h4>
                  <p className="text-xs text-white/30 mt-2 font-medium">Focused on: Atmospheric Landscapes • Digital Oil</p>
                </div>
                <button className="px-6 py-3 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExploreView;
