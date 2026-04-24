import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

import { Resend } from 'resend';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  
  app.use(compression());
  app.use(express.json());
  app.set('trust proxy', true);
  
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  
  // URL Normalization Middleware (Fix Redirect Errors in GSC)
  app.use((req, res, next) => {
    // 1. Force non-www (SEO best practice to avoid duplicate content)
    const host = req.get('host');
    if (host && host.startsWith('www.')) {
      const nonWwwHost = host.slice(4);
      // Construct the absolute URL manually to avoid protocol issues
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      return res.redirect(301, `${protocol}://${nonWwwHost}${req.originalUrl}`);
    }

    const url = req.originalUrl;
    const searchIndex = url.indexOf('?');
    const path = searchIndex !== -1 ? url.slice(0, searchIndex) : url;
    const query = searchIndex !== -1 ? url.slice(searchIndex) : '';

    // 2. Remove trailing slash (except for home page)
    if (path.length > 1 && path.endsWith('/')) {
      const newPath = path.slice(0, -1);
      return res.redirect(301, newPath + query);
    }
    
    // 3. Remove multiple slashes
    if (path.includes('//')) {
      const newPath = path.replace(/\/+/g, '/');
      return res.redirect(301, newPath + query);
    }

    next();
  });

  const distPath = path.resolve(__dirname, "dist");
  const publicPath = path.resolve(__dirname, "public");

  // Explicitly serve robots.txt and sitemap.xml with correct headers
  app.get("/robots.txt", (req, res) => {
    const filePath = fs.existsSync(path.resolve(distPath, "robots.txt")) 
      ? path.resolve(distPath, "robots.txt") 
      : path.resolve(publicPath, "robots.txt");
    
    if (fs.existsSync(filePath)) {
      res.type('text/plain').sendFile(filePath);
    } else {
      res.status(404).end();
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    const filePath = fs.existsSync(path.resolve(distPath, "sitemap.xml")) 
      ? path.resolve(distPath, "sitemap.xml") 
      : path.resolve(publicPath, "sitemap.xml");
    
    if (fs.existsSync(filePath)) {
      res.type('application/xml').sendFile(filePath);
    } else {
      res.status(404).end();
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
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Serve static files from dist with auto-extension and NO directory redirects
    app.use(express.static(distPath, { 
      extensions: ['html'],
      redirect: false,
      index: 'index.html'
    }));
    
    // SPA Fallback for production
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

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
    
    // Automation: Send Confirmation Email (Real logic with Resend)
    if (resend && orderData.customer?.email && orderData.type !== "abandoned") {
      console.log("Automation 2.0: Sending confirmation email to", orderData.customer.email);
      
      const productName = orderData.product?.name || orderData.combo?.name || "Producto Zenhogar";
      const total = orderData.total || (orderData.combo?.price) || (orderData.product?.basePrice);
      
      resend.emails.send({
        from: 'ZENHOGAR <pedidos@zenhogar.live>',
        to: orderData.customer.email,
        subject: `¡Gracias por tu pedido! - ${productName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e7e5e4; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #059669;">¡Hola, ${orderData.customer.name}!</h1>
              <p style="font-size: 18px; color: #444;">Hemos recibido tu pedido con éxito.</p>
            </div>
            
            <div style="background: #fafaf9; padding: 20px; border-radius: 16px; margin-bottom: 20px;">
              <h2 style="font-size: 16px; color: #1c1917; margin-top: 0;">Detalles del Pedido:</h2>
              <p><strong>Producto:</strong> ${productName}</p>
              <p><strong>Total:</strong> $${new Intl.NumberFormat('es-CO').format(total)}</p>
              <p><strong>Método de Pago:</strong> Pago Contra Entrega</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h2 style="font-size: 16px; color: #1c1917;">Información de Envío:</h2>
              <p style="margin: 5px 0;">${orderData.customer.address}</p>
              <p style="margin: 5px 0;">${orderData.customer.city}, ${orderData.customer.department}</p>
              <p style="margin: 5px 0;">Teléfono: ${orderData.customer.phone}</p>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">Muy pronto nos pondremos en contacto contigo vía WhatsApp para confirmar el despacho.</p>
              <p style="color: #059669; font-weight: bold;">¡Gracias por confiar en ZENHOGAR!</p>
            </div>
          </div>
        `
      }).catch(err => {
        console.error("Error sending email with Resend:", err);
      });
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
