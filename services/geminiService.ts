import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = "You are the central mainframe of Dan Lab, an elite AI product and research laboratory. Your products include Agent8 (prompt-to-agent builder), Zerant (agentic mobile browser), Dapify (Web3 coding platform), and AI Glasses (hardware). Your research focuses on AGI, self-improving models, and model mixing. You speak in a concise, slightly robotic, terminal-like command-line interface style. Keep answers short, cool, and technical.";

export const initializeGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
};

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    initializeGenAI();
    if (!ai) return "No API key configured. Set GEMINI_API_KEY in .env file.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });
    
    return response.text || "SYSTEM ERROR: NO DATA";
  } catch (error) {
    console.error("GenAI Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return `SYSTEM ERROR: ${errorMessage}`;
  }
};