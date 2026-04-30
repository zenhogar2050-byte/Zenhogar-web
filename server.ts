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
      if (!webhookUrl) throw new Error("Webhook URL not configured");
      
      const payload = {
        ...req.body,
        token: process.env.SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026",
        timestamp: new Date().toLocaleString()
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("[API Error]", error);
      res.status(500).json({ status: "error", message: error instanceof Error ? error.message : "Internal Server Error" });
    }
  });

  app.post("/api/abandoned", async (req, res) => {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_ORDERS_WEBHOOK;
      if (!webhookUrl) throw new Error("Webhook URL not configured");

      const payload = {
        ...req.body,
        type: "abandoned",
        token: process.env.SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026",
        timestamp: new Date().toLocaleString()
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("[API Error]", error);
      res.status(500).json({ status: "error" });
    }
  });

  app.post("/api/mastershop/order", async (req, res) => {
    try {
      const apiKey = process.env.MASTERSHOP_API_KEY;
      if (!apiKey) throw new Error("Mastershop API Key no configurada");

      const { ticket, formData, items, total } = req.body;

      if (!formData || !items) {
        throw new Error("Datos de orden incompletos");
      }

      const firstName = formData.fullName?.split(' ')[0] || "Cliente";
      const lastName = formData.fullName?.split(' ').slice(1).join(' ') || "Zenhogar";

      const payload = {
        "id_order": String(ticket || `ZEN-${Date.now()}`),
        "notes": [],
        "tags": [],
        "shipping_address": {
            "country": "CO",
            "state": formData.department || "",
            "city": formData.city || "",
            "address1": formData.address || "N/A",
            "address2": "",
            "company": "",
            "zip": "",
            "full_name": formData.fullName || "",
            "first_name": firstName,
            "last_name": lastName,
            "phone": formData.phone || ""
        },
        "billing_address": {
            "country": "CO",
            "state": formData.department || "",
            "city": formData.city || "",
            "address1": formData.address || "N/A",
            "address2": "",
            "company": "",
            "zip": "",
            "full_name": formData.fullName || "",
            "first_name": firstName,
            "last_name": lastName,
            "phone": formData.phone || ""
        },
        "order_transaction": {
            "total": Number(total) || 0,
            "currency": "COP",
            "payment_method": "cod", // Ajuste para pago contraentrega
            "payment_gateway": "Contraentrega"
        },
        "customer": {
            "full_name": formData.fullName || "",
            "first_name": firstName,
            "last_name": lastName,
            "email": formData.email || "noreply@zenhogar.live",
            "phone": formData.phone || "",
            "tags": [],
            "documentType": "CC",
            "documentNumber": "0"
        },
        "order_items": items && items.length > 0 ? items.map((item: any) => ({
            "id_variant": null,
            "id_product": Number(item.mastershopId) || 11323, // Require user to fill this mapped ID in constants.ts
            "quantity": Number(item.quantity) || 1,
            "sku": item.productId || 'GENERIC',
            "name": item.productName || "Producto",
            "weight": 1,
            "price": Number(item.price) || 0
        })) : [{
            "id_variant": null,
            "id_product": 11323,
            "quantity": 1,
            "sku": "GENERIC",
            "name": "Pedido Zenhogar",
            "weight": 1,
            "price": Number(total) || 0
        }],
        "additional_charge": [] // Dejar vacío si el envío ya está incluido en los precios
      };

      const response = await fetch("https://prod.api.mastershop.com/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ms-api-key": apiKey
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        result = { raw: responseText };
      }

      if (!response.ok) {
        console.error("Mastershop Rechazó (Status " + response.status + "):", result);
        console.error("Payload intentado:", JSON.stringify(payload, null, 2));
      }

      res.json(result);
    } catch (error) {
      console.error("[Mastershop API Error]", error);
      res.status(500).json({ status: "error", message: error instanceof Error ? error.message : "Error enviando a Mastershop" });
    }
  });

  // Inventory check
  app.get("/api/mastershop/inventory", async (req, res) => {
    try {
      const apiKey = process.env.MASTERSHOP_API_KEY;
      if (!apiKey) throw new Error("Mastershop API Key no configurada");

      let allProducts: any[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await fetch(`https://prod.api.mastershop.com/api/products?page=${page}`, {
          method: 'GET',
          headers: {
            'ms-api-key': apiKey,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Mastershop API error: ${response.status}`);
        }

        const data: any = await response.json();
        if (data.results && data.results.length > 0) {
          allProducts = [...allProducts, ...data.results];
          page++;
        } else {
          hasMore = false;
        }
      }

      const inventory = allProducts.reduce((acc: Record<string, number>, product: any) => {
         acc[product.idProduct.toString()] = product.stockTotal;
         return acc;
      }, {});

      res.json(inventory);
    } catch (error: any) {
      console.error("[Inventory Fetch Error]", error);
      res.status(500).json({ error: error.message });
    }
  });

  // WEBHOOK de Mastershop
  const webhookLogs: any[] = [];
  
  app.post("/api/mastershop/webhook", express.json(), (req, res) => {
    try {
      const payload = req.body;
      console.log("[Webhook Mastershop Recibido]:", payload);
      
      webhookLogs.unshift({
        receivedAt: new Date().toISOString(),
        payload
      });

      // Maintain only last 50 logs in memory
      if (webhookLogs.length > 50) {
        webhookLogs.pop();
      }

      // TODO: Detectar el estado o la guía y actualizar Firebase
      // Necesitaríamos saber el formato exacto del payload para procesarlo.

      res.status(200).json({ status: "success", message: "Webhook received" });
    } catch (error: any) {
      console.error("[Webhook Error]", error);
      res.status(500).json({ status: "error", error: error.message });
    }
  });

  app.get("/api/mastershop/webhook-logs", (req, res) => {
    res.json(webhookLogs);
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
