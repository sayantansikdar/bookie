import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scene } from './components/ThreeCanvas/Scene';
import { SearchBox } from './components/UserInput/SearchBox';
import { Grid } from './components/RecommendationGrid/Grid';
import { useRecommendations } from './hooks/useRecommendations';
import { Book } from 'lucide-react';

function App() {
  const [userId, setUserId] = useState('');
  const { mutate: fetchRecos, data: recommendations, isPending, isError } = useRecommendations();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) fetchRecos(userId);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col font-sans">
      <Scene />

      <main className="flex-1 relative z-10 w-full flex flex-col items-center pt-24 px-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 max-w-2xl"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Book size={32} className="text-primary" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-white">Bookie</h1>
          </div>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            Step into your personal literary universe. Enter your ID and let our collaborative filtering engine curate your next great adventure.
          </p>
        </motion.div>

        <SearchBox 
          userId={userId} 
          setUserId={setUserId} 
          onSubmit={handleSearch} 
          isLoading={isPending} 
        />

        {isError && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-red-400 mt-4 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20"
          >
            A magical disturbance occurred loading recommendations. Try again!
          </motion.div>
        )}

        {recommendations && <Grid recommendations={recommendations} />}
      </main>
    </div>
  );
}

export default App;
