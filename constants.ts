import { LocationPoint, StoryScenario, UserProfile } from "./types";

export const STORY_SCENARIOS: StoryScenario[] = [
  {
    id: 1,
    chapterTitle: "The Awakening",
    narrative: "You gasp, waking up on a dusty mattress in a dilapidated room. The air tastes of rust. You have no name, no past. The Great Forgetting took everything but your language. Sunlight bleeds through boarded-up windows. Your heart races. What is your first instinct?",
    visualPrompt: "First person view, a dusty abandoned room with a dirty mattress, god rays of sunlight piercing through boarded up windows, floating dust particles, post-apocalyptic atmosphere, cinematic lighting, hyperrealistic, 8k",
    choices: [
      { 
        text: "I immediately check the room for supplies and secure the door.", 
        impact: { conscientiousness: 20, neuroticism: -10 } 
      },
      { 
        text: "I sit frozen, overwhelmed by the silence and the fear of what's outside.", 
        impact: { neuroticism: 20, extraversion: -10 } 
      },
      { 
        text: "I rip a board off the window to see what's out there. I need to know.", 
        impact: { openness: 20, extraversion: 10 } 
      }
    ]
  },
  {
    id: 2,
    chapterTitle: "The Encounter",
    narrative: "You leave the room. The corridor of the apartment complex is overgrown with strange, bioluminescent moss. At the end of the hall, you see a figure. Another survivor. They haven't seen you yet. They are muttering to themselves, holding a rusted pipe.",
    visualPrompt: "Dark hallway of an abandoned apartment building, walls covered in glowing bioluminescent blue and purple moss, a mysterious silhouette of a person standing at the far end, moody lighting, sci-fi horror vibes, 8k",
    choices: [
      { 
        text: "I call out to them, hands raised. We need each other to survive.", 
        impact: { extraversion: 20, agreeableness: 10 } 
      },
      { 
        text: "I hide in the shadows and observe them first. Trust gets you killed.", 
        impact: { neuroticism: 10, agreeableness: -10, extraversion: -10 } 
      },
      { 
        text: "I approach calmly but keep my distance, ready to defend myself.", 
        impact: { conscientiousness: 10, agreeableness: 0 } 
      }
    ]
  },
  {
    id: 3,
    chapterTitle: "The Dilemma",
    narrative: "You are outside now. The city is a skeleton of steel and vines. You find a backpack on a bench. Inside is a week's worth of food and a journal full of maps. A child is watching you from a fire escape nearby, looking starving.",
    visualPrompt: "Wide shot of a ruined city street, skyscrapers covered in vines, a backpack resting on a lonely bench in the foreground, a small child watching from a rusted fire escape in the background, dramatic emotional lighting, 8k",
    choices: [
      { 
        text: "I give the food to the child but keep the journal. Knowledge is survival.", 
        impact: { agreeableness: 15, conscientiousness: 10 } 
      },
      { 
        text: "I take everything. In this new world, it's me or them.", 
        impact: { agreeableness: -20, conscientiousness: 5 } 
      },
      { 
        text: "I try to talk to the child, see if they have a group/family I can join.", 
        impact: { extraversion: 15, agreeableness: 10 } 
      }
    ]
  },
  {
    id: 4,
    chapterTitle: "The Discovery",
    narrative: "While resting in an old library, you find a functioning tablet with a fragment of the Old World internet. It contains a database of art, philosophy, and history, but the battery is dying. You also see a digital map to a secure bunker nearby.",
    visualPrompt: "Interior of a grand abandoned library with falling books, a glowing futuristic tablet resting on a wooden table, displaying holographic data, dust motes dancing in the light, cyberpunk meets ruins aesthetic, 8k",
    choices: [
      { 
        text: "I use the remaining battery to read about the history and art. I miss beauty.", 
        impact: { openness: 25 } 
      },
      { 
        text: "I memorize the map to the bunker immediately. Priorities.", 
        impact: { conscientiousness: 20, openness: -10 } 
      },
      { 
        text: "I try to hack the device to see if I can communicate with others.", 
        impact: { openness: 10, extraversion: 10 } 
      }
    ]
  },
  {
    id: 5,
    chapterTitle: "The Horizon",
    narrative: "You reach the edge of the city. Two paths lie ahead. One leads to the 'Settlement of Order,' a walled fortress with strict rules. The other leads to the 'Wilds,' where rumors say a free community of artists and thinkers lives in treehouses.",
    visualPrompt: "A fork in the road at the edge of a ruined city. Left path leads to a high-tech walled fortress with searchlights. Right path leads to a lush forest with colorful treehouses and lanterns. Sunset lighting, epic composition, 8k",
    choices: [
      { 
        text: "I choose the Settlement of Order. Safety and structure are what we need.", 
        impact: { conscientiousness: 20, openness: -20 } 
      },
      { 
        text: "I head for the Wilds. I'd rather be free and inspired than safe.", 
        impact: { openness: 25, conscientiousness: -10 } 
      },
      { 
        text: "I set up camp right here. I'll make my own way.", 
        impact: { extraversion: -10, neuroticism: 5 } 
      }
    ]
  }
];

export const MOCK_LOCATIONS: LocationPoint[] = [
  { id: 'loc-1', name: 'Central University Library', type: 'University', distance: '0.2 km', attendees: 142 },
  { id: 'loc-2', name: 'The Bean Coffee Roasters', type: 'Cafe', distance: '0.5 km', attendees: 23 },
  { id: 'loc-3', name: 'City Tech Hub', type: 'Co-working', distance: '1.1 km', attendees: 56 },
  { id: 'loc-4', name: 'Riverside Park', type: 'Public Space', distance: '0.8 km', attendees: 89 },
];

// Generate some mock users to match against
export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u-1',
    name: 'Elena R.',
    age: 22,
    education: 'Art History',
    bio: 'Loves renaissance art and quiet rainy days.',
    influenceScore: 450,
    connections: 12,
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    traits: { openness: 85, conscientiousness: 40, extraversion: 30, agreeableness: 75, neuroticism: 60 }
  },
  {
    id: 'u-2',
    name: 'Marcus T.',
    age: 24,
    education: 'Computer Science',
    bio: 'Building the future, one line of code at a time.',
    influenceScore: 890,
    connections: 45,
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    traits: { openness: 70, conscientiousness: 90, extraversion: 45, agreeableness: 50, neuroticism: 20 }
  },
  {
    id: 'u-3',
    name: 'Sarah J.',
    age: 21,
    education: 'Psychology',
    bio: 'Understanding people is my passion.',
    influenceScore: 320,
    connections: 8,
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    traits: { openness: 60, conscientiousness: 65, extraversion: 80, agreeableness: 90, neuroticism: 40 }
  },
  {
    id: 'u-4',
    name: 'David K.',
    age: 23,
    education: 'Physics',
    bio: 'Curious about the universe.',
    influenceScore: 150,
    connections: 3,
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    traits: { openness: 95, conscientiousness: 80, extraversion: 20, agreeableness: 40, neuroticism: 30 }
  }
];