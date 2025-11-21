import { GoogleGenAI, Type } from "@google/genai";
import { PersonalityTraits, UserProfile } from "../types";

// Initialize Gemini Client
// NOTE: In a real production build, ensure validation of the key.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateScenarioImage = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided for image generation.");
    return "";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    // Iterate through parts to find the image
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return "";
  } catch (error) {
    console.error("Image generation failed:", error);
    return "";
  }
};

export const analyzePersonality = async (decisions: string[], calculatedTraits: PersonalityTraits): Promise<{ traits: PersonalityTraits, bio: string }> => {
  if (!apiKey) {
    // Fallback if no key provided for demo purposes
    console.warn("No API Key found. Using mock analysis.");
    return {
      traits: calculatedTraits,
      bio: "A survivor who balances caution with curiosity. Your choices suggest you value both structure and human connection in a chaotic world."
    };
  }

  const prompt = `
    The user has played a "Post-Apocalyptic Amnesia" scenario game to determine their Big 5 Personality traits.
    
    Here are the decisions they made during the story:
    ${decisions.map((d, i) => `${i + 1}. ${d}`).join('\n')}

    Based on these specific narrative choices, write a short, psychological bio (max 2 sentences) describing their personality.
    Also, refine the calculated traits if the narrative implies a stronger lean in a certain direction.
    
    Current Calculated Traits: ${JSON.stringify(calculatedTraits)}

    Return JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            traits: {
              type: Type.OBJECT,
              properties: {
                openness: { type: Type.INTEGER },
                conscientiousness: { type: Type.INTEGER },
                extraversion: { type: Type.INTEGER },
                agreeableness: { type: Type.INTEGER },
                neuroticism: { type: Type.INTEGER },
              }
            },
            bio: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    // Fallback
    return {
      traits: calculatedTraits,
      bio: "A balanced individual with a multifaceted personality, capable of adapting to the new world."
    };
  }
};

export const generateRitual = async (user1: UserProfile, user2: UserProfile): Promise<{ title: string, steps: string[], topic: string }> => {
  if (!apiKey) {
    return {
      title: "The Common Ground",
      steps: ["Share your favorite book.", "Discuss why you chose your major.", "Plan a hypothetical trip together."],
      topic: "The intersection of art and science."
    };
  }

  const prompt = `
    Create a "Meeting Ritual" for two people who just matched on a social app called Kinship.
    
    User 1: ${user1.name}, ${user1.age}, ${user1.education}. Traits: ${JSON.stringify(user1.traits)}.
    User 2: ${user2.name}, ${user2.age}, ${user2.education}. Traits: ${JSON.stringify(user2.traits)}.
    
    The ritual should be an icebreaker activity that bridges their personalities.
    Return JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            topic: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
     return {
      title: "The Connection",
      steps: ["Take a deep breath together.", "Share one highlight of your week.", "High five."],
      topic: "Life goals."
    };
  }
};