
import { GoogleGenAI } from "@google/genai";
import { getVideoSystemInstruction, getImageSystemInstruction } from "../constants";

// Define a pool of API Keys for rotation/failover
const API_KEYS = [
  process.env.API_KEY,        // Primary Key
  process.env.API_KEY_BACKUP  // Secondary/Backup Key
].filter((key): key is string => !!key && key.length > 0);

// --- KEY STATUS MONITORING SYSTEM ---
export type KeyStatusType = 'idle' | 'active' | 'exhausted' | 'leaked';

export interface SystemMetrics {
  keyStates: KeyState[];
  successCount: number;
  errorCount: number;
  avgLatency: number; // in ms
}

interface KeyState {
  index: number;
  status: KeyStatusType;
}

// Global state to track keys during runtime
let keyStates: KeyState[] = API_KEYS.map((_, index) => ({
  index,
  status: 'idle'
}));

let successfulRequests = 0;
let errorCount = 0;
let totalLatency = 0;
let listeners: Array<(metrics: SystemMetrics) => void> = [];

const getMetrics = (): SystemMetrics => ({
  keyStates: [...keyStates],
  successCount: successfulRequests,
  errorCount: errorCount,
  avgLatency: successfulRequests > 0 ? Math.round(totalLatency / successfulRequests) : 0
});

const notifyListeners = () => {
  const metrics = getMetrics();
  listeners.forEach(cb => cb(metrics));
};

export const subscribeToKeyStatus = (cb: (metrics: SystemMetrics) => void) => {
  cb(getMetrics()); // Initial call
  listeners.push(cb);
  return () => {
    listeners = listeners.filter(l => l !== cb);
  };
};

const updateKeyStatus = (index: number, status: KeyStatusType) => {
  keyStates = keyStates.map(k => k.index === index ? { ...k, status } : k);
  notifyListeners();
};

const recordSuccess = (latencyMs: number) => {
  successfulRequests++;
  totalLatency += latencyMs;
  notifyListeners();
};

const recordError = () => {
  errorCount++;
  notifyListeners();
}

// --- GEMINI CLIENT ---

const getGeminiClient = (attemptIndex: number = 0) => {
  if (API_KEYS.length === 0) {
    throw new Error("No API Keys found. Please configure API_KEY (and optionally API_KEY_BACKUP) in .env or Vercel settings.");
  }
  
  // Rotate keys based on the attempt number (Round Robin)
  const keyIndex = attemptIndex % API_KEYS.length;
  const apiKey = API_KEYS[keyIndex];
  
  return { ai: new GoogleGenAI({ apiKey }), keyIndex };
};

/**
 * Converts a File object to a Base64 string.
 */
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
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
  // Increase retries to ensure we cycle through all keys at least once or twice
  const MAX_RETRIES = 4; 

  try {
    const audioPart = await fileToGenerativePart(audioFile);
    
    const systemInstruction = mode === 'video' 
      ? getVideoSystemInstruction(styleModifier, language)
      : getImageSystemInstruction(styleModifier, language);

    // Retry Loop with Key Rotation
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      let currentKeyIndex = -1;
      const startTime = Date.now();
      
      try {
        // Initialize client specifically for this attempt
        const { ai, keyIndex } = getGeminiClient(attempt - 1);
        currentKeyIndex = keyIndex;
        
        // Mark as active if it was idle
        if (keyStates[currentKeyIndex].status === 'idle') {
            updateKeyStatus(currentKeyIndex, 'active');
        }

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
        
        // Success
        const latency = Date.now() - startTime;
        recordSuccess(latency);
        
        // Keep status as 'active' (green) to show it's working
        updateKeyStatus(currentKeyIndex, 'active');
        
        return text; 

      } catch (error: any) {
        recordError();
        const errorMessage = error.message || error.toString();
        
        const isQuotaError = errorMessage.includes('429') || errorMessage.includes('exhausted');
        const isLeakedError = errorMessage.includes('leaked') || errorMessage.includes('permission');
        
        // Update Status Monitor based on error type
        if (currentKeyIndex !== -1) {
            if (isQuotaError) {
                updateKeyStatus(currentKeyIndex, 'exhausted');
            } else if (isLeakedError) {
                updateKeyStatus(currentKeyIndex, 'leaked');
            }
        }

        // Detect 503, 429 (Quota), Overloaded, OR Key issues (Leaked/Invalid)
        const isTransientError = 
            errorMessage.includes('503') || 
            errorMessage.includes('429') || 
            errorMessage.includes('overloaded') || 
            errorMessage.includes('UNAVAILABLE') ||
            errorMessage.includes('Resource has been exhausted') ||
            errorMessage.includes('API key') || 
            errorMessage.includes('leaked') || 
            errorMessage.includes('permission'); 

        if (isTransientError && attempt < MAX_RETRIES) {
          console.warn(`Attempt ${attempt} failed with key slot. Switching keys...`);
          await delay(1000 * attempt); 
          continue; // Try again with next key
        }

        throw error;
      }
    }
  } catch (error) {
    console.error("Error analyzing audio:", error);
    
    let cleanMessage = language === 'vi' ? "Đã xảy ra lỗi không mong muốn." : "An unexpected error occurred.";
    
    if (error instanceof Error) {
        const msg = error.message;
        const isVi = language === 'vi';

        if (msg.includes("503") || msg.includes("overloaded")) {
            cleanMessage = isVi 
              ? "Máy chủ đang bận. Chúng tôi đã thử nhiều key nhưng lưu lượng quá cao. Vui lòng thử lại sau 1 phút."
              : "Servers are busy. We tried multiple API keys but traffic is high. Please try again in 1 minute.";
        } else if (msg.includes("429") || msg.includes("exhausted")) {
            cleanMessage = isVi
              ? "Đã vượt quá hạn mức sử dụng (Quota) trên tất cả các key. Vui lòng thử lại sau."
              : "Daily quota exceeded on all available keys. Please try again later.";
        } else if (msg.includes("leaked")) {
            cleanMessage = isVi
              ? "API Key đã bị Google chặn do bị lộ (Leaked). Vui lòng tạo key mới và cập nhật cấu hình."
              : "Your API Key was reported as leaked and blocked by Google. Please generate a new key.";
        } else if (msg.includes("API key not valid") || msg.includes("permission")) {
             cleanMessage = isVi
              ? "API Key không hợp lệ hoặc không có quyền truy cập."
              : "Invalid API Key or permission denied.";
        } else if (msg.includes("400")) {
             cleanMessage = isVi
              ? "Yêu cầu không hợp lệ. File âm thanh có thể bị lỗi hoặc định dạng không được hỗ trợ."
              : "Invalid request. The audio file might be corrupted or format not supported.";
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

  throw new Error(language === 'vi' ? "Phân tích thất bại sau nhiều lần thử." : "Analysis failed after multiple attempts.");
};
