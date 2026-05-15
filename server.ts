import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import compression from "compression";
import dotenv from "dotenv";
import { PRODUCTS, CATEGORIES, PROMOTIONS } from "./src/constants.js";

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

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
          redirect: "follow",
          signal: AbortSignal.timeout(10000) // Timeout de 10 segundos
        });

        if (!response.ok) {
          throw new Error(`Google Sheets respondió con status: ${response.status}`);
        }

        return await response.json();
      } catch (error: any) {
        if (attempts >= maxAttempts) {
          throw error;
        }
        console.warn(`[Sheets Retry] Intento ${attempts} fallido: ${error.message}. reintentando...`);
        await new Promise(r => setTimeout(r, 2000)); // Esperar 2 segundos antes de reintentar
      }
    }
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

  // API Route: Actualizar Estado en Google Sheets
  app.post("/api/orders/status", async (req, res) => {
    try {
      console.log(`[Status Update] Actualizando estado de pedido ${req.body.ticket}...`);
      const result = await sendToGoogleSheets({ ...req.body, type: "update_status" });
      res.json(result);
    } catch (error: any) {
      console.error("[Status Update Error]:", error.message);
      res.status(500).json({ status: "error", message: error.message });
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

  // --- SEO Endpoints ---
  
  // SEO: Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://zenhogar.live";
    const productsUrls = PRODUCTS.map(p => `${baseUrl}/producto/${p.id}`);
    const categoriesUrls = CATEGORIES.map(c => `${baseUrl}/categoria/${c.id}`);
    const combosUrls = PROMOTIONS.map(p => `${baseUrl}/combo/${p.id}`);
    const allUrls = [baseUrl, ...productsUrls, ...categoriesUrls, ...combosUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === baseUrl ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml.trim());
  });

  // SEO: Robots.txt
  app.get("/robots.txt", (req, res) => {
    const robots = `User-agent: *
Allow: /
Sitemap: https://zenhogar.live/sitemap.xml
`;
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // SEO: Google Merchant Feed
  app.get("/google-feed.xml", (req, res) => {
    const baseUrl = "https://zenhogar.live";
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>Zenhogar - Salud y Bienestar</title>
  <link>${baseUrl}</link>
  <description>Tu aliado en salud natural, suplementos y bienestar integral en Colombia.</description>
  ${PRODUCTS.map(p => `
  <item>
    <g:id>${p.masterId}</g:id>
    <g:title>${p.name}</g:title>
    <g:description>${p.shortDescription || p.description.substring(0, 150)}</g:description>
    <g:link>${baseUrl}/producto/${p.id}</g:link>
    <g:image_link>${baseUrl}${p.image}</g:image_link>
    <g:condition>${p.condition || 'new'}</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${p.basePrice} COP</g:price>
    <g:google_product_category>${p.googleCategory || 'Health &amp; Beauty &gt; Health Care &gt; Fitness &amp; Nutrition'}</g:google_product_category>
    <g:brand>Zenhogar</g:brand>
    <g:mpn>${p.masterId}</g:mpn>
    <g:shipping>
      <g:country>CO</g:country>
      <g:service>Envío Gratis</g:service>
      <g:price>0 COP</g:price>
    </g:shipping>
  </item>`).join('')}
  ${PROMOTIONS.map(p => `
  <item>
    <g:id>${p.id}</g:id>
    <g:title>${p.name}</g:title>
    <g:description>${p.description.substring(0, 150)}</g:description>
    <g:link>${baseUrl}/combo/${p.id}</g:link>
    <g:image_link>${baseUrl}${p.image}</g:image_link>
    <g:condition>${p.condition || 'new'}</g:condition>
    <g:availability>in stock</g:availability>
    <g:price>${p.price} COP</g:price>
    <g:google_product_category>${p.googleCategory || 'Health &amp; Beauty &gt; Health Care &gt; Fitness &amp; Nutrition'}</g:google_product_category>
    <g:brand>Zenhogar</g:brand>
    <g:shipping>
      <g:country>CO</g:country>
      <g:service>Envío Gratis</g:service>
      <g:price>0 COP</g:price>
    </g:shipping>
  </item>`).join('')}
</channel>
</rss>`;

    res.header("Content-Type", "application/xml");
    res.send(xml.trim());
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
    
    // Caching strategy for static assets
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    }));
    
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