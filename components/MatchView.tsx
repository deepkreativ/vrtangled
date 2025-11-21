import React, { useEffect, useState } from 'react';
import { MatchResult, UserProfile } from '../types';
import { generateRitual } from '../services/geminiService';
import PersonalityRadar from './PersonalityRadar';

interface Props {
  currentUser: UserProfile;
  match: MatchResult;
  onClose: () => void;
}

const MatchView: React.FC<Props> = ({ currentUser, match, onClose }) => {
  const [ritual, setRitual] = useState<{ title: string, steps: string[], topic: string } | null>(null);
  const [loadingRitual, setLoadingRitual] = useState(true);

  useEffect(() => {
    const fetchRitual = async () => {
      const result = await generateRitual(currentUser, match.user);
      setRitual(result);
      setLoadingRitual(false);
    };
    fetchRitual();
  }, [currentUser, match.user]);

  return (
    <div className="min-h-screen bg-surface p-6 overflow-y-auto">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
        Close
      </button>
      
      <div className="flex flex-col items-center mt-8 mb-8">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-sm font-bold uppercase tracking-widest mb-2">Match Found</h2>
        <div className="relative w-32 h-32">
           {/* Overlapping Avatars */}
           <img src={currentUser.avatarUrl} className="w-20 h-20 rounded-full border-4 border-surface absolute left-0 top-0 z-10" />
           <img src={match.user.avatarUrl} className="w-20 h-20 rounded-full border-4 border-surface absolute right-0 bottom-0 z-20" />
           <div className="absolute inset-0 flex items-center justify-center z-30">
             <div className="bg-white text-surface font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-xs">
               {match.compatibility}%
             </div>
           </div>
        </div>
        <h1 className="text-3xl font-bold text-white mt-4">{match.user.name}</h1>
        <p className="text-gray-400 text-sm">{match.user.education} • {match.user.age}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Comparison */}
        <div className="bg-surface-light rounded-2xl p-6 border border-white/5">
          <h3 className="text-white font-semibold mb-4 text-center">Psychological Overlay</h3>
          <div className="flex justify-center gap-4 mb-2 text-xs">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-accent rounded-full"></div> You</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-secondary rounded-full"></div> {match.user.name.split(' ')[0]}</span>
          </div>
          <PersonalityRadar traits={currentUser.traits} compareTraits={match.user.traits} showLabels={false} />
          <p className="text-center text-gray-400 text-xs mt-2">High resonance in {match.sharedTraits.join(', ')}</p>
        </div>

        {/* Ritual Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h3 className="text-white font-bold text-lg">The Meeting Ritual</h3>
          </div>
          
          {loadingRitual ? (
             <div className="space-y-3 animate-pulse">
               <div className="h-4 bg-white/10 rounded w-3/4"></div>
               <div className="h-4 bg-white/10 rounded w-1/2"></div>
               <div className="h-4 bg-white/10 rounded w-full"></div>
             </div>
          ) : (
            <div className="animate-fade-in">
              <h4 className="text-pink-300 font-semibold mb-2">{ritual?.title}</h4>
              <p className="text-gray-300 text-sm italic mb-4">"{ritual?.topic}"</p>
              <div className="space-y-3">
                {ritual?.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="bg-white/10 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold">{idx + 1}</span>
                    <p className="text-sm text-gray-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button className="w-full bg-white text-surface font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors">
          Send Wave 👋
        </button>
      </div>
    </div>
  );
};

export default MatchView;
