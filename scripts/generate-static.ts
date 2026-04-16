import fs from 'fs';
import path from 'path';
import { PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES } from '../src/constants';

const BASE_URL = 'https://zenhogar.live';

// Leer el index.html generado por Vite para obtener los scripts y estilos reales
const distIndexHtml = fs.readFileSync(path.join(process.cwd(), 'dist/index.html'), 'utf-8');

// Extraer scripts y estilos (excluyendo scripts de tipo application/ld+json para evitar duplicidad)
const scriptTags = (distIndexHtml.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || [])
    .filter(tag => !tag.includes('application/ld+json'));
const linkTags = distIndexHtml.match(/<link\b[^>]*rel="stylesheet"[^>]*>/g) || [];
const headExtra = [...linkTags, ...scriptTags].join('\n    ');

const template = (title: string, description: string, canonical: string, content: string, image: string, schema?: any) => {
    const schemas = Array.isArray(schema) ? schema : (schema ? [schema] : []);
    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${BASE_URL}/#organization`,
                "name": "Zenhogar",
                "url": BASE_URL,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${BASE_URL}/assets/logo/logo.png`,
                    "width": "512",
                    "height": "512"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+57-302-410-2568",
                    "contactType": "customer service",
                    "areaServed": "CO",
                    "availableLanguage": "Spanish"
                },
                "sameAs": [
                    "https://instagram.com/zenhogar",
                    "https://www.facebook.com/HomeIdeas0812"
                ]
            },
            ...schemas.map(s => {
                const { "@context": context, ...rest } = s;
                return rest;
            })
        ]
    };

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-57BY2PVKF4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-57BY2PVKF4');
    </script>
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
    
    <script type="application/ld+json">${JSON.stringify(graph)}</script>
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
};

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
                    <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" style="width: 100%; border-radius: 16px; margin-bottom: 15px;">
                    <h3 style="margin: 10px 0;">${p.name}</h3>
                    <p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">${p.shortDescription}</p>
                    <div class="price">Desde ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p.basePrice)}</div>
                    <a href="/producto/${p.id}" style="display: block; background: #059669; color: white; padding: 12px; border-radius: 12px; text-decoration: none; font-weight: bold;">Ver Detalles</a>
                </div>
            `).join('')}
        </div>

        <footer style="margin-top: 80px; padding: 40px 0; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 0.9rem;">
            <p>&copy; 2026 ZENHOGAR. Todos los derechos reservados.</p>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 20px;">
                <a href="/quienes-somos" style="color: inherit; text-decoration: none;">Nosotros</a>
                <a href="/politica-privacidad" style="color: inherit; text-decoration: none;">Privacidad</a>
                <a href="/condiciones-entrega" style="color: inherit; text-decoration: none;">Envíos</a>
                <a href="/devoluciones-garantia" style="color: inherit; text-decoration: none;">Garantía</a>
            </div>
        </footer>
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
            <p style="text-transform: uppercase; letter-spacing: 0.1em; color: #059669; font-weight: bold; margin-bottom: 10px;">Tu Tienda de Productos Naturales en Colombia</p>
            <h1 style="font-size: 3.5rem;">Reclama el Control de tu <span style="color: #059669; font-style: italic;">Vitalidad</span></h1>
            <p class="description" style="font-size: 1.4rem; max-width: 800px; margin: 20px auto;">ZENHOGAR: Soluciones orgánicas de grado premium diseñadas para transformar tu salud desde el interior.</p>
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

        <div style="margin-bottom: 60px;">
            <h2 style="text-align: center; margin-bottom: 40px;">Explora por Categoría</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                ${CATEGORIES.map(c => `
                    <a href="/categoria/${c.id}" style="text-decoration: none; color: inherit; text-align: center; padding: 20px; background: white; border-radius: 20px; border: 1px solid #e7e5e4;">
                        <h3 style="margin: 0; color: #059669;">${c.name}</h3>
                        <p style="font-size: 0.8rem; color: #78716c; margin-top: 10px;">${c.description.substring(0, 60)}...</p>
                    </a>
                `).join('')}
            </div>
        </div>

        <footer style="margin-top: 80px; padding: 40px 0; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 0.9rem;">
            <p>&copy; 2026 ZENHOGAR. Todos los derechos reservados.</p>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 20px;">
                <a href="/quienes-somos" style="color: inherit; text-decoration: none;">Nosotros</a>
                <a href="/politica-privacidad" style="color: inherit; text-decoration: none;">Privacidad</a>
                <a href="/condiciones-entrega" style="color: inherit; text-decoration: none;">Envíos</a>
                <a href="/devoluciones-garantia" style="color: inherit; text-decoration: none;">Garantía</a>
            </div>
        </footer>
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
        "sku": product.id,
        "mpn": product.id,
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
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "0",
                        "maxValue": "1",
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "2",
                        "maxValue": "5",
                        "unitCode": "DAY"
                    }
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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": product.name, "item": `${BASE_URL}/producto/${product.id}` }
        ]
    };

    const faqSchema = product.seoFaqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": product.seoFaqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    } : null;

    const content = `
        <div class="product-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" class="product-image">
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
                
                <div style="margin: 15px 0;">
                    <strong style="color: #1c1917;">Componentes Principales:</strong>
                    <p style="color: #57534e; font-size: 0.95rem; margin-top: 5px;">${product.components || 'Extractos naturales certificados'}</p>
                </div>

                <ul class="benefit-list">
                    ${product.benefits.map((b: string) => `<li class="benefit-item">✅ ${b}</li>`).join('')}
                </ul>
                <div class="price">Desde ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.basePrice)}</div>
                <p style="color: #059669; font-weight: bold;">Envío GRATIS + Pago Contra Entrega</p>

                <div style="margin-top: 30px; border-top: 1px solid #e7e5e4; padding-top: 20px;">
                    <h4 style="font-size: 0.9rem; color: #78716c; margin-bottom: 10px;">Temas relacionados:</h4>
                    <div style="font-size: 0.8rem; color: #a8a29e; line-height: 1.4; display: flex; flex-wrap: wrap; gap: 8px;">
                        ${(product.longTailKeywords || []).map((kw: string) => `<span style="background: #f5f5f4; padding: 2px 8px; border-radius: 4px;">${kw}</span>`).join('')}
                    </div>
                </div>

                <div style="margin-top: 30px; border-top: 1px solid #e7e5e4; pt-20px;">
                    <h3>Preguntas Frecuentes</h3>
                    <div style="font-size: 0.9rem; color: #57534e;">
                        ${(product.seoFaqs || []).map((faq: any) => `
                            <div style="margin-bottom: 15px;">
                                <strong>¿${faq.q}?</strong>
                                <p style="margin-top: 5px;">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 60px; padding: 40px; background: white; border-radius: 40px; border: 1px solid #e7e5e4;">
            <h2 style="text-align: center; margin-bottom: 30px;">Lo que dicen nuestros clientes</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                ${(product.testimonials || []).map((t: any) => `
                    <div style="padding: 20px; background: #fafaf9; border-radius: 20px; text-align: center;">
                        <div style="color: #fbbf24; margin-bottom: 10px;">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                        <p style="font-style: italic; color: #57534e; margin-bottom: 10px;">"${t.text}"</p>
                        <strong>${t.name}</strong>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="margin-top: 60px; border-top: 1px solid #e7e5e4; padding-top: 40px;">
            <h2 style="text-align: center; margin-bottom: 30px;">Otros productos que te podrían gustar</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
                ${PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map(p => `
                    <a href="/producto/${p.id}" style="text-decoration: none; color: inherit; text-align: center; background: white; padding: 15px; border-radius: 20px; border: 1px solid #f5f5f4;">
                        <img src="${p.image}" alt="${p.name}" style="width: 100%; border-radius: 12px; margin-bottom: 10px;">
                        <p style="font-weight: bold; margin: 0; font-size: 0.9rem;">${p.name}</p>
                        <p style="color: #059669; font-weight: 900; margin: 5px 0;">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p.basePrice)}</p>
                    </a>
                `).join('')}
            </div>
        </div>

        <footer style="margin-top: 80px; padding: 40px 0; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 0.9rem;">
            <p>&copy; 2026 ZENHOGAR. Todos los derechos reservados.</p>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 20px;">
                <a href="/quienes-somos" style="color: inherit; text-decoration: none;">Nosotros</a>
                <a href="/politica-privacidad" style="color: inherit; text-decoration: none;">Privacidad</a>
                <a href="/condiciones-entrega" style="color: inherit; text-decoration: none;">Envíos</a>
                <a href="/devoluciones-garantia" style="color: inherit; text-decoration: none;">Garantía</a>
            </div>
        </footer>
    `;
    return template(
        product.seoTitle || product.name,
        product.seoDescription || product.shortDescription,
        `/producto/${product.id}`,
        content,
        product.image,
        [schema, breadcrumbSchema, faqSchema].filter(Boolean)
    );
};

const generateComboHTML = (combo: any) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": combo.name,
        "image": `${BASE_URL}${combo.image}`,
        "description": combo.description,
        "sku": combo.id,
        "mpn": combo.id,
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
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "0",
                        "maxValue": "1",
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": "2",
                        "maxValue": "5",
                        "unitCode": "DAY"
                    }
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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": combo.name, "item": `${BASE_URL}/combo/${combo.id}` }
        ]
    };

    const faqSchema = combo.seoFaqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": combo.seoFaqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    } : null;

    const content = `
        <div class="product-grid">
            <div>
                <img src="${combo.image}" alt="${combo.name}" loading="lazy" decoding="async" class="product-image">
                <div style="margin-top: 20px; padding: 20px; background: #ecfdf5; border-radius: 24px;">
                    <h3>${combo.whyChoose?.title || '¿Por qué elegir este combo?'}</h3>
                    <p>${combo.whyChoose?.description || ''}</p>
                </div>
            </div>
            <div>
                <span class="badge">${combo.badge || 'OFERTA ESPECIAL'}</span>
                <h1>${combo.name}</h1>
                <p class="description"><strong>Es útil para:</strong> ${combo.description}</p>
                
                <div style="margin: 15px 0;">
                    <strong style="color: #1c1917;">Composición del Combo:</strong>
                    <p style="color: #57534e; font-size: 0.95rem; margin-top: 5px;">${combo.components || 'Sinergia de extractos naturales'}</p>
                </div>

                <ul class="benefit-list">
                    ${combo.benefits?.map((b: string) => `<li class="benefit-item">✅ ${b}</li>`).join('')}
                </ul>
                <div class="price">Solo por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(combo.price)}</div>
                <p style="color: #059669; font-weight: bold;">Ahorras ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(combo.originalPrice - combo.price)}</p>
                <p style="color: #059669; font-weight: bold;">Envío GRATIS + Pago Contra Entrega</p>

                <div style="margin-top: 30px; border-top: 1px solid #e7e5e4; pt-20px;">
                    <h3>Preguntas Frecuentes</h3>
                    <div style="font-size: 0.9rem; color: #57534e;">
                        ${(combo.seoFaqs || []).map((faq: any) => `
                            <div style="margin-bottom: 15px;">
                                <strong>¿${faq.q}?</strong>
                                <p style="margin-top: 5px;">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 60px; padding: 40px; background: white; border-radius: 40px; border: 1px solid #e7e5e4;">
            <h2 style="text-align: center; margin-bottom: 30px;">Lo que dicen nuestros clientes</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                ${(combo.testimonials || []).map((t: any) => `
                    <div style="padding: 20px; background: #fafaf9; border-radius: 20px; text-align: center;">
                        <div style="color: #fbbf24; margin-bottom: 10px;">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
                        <p style="font-style: italic; color: #57534e; margin-bottom: 10px;">"${t.text}"</p>
                        <strong>${t.name}</strong>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="margin-top: 60px; border-top: 1px solid #e7e5e4; padding-top: 40px;">
            <h2 style="text-align: center; margin-bottom: 30px;">Otras ofertas que te podrían interesar</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
                ${PROMOTIONS.filter(c => c.id !== combo.id).slice(0, 4).map(c => `
                    <a href="/combo/${c.id}" style="text-decoration: none; color: inherit; text-align: center; background: white; padding: 15px; border-radius: 20px; border: 1px solid #f5f5f4;">
                        <img src="${c.image}" alt="${c.name}" style="width: 100%; border-radius: 12px; margin-bottom: 10px;">
                        <p style="font-weight: bold; margin: 0; font-size: 0.9rem;">${c.name}</p>
                        <p style="color: #059669; font-weight: 900; margin: 5px 0;">${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(c.price)}</p>
                    </a>
                `).join('')}
            </div>
        </div>

        <footer style="margin-top: 80px; padding: 40px 0; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 0.9rem;">
            <p>&copy; 2026 ZENHOGAR. Todos los derechos reservados.</p>
            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 20px;">
                <a href="/quienes-somos" style="color: inherit; text-decoration: none;">Nosotros</a>
                <a href="/politica-privacidad" style="color: inherit; text-decoration: none;">Privacidad</a>
                <a href="/condiciones-entrega" style="color: inherit; text-decoration: none;">Envíos</a>
                <a href="/devoluciones-garantia" style="color: inherit; text-decoration: none;">Garantía</a>
            </div>
        </footer>
    `;
    return template(
        combo.seoTitle || combo.name,
        combo.seoDescription || combo.description,
        `/combo/${combo.id}`,
        content,
        combo.image,
        [schema, breadcrumbSchema, faqSchema].filter(Boolean)
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

// 6. Generar Páginas Legales e Informativas
const generateSimplePageHTML = (title: string, description: string, canonical: string, content: string) => {
    return template(title, description, canonical, content, '/assets/logo/logo.png');
};

const pages = [
    {
        id: 'quienes-somos',
        title: 'Quiénes Somos',
        description: 'Conoce la historia de ZENHOGAR, nuestra misión y compromiso con la salud natural en Colombia.',
        content: `
            <h1 style="font-size: 3rem; margin-bottom: 30px;">Quiénes Somos</h1>
            <div style="font-size: 1.1rem; color: #444; max-width: 800px;">
                <h2 style="color: #1c1917;">Nuestro Compromiso</h2>
                <p>En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA y certificaciones de seguridad para garantizar que cada solución que llevas a tu hogar sea efectiva y confiable.</p>
                <p>Nuestra historia nació de la convicción de que la naturaleza ofrece las mejores soluciones para nuestra salud. Lo que comenzó como un pequeño proyecto familiar se ha convertido en una marca de confianza para miles de colombianos.</p>
                <p><strong>Gestionamos los despachos desde Barranquilla a cualquier parte de Colombia.</strong></p>
                
                <h2 style="color: #1c1917; margin-top: 40px;">Misión de Bienestar</h2>
                <p>Proveer suplementos naturales de grado medicinal que mejoren la calidad de vida de las familias colombianas, asegurando honestidad en cada componente.</p>
            </div>
        `
    },
    {
        id: 'politica-privacidad',
        title: 'Política de Privacidad',
        description: 'Política de tratamiento de datos personales de ZENHOGAR. Tu privacidad es nuestra prioridad.',
        content: `
            <h1 style="font-size: 2.5rem; margin-bottom: 30px;">Política de Privacidad</h1>
            <div style="font-size: 1rem; color: #444; max-width: 800px;">
                <p>En ZENHOGAR, protegemos tus datos personales. Esta política detalla cómo recolectamos y tratamos tu información de acuerdo con la ley colombiana.</p>
                <h3>1. Recolección de Datos</h3>
                <p>Solo recolectamos los datos necesarios para procesar tus pedidos y brindarte soporte: nombre, dirección, teléfono y correo electrónico.</p>
                <h3>2. Finalidad</h3>
                <p>Tus datos son usados exclusivamente para la entrega de productos, confirmación vía WhatsApp y envío de ofertas relevantes si así lo autorizas.</p>
            </div>
        `
    },
    {
        id: 'condiciones-entrega',
        title: 'Condiciones de Entrega',
        description: 'Información sobre tiempos de entrega, cobertura y método de pago contra entrega en Colombia.',
        content: `
            <h1 style="font-size: 2.5rem; margin-bottom: 30px;">Condiciones de Entrega</h1>
            <div style="font-size: 1rem; color: #444; max-width: 800px;">
                <p>Ofrecemos cobertura nacional en Colombia con el mejor servicio de logística.</p>
                <h3>Tiempos de Entrega</h3>
                <p>De 2 a 5 días hábiles dependiendo de la zona del país. Gestionamos los despachos desde Barranquilla a cualquier parte de Colombia.</p>
                <h3>Pago Contra Entrega</h3>
                <p>Pagas en efectivo al recibir tu producto en la puerta de tu casa. Máxima seguridad para tu compra.</p>
            </div>
        `
    },
    {
        id: 'devoluciones-garantia',
        title: 'Devoluciones y Garantía',
        description: 'Conoce nuestras políticas de garantía para productos dañados o insatisfacción.',
        content: `
            <h1 style="font-size: 2.5rem; margin-bottom: 30px;">Devoluciones y Garantía</h1>
            <div style="font-size: 1rem; color: #444; max-width: 800px;">
                <p>Tu satisfacción es nuestra prioridad. Por eso ofrecemos garantías claras.</p>
                <h3>Garantía Legal</h3>
                <p>Si el producto llega en mal estado o con defectos de fabricación, tienes derecho a la reposición inmediata sin costo adicional.</p>
                <h3>Procedimiento</h3>
                <p>Contáctanos vía WhatsApp con pruebas fotográficas del estado del producto para procesar tu garantía en menos de 24 horas.</p>
            </div>
        `
    }
];

pages.forEach(p => {
    const dir = `dist/${p.id}`;
    ensureDir(dir);
    fs.writeFileSync(`${dir}/index.html`, generateSimplePageHTML(p.title, p.description, `/${p.id}`, p.content));
    console.log(`Generado: ${dir}/index.html (Página: ${p.id})`);
});

// 7. Generar Sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${BASE_URL}/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
    ${CATEGORIES.map(c => `<url><loc>${BASE_URL}/categoria/${c.id}</loc><priority>0.8</priority></url>`).join('\n    ')}
    ${PRODUCTS.map(p => `<url><loc>${BASE_URL}/producto/${p.id}</loc><priority>0.9</priority></url>`).join('\n    ')}
    ${PROMOTIONS.map(c => `<url><loc>${BASE_URL}/combo/${c.id}</loc><priority>0.9</priority></url>`).join('\n    ')}
    <url><loc>${BASE_URL}/combo/${COMBO_OF_THE_MONTH.id}</loc><priority>0.9</priority></url>
    ${pages.map(p => `<url><loc>${BASE_URL}/${p.id}</loc><priority>0.5</priority></url>`).join('\n    ')}
</urlset>`;

fs.writeFileSync('dist/sitemap.xml', sitemap);
console.log('Generado: dist/sitemap.xml');

// 8. Generar Robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;

fs.writeFileSync('dist/robots.txt', robots);
console.log('Generado: dist/robots.txt');

