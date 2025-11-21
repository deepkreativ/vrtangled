import React, { useState } from 'react';
import { LocationPoint, UserProfile, MatchResult } from '../types';
import { MOCK_LOCATIONS, MOCK_USERS } from '../constants';

interface Props {
  currentUser: UserProfile;
  onMatchFound: (match: MatchResult) => void;
  onCancel: () => void;
}

const CheckIn: React.FC<Props> = ({ currentUser, onMatchFound, onCancel }) => {
  const [scanning, setScanning] = useState<string | null>(null);

  const calculateCompatibility = (u1: UserProfile, u2: UserProfile): number => {
    // Euclidean distance-ish similarity
    const diff = 
      Math.abs(u1.traits.openness - u2.traits.openness) +
      Math.abs(u1.traits.conscientiousness - u2.traits.conscientiousness) +
      Math.abs(u1.traits.extraversion - u2.traits.extraversion) +
      Math.abs(u1.traits.agreeableness - u2.traits.agreeableness) +
      Math.abs(u1.traits.neuroticism - u2.traits.neuroticism);
    
    // Max possible diff is 500 (100*5). Invert to get similarity.
    const similarity = Math.max(0, 100 - (diff / 5));
    return Math.round(similarity);
  };

  const handleCheckIn = (locId: string) => {
    setScanning(locId);
    
    // Simulate network delay and matching algorithm
    setTimeout(() => {
      // Find best match from mock users (excluding self if in list)
      let bestMatch: UserProfile = MOCK_USERS[0];
      let highestScore = 0;

      MOCK_USERS.forEach(other => {
        const score = calculateCompatibility(currentUser, other);
        if (score > highestScore) {
          highestScore = score;
          bestMatch = other;
        }
      });

      const result: MatchResult = {
        user: bestMatch,
        compatibility: highestScore,
        sharedTraits: ['High Openness', 'Similar Education'] // Simplified for demo
      };

      onMatchFound(result);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-surface p-6">
      <div className="flex items-center mb-6">
        <button onClick={onCancel} className="p-2 rounded-full bg-white/5 hover:bg-white/10 mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold text-white">Nearby Locations</h2>
      </div>

      {scanning ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-4 border-primary rounded-full opacity-25 animate-ping"></div>
            <div className="absolute inset-0 border-4 border-secondary rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute inset-2 bg-surface-light rounded-full flex items-center justify-center border border-white/10">
               <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Scanning Crowd...</h3>
          <p className="text-gray-400">Comparing OCEAN vectors with {MOCK_LOCATIONS.find(l => l.id === scanning)?.attendees} people.</p>
        </div>
      ) : (
        <div className="space-y-4 animate-slide-up">
          {MOCK_LOCATIONS.map((loc) => (
            <div key={loc.id} className="bg-surface-light p-4 rounded-xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleCheckIn(loc.id)}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${loc.type === 'University' ? 'bg-blue-500/20 text-blue-400' : loc.type === 'Cafe' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                   {/* Icons based on type */}
                   {loc.type === 'University' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
                   {loc.type === 'Cafe' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 1v3M10 1v3M14 1v3" /></svg>}
                   {loc.type !== 'University' && loc.type !== 'Cafe' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                </div>
                <div>
                  <h3 className="font-bold text-white">{loc.name}</h3>
                  <p className="text-xs text-gray-400">{loc.type} • {loc.distance}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-accent">{loc.attendees}</span>
                <span className="text-xs text-gray-500">here now</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckIn;
