export const onRequestGet: PagesFunction<{ 
  MASTERSHOP_API_KEY: string,
  VITE_MASTERSHOP_API_KEY: string 
}> = async (context) => {
  const apiKey = context.env.MASTERSHOP_API_KEY || context.env.VITE_MASTERSHOP_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ 
      error: "Mastershop API Key no configurada en Cloudflare",
      debug_env_keys: Object.keys(context.env) 
    }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  try {
    let allProducts: any[] = [];
    let page = 1;
    let hasMore = true;
    let safeguard = 0; // Evitar bucles infinitos

    while (hasMore && safeguard < 20) {
      safeguard++;
      const response = await fetch(`https://prod.api.mastershop.com/api/products?page=${page}`, {
        method: 'GET',
        headers: {
          'ms-api-key': apiKey,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mastershop API error: ${response.status} - ${errorText}`);
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
       if (product.idProduct) {
         acc[product.idProduct.toString()] = product.stockTotal || 0;
       }
       return acc;
    }, {});

    return new Response(JSON.stringify(inventory), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache"
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
