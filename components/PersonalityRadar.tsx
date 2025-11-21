import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { PersonalityTraits } from '../types';

interface Props {
  traits: PersonalityTraits;
  compareTraits?: PersonalityTraits;
  showLabels?: boolean;
}

const PersonalityRadar: React.FC<Props> = ({ traits, compareTraits, showLabels = true }) => {
  const data = [
    { subject: 'Openness', A: traits.openness, B: compareTraits?.openness || 0, fullMark: 100 },
    { subject: 'Conscientiousness', A: traits.conscientiousness, B: compareTraits?.conscientiousness || 0, fullMark: 100 },
    { subject: 'Extraversion', A: traits.extraversion, B: compareTraits?.extraversion || 0, fullMark: 100 },
    { subject: 'Agreeableness', A: traits.agreeableness, B: compareTraits?.agreeableness || 0, fullMark: 100 },
    { subject: 'Neuroticism', A: traits.neuroticism, B: compareTraits?.neuroticism || 0, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#4b5563" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          <Radar
            name="You"
            dataKey="A"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="#8b5cf6"
            fillOpacity={0.5}
          />
          
          {compareTraits && (
             <Radar
             name="Match"
             dataKey="B"
             stroke="#ec4899"
             strokeWidth={2}
             fill="#ec4899"
             fillOpacity={0.4}
           />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalityRadar;
