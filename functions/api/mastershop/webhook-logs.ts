export const onRequestGet: PagesFunction = async () => {
  // Cloudflare Workers stay alive only during the request. 
  // Persistent logs require KV, D1, or external DB.
  return new Response(JSON.stringify([]), {
    headers: { "Content-Type": "application/json" }
  });
};
