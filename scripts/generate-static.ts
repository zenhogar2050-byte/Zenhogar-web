import fs from 'fs';
import path from 'path';
import { PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH } from '../src/constants';

const BASE_URL = 'https://zenhogar.live';

// Leer el index.html generado por Vite para obtener los scripts y estilos reales
const distIndexHtml = fs.readFileSync(path.join(process.cwd(), 'dist/index.html'), 'utf-8');

// Extraer scripts y estilos (incluyendo los que tienen hash)
const scriptTags = distIndexHtml.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || [];
const linkTags = distIndexHtml.match(/<link\b[^>]*rel="stylesheet"[^>]*>/g) || [];
const headExtra = [...linkTags, ...scriptTags].join('\n    ');

const template = (title: string, description: string, canonical: string, content: string, image: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Zenhogar</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${BASE_URL}${canonical}">
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.png" />
    <meta name="facebook-domain-verification" content="pnovfv1zfyvmgeao6dtp0spr655uvc" />

    <meta property="og:title" content="${title} | Zenhogar">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${BASE_URL}${image}">
    <meta property="og:url" content="${BASE_URL}${canonical}">
    <meta property="og:type" content="product">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="robots" content="index, follow, max-image-preview:large">
    
    ${headExtra}

    <!-- Estilos base para que no se vea roto mientras carga JS -->
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; color: #1c1917; margin: 0; line-height: 1.5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .navbar { height: 112px; border-bottom: 1px solid #e7e5e4; display: flex; align-items: center; padding: 0 20px; background: white; }
        .logo { height: 80px; }
        .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
        @media (max-width: 768px) { .product-grid { grid-template-columns: 1fr; } }
        .product-image { width: 100%; border-radius: 24px; background: #f5f5f4; }
        .badge { background: #ecfdf5; color: #047857; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; }
        .price { color: #059669; font-size: 24px; font-weight: 900; }
        .benefit-list { list-style: none; padding: 0; }
        .benefit-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div id="root">
        <nav class="navbar">
            <img src="/assets/logo/logo.png" alt="zenhogar Logo" class="logo">
        </nav>
        <main class="container">
            ${content}
        </main>
    </div>
</body>
</html>
`;

const generateProductHTML = (product: any) => {
    const content = `
        <div class="product-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div style="margin-top: 20px; padding: 20px; background: #ecfdf5; border-radius: 24px;">
                    <h3>${product.whyChoose?.title || '¿Por qué elegir este producto?'}</h3>
                    <p>${product.whyChoose?.description || ''}</p>
                </div>
            </div>
            <div>
                <span class="badge">MÁS VENDIDO</span>
                <h1>${product.name}</h1>
                <p><strong>Es útil para:</strong> ${product.shortDescription}</p>
                <p>${product.description}</p>
                <ul class="benefit-list">
                    ${product.benefits.map((b: string) => `<li class="benefit-item">✅ ${b}</li>`).join('')}
                </ul>
                <div class="price">Desde ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.promos[0].price)}</div>
                <p style="color: #059669; font-weight: bold;">Envío GRATIS + Pago Contra Entrega</p>
            </div>
        </div>
    `;
    return template(
        product.seoTitle || product.name,
        product.seoDescription || product.shortDescription,
        `/producto/${product.id}`,
        content,
        product.image
    );
};

const generateComboHTML = (combo: any) => {
    const content = `
        <div class="product-grid">
            <div>
                <img src="${combo.image}" alt="${combo.name}" class="product-image">
                <div style="margin-top: 20px; padding: 20px; background: #ecfdf5; border-radius: 24px;">
                    <h3>${combo.whyChoose?.title || '¿Por qué elegir este combo?'}</h3>
                    <p>${combo.whyChoose?.description || ''}</p>
                </div>
            </div>
            <div>
                <span class="badge">${combo.badge || 'OFERTA ESPECIAL'}</span>
                <h1>${combo.name}</h1>
                <p><strong>Es útil para:</strong> ${combo.description}</p>
                <ul class="benefit-list">
                    ${combo.benefits?.map((b: string) => `<li class="benefit-item">✅ ${b}</li>`).join('')}
                </ul>
                <div class="price">Solo por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(combo.price)}</div>
                <p style="color: #059669; font-weight: bold;">Ahorras ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(combo.originalPrice - combo.price)}</p>
                <p style="color: #059669; font-weight: bold;">Envío GRATIS + Pago Contra Entrega</p>
            </div>
        </div>
    `;
    return template(
        combo.seoTitle || combo.name,
        combo.seoDescription || combo.description,
        `/combo/${combo.id}`,
        content,
        combo.image
    );
};

// Asegurar directorios en dist
const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Generar productos
PRODUCTS.forEach(p => {
    const dir = `dist/producto/${p.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateProductHTML(p));
    console.log(`Generado: ${dir}/index.html`);
});

// Generar combos
PROMOTIONS.forEach(c => {
    const dir = `dist/combo/${c.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateComboHTML(c));
    console.log(`Generado: ${dir}/index.html`);
});

// Combo del mes
const comboDir = `dist/combo/${COMBO_OF_THE_MONTH.id}`;
ensureDir(comboDir);
fs.writeFileSync(`${comboDir}/index.html`, generateComboHTML(COMBO_OF_THE_MONTH));
console.log(`Generado: ${comboDir}/index.html`);
