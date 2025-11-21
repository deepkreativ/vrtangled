import React from 'react';
import { UserProfile } from '../types';
import PersonalityRadar from './PersonalityRadar';

interface Props {
  user: UserProfile;
  onCheckIn: () => void;
}

const Dashboard: React.FC<Props> = ({ user, onCheckIn }) => {
  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Hello, {user.name.split(' ')[0]}</h1>
          <p className="text-gray-400 text-sm">Ready to find your kin?</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
          <img src={user.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-surface" />
        </div>
      </header>

      {/* Influence Card */}
      <div className="bg-surface-light rounded-2xl p-6 mb-6 shadow-lg border border-white/5 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-400 uppercase text-xs tracking-wider font-semibold">Influence Score</span>
            <span className="text-3xl font-bold text-white">{user.influenceScore}</span>
          </div>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary w-1/4 h-full rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Connect with 3 more people to reach Level 2.</p>
        </div>
      </div>

      {/* Personality Chart */}
      <div className="bg-surface-light rounded-2xl p-6 mb-6 shadow-lg border border-white/5">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Your Psycho-Signature
        </h3>
        <PersonalityRadar traits={user.traits} />
        <p className="text-sm text-gray-400 mt-4 italic">"{user.bio}"</p>
      </div>

      {/* Call to Action */}
      <button 
        onClick={onCheckIn}
        className="w-full py-4 bg-white text-surface font-bold rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Check In Nearby
      </button>
    </div>
  );
};

export default Dashboard;
