import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Gemini AI Setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API Routes
app.post("/api/ai/describe-script", async (req, res) => {
  try {
    const { title, game, features } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a catchy, professional marketplace description for a Roblox script titled "${title}" for the game "${game}". Features include: ${features.join(", ")}. Keep it under 150 words.`,
    });
    res.json({ description: response.text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

app.post("/api/ai/suggest-tags", async (req, res) => {
  try {
    const { title, game } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give me 5 search tags for a Roblox script titled "${title}" for "${game}". Return as a simple comma-separated list.`,
    });
    const tags = response.text?.split(",").map(t => t.trim()) || [];
    res.json({ tags });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to suggest tags" });
  }
});

// Vite Middleware
async function setupVite() {
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
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
