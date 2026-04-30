export const onRequestPost: PagesFunction = async (context) => {
  try {
    const payload: any = await context.request.json();
    console.log("[Webhook Mastershop Cloudflare]:", payload);
    
    // Cloudflare Workers are stateless. To keep logs, we would need KV or a DB.
    // For now we just return 200.
    
    return new Response(JSON.stringify({ status: "success", message: "Webhook received by Cloudflare" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ status: "error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
