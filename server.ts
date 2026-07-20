import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const ai = new GoogleGenAI({ apiKey: key });

      const systemInstruction = `You are an intelligent, helpful, and professional customer support chatbot for "Omkar Automotive Workshop".

Your role is to assist users with:
1. Answering questions about our services (Car Servicing, Bike Servicing, Engine Repair, Denting & Painting, Washing).
2. Providing estimated pricing based on the services.
3. Guiding users on how to book an appointment (tell them to click the "Book Service" button).
4. Explaining our working hours (Monday to Saturday, 9:00 AM to 7:00 PM).

Important Formatting Rules:
- DO NOT use markdown formatting like stars (*), bold (**), hashes (#), or bullet points.
- Respond in natural, clean, conversational text, as a human would type in a chat window.
- Keep responses short, concise, and friendly.

If a user asks about something unrelated to the automotive workshop, politely redirect the conversation back to our services.`;

      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
