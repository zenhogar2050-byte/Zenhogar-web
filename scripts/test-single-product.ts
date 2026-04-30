import fetch from 'node-fetch';

async function run() {
  const url1 = 'https://prod.api.mastershop.com/api/products?page=1';
  const url2 = 'https://prod.api.mastershop.com/api/products?page=2';
  
  const h = {
    'ms-api-key': 'CUFgkNEltorcMbAiJ9-QEHpXlmxeLIubWGAh1sn8wv1d0kapcp',
    'Content-Type': 'application/json'
  };

  const res1 = await fetch(url1, { headers: h });
  const data1 = await res1.json();
  console.log(`page=1 len:`, data1.results?.length);

  const res2 = await fetch(url2, { headers: h });
  const data2 = await res2.json();
  console.log(`page=2 len:`, data2.results?.length);
  if (data2.results?.length) {
    console.log('Sample ids page 2:', data2.results.slice(0, 3).map((r: any) => r.idProduct));
  }
}

run();
