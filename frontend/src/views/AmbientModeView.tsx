import React, { useState, useEffect } from 'react';

interface AmbientModeViewProps {
  onExit: () => void;
}

export const AmbientModeView: React.FC<AmbientModeViewProps> = ({ onExit }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#fef9f1] flex flex-col items-center justify-center text-on-surface select-none z-[100] overflow-hidden">
      {/* Immersive Background System */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(at 0% 0%, #fef9f1 0%, transparent 50%), radial-gradient(at 100% 0%, #f8f3eb 0%, transparent 50%), radial-gradient(at 100% 100%, #f2ede5 0%, transparent 50%), radial-gradient(at 0% 100%, #ece8e0 0%, transparent 50%), radial-gradient(at 50% 50%, #f5f0e8 0%, transparent 50%)',
          backgroundSize: '200% 200%'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBq1PGhHOzjnQhU4rk1jSM2Ku77Sbd_KmK5w3Uw8hsjv7NszkZdnN3rEAaYVdB836OG9svv6KR9tZQ-Lnx0qIqAWapOgDhTVEGsClzNcDwzwAxQzO3bjWcU4qliAtxveJxOwMBpVWCQe-E3pJTNqKlrsZd3nrlTH659aHd9c6gGivToBJQxQzjGB2lMWKGioC5819P23_25k1TGhNz1_OLVfEuVeVlfamaLbjMEpi_CY7rzIg8ybyrKQ2SjKn6fJMnav5s--_ESh5A)'
        }}
      />

      {/* Floating Decorative Elements (Origami Cranes) */}
      <div className="absolute opacity-40 top-[15%] left-[20%] w-32 h-32 pointer-events-none" style={{ filter: 'grayscale(1) brightness(0.9)', mixBlendMode: 'multiply' }}>
        <img alt="Paper origami crane" className="w-full h-full object-contain rotate-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMEAnyfpXtG6beLAX925EfiUrKjpG2jY0UdfJ39ohBAHyPjroz4i1Mq-0VqKO5Rsr1CidO17KH8tbXYGPWhT7D9YE8TUEM9CBtNWE8FS2i5Ayb_PIHG53NjG3RIhhoY38vbwIJjtEu4XRZdVP8HsIq2PmJ0rbU8k3sTQeBy10krI-TKTu9KjzAvV1u4Fv5iHbh6g5CF33JxE5EbXY4MaNyVY9f5QHN1-2cSmqJ6OWrIByJVAMY6E5TbVEEATcvX3kltwjSh8iBl0I" />
      </div>
      <div className="absolute opacity-40 bottom-[25%] right-[15%] w-48 h-48 pointer-events-none" style={{ filter: 'grayscale(1) brightness(0.9)', mixBlendMode: 'multiply' }}>
        <img alt="Paper origami crane" className="w-full h-full object-contain -rotate-12 scale-x-[1]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe0O2d91lwqe-ePUs-AfZWyBEj393XuQZ8eeLzt3v7bT2PilxsBvkinb2iQGlPp3TGu-6pcTZjn8-63-_fwZyMt-6BpJrtrzwROQqgJaAsaX4tZTqwyZW9CYwONwoxhnEb1bGMC1iNvfKAQkdTh2ktWjrX9FDxKcFg2NgRCF-gfYeaQeQ4zIYRNemNHV7Yam6OuZ7VsurlXngU-Bm_d07fC_Di2_g7j6t4z_wkg-_EQl7dUYPLqdzRAxwuqDox3ZKaT-xiDRzCD6Y" />
      </div>

      {/* Center Content: Ambient Clock */}
      <main className="text-center z-10 flex-col items-center gap-2">
        <h1 className="font-clock text-[12rem] md:text-[18rem] leading-none opacity-10 font-light tracking-widest clock-shadow">
          {time}
        </h1>
        <p className="font-label tracking-[0.4em] text-on-surface opacity-30 text-xs md:text-sm uppercase breathing-dot">
          Breath In • Breath Out
        </p>
      </main>

      {/* Footer: Exit Action */}
      <footer className="absolute bottom-12 left-0 right-0 flex justify-center z-20 px-8 cursor-pointer">
        <button 
          onClick={onExit}
          className="border border-outline-variant/10 text-on-surface opacity-10 hover:opacity-100 transition-all duration-700 ease-in-out px-10 py-3 rounded-full font-label text-xs tracking-widest flex items-center gap-3 backdrop-blur-sm bg-white/5"
        >
          <span className="material-symbols-outlined text-sm">close</span>
          Exit Ambient Mode
        </button>
      </footer>

      {/* Decorative Subtle Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[819px] bg-surface-container-lowest/20 rounded-full blur-[120px] pointer-events-none z-[-1]"></div>
    </div>
  );
};
