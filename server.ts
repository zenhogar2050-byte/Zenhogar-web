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

      console.log("[Mastershop Incoming Order]:", { ticket, customer: formData.fullName, itemsCount: items.length });

      // --- LÓGICA DE PRECIOS EXACTOS PARA MASTERSHOP ---
      // 1. Valores de Obsequio
      const GIFT_ID = 11253; // Termoactiva
      const GIFT_PRICE = 1500; // Valor solicitado para evitar rechazo
      const TOTAL_PAID = Number(total) || 0;

      // 2. Calcular valor a distribuir entre productos
      const remainingForProducts = Math.max(0, TOTAL_PAID - GIFT_PRICE);
      const totalUnits = items.reduce((acc: number, it: any) => acc + (Number(it.quantity) || 1), 0);

      const mastershopItems: any[] = [];

      if (totalUnits > 0) {
          // 3. Distribución equitativa con ajuste de redondeo
          const baseUnitPrice = Math.floor(remainingForProducts / totalUnits);
          let currentTotalDistribution = 0;

          items.forEach((item: any, idx: number) => {
              const qty = Number(item.quantity) || 1;
              const mastershopId = Number(item.mastershopId) || 11323;
              
              mastershopItems.push({
                  "id_variant": null,
                  "id_product": mastershopId,
                  "quantity": qty,
                  "sku": item.productId || 'GENERIC',
                  "name": item.productName || "Producto",
                  "weight": 1,
                  "price": baseUnitPrice
              });
              currentTotalDistribution += baseUnitPrice * qty;
          });

          // 4. Ajustar la diferencia de pesos en el primer item
          const diff = remainingForProducts - currentTotalDistribution;
          if (diff !== 0 && mastershopItems.length > 0) {
              const first = mastershopItems[0];
              if (first.quantity > 1) {
                  // Si el primer item tiene varias unidades, separamos 1 para el ajuste
                  const originalQty = first.quantity;
                  first.quantity = 1;
                  first.price += diff;
                  // El resto de unidades quedan con el precio base
                  mastershopItems.splice(1, 0, {
                      ...first,
                      quantity: originalQty - 1,
                      price: baseUnitPrice
                  });
              } else {
                  first.price += diff;
              }
          }
      }

      // 5. Agregar Obsequio al final
      mastershopItems.push({
          "id_variant": null,
          "id_product": GIFT_ID,
          "quantity": 1,
          "sku": "OBSEQUIO",
          "name": "Obsequio Termoactiva (Cortesia)",
          "weight": 0.1,
          "price": GIFT_PRICE
      });

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
            "tags": ["WEB_ZENHOGAR"],
            "documentType": "CC",
            "documentNumber": formData.identification || "0"
        },
        "order_items": mastershopItems,
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
