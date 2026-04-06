import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { EnrichedRecommendation } from '../../hooks/useRecommendations';

interface Props {
  book: EnrichedRecommendation;
  index: number;
}

export const BookCard: React.FC<Props> = ({ book, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ y: -10 }}
      className="relative bg-surface rounded-xl overflow-hidden shadow-xl border border-white/5 flex flex-col group cursor-pointer z-10"
    >
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10 opacity-60" />
        <motion.img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.button 
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20 text-white/70 hover:text-red-400 hover:border-red-400/50 transition-colors"
        >
          <Heart size={18} />
        </motion.button>
      </div>
      
      <div className="p-5 flex-1 flex flex-col relative z-20 bg-surface">
        <h3 className="text-lg font-serif font-bold text-white mb-1 line-clamp-1 truncate">{book.title}</h3>
        <p className="text-sm text-gray-400 flex-1">{book.author}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1 bg-white/5 rounded-full px-3 py-1">
            <Star size={14} className="text-primary fill-primary" />
            <span className="text-sm font-semibold text-white">{book.predictedRating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-500">Predicted</span>
        </div>
      </div>
    </motion.div>
  );
};
