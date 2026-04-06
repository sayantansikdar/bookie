import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface Props {
  userId: string;
  setUserId: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const SearchBox: React.FC<Props> = ({ userId, setUserId, onSubmit, isLoading }) => {
  return (
    <motion.form 
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="relative w-full max-w-md mx-auto z-10 my-10"
    >
      <div className="relative flex items-center shadow-2xl shadow-primary/20 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 p-2 transition-all focus-within:border-primary/50 focus-within:shadow-primary/40">
        <Search className="text-gray-400 ml-3" size={20} />
        <input 
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter Magic ID (e.g. 15)"
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 placeholder-gray-500 font-sans"
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-black font-semibold rounded-full px-6 py-2 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          disabled={isLoading || !userId}
        >
          {isLoading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
          ) : (
             "Discover"
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};
