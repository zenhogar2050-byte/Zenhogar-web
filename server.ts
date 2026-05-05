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
  const PORT = 3000;

  app.use(compression());
  app.use(express.json());
  app.set('trust proxy', true);

  // Health check
  app.get("/health-check", (req, res) => res.send("OK"));

  // API Routes
  app.post("/api/orders", async (req, res) => {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
      // Forzamos el uso del token que pusiste en el script de Google.
      const envToken = process.env.SHEETS_SECURITY_TOKEN;
      const securityToken = (envToken && envToken.trim().length > 0) ? envToken : "zenhogar_secret_2026";
      
      if (!webhookUrl) {
        return res.status(500).json({ status: "error", message: "Webhook no configurado en secretos" });
      }

      const payload = {
        ...req.body,
        token: securityToken,
        timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
      };

      console.log(`[Orders] Enviando pedido a Sheets a URL: ${webhookUrl.substring(0, 30)}...`);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("[Orders] Google no devolvió JSON. Respuesta:", text.substring(0, 100));
        throw new Error("Respuesta inválida de Google (no es JSON)");
      }

      console.log("[Orders] Resultado de la operación:", result);
      res.json(result);
    } catch (error) {
      console.error("[Orders Error] Fallo crítico:", error);
      res.status(500).json({ 
        status: "error", 
        message: "Error de comunicación con Google Sheets",
        details: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  });

  app.post("/api/abandoned", async (req, res) => {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
      const envToken = process.env.SHEETS_SECURITY_TOKEN;
      const securityToken = (envToken && envToken.trim().length > 0) ? envToken : "zenhogar_secret_2026";
      
      if (!webhookUrl) return res.status(500).json({ status: "error", message: "Webhook no configurado" });

      const payload = {
        ...req.body,
        type: "abandoned",
        token: securityToken,
        timestamp: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let result;
      try {
        result = await response.json();
      } catch (e) {
        result = { status: "error", message: "Invalid JSON response" };
      }
      
      res.json(result);
    } catch (error) {
      console.error("[Abandoned Error]", error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });

  // Static Assets / Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // SPA Fallback for Development
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
    
    // SPA Fallback for Production
    app.get("*", (req, res) => {
      const indexPath = path.resolve(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Build artifacts not found. Please run 'npm run build'.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ZENHOGAR Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server failure:", err);
});
