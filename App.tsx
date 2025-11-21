import React, { useState } from 'react';
import { ViewState, UserProfile, MatchResult } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import CheckIn from './components/CheckIn';
import MatchView from './components/MatchView';

// Global styles for animations
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }
`;

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentMatch, setCurrentMatch] = useState<MatchResult | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setCurrentUser(profile);
    setView(ViewState.DASHBOARD);
  };

  const handleCheckIn = () => {
    setView(ViewState.CHECK_IN);
  };

  const handleMatchFound = (match: MatchResult) => {
    setCurrentMatch(match);
    setView(ViewState.MATCH_FOUND);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans relative overflow-hidden">
      <style>{animationStyles}</style>
      
      {/* Background Ambient Globs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="relative z-10 max-w-md mx-auto min-h-screen bg-black/20 backdrop-blur-sm shadow-2xl border-x border-white/5">
        
        {view === ViewState.ONBOARDING && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {view === ViewState.DASHBOARD && currentUser && (
          <Dashboard user={currentUser} onCheckIn={handleCheckIn} />
        )}

        {view === ViewState.CHECK_IN && currentUser && (
          <CheckIn 
            currentUser={currentUser} 
            onMatchFound={handleMatchFound}
            onCancel={() => setView(ViewState.DASHBOARD)}
          />
        )}

        {view === ViewState.MATCH_FOUND && currentUser && currentMatch && (
          <MatchView 
            currentUser={currentUser}
            match={currentMatch}
            onClose={() => setView(ViewState.DASHBOARD)}
          />
        )}

      </main>
    </div>
  );
};

export default App;
