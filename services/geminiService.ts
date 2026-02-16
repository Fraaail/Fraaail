import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

// Initialize client only when needed to handle potential missing key gracefully
const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // In a real scenario, we might want to check for the key's existence.
    // For this demo, we assume the environment is set up or we fail gracefully.
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const streamChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[]
) => {
  const client = getClient();
  
  if (!process.env.API_KEY) {
    // Mock response if no key is present to preserve the UI experience
    return (async function* () {
      const mockResponse = "I am a simulated AI assistant for @Fraaail. To unlock my full potential, please configure the `API_KEY` in the environment. For now, I can tell you that @Fraaail is a senior engineer passionate about clean code and tiling window managers.";
      yield mockResponse;
    })();
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-3-flash-preview',
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      config: {
        systemInstruction: "You are an AI assistant living inside the portfolio website of @Fraaail. You are helpful, concise, and speak in a slightly technical, terminal-like manner. Keep responses brief and relevant to software engineering, Linux, and design.",
      }
    });

    const result = await chat.sendMessageStream({ message });
    
    // Transform the stream to yield strings directly
    async function* textStream() {
      for await (const chunk of result) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    }

    return textStream();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return (async function* () {
        yield "Error: Connection to Neural Network Failed. Please try again later.";
    })();
  }
};
