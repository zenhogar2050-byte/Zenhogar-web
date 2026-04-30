import fetch from 'node-fetch';

async function testEndpoint(url: string) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'ms-api-key': 'CUFgkNEltorcMbAiJ9-QEHpXlmxeLIubWGAh1sn8wv1d0kapcp',
        'Content-Type': 'application/json'
      }
    });
    console.log(`URL: ${url} -> Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text.substring(0, 500)}`);
  } catch (e) {
    console.log(`URL: ${url} -> Error:`, (e as any).message);
  }
}

async function run() {
  await testEndpoint('https://prod.api.mastershop.com/api/products');
  await testEndpoint('https://prod.api.mastershop.com/api/v1/products');
  await testEndpoint('https://prod.api.mastershop.com/api/products/181083');
}

run();
