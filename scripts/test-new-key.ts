import fetch from 'node-fetch';

async function test() {
  const payload = {
    "id_order": "test-zenhogar-" + Date.now(),
    "notes": [],
    "tags": [],
    "shipping_address": {
        "country": "CO",
        "state": "Antioquia",
        "city": "Medellín",
        "address1": "Calle 10 #01-12",
        "address2": "NA",
        "company": "Particular",
        "zip": "000000",
        "full_name": "Test body",
        "first_name": "Test",
        "last_name": "body",
        "phone": "3040000000"
    },
    "billing_address": {
        "country": "CO",
        "state": "Antioquia",
        "city": "Medellín",
        "address1": "Calle 10 #01-12",
        "address2": "NA",
        "company": "Particular",
        "zip": "000000",
        "full_name": "Test body",
        "first_name": "Test",
        "last_name": "body",
        "phone": "3040000000"
    },
    "order_transaction": {
        "total": 150000,
        "currency": "COP",
        "payment_method": "cod",
        "payment_gateway": "Contraentrega"
    },
    "customer": {
        "full_name": "Test body",
        "first_name": "Test",
        "last_name": "body",
        "email": "test@zenhogar.live",
        "phone": "3040000000",
        "tags": [],
        "documentType": "CC",
        "documentNumber": "123456789"
    },
    "order_items": [
        {
            "id_variant": null,
            "id_product": 11323,
            "quantity": 1,
            "sku": "rtafull",
            "name": "Rtafull",
            "weight": 1,
            "price": 150000
        }
    ],
    "additional_charge": []
  };

  try {
    const res = await fetch('https://prod.api.mastershop.com/api/orders', {
      method: 'POST',
      headers: {
        'ms-api-key': 'CUFgkNEltorcMbAiJ9-QEHpXlmxeLIubWGAh1sn8wv1d0kapcp',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log(`Status: ${res.status}`);
    console.log("Response:", await res.text());
  } catch (e) {
    console.log("Error:", (e as any).message);
  }
}

test();
