import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wakaf AI Consultant API Endpoint
  app.post("/api/gemini/wakaf-chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      // Check if API key is configured
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ 
          reply: "Mohon maaf, API Key Gemini belum diatur di panel Secrets. Silakan tambahkan GEMINI_API_KEY melalui Settings > Secrets terlebih dahulu." 
        });
      }

      const client = getGeminiClient();
      
      // Format messages history for generateContent
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const systemInstruction = 
        "Anda adalah Konsultan Ahli Wakaf Amwal, asisten cerdas khusus perwakafan syariah di Indonesia. " +
        "Tugas Anda adalah memberikan bimbingan komprehensif, santun, dan mudah dipahami seputar wakaf, antara lain: " +
        "1. Wakaf Uang (Cash Waqf) & Wakaf Melalui Uang menurut Fatwa MUI & UU No. 41 Tahun 2004. " +
        "2. Wakaf Produktif (investasi syariah di sektor riil/pendidikan/kesehatan yang hasilnya untuk mauquf 'alaih). " +
        "3. Rukun dan Syarat Wakaf (Wakif, Mauquf Bih, Mauquf 'Alaih, Sighat/Ikrar Wakaf, Nazhir). " +
        "4. Perbedaan Wakaf dengan Zakat/Infaq/Sedekah (Wakaf menahan pokok harta dan menyalurkan manfaatnya secara kekal). " +
        "5. Kredibilitas Nazhir, sertifikat wakaf, dan akuntabilitas pelaporan. " +
        "Gunakan bahasa Indonesia yang ramah, hangat, profesional, dan cantumkan dalil Al-Qur'an/Hadits atau fatwa BWI bila relevan dengan format Markdown yang rapi.";

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Terjadi kesalahan pada server AI" });
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
