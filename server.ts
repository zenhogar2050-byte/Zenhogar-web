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

  // Helper to update MS Sync Status in Firebase
  const updateMsSyncStatus = async (ticket: string, status: 'synced' | 'failed', errorMsg?: string) => {
    try {
      if (!ticket || ticket === "N/A" || !ticket.trim()) return;
      
      const fbConfig = {
        projectId: "gen-lang-client-0672500796",
        databaseId: "ai-studio-46279a17-9caa-4819-b2d9-023c3691a10a",
        apiKey: "AIzaSyBvvxXWXRBQLtpsl07tx-v3YEphMw_jpJs"
      };

      // Search for document by ticket_number
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${fbConfig.projectId}/databases/${fbConfig.databaseId}/documents:runQuery?key=${fbConfig.apiKey}`;
      const queryRes = await fetch(queryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: "orders" }],
            where: { fieldFilter: { 
              field: { fieldPath: "ticket_number" }, 
              op: "EQUAL", 
              value: { stringValue: String(ticket) } 
            }},
            limit: 1
          }
        })
      });

      const queryData: any = await queryRes.json();
      const docPath = queryData?.[0]?.document?.name;

      if (docPath) {
        const updateUrl = `https://firestore.googleapis.com/v1/${docPath}?key=${fbConfig.apiKey}&updateMask.fieldPaths=ms_sync_status&updateMask.fieldPaths=ms_sync_error`;
        await fetch(updateUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              ms_sync_status: { stringValue: status },
              ms_sync_error: { stringValue: errorMsg || "" }
            }
          })
        });
        console.log(`[Firebase Status Update] Ticket ${ticket} -> ${status}`);
      }
    } catch (e) {
      console.error("[Firebase Status Update Error]", e);
    }
  };

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
    const { ticket, formData, items, total } = req.body;
    try {
      const apiKey = process.env.MASTERSHOP_API_KEY || process.env.VITE_MASTERSHOP_API_KEY;
      if (!apiKey) throw new Error("Mastershop API Key no configurada");

      if (!formData || !items) {
        throw new Error("Datos de orden incompletos");
      }

      // Sanitización de datos para Mastershop (Campos obligatorios)
      const cleanPhone = (formData.phone || "0").replace(/\D/g, '').slice(-10);
      const cleanID = (formData.identification || "0").replace(/\D/g, '') || "0";
      const cleanState = (formData.department || "BOGOTA").toUpperCase();
      const cleanCity = (formData.city || "BOGOTA").toUpperCase();
      const cleanAddress = (formData.address || "N/A").trim();

      console.log("[Mastershop Incoming Order]:", { ticket, customer: formData.fullName, itemsCount: items.length });

      // --- LÓGICA DE PRECIOS EXACTOS PARA MASTERSHOP (V3 - Redondeo y Ajuste en Obsequio) ---
      const TOTAL_PAID = Number(total) || 0;
      
      // Mapeo detallado de Obsequios según fotos de Mastershop
      const GIFT_MAP: Record<string, any> = {
        "11253": { id: 11253, name: "Obsequio Termoactiva", target: 1500, sku: "OBS-TERMO" },
        "11301": { id: 11301, name: "Obsequio Gratis Repolarizador", target: 100, sku: "OBS-REPO" },
        "26846": { id: 26846, name: "Obsequio Titan Coffe", target: 1000, sku: "OBS-TITAN" },
        "49603": { id: 49603, name: "Obsequio Coli Plus", target: 1000, sku: "OBS-COLI" },
        "76365": { id: 76365, name: "OBSEQUIO PAÑITOS DAMPY", target: 1000, sku: "OBS-DAMPY" }
      };

      // Por ahora usamos Termoactiva como principal, pero el sistema ya reconoce los demás IDs
      const selectedGift = GIFT_MAP["11253"]; 
      const TARGET_GIFT_PRICE = selectedGift.target;
      
      const remainingForProducts = Math.max(0, TOTAL_PAID - TARGET_GIFT_PRICE);
      const totalUnits = items.reduce((acc: number, it: any) => acc + (Number(it.quantity) || 1), 0);

      const mastershopItems: any[] = [];
      let accumulatedProductTotal = 0;

      if (totalUnits > 0) {
          // 1. Calcular precio unitario base redondeado hacia abajo
          const baseUnitPrice = Math.floor(remainingForProducts / totalUnits);

          // 2. Asignar este precio a todos los productos
          items.forEach((item: any) => {
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
              accumulatedProductTotal += (baseUnitPrice * qty);
          });
      }

      // 3. El Obsequio absorbe la diferencia exacta para cuadrar el centavo/peso
      const finalGiftPrice = Math.max(0, TOTAL_PAID - accumulatedProductTotal);

      mastershopItems.push({
          "id_variant": null,
          "id_product": selectedGift.id,
          "quantity": 1,
          "sku": selectedGift.sku,
          "name": selectedGift.name, // Nombre exacto de Mastershop
          "weight": 0.1,
          "price": finalGiftPrice
      });

      const firstName = formData.fullName?.split(' ')[0] || "Cliente";
      const lastName = formData.fullName?.split(' ').slice(1).join(' ') || "Zenhogar";

      const payload = {
        "id_order": String(ticket || `ZEN-${Date.now()}`),
        "notes": [],
        "tags": [],
        "shipping_address": {
            "country": "CO",
            "state": cleanState,
            "city": cleanCity,
            "address1": cleanAddress,
            "address2": "",
            "company": "",
            "zip": "",
            "full_name": formData.fullName || "",
            "first_name": firstName,
            "last_name": lastName,
            "phone": cleanPhone
        },
        "billing_address": {
            "country": "CO",
            "state": cleanState,
            "city": cleanCity,
            "address1": cleanAddress,
            "address2": "",
            "company": "",
            "zip": "",
            "full_name": formData.fullName || "",
            "first_name": firstName,
            "last_name": lastName,
            "phone": cleanPhone
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
            "phone": cleanPhone,
            "tags": ["WEB_ZENHOGAR"],
            "documentType": "CC",
            "documentNumber": cleanID
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
        await updateMsSyncStatus(ticket, 'failed', JSON.stringify(result));
      } else {
        await updateMsSyncStatus(ticket, 'synced');
      }

      res.json(result);
    } catch (error) {
      console.error("[Mastershop API Error]", error);
      await updateMsSyncStatus(ticket, 'failed', error instanceof Error ? error.message : "Error desconocido");
      res.status(500).json({ status: "error", message: error instanceof Error ? error.message : "Error enviando a Mastershop" });
    }
  });

  // Inventory check
  app.get("/api/mastershop/inventory", async (req, res) => {
    try {
      const rawKey = process.env.MASTERSHOP_API_KEY || process.env.VITE_MASTERSHOP_API_KEY;
      if (!rawKey) throw new Error("Mastershop API Key no configurada");
      
      const apiKey = rawKey.trim();

      let allProducts: any[] = [];
      let page = 1;
      let hasMore = true;
      let safeguard = 0;

      const commonHeaders: Record<string, string> = {
        'ms-api-key': apiKey,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      };

      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      while (hasMore && safeguard < 8) {
        safeguard++;
        const response = await fetch(`https://prod.api.mastershop.com/api/products?page=${page}`, {
          method: 'GET',
          headers: commonHeaders
        });

        if (response.status === 403 || response.status === 401) {
          console.warn(`[Inventory Sync] Intento ${safeguard} - Acceso denegado (${response.status}). Probando productos individuales...`);
          const commonIds = [
            11323, 11341, 11312, 211106, 61652, 11262, 11236, 144660, 129312, 23012, 
            164776, 11299, 129333, 57848, 26272, 11264, 11247, 129297, 23015, 61681, 
            11346, 11290, 11260, 68746, 61195, 61835, 166801, 60017, 11360, 52600, 
            166802, 61653, 129308, 23013, 58626, 211176,
            11253, 11301, 26846, 49603, 76365
          ];
          
          for (const id of commonIds) {
            try {
              // Retardo con un poco de aleatoriedad
              await delay(200 + Math.random() * 200);
              
              const prodRes = await fetch(`https://prod.api.mastershop.com/api/products/${id}`, {
                method: 'GET',
                headers: commonHeaders
              });
              
              if (prodRes.ok) {
                const pData: any = await prodRes.json();
                // Mastershop individual endpoint sometimes returns { data: {...} }, { results: [...] } or the object directly
                let found = pData.data || (pData.results && pData.results[0]) || pData;
                
                // Si el objeto "found" tiene "data" adentro (anidamiento doble raro), lo sacamos
                if (found.data && !found.id && !found.idProduct) found = found.data;

                if (found && (found.id || found.idProduct || found.id_product)) {
                  allProducts.push(found);
                }
              }
            } catch (e) {}
          }
          hasMore = false;
          break;
        }

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

      const inventory = allProducts.reduce((acc: Record<string, any>, product: any) => {
         // Mastershop a veces usa id, idProduct o id_product
         const id = product.idProduct || product.id || product.id_product;
         
         if (id) {
           // Búsqueda exhaustiva de campo de stock en el payload de Mastershop
           // Priorizamos stockTotal que suele ser el agregado real
           const stockValue = 
             product.stockTotal !== undefined ? product.stockTotal :
             product.stock_total !== undefined ? product.stock_total :
             product.total_stock !== undefined ? product.total_stock :
             product.stock !== undefined ? product.stock :
             product.quantity !== undefined ? product.quantity :
             product.available !== undefined ? product.available :
             0;

           acc[id.toString()] = {
             stock: Number(stockValue) || 0,
             lastUpdated: new Date().toISOString()
           };
         }
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
