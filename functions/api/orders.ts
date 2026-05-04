export const onRequestPost: PagesFunction = async (context) => {
  const env = context.env as any;
  
  // 1. Extraer configuración de las variables de entorno de Cloudflare
  const webhookUrl = (env.GOOGLE_SHEETS_ORDERS_WEBHOOK || "").trim();
  const securityToken = (env.SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026").trim();
  
  // Validar que la URL del webhook exista para evitar errores silenciosos
  if (!webhookUrl) {
    return new Response(JSON.stringify({ 
      error: "Error de configuración: La URL del Webhook no está definida en Cloudflare." 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    // 2. Obtener los datos del pedido enviados desde el frontend
    const body: any = await context.request.json();
    
    // 3. Construir el paquete de datos (Payload)
    // Se añade el token de seguridad y la marca de tiempo antes de enviar a Google
    const payload = {
      ...body,
      token: securityToken,
      timestamp: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })
    };

    // 4. Enviar los datos a Google Apps Script
    // Usamos 'text/plain' para evitar problemas de CORS que a veces bloquean 'application/json' en Google
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "text/plain;charset=utf-8" 
      },
      body: JSON.stringify(payload)
    });

    // 5. Procesar la respuesta de Google (donde viene el número de ticket)
    const result = await response.json();
    
    return new Response(JSON.stringify(result), {
      status: response.ok ? 200 : 400,
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*" 
      }
    });

  } catch (error: any) {
    // Manejo de errores en caso de fallo de red o datos corruptos
    return new Response(JSON.stringify({ 
      error: "Fallo en el Worker de Cloudflare: " + error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};