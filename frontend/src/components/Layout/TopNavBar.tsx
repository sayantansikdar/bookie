import React from 'react';

interface TopNavBarProps {
  onSetView: (view: 'welcome' | 'reading_corner') => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onSetView }) => {
  return (
    <header className="bg-[#fef9f1]/80 dark:bg-[#1d1c17]/80 backdrop-blur-md text-[#162837] dark:text-[#fef9f1] docked w-full top-0 sticky no-border shadow-sm shadow-[#1d1c17]/5 ease-in-out duration-300 z-50">
      <div className="flex justify-between items-center px-8 py-6 w-full max-w-[720px] mx-auto">
        <div 
          className="text-2xl font-headline tracking-tight text-[#162837] dark:text-[#fef9f1] cursor-pointer"
          onClick={() => onSetView('welcome')}
        >
          Bookie
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => onSetView('reading_corner')} 
            className="text-[#162837] dark:text-[#fef9f1] font-semibold border-b-2 border-transparent hover:border-[#162837] dark:hover:border-[#fef9f1] pb-1 transition-all duration-300"
          >
            Reading Corner
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-2xl cursor-pointer">auto_awesome</span>
          <span className="material-symbols-outlined text-2xl cursor-pointer" onClick={() => onSetView('reading_corner')}>menu_book</span>
        </div>
      </div>
    </header>
  );
};
