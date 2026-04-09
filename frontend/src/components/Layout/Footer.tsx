import React from 'react';

interface FooterProps {
  onSetView?: (view: 'ambient') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSetView }) => {
  return (
    <footer className="bg-transparent w-full py-12 tonal-shift border-t border-outline-variant/5 mt-auto">
      <div className="max-w-[720px] mx-auto flex flex-col items-center gap-4 px-8">
        <div className="flex gap-8 mb-4">
          <a className="text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity duration-500" href="#">Privacy</a>
          <a className="text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity duration-500" href="#">Terms</a>
          <a className="text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity duration-500" href="#">Community</a>
          {onSetView && (
            <button 
              className="text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm tracking-wide opacity-60 hover:opacity-100 transition-opacity duration-500 underline" 
              onClick={() => onSetView('ambient')}
            >
              Ambient Mode
            </button>
          )}
        </div>
        <div className="text-center">
          <p className="font-medium mb-2 text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm">Bookie recommends slowly. Take your time.</p>
          <p className="text-[#1d1c17] dark:text-[#fef9f1] font-body text-sm tracking-wide opacity-60">© Bookie — Your Gentle Reading Companion</p>
        </div>
      </div>
    </footer>
  );
};
