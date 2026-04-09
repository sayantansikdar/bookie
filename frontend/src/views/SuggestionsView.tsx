import React from 'react';
import { EnrichedRecommendation } from '../hooks/useRecommendations';

interface SuggestionsViewProps {
  recommendations: EnrichedRecommendation[];
  onBack: () => void;
}

export const SuggestionsView: React.FC<SuggestionsViewProps> = ({ recommendations, onBack }) => {
  return (
    <main className="max-w-[720px] mx-auto px-6 pt-12 pb-24 w-full">
      {/* Breadcrumb */}
      <div 
        onClick={onBack}
        className="mb-10 group cursor-pointer inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span className="text-sm font-medium tracking-wide">Back to Home</span>
      </div>

      {/* Greeting */}
      <section className="mb-16">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-4">
          Hello, reader. We found these for you.
        </h1>
        <p className="text-on-surface-variant text-lg max-w-[500px] font-body leading-relaxed">
          Based on your recent quiet moments and thoughtful selections, we believe these stories will resonate with you today.
        </p>
      </section>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {recommendations.map((book, idx) => (
          <article key={idx} className="flex flex-col gap-5 group">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5">
              <img 
                src={book.coverImage || `https://via.placeholder.com/300x400.png?text=${encodeURIComponent(book.title)}`} 
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover" 
              />
              <button 
                className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm p-3 rounded-full text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">bookmark</span>
              </button>
            </div>
            <div className="flex flex-col gap-1 px-1">
              <span className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-1">
                A mindful selection
              </span>
              <h3 className="font-headline text-2xl text-primary line-clamp-2">{book.title}</h3>
              <p className="font-body text-sm text-on-surface-variant opacity-80">{book.author}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
