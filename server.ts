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
  
  // URL Normalization Middleware (Fix Redirect Errors in GSC)
  app.use((req, res, next) => {
    const url = req.originalUrl;
    const searchIndex = url.indexOf('?');
    const path = searchIndex !== -1 ? url.slice(0, searchIndex) : url;
    const query = searchIndex !== -1 ? url.slice(searchIndex) : '';

    // Remove trailing slash (except for home page)
    if (path.length > 1 && path.endsWith('/')) {
      const newPath = path.slice(0, -1);
      return res.redirect(301, newPath + query);
    }
    
    // Remove multiple slashes
    if (path.includes('//')) {
      const newPath = path.replace(/\/+/g, '/');
      return res.redirect(301, newPath + query);
    }

    next();
  });

  const ORDERS_FILE = path.resolve(__dirname, "orders.json");

  // Helper to read/write local orders for the Admin Dashboard
  const getLocalOrders = () => {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    try {
      return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"));
    } catch (e) {
      return [];
    }
  };

  const saveLocalOrder = (orderData: any) => {
    const orders = getLocalOrders();
    orders.unshift({
      ...orderData,
      id: orderData.id || `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      status: "pending",
      created_at: new Date().toISOString()
    });
    // Keep only last 1000 orders to prevent file size issues
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders.slice(0, 1000), null, 2));
    
    // Automation: Send Confirmation Email (Placeholder logic for Resend)
    if (process.env.RESEND_API_KEY) {
      console.log("Automation 2.0: Triggering order confirmation email to", orderData.customer.email);
      // Here we would perform a fetch to Resend API
    }
  };

  // API Admin Routes
  app.get("/api/admin/orders", (req, res) => {
    const password = req.headers["x-admin-password"];
    const expected = (process.env.ADMIN_PASSWORD || "Jacobo0812").trim();
    const received = (typeof password === 'string' ? password : '').trim();

    if (received !== expected) {
      console.log(`[Admin] Intento de acceso fallido. Recibido: "${received}", Esperado: "${expected}"`);
      return res.status(401).json({ message: "No autorizado" });
    }
    res.json(getLocalOrders());
  });

  app.post("/api/admin/orders/update", (req, res) => {
    const { orderId, status } = req.body;
    const password = req.headers["x-admin-password"];
    const expected = (process.env.ADMIN_PASSWORD || "Jacobo0812").trim();
    const received = (typeof password === 'string' ? password : '').trim();

    if (received !== expected) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const orders = getLocalOrders();
    const index = orders.findIndex((o: any) => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      orders[index].updated_at = new Date().toISOString();
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
      return res.json({ status: "ok" });
    }
    res.status(404).json({ message: "Pedido no encontrado" });
  });

  // API Routes
  app.post("/api/orders", async (req, res) => {
    console.log("Received order request for Google Sheets:", JSON.stringify(req.body, null, 2));
    
    // Save locally for Admin Panel (NEW in 2.0)
    saveLocalOrder(req.body);
    
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
    
    // Save locally for Admin Panel (NEW in 2.0)
    saveLocalOrder({ ...req.body, type: "abandoned" });
    
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
