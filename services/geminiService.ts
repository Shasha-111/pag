import { GoogleGenAI, Type } from "@google/genai";
import { PetProfile } from '../types';

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates the metadata for a random pixel pet.
 */
export const generatePetProfile = async (): Promise<PetProfile> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Design a random, creative fantasy creature that would look good as a pixel art pet. Return the result in Chinese.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The creative name of the pet" },
            type: { type: Type.STRING, description: "The species or elemental type (e.g., Fire Slime, Void Cat)" },
            personality: { type: Type.STRING, description: "A short personality trait (e.g., Grumpy but loyal)" },
            rarity: { type: Type.STRING, enum: ['Common', 'Rare', 'Epic', 'Legendary'] },
            description: { type: Type.STRING, description: "A brief visual description of the pet for image generation (English)" }
          },
          required: ["name", "type", "personality", "rarity", "description"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    
    return JSON.parse(text) as PetProfile;
  } catch (error) {
    console.error("Error generating pet profile:", error);
    throw error;
  }
};

/**
 * Generates a pixel art image based on the description.
 */
export const generatePetImage = async (description: string): Promise<string> => {
  try {
    const prompt = `A cute 8-bit pixel art sprite of a ${description}. 
    White background, centered, distinct outline, retro game asset style, colorful, high quality pixel art.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    // Iterate through parts to find the image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating pet image:", error);
    throw error;
  }
};
