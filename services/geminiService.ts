import { GoogleGenAI } from "@google/genai";
import { getVideoSystemInstruction, getImageSystemInstruction } from "../constants";

// Define a pool of API Keys for rotation/failover
const API_KEYS = [
  process.env.API_KEY, // Primary Key from Environment
  "AIzaSyDHrITIXYlYCUS4ETOYv4WW6L1biOblpKM" // Secondary/Backup Key provided
].filter((key): key is string => !!key && key.length > 0);

const getGeminiClient = (attemptIndex: number = 0) => {
  if (API_KEYS.length === 0) {
    throw new Error("No API Keys found. Please configure API_KEY in .env or add to the key pool.");
  }
  
  // Rotate keys based on the attempt number (Round Robin)
  // Attempt 0 -> Key 0
  // Attempt 1 -> Key 1
  // Attempt 2 -> Key 0 ...
  const keyIndex = attemptIndex % API_KEYS.length;
  const apiKey = API_KEYS[keyIndex];
  
  // Optional: Log which key slot is being used (for debugging, don't log full key)
  // console.log(`Using API Key slot: ${keyIndex + 1}/${API_KEYS.length}`);

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

/**
 * Helper to delay execution (used for retries)
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeAudio = async (
  audioFile: File, 
  styleModifier: string, 
  language: 'en' | 'vi',
  mode: 'video' | 'image'
): Promise<string> => {
  let lastError: any;
  // Increase retries to ensure we cycle through all keys at least once or twice
  const MAX_RETRIES = 4; 

  try {
    const audioPart = await fileToGenerativePart(audioFile);
    
    const systemInstruction = mode === 'video' 
      ? getVideoSystemInstruction(styleModifier, language)
      : getImageSystemInstruction(styleModifier, language);

    // Retry Loop with Key Rotation
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Initialize client specifically for this attempt (picks a key based on attempt count)
        const ai = getGeminiClient(attempt - 1);
        
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

        return text; // Success, return immediately

      } catch (error: any) {
        lastError = error;
        const errorMessage = error.message || error.toString();
        
        // Detect 503, 429 (Quota), or Overloaded status
        const isTransientError = 
            errorMessage.includes('503') || 
            errorMessage.includes('429') || 
            errorMessage.includes('overloaded') || 
            errorMessage.includes('UNAVAILABLE') ||
            errorMessage.includes('Resource has been exhausted');

        if (isTransientError && attempt < MAX_RETRIES) {
          console.warn(`Attempt ${attempt} failed with key slot ${(attempt - 1) % API_KEYS.length}. Switching keys...`);
          
          // Exponential backoff, but faster since we are switching keys
          // 1s, 2s, 3s...
          await delay(1000 * attempt); 
          continue; // Try again with next key
        }

        // If it's not a temporary error, or we ran out of retries, break the loop
        throw error;
      }
    }
  } catch (error) {
    console.error("Error analyzing audio:", error);
    
    // Format error message to be user-friendly
    let cleanMessage = "An unexpected error occurred.";
    
    if (error instanceof Error) {
        const msg = error.message;
        if (msg.includes("503") || msg.includes("overloaded")) {
            cleanMessage = "Servers are busy. We tried multiple API keys but traffic is high. Please try again in 1 minute.";
        } else if (msg.includes("429") || msg.includes("exhausted")) {
            cleanMessage = "Daily quota exceeded on all available keys. Please try again later.";
        } else if (msg.includes("400")) {
             cleanMessage = "Invalid request. The audio file might be corrupted or format not supported.";
        } else {
             try {
                if (msg.trim().startsWith('{')) {
                    const parsed = JSON.parse(msg);
                    if (parsed.error && parsed.error.message) {
                        cleanMessage = parsed.error.message;
                    }
                } else {
                    cleanMessage = msg;
                }
             } catch (e) {
                 cleanMessage = msg;
             }
        }
    }
    
    throw new Error(cleanMessage);
  }

  throw new Error("Analysis failed after multiple attempts.");
};