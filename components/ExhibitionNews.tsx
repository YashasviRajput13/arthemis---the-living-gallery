
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Search, Globe, ExternalLink, Loader2, Calendar, MapPin } from 'lucide-react';
import { getArtNews } from '../services/geminiService';

const NewsCard: React.FC<{ title: string; summary: string; location?: string; index: number }> = ({ title, summary, location, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    className="group relative p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
       <Newspaper size={40} />
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="px-3 py-1 bg-orange-200/10 border border-orange-200/20 rounded-full text-[8px] font-black uppercase tracking-widest text-orange-200/60">
          Curated Press
        </div>
        {location && (
          <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-white/30">
            <MapPin size={10} /> {location}
          </div>
        )}
      </div>
      
      <h3 className="text-3xl font-serif text-white/90 mb-6 group-hover:text-white transition-colors leading-tight">
        {title}
      </h3>
      
      <p className="text-white/40 font-light leading-relaxed text-lg italic mb-8 line-clamp-3 group-hover:line-clamp-none transition-all duration-700">
        {summary}
      </p>
      
      <div className="pt-6 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Exhibition Detail</span>
        <button className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white flex items-center gap-2 transition-colors">
          Read Release <ExternalLink size={12} />
        </button>
      </div>
    </div>
  </motion.div>
);

const ExhibitionNews: React.FC = () => {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLocation, setActiveLocation] = useState('Global');

  const fetchNews = async (loc: string) => {
    setLoading(true);
    try {
      const data = await getArtNews(loc);
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeLocation);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveLocation(searchQuery);
      fetchNews(searchQuery);
    }
  };

  // Safe splitting of the text
  const newsLines = news?.text ? news.text.split('\n') : [];
  const headline = newsLines[0] || "Exploring the frontiers of contemporary art.";
  const summaryLines = newsLines.slice(1, 4);

  return (
    <div className="min-h-screen pb-40 px-8 md:px-20 pt-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-white/20 mb-6"
          >
            <Globe size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.6em]">The Exhibition Journal</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-6xl md:text-9xl tracking-tight leading-[0.85]"
            >
              Current <br />
              <span className="italic text-white/20">Chronicles.</span>
            </motion.h2>
            
            <form onSubmit={handleSearch} className="relative group w-full lg:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or museum..."
                className="w-full h-16 pl-16 pr-6 bg-white/[0.03] border border-white/5 rounded-2xl text-sm font-medium text-white outline-none focus:bg-white/[0.05] focus:border-white/20 transition-all placeholder:text-white/10"
              />
            </form>
          </div>
        </header>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-8">
            <Loader2 className="animate-spin text-white/20" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic animate-pulse">
              Syncing with Global Art Registries...
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="prose prose-invert max-w-none">
                  <p className="text-2xl font-serif italic text-white/60 leading-relaxed mb-12 border-l-2 border-white/10 pl-12">
                    {headline}
                  </p>
                  <div className="text-white/40 font-light leading-relaxed text-lg space-y-6">
                    {summaryLines.map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {(news?.sources || []).slice(0, 3).map((source: any, idx: number) => (
                  <NewsCard 
                    key={idx} 
                    title={source.title || "Gallery Dispatch"} 
                    summary="New exhibition cycles are emerging in major cultural hubs, blending immersive technology with traditional mediums." 
                    location={activeLocation}
                    index={idx}
                  />
                ))}
              </div>
            </div>

            <section className="pt-32 border-t border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <Calendar size={18} className="text-white/20" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic">Verified Source Registry</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(news?.sources || []).map((source: any, i: number) => (
                  <motion.a
                    key={i}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 10 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex-1 truncate pr-4">
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Journal Entry {i + 1}</p>
                      <h4 className="text-sm font-bold text-white/60 group-hover:text-white transition-colors truncate">{source.title}</h4>
                    </div>
                    <ExternalLink size={14} className="text-white/20 group-hover:text-white transition-colors shrink-0" />
                  </motion.a>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>

      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/[0.03] blur-[200px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/[0.03] blur-[200px] rounded-full pointer-events-none -z-10" />
    </div>
  );
};

export default ExhibitionNews;
