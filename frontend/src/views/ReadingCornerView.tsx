import React from 'react';

// Hardcoded for the design since there's no defined endpoint for history yet
const mockHistory = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    rating: 4.5,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxty5JlUSNSrJII56GbGyPVn-c8E8esEWrbfHwxtfhPOi-zybRtVWSzJqTc6inYZBIKJtQUnu9FVEmVL3AK2C7eF_bZoraDaHkqVwje3q1XA-Oxy4eaNlZawbMI1VP-3KLUlr5qzNT-kxUkxVxtWzd59iHr_fe2XwTOe_vTNQiTLaYMiAAh2hR6KO74fAStUnKUKmkhqkiBPWa6eWrMWAMjBZV5evCLtzqzpdar8kyxr69BOMdSr_npdIKwrtGzhuVjJzDwdM3xQI"
  },
  {
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    rating: 5,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxa1mK5DGbZtu4Urp75GBFXL1rt3cxP3DgYdxGbwat1DpNz2UeH7btcBhL7QZtEsLfvN5jeyowooHEAJylEyV-S1htIOmejn8Nv_pzRluFz0tvv_p089xPaGcLwgGri9-ATadcuyztAxNI12GOvn0v3GZII05QkE37yk2oIznXADvseltpCJUPuKLl8HJCk09axXrwZh01VLY3xxdGwGGm9NsprQfOsZFwbi4-gVdLCHIOb4EVjK1utR6pzAU9RvBppp1znZNNrCQ"
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    rating: 4,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3sCBN-bbTuy4OIFZ-CtOoW4K47h3Y6edc6qJf0d2UNPLD7Ghlv9KqtPQDzgjlYsdkEs0haKpsciCu0W8M9qLb1SCOHt65Bq8zlblfl7EfnCs7C030wXp7mys-siQp7TuwK8BWklg1e_HAVJ-vNVKU_IJEFp2wIlmqzwAzhHhXv0Dzl7DAwvcFUftuebYQ4clYB_czF_Gs6YNbqeNKdyMXbVrjFvf9gi2-IgNCk_1c-pEDIZnZ0Vco8IvSIrwZA4SATuhFRVZ9FmA"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 5,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1Rbje04bxl7sqz2txhrDINqO8S5kX7K0OnJojdUCDt9WY9Cbfni648jrt3ZFzqvYu7PCA8uUOiJN-5-o7WjYZOJYWky0veKkStPICW_rhfmErhXTsOWkCh-wSIw7bF8HB4nGWeXyKLA7GbZKWpsBiVqVC_zwl8bx4JU_FBPmgXFY_7ImMJZElmRnxKhcDWicbkYDgmaHRLOjBqYL3Wc3tzBnVmtSBmaYB6DzngFLVOq24S34kWkpUjmtQsYuPQsGcZPXLbipvVYA"
  }
];

export const ReadingCornerView: React.FC = () => {
  return (
    <main className="max-w-[720px] mx-auto px-8 w-full py-16 space-y-24 flex-1">
      {/* Hero Title Section */}
      <section className="space-y-4">
        <h1 className="font-headline text-4xl md:text-5xl text-primary leading-tight tracking-tight">
          Previously, you lingered on...
        </h1>
        <p className="text-on-surface-variant font-light tracking-wide max-w-md">
          Tracing the path of your curiosities, one chapter at a time.
        </p>
      </section>

      {/* Reading History Horizontal Scroll */}
      <section className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline italic text-xl">Recent Shelves</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm">west</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm">east</span>
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="flex overflow-x-auto gap-8 no-scrollbar pb-12 -mx-4 px-4 snap-x cursor-grab active:cursor-grabbing">
          {mockHistory.map((book, idx) => (
            <div key={idx} className="flex-none w-48 snap-start group">
              <div className="bg-surface-container-low rounded-md overflow-hidden p-3 transition-transform duration-500 hover:-translate-y-2">
                <div className="aspect-[2/3] rounded shadow-md overflow-hidden mb-4 relative">
                  <img 
                    src={book.img} 
                    alt={book.title}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-primary/5"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline text-sm truncate leading-snug">{book.title}</h3>
                  <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant">{book.author}</p>
                  <div className="flex text-[#facc15] gap-0.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star} 
                        className="material-symbols-outlined text-xs" 
                        style={{ fontVariationSettings: `'FILL' ${star <= book.rating ? 1 : star - 0.5 === book.rating ? 0.5 : 0}` }}
                      >
                        {star - 0.5 === book.rating ? 'star_half' : 'star'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State / Placeholder Section */}
      <section className="relative bg-surface-container p-12 rounded-lg text-center flex flex-col items-center gap-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-secondary-container via-surface to-tertiary-fixed"></div>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-3xl text-primary/40">person_search</span>
          </div>
          <div className="absolute top-0 right-0 breathing-dot w-3 h-3 bg-secondary rounded-full"></div>
        </div>
        <div className="space-y-2 z-10">
          <p className="font-headline text-lg italic text-on-surface">The books are taking a nap.</p>
          <p className="text-on-surface-variant font-light text-sm max-w-xs mx-auto">Try again in a moment, they're currently rearranging their spines.</p>
        </div>
        <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-medium tracking-wide hover:opacity-90 transition-opacity z-10">
          Refresh the Shelf
        </button>
      </section>

      {/* Character Element */}
      <div className="flex justify-center items-center py-12 opacity-40">
        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-4xl">local_library</span>
          <span className="text-[10px] tracking-widest uppercase font-semibold">Keep exploring</span>
        </div>
      </div>
    </main>
  );
};
