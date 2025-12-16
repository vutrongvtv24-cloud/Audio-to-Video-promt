import { GoogleGenAI } from "@google/genai";
import { getVideoSystemInstruction, getImageSystemInstruction } from "../constants";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Converts a File object to a Base64 string.
 */
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:audio/mp3;base64,")
      const base64Data = base64String.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeAudio = async (
  audioFile: File, 
  styleModifier: string, 
  language: 'en' | 'vi',
  mode: 'video' | 'image' // Added mode parameter
): Promise<string> => {
  try {
    const ai = getGeminiClient();
    
    // Prepare audio part
    const audioPart = await fileToGenerativePart(audioFile);

    // Select the correct system instruction based on mode
    const systemInstruction = mode === 'video' 
      ? getVideoSystemInstruction(styleModifier, language)
      : getImageSystemInstruction(styleModifier, language);

    // Call Gemini Model
    // Using gemini-2.5-flash as it is optimized for multimodal tasks and speed
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          audioPart,
          { text: systemInstruction }
        ]
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from the model.");
    }

    return text;
  } catch (error) {
    console.error("Error analyzing audio:", error);
    if (error instanceof Error) {
        throw new Error(`Analysis failed: ${error.message}`);
    }
    throw new Error("An unexpected error occurred during analysis.");
  }
};