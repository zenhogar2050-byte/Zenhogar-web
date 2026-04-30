export const onRequestGet: PagesFunction<{ 
  MASTERSHOP_API_KEY: string,
  VITE_MASTERSHOP_API_KEY: string 
}> = async (context) => {
  const apiKey = context.env.MASTERSHOP_API_KEY || context.env.VITE_MASTERSHOP_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Mastershop API Key no configurada" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    let allProducts: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(`https://prod.api.mastershop.com/api/products?page=${page}`, {
        method: 'GET',
        headers: {
          'ms-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });

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

    const inventory = allProducts.reduce((acc: Record<string, number>, product: any) => {
       acc[product.idProduct.toString()] = product.stockTotal;
       return acc;
    }, {});

    return new Response(JSON.stringify(inventory), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
