export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  CHECK_IN = 'CHECK_IN',
  MATCH_FOUND = 'MATCH_FOUND',
  PROFILE = 'PROFILE'
}

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  education: string;
  traits: PersonalityTraits;
  bio: string;
  influenceScore: number;
  connections: number;
  avatarUrl: string;
}

export interface LocationPoint {
  id: string;
  name: string;
  type: string; // University, Cafe, Park
  distance: string;
  attendees: number;
}

export interface MatchResult {
  user: UserProfile;
  compatibility: number; // 0-100
  sharedTraits: string[];
}

export interface StoryChoice {
  text: string;
  impact: Partial<PersonalityTraits>; // e.g. { openness: 10, extraversion: -5 }
}

export interface StoryScenario {
  id: number;
  chapterTitle: string;
  narrative: string;
  visualPrompt: string; // Prompt for image generation
  choices: StoryChoice[];
}