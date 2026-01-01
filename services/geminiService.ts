
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Initialize the Gemini API client using process.env.API_KEY directly as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeArtDNA = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert art curator. Analyze this artwork titled "${title}" with the following story: "${description}". 
      Suggest 5 professional tags for discovery, a dominant color palette (in hex), and a "Visual Mood" category.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            palette: { type: Type.ARRAY, items: { type: Type.STRING } },
            mood: { type: Type.STRING },
            style: { type: Type.STRING }
          },
          required: ["tags", "palette", "mood", "style"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI DNA Error:", error);
    return {
      tags: ["Digital", "Expressive", "Modern"],
      palette: ["#000000", "#FFFFFF"],
      mood: "Unknown",
      style: "Abstract"
    };
  }
};

export const getDailyArtMix = async (mood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a conceptual description for an art "Daily Mix" playlist based on the mood: "${mood}". Include a poetic title, a brief evocative description, and three suggested visual themes.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            playlistTitle: { type: Type.STRING },
            poeticDescription: { type: Type.STRING },
            themes: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["playlistTitle", "poeticDescription", "themes"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return {
      playlistTitle: "Ethereal Echoes",
      poeticDescription: "A selection of works that bridge the gap between memory and reality.",
      themes: ["Ghostly Gradients", "Fractured Light", "Soft Textures"]
    };
  }
};

export const getArtNews = async (location: string = "Global") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Fetch the most significant current art exhibitions, museum openings, and gallery news for ${location} in 2026 and 2027. Provide a summary of each event.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.map((chunk: any) => ({
      uri: chunk.web?.uri,
      title: chunk.web?.title,
    })).filter((s: any) => s.uri);

    return {
      text: response.text || "No news found.",
      sources: sources
    };
  } catch (error) {
    console.error("News Fetch Error:", error);
    return {
      text: "Unable to sync with global art registries at this moment.",
      sources: []
    };
  }
};

export const generateCuratorVoice = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say in a deeply calm, professional archival voice: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return undefined;
  }
};
