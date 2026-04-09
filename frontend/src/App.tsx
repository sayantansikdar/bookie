import React, { useState, useEffect } from 'react';
import { TopNavBar } from './components/Layout/TopNavBar';
import { Footer } from './components/Layout/Footer';
import { WelcomeView } from './views/WelcomeView';
import { SuggestionsView } from './views/SuggestionsView';
import { ReadingCornerView } from './views/ReadingCornerView';
import { AmbientModeView } from './views/AmbientModeView';
import { useRecommendations } from './hooks/useRecommendations';

type ViewState = 'welcome' | 'suggestions' | 'reading_corner' | 'ambient';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('welcome');
  const [activeUserId, setActiveUserId] = useState<string>('');
  
  const { mutate: fetchRecos, data: recommendations, isPending, isError } = useRecommendations();

  const handleSearch = (userId: string) => {
    setActiveUserId(userId);
    fetchRecos(userId);
  };
  
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setCurrentView('suggestions');
    }
  }, [recommendations]);

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeView onSearch={handleSearch} isLoading={isPending} />;
      case 'suggestions':
        return <SuggestionsView recommendations={recommendations || []} onBack={() => setCurrentView('welcome')} />;
      case 'reading_corner':
        return <ReadingCornerView />;
      case 'ambient':
        return <AmbientModeView onExit={() => setCurrentView('welcome')} />;
      default:
        return <WelcomeView onSearch={handleSearch} isLoading={isPending} />;
    }
  };

  // If ambient mode, we bypass the global nav/footer for an immersive experience
  if (currentView === 'ambient') {
    return <AmbientModeView onExit={() => setCurrentView('welcome')} />;
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col font-sans overflow-x-hidden">
      {/* Global Background Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{
          background: 'radial-gradient(at 0% 0%, #fef9f1 0%, transparent 50%), radial-gradient(at 100% 0%, #f8f3eb 0%, transparent 50%), radial-gradient(at 100% 100%, #ece8e0 0%, transparent 50%), radial-gradient(at 0% 100%, #f1e1c4 0%, transparent 50%)',
          filter: 'blur(80px)',
          opacity: 0.6
        }}
      ></div>
      <div 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuB5cLfXkgdVaVyohRxq4E8FhpP5s4d9BvX1uma-2CjmrHquI0YewxJH5-okb9oP1HA1wF2rCcGjhv0iku1PIea2NwhZ1ef3ocpBNUCFFkWpQogegML17nKUfuqz35P3PU7vLUUdSxKn89IGfsTSJ7HD_JEXhPLnW9t8q0hvg9YIqY30XCoDImdvpV0tsydgEwEiOySe8WP_d-aM0ResYLjL1iAjqq1IjmHE_A_3YQjim2s1YNHDfCM6lCmBSgo-wbdmJB1vZ_fIAc8)',
          opacity: 0.025
        }}
      ></div>

      <TopNavBar onSetView={setCurrentView} />

      <main className="flex-1 relative z-10 w-full flex flex-col items-center">
        {isError && currentView === 'welcome' && (
           <div className="text-red-800 mt-8 bg-red-100 px-6 py-3 rounded-xl border border-red-200/50 max-w-lg mx-auto shadow-sm">
             We couldn't reach the shelves. Please try again.
           </div>
        )}
        
        {renderView()}
      </main>

      <Footer onSetView={setCurrentView} />
    </div>
  );
}

export default App;
