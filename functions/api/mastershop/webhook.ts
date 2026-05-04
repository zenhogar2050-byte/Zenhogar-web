export const onRequestPost: PagesFunction = async (context) => {
  try {
    const payload: any = await context.request.json();
    console.log("[Webhook Mastershop]: Payload recibido:", JSON.stringify(payload));
    
    // Extraer datos clave del webhook de Mastershop
    const orderId = payload.id_order || payload.idOrder || (payload.order && payload.order.id_order);
    const newStatus = payload.status_name || payload.statusName || (payload.order && payload.order.statusName);
    const carrier = payload.carrier_name || (payload.orderLogistics && payload.orderLogistics.carrier);
    const tracking = payload.tracking_number || (payload.orderLogistics && payload.orderLogistics.carrierTracking && payload.orderLogistics.carrierTracking.guide);
    const alerts = payload.orderAlerts || (payload.order && payload.order.orderAlerts) || [];
    
    if (!orderId) {
      return new Response(JSON.stringify({ status: "ignored", message: "No ID found" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Preparar mensaje de alerta/notas si existen
    let alertNotes = "";
    if (alerts.length > 0) {
      alertNotes = "| ALERTAS: " + alerts.map((a: any) => a.name).join(", ");
    }

    // Aquí llamaríamos a la actualización de Google Sheets
    const env = context.env as any;
    const sheetsWebhookUrl = (env.GOOGLE_SHEETS_ORDERS_WEBHOOK || env.VITE_GOOGLE_SHEETS_ORDERS_WEBHOOK || "")?.trim();

    if (sheetsWebhookUrl) {
      console.log(`[Webhook Mastershop]: Enviando actualización a Google Sheets para pedido ${orderId}`);
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "mastershop_update",
            orderId,
            status: newStatus,
            carrier,
            tracking,
            alerts: alerts.map((a: any) => a.name).join(", "),
            updatedAt: new Date().toISOString(),
            version: "1.0.3"
          })
        });
      } catch (sheetsErr: any) {
        console.error("[Webhook Mastershop Sheets Error]:", sheetsErr.message);
      }
    }

    // --- SYNC CON FIREBASE (Para el Dashboard de la App) ---
    const firebaseConfig = {
      projectId: "gen-lang-client-0672500796",
      databaseId: "ai-studio-46279a17-9caa-4819-b2d9-023c3691a10a",
      apiKey: "AIzaSyBvvxXWXRBQLtpsl07tx-v3YEphMw_jpJs"
    };

    try {
      // 1. Buscamos el documento por ticket_number
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.databaseId}/documents:runQuery?key=${firebaseConfig.apiKey}`;
      const queryBody = {
        structuredQuery: {
          from: [{ collectionId: "orders" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "ticket_number" },
              op: "EQUAL",
              value: { stringValue: String(orderId) }
            }
          },
          limit: 1
        }
      };

      const queryRes = await fetch(queryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryBody)
      });

      const queryData: any = await queryRes.json();
      // El resultado de runQuery es un array de objetos con la propiedad 'document'
      const docPath = queryData?.[0]?.document?.name;

      if (docPath) {
        // 2. Actualizamos los campos Mastershop
        const updateUrl = `https://firestore.googleapis.com/v1/${docPath}?key=${firebaseConfig.apiKey}&updateMask.fieldPaths=ms_status&updateMask.fieldPaths=ms_alerts&updateMask.fieldPaths=ms_carrier&updateMask.fieldPaths=ms_tracking&updateMask.fieldPaths=updated_at`;
        
        const updateBody = {
          fields: {
            ms_status: { stringValue: newStatus || "UNKNOWN" },
            ms_alerts: { arrayValue: { values: alerts.map((a: any) => ({ stringValue: a.name || String(a) })) } },
            ms_carrier: { stringValue: carrier || "N/A" },
            ms_tracking: { stringValue: tracking || "N/A" },
            updated_at: { timestampValue: new Date().toISOString() }
          }
        };

        await fetch(updateUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateBody)
        });
        console.log(`[Webhook Mastershop]: Firebase Sync OK para pedido ${orderId}`);
      } else {
        console.warn(`[Webhook Mastershop]: No se encontró el pedido ${orderId} en Firebase para sincronizar.`);
      }

      // --- GUARDAR LOG DEL WEBHOOK PARA EL DASHBOARD ---
      const logUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.databaseId}/documents/webhook_logs?key=${firebaseConfig.apiKey}`;
      const logBody = {
        fields: {
          receivedAt: { timestampValue: new Date().toISOString() },
          payload: { stringValue: JSON.stringify(payload) },
          orderId: { stringValue: String(orderId || "unknown") },
          status: { stringValue: String(newStatus || "unknown") }
        }
      };

      await fetch(logUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logBody)
      });

    } catch (fbErr: any) {
      console.error("[Webhook Mastershop Firebase Error]:", fbErr.message);
    }

    return new Response(JSON.stringify({ 
      status: "success", 
      received: { orderId, newStatus, carrier, tracking } 
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("[Webhook Mastershop Error]:", error.message);
    return new Response(JSON.stringify({ status: "error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
