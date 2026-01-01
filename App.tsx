
import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Collections from './components/Collections';
import Journey from './components/Journey';
import DailyMix from './components/DailyMix';
import Footer from './components/Footer';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import UploadView from './components/UploadView';
import DiscoveryFeed from './components/DiscoveryFeed';
import LibraryView from './components/LibraryView';
import ExploreView from './components/ExploreView';
import ArtDetailModal from './components/ArtDetailModal';
import MilestonesView from './components/MilestonesView';
import ExhibitionNews from './components/ExhibitionNews';
import RestorationLab from './components/RestorationLab';
import ProfileView from './components/ProfileView';
import AestheticSanctuary from './components/AestheticSanctuary';
import { ViewState, ArtCard } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home'); 
  const [selectedArt, setSelectedArt] = useState<ArtCard | null>(null);
  const [discoveryFilter, setDiscoveryFilter] = useState<string | null>(null);
  const [libraryInitialTab, setLibraryInitialTab] = useState<'collections' | 'artists' | 'recent'>('collections');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('home'); 
  };

  const navigateToDiscovery = (filter?: string) => {
    setDiscoveryFilter(filter || null);
    setCurrentView('discovery');
  };

  const navigateToLibrary = (tab: 'collections' | 'artists' | 'recent') => {
    setLibraryInitialTab(tab);
    setCurrentView('library');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <Login onLogin={handleLoginSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen"
          >
            <Sidebar 
              currentView={currentView} 
              setView={setCurrentView} 
              onNavigateLibrary={navigateToLibrary}
            />
            
            <div className="flex-1 h-screen overflow-y-auto relative no-scrollbar">
              {/* Progress Bar (Only for brand story/home view) */}
              {currentView === 'home' && (
                <motion.div
                  className="fixed top-0 left-72 right-0 h-0.5 bg-white/20 z-[100] origin-left"
                  style={{ scaleX }}
                />
              )}

              <AnimatePresence mode="wait">
                {currentView === 'home' ? (
                  <motion.div
                    key="home-brand-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <section id="hero">
                      <Hero onDiscover={() => navigateToDiscovery()} />
                    </section>
                    <HowItWorks />
                    <Collections />
                    <Journey />
                    <DailyMix />
                    <Footer />
                  </motion.div>
                ) : currentView === 'discovery' ? (
                  <motion.div
                    key="discovery-view"
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DiscoveryFeed 
                      activeFilter={discoveryFilter} 
                      onFilterChange={setDiscoveryFilter}
                      onExamine={setSelectedArt}
                    />
                  </motion.div>
                ) : currentView === 'explore' ? (
                  <motion.div
                    key="explore-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ExploreView onSelectMovement={(m) => navigateToDiscovery(m)} />
                  </motion.div>
                ) : currentView === 'library' ? (
                  <motion.div
                    key="library-view"
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <LibraryView initialTab={libraryInitialTab} onExamine={setSelectedArt} />
                  </motion.div>
                ) : currentView === 'milestones' ? (
                  <motion.div
                    key="milestones-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MilestonesView />
                  </motion.div>
                ) : currentView === 'news' ? (
                  <motion.div
                    key="news-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ExhibitionNews />
                  </motion.div>
                ) : currentView === 'upload' ? (
                  <motion.div
                    key="upload-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UploadView />
                  </motion.div>
                ) : currentView === 'gaze' ? (
                  <motion.div
                    key="gaze-view"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                  >
                    <RestorationLab />
                  </motion.div>
                ) : currentView === 'profile' ? (
                  <motion.div
                    key="profile-view"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <ProfileView 
                      onExamine={setSelectedArt} 
                      onUpload={() => setCurrentView('upload')} 
                    />
                  </motion.div>
                ) : currentView === 'sanctuary' ? (
                  <motion.div
                    key="sanctuary-view"
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    transition={{ duration: 1.5 }}
                  >
                    <AestheticSanctuary />
                  </motion.div>
                ) : (
                  <motion.div
                    key="fallback"
                    className="flex items-center justify-center h-full text-white/20 text-xs font-black tracking-widest uppercase italic"
                  >
                    Module syncing with Gallery AI...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ArtDetailModal 
        art={selectedArt} 
        onClose={() => setSelectedArt(null)} 
      />
      
      {/* Global Animated Film Grain Overlay */}
      <div className="film-grain opacity-[0.03]" />
    </div>
  );
};

export default App;
