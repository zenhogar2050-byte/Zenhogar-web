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

    // --- NUEVA LÓGICA DE OBSEQUIOS Y MATEMÁTICA DE PRECISIÓN ---
    const giftList = [
        { id: 49603, name: "Obsequio Coliplus", basePrice: 1000 },
        { id: 26846, name: "Obsequio Titan Coffe", basePrice: 1000 },
        { id: 26845, name: "Obsequio Coffe Colageno", basePrice: 1000 },
        { id: 76365, name: "Obsequio Pañitos Dampy", basePrice: 1000 },
        { id: 11301, name: "Obsequio Gratis Repolarizador", basePrice: 1 },
        { id: 11270, name: "Obsequio Shampoo Sin sal", basePrice: 1 },
        { id: 11236, name: "Obsequio termoactiva", basePrice: 1500 }
    ];

    const totalPhysicalUnits = items.reduce((acc: number, it: any) => acc + ((Number(it.units) || 1) * (Number(it.quantity) || 1)), 0);
    const TOTAL_PAID = Number(total) || 0;

    // 1. Determinar el Obsequio según reglas de volumen
    let selectedGift: any;
    if (totalPhysicalUnits === 1) {
        const ones = giftList.filter(g => g.basePrice === 1);
        selectedGift = ones[Math.floor(Math.random() * ones.length)];
    } else if (totalPhysicalUnits === 2) {
        const thousands = giftList.filter(g => g.basePrice === 1000);
        selectedGift = thousands[Math.floor(Math.random() * thousands.length)];
    } else {
        selectedGift = giftList.find(g => g.basePrice === 1500) || giftList[giftList.length - 1];
    }

    // 2. Matemática Comodín: El obsequio absorbe la diferencia
    const reserveForGift = selectedGift.basePrice;
    const amountForProducts = Math.max(1, TOTAL_PAID - reserveForGift);
    
    const mastershopItems: any[] = [];
    let distributedProductTotal = 0;

    if (totalPhysicalUnits > 0) {
        const baseUnitPrice = Math.floor(amountForProducts / totalPhysicalUnits);
        
        items.forEach((item: any) => {
            const unitsPerItem = Number(item.units) || 1;
            const quantityInCart = Number(item.quantity) || 1;
            const totalQtyForMastershop = unitsPerItem * quantityInCart;
            const mastershopId = Number(item.mastershopId) || 11323;
            
            const itemTotalPrice = baseUnitPrice * totalQtyForMastershop;
            distributedProductTotal += itemTotalPrice;

            mastershopItems.push({
                "id_variant": null,
                "id_product": mastershopId,
                "quantity": totalQtyForMastershop,
                sku: item.productId || item.sku || 'GENERIC',
                "name": item.productName || item.name || "Producto",
                "weight": 1,
                "price": baseUnitPrice
            });
        });
    }

    // El OBSEQUIO es el comodín (Buffer)
    const finalGiftPrice = TOTAL_PAID - distributedProductTotal;

    mastershopItems.push({
        "id_variant": null,
        "id_product": selectedGift.id,
        "quantity": 1,
        "sku": "OBSEQUIO",
        "name": `${selectedGift.name} (Cortesia)`,
        "weight": 0.1,
        "price": Math.max(1, finalGiftPrice) // Mínimo 1 para evitar problemas en Mastershop
    });

    const firstName = formData.fullName?.split(' ')[0] || "Cliente";
    const lastName = formData.fullName?.split(' ').slice(1).join(' ') || "Zenhogar";

    const rawPhone = formData.phone?.replace(/\D/g, '') || "";
    const cleanPhone = rawPhone.length === 10 ? `57${rawPhone}` : rawPhone;
    const fullAddress = `${formData.address}${formData.additionalInfo ? ` - ${formData.additionalInfo}` : ''}${formData.label ? ` (${formData.label})` : ''}${formData.isOffice ? ' [ENTREGAR EN OFICINA]' : ''}`;
    
    // Construir tags dinámicas según las opciones seleccionadas
    const dynamicTags = ["WEB_ZENHOGAR"];
    if (formData.isOffice) dynamicTags.push("OFICINA_TRANSPORTE");
    if (formData.label) dynamicTags.push(`LABEL_${formData.label.toUpperCase().replace(/\s/g, '_')}`);

    const addressObj = {
        "country": "CO", 
        "state": formData.department || "", 
        "city": formData.city || "",
        "address1": fullAddress, 
        "address2": null,
        "company": null,
        "zip": null,
        "full_name": formData.fullName || "",
        "first_name": firstName, 
        "last_name": lastName, 
        "phone": cleanPhone
    };

    const payload = {
      "id_order": String(ticket || `ZEN-${Date.now()}`),
      "notes": formData.notes ? [formData.notes] : [],
      "tags": dynamicTags,
      "shipping_address": addressObj,
      "billing_address": addressObj,
      "order_transaction": {
          "total": Number(total) || 0, 
          "currency": "COP", 
          "payment_method": "cod", 
          "payment_gateway": "Contraentrega"
      },
      "customer": {
          "full_name": formData.fullName || "", 
          "first_name": firstName, 
          "last_name": lastName,
          "email": formData.email || "noreply@zenhogar.live", 
          "phone": cleanPhone,
          "tags": dynamicTags, 
          "documentType": "CC", 
          "documentNumber": formData.identification || "0"
      },
      "order_items": mastershopItems,
      "additional_charge": []
    };

    const response = await fetch("https://prod.api.mastershop.com/api/orders", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json",
        "ms-api-key": apiKey,
        "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
