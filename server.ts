import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import compression from "compression";
import dotenv from "dotenv";
import { PRODUCTS, CATEGORIES, PROMOTIONS, COMBO_OF_THE_MONTH } from "./src/constants.js";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Inicialización de Firebase en el Servidor (para el Webhook de Mastershop)
  let db: any = null;
  try {
    const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(firebaseConfigPath)) {
      const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));
      const fbApp = initializeApp(firebaseConfig, "server-app");
      db = getFirestore(fbApp, firebaseConfig.firestoreDatabaseId);
      console.log("[Firebase Server] Inicializado con éxito para sincronización de Webhook.");
    } else {
      console.warn("[Firebase Server] Archivo firebase-applet-config.json no encontrado.");
    }
  } catch (err: any) {
    console.error("[Firebase Server Setup Error]:", err.message);
  }

  app.use(compression());
  app.use(express.json());
  app.set('trust proxy', true);

  // Redirigir HTTP a HTTPS en producción
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(301, `https://${req.hostname}${req.url}`);
    }
    next();
  });

  // Redirecciones 301 Canónicas y de Alias Antiguos para Google Merchant / SEO
  app.use((req, res, next) => {
    const cleanUrl = req.path.toLowerCase().replace(/\/+$/, '');
    
    // Mapeo exhaustivo de alias históricos a URLs canónicas oficiales de producto
    const PRODUCT_REDIRECTS: Record<string, string> = {
      '/producto/tonico': '/producto/tonico-capilar',
      '/producto/tonico-anticanas': '/producto/tonico-capilar',
      '/producto/tonico-capilar-tonico': '/producto/tonico-capilar',
      '/producto/folivance': '/producto/tonico-capilar-folivance',
      '/producto/tonico-folivance': '/producto/tonico-capilar-folivance',
      '/producto/haydar': '/producto/haydar',
      '/producto/akha': '/producto/akha',
      '/producto/crema-akha': '/producto/akha',
      '/producto/crema-voluminizante-akha': '/producto/akha',
      '/producto/mamooth': '/producto/mammoth',
      '/producto/mammoth': '/producto/mammoth',
      '/producto/crema-mammoth': '/producto/mammoth',
      '/producto/zafir-energizante': '/producto/zafir',
      '/producto/zafir': '/producto/zafir',
      '/producto/zeus': '/categoria/salud-bienestar',
      '/producto/cafetolio': '/categoria/salud-bienestar'
    };

    // Mapeo de combos históricos
    const COMBO_REDIRECTS: Record<string, string> = {
      '/combo/combo-futbolero': `/combo/${COMBO_OF_THE_MONTH.id}`,
      '/combo/futbolero': `/combo/${COMBO_OF_THE_MONTH.id}`,
      '/combo/inmunidad-dual': `/combo/${COMBO_OF_THE_MONTH.id}`,
      '/combo/combo-inmunidad-dual': `/combo/${COMBO_OF_THE_MONTH.id}`,
      '/combo/promo-7': `/combo/${COMBO_OF_THE_MONTH.id}`
    };

    // Si la URL coincide exactamente con un alias diferente al canónico
    if (PRODUCT_REDIRECTS[cleanUrl] && PRODUCT_REDIRECTS[cleanUrl] !== cleanUrl) {
      return res.redirect(301, PRODUCT_REDIRECTS[cleanUrl]);
    }

    if (COMBO_REDIRECTS[cleanUrl] && COMBO_REDIRECTS[cleanUrl] !== cleanUrl) {
      return res.redirect(301, COMBO_REDIRECTS[cleanUrl]);
    }

    next();
  });

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

  // API Route: Webhook de Mastershop para actualización de estados y guías
  app.post("/api/mastershop/webhook", async (req, res) => {
    try {
      const payload = req.body;
      console.log("[Mastershop Webhook] recibido:", JSON.stringify(payload, null, 2));

      // Extraer y normalizar ticket consecutivo (ej: PO-1025)
      let ticketNumber = payload.ticket || payload.ticket_number || payload.external_id || payload.ref || payload.reference || payload.order_id || payload.id;
      if (ticketNumber !== undefined && ticketNumber !== null) {
        ticketNumber = ticketNumber.toString().trim();
        if (!ticketNumber.startsWith("PO-") && /^\d+$/.test(ticketNumber)) {
          ticketNumber = `PO-${ticketNumber}`;
        }
      }

      // Extraer y normalizar transporte / guía de tracking, buscando en root y en order_logistics según documentación
      const trackingGuide = (
        payload.guia || 
        payload.tracking_guide || 
        payload.tracking_number || 
        payload.numero_guia || 
        payload.tracking || 
        (payload.order_logistics && (payload.order_logistics.shipping_label || payload.order_logistics.tracking_number || payload.order_logistics.carrier_status_info?.carrier_status_code)) ||
        (payload.carrier_status_info && payload.carrier_status_info.carrier_status_code) ||
        ""
      ).toString().trim();

      // Extraer datos del cliente para fallbacks de búsqueda ultra-robusta
      let clientPhone = "";
      if (payload.customer) {
        clientPhone = (payload.customer.phone || payload.customer.telefono || payload.customer.celular || "").toString().trim();
      }
      if (!clientPhone && payload.phone) {
        clientPhone = payload.phone.toString().trim();
      }

      // Extraer y mapear estados de entrega de Mastershop
      const rawStatus = (payload.estado || payload.status || payload.event || payload.eventType || "").toString().toLowerCase().trim();
      const idStatusRaw = payload.id_status !== undefined ? payload.id_status : (payload.idStatus !== undefined ? payload.idStatus : null);
      
      let mappedStatus = "";
      
      // Intentar mapear usando id_status numérico oficial de la documentación de Mastershop
      if (idStatusRaw !== null) {
        const idStatusNum = Number(idStatusRaw);
        console.log(`[Mastershop Webhook] Evaluando codigos por id_status recibido: ${idStatusNum}`);
        switch (idStatusNum) {
          case 1: // Por Confirmar
            mappedStatus = "waiting_delivery";
            break;
          case 2: // Pendiente
            mappedStatus = "pending";
            break;
          case 3: // Por Alistar
            mappedStatus = "ready_to_ship"; // Alineado con "Por Alistar" del AdminDashboard
            break;
          case 4: // Por Recolectar
            mappedStatus = "shipped_with_guide";
            break;
          case 5: // Recolectada
            mappedStatus = "shipped_with_guide";
            break;
          case 6: // En Tránsito
            mappedStatus = "in_transit";
            break;
          case 8: // Entregada
            mappedStatus = "delivered";
            break;
          case 9: // Cancelada
            mappedStatus = "cancelled";
            break;
          case 10: // Devuelta
            mappedStatus = "declined"; // Devuelta / Declinada
            break;
          default:
            break;
        }
      }

      // Fallback a mapeo por texto si id_status no es válido o no está presente
      if (!mappedStatus && rawStatus.length > 0) {
        if (rawStatus.includes("entregado") || rawStatus.includes("delivered") || rawStatus.includes("finalizado") || rawStatus.includes("completado")) {
          mappedStatus = "delivered";
        } else if (rawStatus.includes("tránsito") || rawStatus.includes("transito") || rawStatus.includes("transit") || rawStatus.includes("ruta") || rawStatus.includes("en camino")) {
          mappedStatus = "in_transit";
        } else if (rawStatus.includes("guía") || rawStatus.includes("guia") || rawStatus.includes("generada") || rawStatus.includes("shipped") || rawStatus.includes("despachado") || rawStatus.includes("empacado")) {
          mappedStatus = "shipped_with_guide";
        } else if (rawStatus.includes("novedad") || rawStatus.includes("novedades") || rawStatus.includes("issue") || rawStatus.includes("problema")) {
          mappedStatus = "with_issue";
        } else if (rawStatus.includes("declinado") || rawStatus.includes("declined") || rawStatus.includes("rechazado")) {
          mappedStatus = "declined";
        } else if (rawStatus.includes("cancelado") || rawStatus.includes("cancelled") || rawStatus.includes("deleted")) {
          mappedStatus = "cancelled";
        } else if (rawStatus.includes("espera") || rawStatus.includes("waiting")) {
          mappedStatus = "waiting_delivery";
        }
      }

      console.log(`[Mastershop Webhook Parsed] Ticket: "${ticketNumber}", Guía: "${trackingGuide}", Celular: "${clientPhone}", Estado raw: "${rawStatus}" -> Mapeado: "${mappedStatus}"`);

      // 1. Sincronizar en Firebase Firestore (Búsqueda inteligente con fallbacks multiples)
      let firebaseUpdated = false;
      let matchedOrderDoc: any = null;

      if (db && mappedStatus) {
        try {
          const ordersRef = collection(db, "orders");
          
          // Intento 1: Buscar por ticket_number
          if (ticketNumber) {
            const q = query(ordersRef, where("ticket_number", "==", ticketNumber));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              matchedOrderDoc = querySnapshot.docs[0];
            }
          }

          // Intento 2 (Fallback Guía): Buscar por tracking_guide si hay guía disponible
          if (!matchedOrderDoc && trackingGuide) {
            const qGuide = query(ordersRef, where("tracking_guide", "==", trackingGuide));
            const queryGuideSnapshot = await getDocs(qGuide);
            if (!queryGuideSnapshot.empty) {
              matchedOrderDoc = queryGuideSnapshot.docs[0];
              console.log(`[Mastershop Webhook Fallback] Pedido localizado con éxito por campo tracking_guide: "${trackingGuide}"`);
            }
          }

          // Intento 3 (Fallback Supremo - Teléfono): Buscar por teléfono o celular si sigue sin localizar el pedido
          if (!matchedOrderDoc && clientPhone) {
            const cleanPhone = clientPhone.replace(/\D/g, ""); // Solo dígitos numéricos
            const shortPhone = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone; // Últimos 10 dígitos standard de celular de Colombia

            console.log(`[Mastershop Webhook Fallback Supremo] Buscando en DB con celular del cliente: ${cleanPhone} (corto: ${shortPhone})`);

            // Intentar buscar de manera exacta con el número completo o cortado
            const qPhone = query(ordersRef, where("customer.phone", "==", shortPhone));
            const queryPhoneSnapshot = await getDocs(qPhone);
            if (!queryPhoneSnapshot.empty) {
              matchedOrderDoc = queryPhoneSnapshot.docs[0];
              console.log(`[Mastershop Webhook Fallback] Localizado pedido por celular (corto): "${shortPhone}"`);
            } else {
              const qPhoneFull = query(ordersRef, where("customer.phone", "==", clientPhone));
              const queryPhoneFullSnapshot = await getDocs(qPhoneFull);
              if (!queryPhoneFullSnapshot.empty) {
                matchedOrderDoc = queryPhoneFullSnapshot.docs[0];
                console.log(`[Mastershop Webhook Fallback] Localizado pedido por celular (original): "${clientPhone}"`);
              }
            }
          }

          if (matchedOrderDoc) {
            const orderId = matchedOrderDoc.id;
            const orderRef = doc(db, "orders", orderId);
            const orderData = matchedOrderDoc.data();

            // Si se localizó por guía o teléfono, recuperamos el ticket_number oficial guardado
            if (orderData.ticket_number) {
              ticketNumber = orderData.ticket_number;
            }

            const updateData: any = {
              status: mappedStatus,
              updated_at: new Date()
            };
            
            // Si la guía viene en el webhook y no está registrada o es diferente, la actualizamos
            if (trackingGuide && orderData.tracking_guide !== trackingGuide) {
              updateData.tracking_guide = trackingGuide;
            }

            await updateDoc(orderRef, updateData);
            firebaseUpdated = true;
            console.log(`[Mastershop Webhook] Firestore actualizado con éxito para Ticket: ${ticketNumber} (Guía: ${trackingGuide || orderData.tracking_guide || 'N/A'})`);
          } else {
            console.warn(`[Mastershop Webhook] No se encontró ningún pedido coincidente en Firestore para Ticket: "${ticketNumber}" / Guía: "${trackingGuide}" / Celular: "${clientPhone}"`);
          }
        } catch (dbErr: any) {
          console.error("[Mastershop Webhook] Error al actualizar Firestore:", dbErr.message);
        }
      }

      // 2. Sincronizar en Google Sheets (para el control de la plantilla unificada)
      let sheetsUpdated = false;
      if (ticketNumber && mappedStatus) {
        try {
          const sheetsPayload = {
            ticket: ticketNumber,
            status: mappedStatus,
            tracking_guide: trackingGuide || ""
          };
          console.log(`[Mastershop Webhook] Sincronizando actualización de estado para ${ticketNumber} en Google Sheets...`);
          await sendToGoogleSheets({ ...sheetsPayload, type: "update_status" });
          sheetsUpdated = true;
        } catch (sheetsErr: any) {
          console.error("[Mastershop Webhook] Error al actualizar Google Sheets:", sheetsErr.message);
        }
      }

      // Responder con éxito siempre para confirmar recepción del webhook
      res.json({
        status: "processed",
        ticket: ticketNumber,
        mappedStatus: mappedStatus || "ignored",
        trackingGuide,
        sync: {
          firebase: firebaseUpdated,
          sheets: sheetsUpdated
        }
      });
    } catch (err: any) {
      console.error("[Mastershop Webhook Error]:", err.message);
      res.status(500).json({ status: "error", message: err.message });
    }
  });

  // --- SEO Endpoints ---
  
  // SEO: Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://zenhogar.live";
    const productsUrls = PRODUCTS.map(p => `${baseUrl}/producto/${p.id}`);
    const categoriesUrls = CATEGORIES.map(c => `${baseUrl}/categoria/${c.id}`);
    const ALL_PROMOTIONS = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
    const combosUrls = ALL_PROMOTIONS.map(p => `${baseUrl}/combo/${p.id}`);
    
    // Páginas estáticas sincronizadas con generate-static.ts
    const staticPages = [
      "",
      "/quienes-somos",
      "/politica-privacidad",
      "/politica-reembolso",
      "/terminos-servicio",
      "/condiciones-entrega",
      "/devoluciones-garantia"
    ].map(p => `${baseUrl}${p}`);

    const allUrls = [...staticPages, ...productsUrls, ...categoriesUrls, ...combosUrls];

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
    const ALL_PROMOTIONS = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title><![CDATA[Zenhogar - Salud y Bienestar]]></title>
  <link>${baseUrl}</link>
  <description><![CDATA[Tu aliado en salud natural, suplementos y bienestar integral en Colombia.]]></description>
  ${PRODUCTS.map(p => `
  <item>
    <g:id><![CDATA[${p.masterId}]]></g:id>
    <g:title><![CDATA[${p.name}]]></g:title>
    <g:description><![CDATA[${(p.description || p.shortDescription).replace(/<[^>]*>?/gm, '').trim().substring(0, 1000)}]]></g:description>
    <g:link>${encodeURI(`${baseUrl}/producto/${p.id}`)}</g:link>
    <g:image_link>${encodeURI(`${baseUrl}${p.image}`)}</g:image_link>
    <g:condition><![CDATA[${p.condition || 'new'}]]></g:condition>
    <g:availability><![CDATA[in stock]]></g:availability>
    <g:price><![CDATA[${p.basePrice} COP]]></g:price>
    <g:google_product_category><![CDATA[${p.googleCategory || 'Health & Beauty > Health Care > Fitness & Nutrition'}]]></g:google_product_category>
    <g:brand><![CDATA[Zenhogar]]></g:brand>
    <g:mpn><![CDATA[${p.masterId}]]></g:mpn>
    <g:identifier_exists><![CDATA[no]]></g:identifier_exists>
    <g:shipping>
      <g:country><![CDATA[CO]]></g:country>
      <g:service><![CDATA[Envío Gratis]]></g:service>
      <g:price><![CDATA[0 COP]]></g:price>
    </g:shipping>
  </item>`).join('')}
  ${ALL_PROMOTIONS.map(p => `
  <item>
    <g:id><![CDATA[${p.id}]]></g:id>
    <g:title><![CDATA[${p.name}]]></g:title>
    <g:description><![CDATA[${p.description.replace(/<[^>]*>?/gm, '').trim().substring(0, 1000)}]]></g:description>
    <g:link>${encodeURI(`${baseUrl}/combo/${p.id}`)}</g:link>
    <g:image_link>${encodeURI(`${baseUrl}${p.image}`)}</g:image_link>
    <g:condition><![CDATA[${p.condition || 'new'}]]></g:condition>
    <g:availability><![CDATA[in stock]]></g:availability>
    <g:price><![CDATA[${p.price} COP]]></g:price>
    <g:google_product_category><![CDATA[${p.googleCategory || 'Health & Beauty > Health Care > Fitness & Nutrition'}]]></g:google_product_category>
    <g:brand><![CDATA[Zenhogar]]></g:brand>
    <g:identifier_exists><![CDATA[no]]></g:identifier_exists>
    <g:shipping>
      <g:country><![CDATA[CO]]></g:country>
      <g:service><![CDATA[Envío Gratis]]></g:service>
      <g:price><![CDATA[0 COP]]></g:price>
    </g:shipping>
  </item>`).join('')}
</channel>
</rss>`;

    res.header("Content-Type", "application/xml; charset=utf-8");
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
    
    app.get("*", (req, res, next) => {
      const url = req.path;
      const distPath = path.resolve(__dirname, "dist");
      
      // Intentar servir el archivo estático específico (ej: /quienes-somos -> quienes-somos.html)
      let filePath = path.join(distPath, url === "/" ? "index.html" : `${url}.html`);
      
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return res.sendFile(filePath);
      }
      
      // Fallback a index.html para rutas SPA dinámicas
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