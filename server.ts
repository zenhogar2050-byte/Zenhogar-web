import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(compression());
  app.use(express.json());
  app.set('trust proxy', true);

  // Health check
  app.get("/health-check", (req, res) => res.send("OK"));

  /**
   * Lógica unificada para enviar a Google Sheets
   */
  async function sendToGoogleSheets(payload: any) {
    const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
    const envToken = process.env.SHEETS_SECURITY_TOKEN;
    const securityToken = (envToken && envToken.trim().length > 0) ? envToken : "zenhogar_secret_2026";

    if (!webhookUrl) {
      throw new Error("Webhook de Google Sheets no configurado en variables de entorno");
    }

    const finalPayload = {
      ...payload,
      token: securityToken,
      timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
    };

    // fetch de Node con manejo de redirección para Google Apps Script
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
      redirect: "follow" // CRUCIAL: Google Script usa redirecciones 302
    });

    if (!response.ok) {
      throw new Error(`Google Sheets respondió con status: ${response.status}`);
    }

    return await response.json();
  }

  // API Route: Pedidos
  app.post("/api/orders", async (req, res) => {
    try {
      console.log(`[Orders] Procesando nuevo pedido...`);
      const result = await sendToGoogleSheets({ ...req.body, type: "order" });
      
      console.log("[Orders] Éxito:", result);
      res.json(result);
    } catch (error: any) {
      console.error("[Orders Error] Fallo crítico:", error.message);
      res.status(500).json({ 
        status: "error", 
        message: "Error de comunicación con Google Sheets",
        details: error.message 
      });
    }
  });

  // API Route: Abandonos
  app.post("/api/abandoned", async (req, res) => {
    try {
      console.log(`[Abandoned] Registrando carrito abandonado...`);
      const result = await sendToGoogleSheets({ ...req.body, type: "abandoned" });
      res.json(result);
    } catch (error: any) {
      console.error("[Abandoned Error]:", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  });

  // --- Manejo de Frontend (Vite o Estáticos) ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
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
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Build artifacts not found. Run 'npm run build'.");
      }
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 ZENHOGAR Server running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server failure:", err);
});