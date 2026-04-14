import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/orders", async (req, res) => {
    console.log("Received order request for Google Sheets:", JSON.stringify(req.body, null, 2));
    
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
      const securityToken = process.env.SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026";
      
      if (!webhookUrl) {
        console.error("GOOGLE_SHEETS_ORDERS_WEBHOOK is not defined.");
        return res.status(500).json({ 
          status: "error", 
          message: "Configuración de Google Sheets faltante en el servidor." 
        });
      }

      const payload = { 
        ...req.body, 
        type: "order", 
        token: securityToken,
        timestamp: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      const responseText = await response.text();
      
      if (response.ok) {
        res.json({ status: "ok", message: "Pedido registrado en Google Sheets" });
      } else {
        res.status(response.status).json({ 
          status: "error", 
          message: `Error de Google Sheets: ${responseText}` 
        });
      }
    } catch (error) {
      console.error("Error in /api/orders:", error);
      res.status(500).json({ 
        status: "error", 
        message: "Error al conectar con Google Sheets: " + (error as Error).message 
      });
    }
  });

  app.post("/api/abandoned", async (req, res) => {
    console.log("Received abandoned cart for Google Sheets:", JSON.stringify(req.body, null, 2));
    
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
      const securityToken = process.env.SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026";
      
      if (!webhookUrl) return res.status(500).json({ status: "error" });

      const payload = { 
        ...req.body, 
        type: "abandoned", 
        token: securityToken,
        timestamp: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      res.json({ status: "ok" });
    } catch (error) {
      console.error("Error in /api/abandoned:", error);
      res.status(500).json({ status: "error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // SPA Fallback for development
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // Always read the latest index.html in dev
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, "dist");
    
    // Serve static files from dist
    app.use(express.static(distPath));
    
    // SPA Fallback for production
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
