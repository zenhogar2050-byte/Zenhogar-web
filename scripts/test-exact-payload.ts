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
        "address2": null,
        "company": null,
        "zip": null,
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
        "address2": null,
        "company": null,
        "zip": null,
        "full_name": "Test body",
        "first_name": "Test",
        "last_name": "body",
        "phone": "3040000000"
    },
    "order_transaction": {
        "total": 155000,
        "currency": "COP",
        "payment_method": "cod",
        "payment_gateway": "Contraentrega"
    },
    "customer": {
        "full_name": "Test body",
        "first_name": "Test",
        "last_name": "body",
        "email": null,
        "phone": "3040000000",
        "tags": [],
        "documentType": null,
        "documentNumber": null
    },
    "order_items": [
        {
            "id_variant": null,
            "id_product": 21823,
            "quantity": 1,
            "sku": "HG-92",
            "name": "Placa 100K",
            "weight": 1,
            "price": 150000
        }
    ],
    "additional_charge": []
  };

  const urls = [
    'https://prod.api.mastershop.com/api/orders',
    'https://prod.api.mastershop.com/api/v1/orders'
  ];

  for(const url of urls) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'x-api-key': process.env.MASTERSHOP_API_KEY || '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        console.log(`URL: ${url} -> Status: ${res.status}`);
        console.log("Response:", await res.text());
      } catch (e) {
        console.log("Error:", (e as any).message);
      }
  }
}

test();
