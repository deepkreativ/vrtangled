import React, { useState, useEffect } from 'react';
import { STORY_SCENARIOS } from '../constants';
import { analyzePersonality, generateScenarioImage } from '../services/geminiService';
import { UserProfile, PersonalityTraits, StoryChoice } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Info, 1: Story, 2: Analyzing
  const [formData, setFormData] = useState({ name: '', age: '', education: '' });
  
  // Personality State
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [decisionHistory, setDecisionHistory] = useState<string[]>([]);
  const [currentTraits, setCurrentTraits] = useState<PersonalityTraits>({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50
  });

  // Image State
  const [scenarioImage, setScenarioImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (step === 1) {
      loadImageForScenario(currentScenarioIndex);
    }
  }, [step, currentScenarioIndex]);

  const loadImageForScenario = async (index: number) => {
    setImageLoading(true);
    setScenarioImage(null); // Clear previous image
    const prompt = STORY_SCENARIOS[index].visualPrompt;
    const imgUrl = await generateScenarioImage(prompt);
    setScenarioImage(imgUrl);
    setImageLoading(false);
  };

  const handleChoice = (choice: StoryChoice) => {
    // Update Traits based on choice impact
    const newTraits = { ...currentTraits };
    if (choice.impact.openness) newTraits.openness = Math.min(100, Math.max(0, newTraits.openness + choice.impact.openness));
    if (choice.impact.conscientiousness) newTraits.conscientiousness = Math.min(100, Math.max(0, newTraits.conscientiousness + choice.impact.conscientiousness));
    if (choice.impact.extraversion) newTraits.extraversion = Math.min(100, Math.max(0, newTraits.extraversion + choice.impact.extraversion));
    if (choice.impact.agreeableness) newTraits.agreeableness = Math.min(100, Math.max(0, newTraits.agreeableness + choice.impact.agreeableness));
    if (choice.impact.neuroticism) newTraits.neuroticism = Math.min(100, Math.max(0, newTraits.neuroticism + choice.impact.neuroticism));
    
    setCurrentTraits(newTraits);
    
    // Record Decision text for Gemini context
    const newHistory = [...decisionHistory, choice.text];
    setDecisionHistory(newHistory);

    // Move to next scenario or finish
    if (currentScenarioIndex < STORY_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      finishStory(newHistory, newTraits);
    }
  };

  const finishStory = async (finalHistory: string[], finalTraits: PersonalityTraits) => {
    setStep(2);
    const analysis = await analyzePersonality(finalHistory, finalTraits);
    
    const newProfile: UserProfile = {
      id: 'me',
      name: formData.name,
      age: parseInt(formData.age),
      education: formData.education,
      traits: analysis.traits,
      bio: analysis.bio,
      influenceScore: 0,
      connections: 0,
      avatarUrl: 'https://picsum.photos/200/200?grayscale'
    };
    
    onComplete(newProfile);
  };

  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 max-w-md mx-auto">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4">Kinship</h1>
        <p className="text-gray-400 mb-8 text-center">Before we find your people, we must find <i>you</i>.</p>
        
        <div className="w-full space-y-4 bg-surface-light/50 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input 
              type="text" 
              className="w-full bg-surface border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Identity..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
            <input 
              type="number" 
              className="w-full bg-surface border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="Years lived..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Background</label>
            <input 
              type="text" 
              className="w-full bg-surface border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              placeholder="Education or Trade..."
            />
          </div>
          
          <button 
            disabled={!formData.name || !formData.age}
            onClick={() => setStep(1)}
            className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            Enter The Simulation
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    const scenario = STORY_SCENARIOS[currentScenarioIndex];

    return (
      <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          {imageLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
               <div className="w-16 h-16 rounded-full border-4 border-t-primary border-r-secondary border-b-accent border-l-transparent animate-spin mb-4"></div>
               <p className="text-primary/80 animate-pulse font-mono text-sm tracking-widest">CONSTRUCTING SIMULATION...</p>
            </div>
          ) : (
            <>
              {scenarioImage && (
                <img 
                  src={scenarioImage} 
                  alt="Scenario" 
                  className="w-full h-full object-cover animate-fade-in opacity-80"
                />
              )}
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
            </>
          )}
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-8 px-6 max-w-2xl mx-auto w-full">
          {!imageLoading && (
            <div className="animate-slide-up">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                  Chapter {scenario.id}
                </span>
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{scenario.chapterTitle}</h2>
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-serif drop-shadow-md">
                  "{scenario.narrative}"
                </p>
              </div>

              <div className="space-y-3">
                {scenario.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-4 rounded-xl bg-surface/60 hover:bg-primary/20 border border-white/10 hover:border-primary/50 backdrop-blur-md transition-all group active:scale-98"
                  >
                    <span className="text-gray-200 group-hover:text-white font-medium block">
                      {choice.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-surface">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-surface-light rounded-full flex items-center justify-center">
          <span className="text-2xl">🧠</span>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Analyzing Psyche</h2>
      <p className="text-gray-400 max-w-xs mx-auto">Gemini is mapping your decisions to the OCEAN model...</p>
    </div>
  );
};

export default Onboarding;