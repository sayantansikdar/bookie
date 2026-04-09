import React, { useState } from 'react';

interface WelcomeViewProps {
  onSearch: (userId: string) => void;
  isLoading: boolean;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onSearch, isLoading }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onSearch(userId);
    }
  };

  return (
    <div className="relative min-h-[819px] flex flex-col justify-center">
      {/* Decorative Paper Crane Asset */}
      <div className="absolute top-[15%] right-[10%] w-[60px] h-[60px] opacity-40 pointer-events-none drop-shadow-[4px_12px_8px_rgba(0,0,0,0.05)]">
        <svg className="text-primary-container/20" fill="currentColor" viewBox="0 0 100 100">
          <path d="M10 50 L40 40 L50 10 L60 40 L90 50 L60 60 L50 90 L40 60 Z" />
        </svg>
      </div>

      <main className="max-w-[720px] mx-auto px-8 w-full">
        {/* Hero Content */}
        <div className="space-y-12 py-20 relative">
          <div className="space-y-6">
            <h1 className="font-headline text-5xl md:text-6xl leading-[1.1] tracking-tight text-primary">
              Find your next <span className="italic font-normal">quiet</span> read.
            </h1>
            <p className="font-headline text-2xl md:text-3xl text-on-surface-variant max-w-[540px] leading-relaxed">
              No rush. No algorithms shouting.
            </p>
          </div>

          {/* Search Interaction Area */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative group">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-surface-container-lowest border-none px-8 py-6 rounded-xl text-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:ring-0 focus:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all placeholder:text-on-surface-variant/40 text-on-surface"
                placeholder="Enter your reader ID..."
                disabled={isLoading}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                <span className="material-symbols-outlined" data-icon="fingerprint">fingerprint</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                type="submit"
                disabled={isLoading || !userId.trim()}
                className="w-full sm:w-auto bg-[#8AAE92] text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? 'Listening...' : 'Suggest a book for me'}
              </button>
              <div className="flex items-center gap-2 text-on-surface-variant/60">
                <span className="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
                <span className="text-sm font-label tracking-widest uppercase">Curated by hands</span>
              </div>
            </div>
          </form>

          {/* Bento-style Feature Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-12">
            <div className="bg-surface-container-low p-8 rounded-lg space-y-3">
              <span className="material-symbols-outlined text-secondary" data-icon="filter_vintage">filter_vintage</span>
              <h3 className="font-headline text-xl">The Slow List</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Weekly hand-picked selections that don't expire. Books meant for lingering.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg space-y-3">
              <span className="material-symbols-outlined text-secondary" data-icon="temp_preferences_custom">temp_preferences_custom</span>
              <h3 className="font-headline text-xl">Tactile Metrics</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">We don't track speed. We track connection, warmth, and the weight of words.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Tiny Animated Reading Character */}
      <div className="fixed bottom-[40px] right-[40px] hidden lg:flex flex-col items-center z-50">
        <div className="w-[2px] h-[10px] bg-[#1d1c17] opacity-20 rounded-[2px] mb-[2px] animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-surface-container-high border-t-2 border-primary/10 relative overflow-hidden flex items-center justify-center">
          <img alt="Small icon of a coffee cup" className="w-4 h-4 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAx17cE94S63Rzt4UygadlV4uX68AdyBZVRfCEwKKsx5-KQwmJfZz8iI-ONRZaiosLW8i2953iT8eRvL8doB-sju0-6MSwxh-od9R3e7vZtJ9cF5VVXkTJMVIkyKiblB3LPOyKjq3Yx14wtD1rwMU0MKQPYhgigY9UtoxQUqQwNYsJ4yezrpGm1S2stIuvgE0CxrrYYVAQqLb9VBCBREq9GMcaKudh0BcuzUFFHP9anLa2ffsWg6NeJdVdujOLmaQ5vwmzXjpJVZ4" />
        </div>
        <div className="w-12 h-16 bg-primary-container/10 rounded-t-xl mt-1 flex items-end justify-center pb-2">
          <span className="material-symbols-outlined text-primary/40 text-xs" data-icon="face_5">face_5</span>
        </div>
      </div>
    </div>
  );
};
