import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookCard } from '../BookCard/BookCard';
import { EnrichedRecommendation } from '../../hooks/useRecommendations';

interface Props {
  recommendations: EnrichedRecommendation[];
}

export const Grid: React.FC<Props> = ({ recommendations }) => {
  if (!recommendations.length) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto mt-16 px-4 z-10 relative pb-20"
    >
      <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
        <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
          Your Curated Library
        </h2>
        <p className="text-sm text-primary">Based on ML Patterns</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <AnimatePresence>
          {recommendations.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
