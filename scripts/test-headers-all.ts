import fetch from 'node-fetch';

async function test(headerName: string) {
  try {
    const res = await fetch('https://prod.api.mastershop.com/api/orders', {
      method: 'POST',
      headers: {
        [headerName]: process.env.MASTERSHOP_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"test": true})
    });
    console.log(`${headerName}: ${res.status} - ${await res.text()}`);
  } catch (e) {
    console.log(`${headerName}: Error`);
  }
}

async function run() {
  const headers = [
    'ms-api-key',
    'x-ms-api-key',
    'apikey',
    'api-key',
    'x-api-key',
    'Authorization'
  ];
  for (const h of headers) {
    await test(h);
  }
}

run();
