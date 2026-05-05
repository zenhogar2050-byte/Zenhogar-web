export const onRequestPost: PagesFunction = async (context) => {
  const env = context.env as any;
  const webhookUrl = (env.GOOGLE_SHEETS_ORDERS_WEBHOOK || env.VITE_GOOGLE_SHEETS_ORDERS_WEBHOOK || "")?.trim();
  
  if (!webhookUrl) {
    return new Response(JSON.stringify({ error: "Webhook URL de Google Sheets no configurada en Cloudflare" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const body: any = await context.request.json();
    const payload = {
      ...body,
      token: env.SHEETS_SECURITY_TOKEN || env.VITE_SHEETS_SECURITY_TOKEN || "zenhogar_secret_2026",
      timestamp: new Date().toLocaleString()
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};
