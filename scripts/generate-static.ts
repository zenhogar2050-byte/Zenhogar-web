import fs from 'fs';
import path from 'path';
import { PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES } from '../src/constants';

const BASE_URL = 'https://zenhogar.live';

// Leer el index.html generado por Vite para obtener los scripts y estilos reales
const distIndexHtml = fs.readFileSync(path.join(process.cwd(), 'dist/index.html'), 'utf-8');

// Extraer scripts y estilos (incluyendo los que tienen hash)
const scriptTags = distIndexHtml.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || [];
const linkTags = distIndexHtml.match(/<link\b[^>]*rel="stylesheet"[^>]*>/g) || [];
const headExtra = [...linkTags, ...scriptTags].join('\n    ');

const template = (title: string, description: string, canonical: string, content: string, image: string, schema?: any) => `
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
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="robots" content="index, follow, max-image-preview:large">
    
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ''}
    ${headExtra}

    <!-- Estilos base para que no se vea roto mientras carga JS -->
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; color: #1c1917; margin: 0; line-height: 1.5; background: #fafaf9; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .navbar { height: 112px; border-bottom: 1px solid #e7e5e4; display: flex; align-items: center; padding: 0 20px; background: white; position: sticky; top: 0; z-index: 50; }
        .logo { height: 80px; }
        .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px; }
        @media (max-width: 768px) { .product-grid { grid-template-columns: 1fr; } }
        .product-image { width: 100%; border-radius: 24px; background: #f5f5f4; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .badge { background: #ecfdf5; color: #047857; padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; display: inline-block; margin-bottom: 10px; }
        .price { color: #059669; font-size: 24px; font-weight: 900; margin: 15px 0; }
        .benefit-list { list-style: none; padding: 0; }
        .benefit-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: #444; }
        h1 { font-size: 2.5rem; color: #1c1917; margin: 0 0 15px 0; }
        .description { color: #57534e; font-size: 1.1rem; line-height: 1.6; }
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

// Generador de HTML para Categorías
const generateCategoryHTML = (category: any) => {
    const categoryProducts = PRODUCTS.filter(p => p.category === category.id);
    
    // Esquema JSON-LD para la categoría
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "description": category.description,
        "url": `${BASE_URL}/categoria/${category.id}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": categoryProducts.map((p, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${BASE_URL}/producto/${p.id}`,
                "name": p.name,
                "image": `${BASE_URL}${p.image}`
            }))
        }
    };

    const content = `
        <div style="text-align: center; margin-bottom: 60px;">
            <h1>${category.name}</h1>
            <p class="description">${category.description}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
            ${categoryProducts.map(p => `
                <div style="background: white; padding: 20px; border-radius: 24px; border: 1px solid #e7e5e4; text-align: center;">
                    <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 16px; margin-bottom: 15px;">
                    <h3 style="margin: 10px 0;">${p.name}</h3>
                    <p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">${p.shortDescription}</p>
                    <div class="price">Desde ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p.basePrice)}</div>
                    <a href="/producto/${p.id}" style="display: block; background: #059669; color: white; padding: 12px; border-radius: 12px; text-decoration: none; font-weight: bold;">Ver Detalles</a>
                </div>
            `).join('')}
        </div>
    `;
    return template(
        category.seoTitle || category.name,
        category.seoDescription || category.description,
        `/categoria/${category.id}`,
        content,
        categoryProducts[0]?.image || '/assets/logo/logo.png',
        schema
    );
};

// Generador de HTML para Home
const generateHomeHTML = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Zenhogar",
        "url": BASE_URL,
        "description": "Combos y Ofertas en Productos Naturales Originales",
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    const content = `
        <div style="text-align: center; padding: 60px 0;">
            <h1 style="font-size: 3.5rem;">Reclama el Control de tu <span style="color: #059669; font-style: italic;">Vitalidad</span></h1>
            <p class="description" style="font-size: 1.4rem; max-width: 800px; margin: 20px auto;">Soluciones orgánicas de grado premium diseñadas para transformar tu salud desde el interior.</p>
        </div>
        <div style="margin-bottom: 60px;">
            <h2 style="text-align: center; margin-bottom: 40px;">Oferta Destacada</h2>
            <div style="background: #1c1917; color: white; padding: 40px; border-radius: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                <img src="${COMBO_OF_THE_MONTH.image}" alt="${COMBO_OF_THE_MONTH.name}" style="width: 100%; border-radius: 24px; background: white; padding: 20px;">
                <div>
                    <span class="badge" style="background: #059669; color: white;">OFERTA DEL MES</span>
                    <h2 style="font-size: 2.5rem; margin: 10px 0;">${COMBO_OF_THE_MONTH.name}</h2>
                    <p style="color: #a8a29e; font-size: 1.2rem; margin-bottom: 20px;">${COMBO_OF_THE_MONTH.description}</p>
                    <div style="font-size: 2rem; color: #10b981; font-weight: 900;">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(COMBO_OF_THE_MONTH.price)}</div>
                    <a href="/combo/${COMBO_OF_THE_MONTH.id}" style="display: inline-block; background: white; color: #1c1917; padding: 15px 30px; border-radius: 16px; text-decoration: none; font-weight: 900; margin-top: 20px;">APROVECHAR OFERTA</a>
                </div>
            </div>
        </div>
    `;
    return template(
        "Combos y Ofertas en Productos Naturales Originales",
        "Aprovecha nuestras ofertas y combos exclusivos en productos naturales originales. Soluciones naturales para tu bienestar integral.",
        "/",
        content,
        COMBO_OF_THE_MONTH.image,
        schema
    );
};

const generateProductHTML = (product: any) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": `${BASE_URL}${product.image}`,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Zenhogar"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "520"
        },
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Cliente Verificado" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                "reviewBody": "Excelente producto, 100% original y efectivo."
            }
        ],
        "offers": {
            "@type": "Offer",
            "url": `${BASE_URL}/producto/${product.id}`,
            "priceCurrency": "COP",
            "price": product.basePrice,
            "availability": "https://schema.org/InStock",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "COP"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "CO"
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "CO",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                "merchantReturnDays": 2,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            }
        }
    };

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
                <p class="description"><strong>Es útil para:</strong> ${product.shortDescription}</p>
                <p class="description">${product.description}</p>
                <ul class="benefit-list">
                    ${product.benefits.map((b: string) => `<li class="benefit-item">✅ ${b}</li>`).join('')}
                </ul>
                <div class="price">Desde ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.basePrice)}</div>
                <p style="color: #059669; font-weight: bold;">Envío GRATIS + Pago Contra Entrega</p>
            </div>
        </div>
    `;
    return template(
        product.seoTitle || product.name,
        product.seoDescription || product.shortDescription,
        `/producto/${product.id}`,
        content,
        product.image,
        schema
    );
};

const generateComboHTML = (combo: any) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": combo.name,
        "image": `${BASE_URL}${combo.image}`,
        "description": combo.description,
        "brand": {
            "@type": "Brand",
            "name": "Zenhogar"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "520"
        },
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Cliente Verificado" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                "reviewBody": "Excelente producto, 100% original y efectivo."
            }
        ],
        "offers": {
            "@type": "Offer",
            "url": `${BASE_URL}/combo/${combo.id}`,
            "priceCurrency": "COP",
            "price": combo.price,
            "availability": "https://schema.org/InStock",
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0",
                    "currency": "COP"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "CO"
                }
            },
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "CO",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                "merchantReturnDays": 2,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
            }
        }
    };

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
                <p class="description"><strong>Es útil para:</strong> ${combo.description}</p>
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
        combo.image,
        schema
    );
};

// Asegurar directorios en dist
const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// 1. Generar Home (Sobrescribe el index.html de dist con la versión SEO-ready)
fs.writeFileSync('dist/index.html', generateHomeHTML());
console.log('Generado: dist/index.html (Home)');

// 2. Generar Categorías
CATEGORIES.forEach(cat => {
    const dir = `dist/categoria/${cat.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateCategoryHTML(cat));
    console.log(`Generado: ${dir}/index.html (Categoría: ${cat.id})`);
});

// 3. Generar productos
PRODUCTS.forEach(p => {
    const dir = `dist/producto/${p.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateProductHTML(p));
    console.log(`Generado: ${dir}/index.html (Producto: ${p.id})`);
});

// 4. Generar combos
PROMOTIONS.forEach(c => {
    const dir = `dist/combo/${c.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateComboHTML(c));
    console.log(`Generado: ${dir}/index.html (Combo: ${c.id})`);
});

// 5. Combo del mes
const comboDir = `dist/combo/${COMBO_OF_THE_MONTH.id}`;
ensureDir(comboDir);
fs.writeFileSync(`${comboDir}/index.html`, generateComboHTML(COMBO_OF_THE_MONTH));
console.log(`Generado: ${comboDir}/index.html (Combo del Mes)`);

