export const onRequestPost: PagesFunction = async (context) => {
  const env = context.env as any;
  const apiKey = (env.MASTERSHOP_API_KEY || env.VITE_MASTERSHOP_API_KEY || "")?.trim();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Mastershop API Key no configurada en Cloudflare" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  try {
    const body: any = await context.request.json();
    const { ticket, formData, items, total } = body;

    // --- MISMAS VALIDACIONES ---
    if (!formData || !items) {
      throw new Error("Datos de orden incompletos");
    }

    const GIFT_ID = 11253; 
    const GIFT_PRICE = 1500; 
    const TOTAL_PAID = Number(total) || 0;
    const remainingForProducts = Math.max(0, TOTAL_PAID - GIFT_PRICE);
    const totalUnits = items.reduce((acc: number, it: any) => acc + (Number(it.quantity) || 1), 0);

    const mastershopItems: any[] = [];
    if (totalUnits > 0) {
        const baseUnitPrice = Math.floor(remainingForProducts / totalUnits);
        let currentTotalDistribution = 0;

        items.forEach((item: any) => {
            const qty = Number(item.quantity) || 1;
            const mastershopId = Number(item.mastershopId) || 11323;
            mastershopItems.push({
                "id_variant": null,
                "id_product": mastershopId,
                "quantity": qty,
                "sku": item.productId || 'GENERIC',
                "name": item.productName || "Producto",
                "weight": 1,
                "price": baseUnitPrice
            });
            currentTotalDistribution += baseUnitPrice * qty;
        });

        const diff = remainingForProducts - currentTotalDistribution;
        if (diff !== 0 && mastershopItems.length > 0) {
            const first = mastershopItems[0];
            if (first.quantity > 1) {
                const originalQty = first.quantity;
                first.quantity = 1;
                first.price += diff;
                mastershopItems.splice(1, 0, { ...first, quantity: originalQty - 1, price: baseUnitPrice });
            } else {
                first.price += diff;
            }
        }
    }

    mastershopItems.push({
        "id_variant": null,
        "id_product": GIFT_ID,
        "quantity": 1,
        "sku": "OBSEQUIO",
        "name": "Obsequio Termoactiva (Cortesia)",
        "weight": 0.1,
        "price": GIFT_PRICE
    });

    const firstName = formData.fullName?.split(' ')[0] || "Cliente";
    const lastName = formData.fullName?.split(' ').slice(1).join(' ') || "Zenhogar";

    const payload = {
      "id_order": String(ticket || `ZEN-${Date.now()}`),
      "shipping_address": {
          "country": "CO", "state": formData.department || "", "city": formData.city || "",
          "address1": formData.address || "N/A", "full_name": formData.fullName || "",
          "first_name": firstName, "last_name": lastName, "phone": formData.phone || ""
      },
      "order_transaction": {
          "total": Number(total) || 0, "currency": "COP", "payment_method": "cod", "payment_gateway": "Contraentrega"
      },
      "customer": {
          "full_name": formData.fullName || "", "first_name": firstName, "last_name": lastName,
          "email": formData.email || "noreply@zenhogar.live", "phone": formData.phone || "",
          "tags": ["WEB_ZENHOGAR"], "documentType": "CC", "documentNumber": formData.identification || "0"
      },
      "order_items": mastershopItems,
      "additional_charge": []
    };

    const response = await fetch("https://prod.api.mastershop.com/api/orders", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json",
        "ms-api-key": apiKey 
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.ok ? 200 : response.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};
