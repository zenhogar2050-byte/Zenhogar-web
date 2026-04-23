import fs from 'fs';
import path from 'path';
// Build Version: 2026-04-23-V1.1-PERFORMANCE-FIX
import { PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES } from '../src/constants';
import { generateSchemaGraph } from '../src/lib/seo-logic';

const BASE_URL = 'https://zenhogar.live';

// Leer el index.html generado por Vite para obtener los scripts y estilos reales
const distIndexHtml = fs.readFileSync(path.join(process.cwd(), 'dist/index.html'), 'utf-8');

// Extraer scripts y estilos (excluyendo scripts de tipo application/ld+json para evitar duplicidad)
const scriptTags = (distIndexHtml.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || [])
    .filter(tag => !tag.includes('application/ld+json'));
const linkTags = distIndexHtml.match(/<link\b[^>]*rel="stylesheet"[^>]*>/g) || [];
const headExtra = [...linkTags, ...scriptTags].join('\n    ');

const template = (title: string, description: string, canonical: string, content: string, image: string, graph: any) => {
    // Clasificar scripts - TODOS al final del body para no bloquear el renderizado
    // Eliminamos los scripts de analítica del molde estático porque App.tsx ya los carga de forma diferida (esto es clave para el 90+)
    const analyticsIds = ['fbevents.js', 'gtm', 'gtag'];
    const filteredScripts = scriptTags.filter(tag => !analyticsIds.some(id => tag.includes(id)));
    
    // Convertir links de CSS en no bloqueantes extremos
    const nonBlockingLinks = linkTags.map(tag => 
        tag.replace('rel="stylesheet"', 'rel="stylesheet" media="print" onload="this.media=\'all\'"')
    );

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <title>${title} | Zenhogar</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${BASE_URL}${canonical === '/' ? '/' : canonical.replace(/\/$/, '')}">
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/x-icon" href="/favicon.png" />
    <meta name="facebook-domain-verification" content="pnovfv1zfyvmgeao6dtp0spr655uvc" />

    <!-- Optimización de Carga Crítica -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="/assets/combos/combo-bienestar.webp" as="image" type="image/webp" fetchpriority="high">
    
    <!-- CSS Crítico de Alto Impacto (FCP < 1s) -->
    <style>
        :root { --font-sans: 'Inter', system-ui, -apple-system, sans-serif; --font-display: 'Outfit', sans-serif; }
        body { font-family: var(--font-sans); color: #1c1917; margin: 0; line-height: 1.5; background: #fff; -webkit-font-smoothing: antialiased; }
        .container { max-width: 1200px; margin: 0 auto; padding: 15px; }
        .navbar { height: 70px; border-bottom: 1px solid #e7e5e4; display: flex; align-items: center; padding: 0 15px; background: white; white-space: nowrap; overflow: hidden; position: sticky; top: 0; z-index: 50; }
        .logo { height: 40px; width: 40px; object-fit: contain; }
        .logo-container { display: flex; align-items: center; gap: 8px; }
        .logo-text { font-family: var(--font-display); font-weight: 900; font-size: 18px; text-transform: uppercase; color: #1c1917; line-height: 1; }
        .logo-sub { font-size: 8px; font-weight: bold; color: #059669; text-transform: uppercase; margin-top: -2px; }
        @media (min-width: 768px) {
            .navbar { height: 112px; }
            .logo { height: 80px; width: 80px; }
            .logo-text { font-size: 24px; }
            .logo-sub { font-size: 10px; }
            .container { padding: 20px; }
        }
        main { min-height: 80vh; opacity: 1 !important; }
        img { max-width: 100%; height: auto; font-style: italic; background: #f5f5f4; border: 0; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 
    </style>

    <!-- Recursos de Segundo Plano (CSS + Fuentes) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Outfit:wght@700;900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    ${nonBlockingLinks.join('\n    ')}
    
    <script type="application/ld+json" id="schema-main" data-static="true" data-rh="true">${JSON.stringify(graph)}</script>
</head>
<body>
    <div id="root">
        <nav class="navbar">
            <div class="logo-container">
                <img src="/assets/logo/logo-icon.webp" alt="zenhogar" class="logo" width="80" height="80" fetchpriority="high">
                <div style="display: flex; flex-direction: column;">
                    <span class="logo-text">Zen Hogar</span>
                    <span class="logo-sub">Salud Vital</span>
                </div>
            </div>
        </nav>
        <main class="container">
            ${content}
        </main>
        
        <section style="background: #f5f5f4; padding: 40px 20px; text-align: center;">
            <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 20px;">
                <div style="padding: 15px; background: white; border-radius: 16px;"><h3 style="font-size: 0.9rem; margin: 0;">🛡️ INVIMA</h3><p style="font-size: 11px; margin: 5px 0 0; color: #57534e;">Certificado Original</p></div>
                <div style="padding: 15px; background: white; border-radius: 16px;"><h3 style="font-size: 0.9rem; margin: 0;">🚚 Envío Gratis</h3><p style="font-size: 11px; margin: 5px 0 0; color: #57534e;">Toda Colombia</p></div>
                <div style="padding: 15px; background: white; border-radius: 16px;"><h3 style="font-size: 0.9rem; margin: 0;">🤝 Efectivo</h3><p style="font-size: 11px; margin: 5px 0 0; color: #57534e;">Contra Entrega</p></div>
            </div>
        </section>
    </div>

    <!-- CARGA DE SCRIPTS EXTREMADA (Al final del body para 90+ Score) -->
    ${filteredScripts.join('\n    ')}
</body>
</html>
`;
};

// Generador de HTML para Categorías
const generateCategoryHTML = (category: any) => {
    const categoryProducts = PRODUCTS.filter(p => p.category === category.id);
    const title = category.seoTitle || category.name;
    const description = category.seoDescription || category.description;
    const path = `/categoria/${category.id}`;
    
    // Esquema JSON-LD usando lógica centralizada
    const graph: any = generateSchemaGraph({
        type: "category",
        title,
        description,
        canonicalUrl: path,
        ogImage: '/assets/logo/logo-icon.webp',
        productData: { categoryProducts }
    });

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
        title,
        description,
        path,
        content,
        categoryProducts[0]?.image || '/assets/logo/logo-icon.webp',
        graph
    );
};

// Generador de HTML para Home
const generateHomeHTML = () => {
    const title = "Combos y Ofertas en Productos Naturales Originales";
    const description = "Aprovecha nuestras ofertas y combos exclusivos en productos naturales originales. Soluciones naturales para tu bienestar integral.";
    const path = "/";
    
    const graph = generateSchemaGraph({
        type: "website",
        title,
        description,
        canonicalUrl: path,
        ogImage: COMBO_OF_THE_MONTH.image
    });

    const content = `
        <div style="text-align: center; padding: 40px 0 60px;">
            <p style="text-transform: uppercase; letter-spacing: 0.2em; color: #059669; font-weight: 900; font-size: 12px; margin-bottom: 15px;">Tu Tienda de Productos Naturales en Colombia</p>
            <h1 style="font-size: 3rem; line-height: 1.1; margin-bottom: 20px;">Sana tu Cuerpo desde la Raíz y Recupera la <span style="color: #047857; font-style: italic;">Energía</span> que te Mereces</h1>
            <p class="description" style="font-size: 1.2rem; max-width: 800px; margin: 0 auto; color: #57534e;">Descubre el poder de lo orgánico para sanar desde el interior. Resultados reales con los productos naturales más vendidos de Colombia.</p>
        </div>
        <div style="margin-bottom: 60px;">
            <h2 style="text-align: center; margin-bottom: 40px;">Oferta Destacada</h2>
            <div style="background: #1c1917; color: white; padding: 40px; border-radius: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
                <img src="${COMBO_OF_THE_MONTH.image}" alt="${COMBO_OF_THE_MONTH.name}" width="600" height="600" loading="eager" fetchpriority="high" decoding="async" style="width: 100%; border-radius: 24px; background: white; padding: 20px; aspect-ratio: 1/1; object-fit: contain;">
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
            <div style="margin-bottom: 30px; padding: 20px; background: #fafaf9; border-radius: 24px; font-size: 0.8rem; color: #a8a29e;">
                <p style="font-weight: bold; color: #78716c; margin-bottom: 10px;">Envíos inmediatos y Pago Contra Entrega en Toda Colombia:</p>
                <p>Bogotá, Medellín, Cali, Barranquilla, Cartagena, Cúcuta, Bucaramanga, Pereira, Ibagué, Santa Marta, Valledupar, Villavicencio, Montería, Pasto, Neiva, Popayán y más.</p>
                <p style="margin-top: 10px;">Despachos desde Barranquilla con cobertura nacional.</p>
            </div>
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
        title,
        description,
        path,
        content,
        COMBO_OF_THE_MONTH.image,
        graph
    );
};

const generateProductHTML = (product: any) => {
    const title = product.seoTitle || product.name;
    const description = product.seoDescription || product.shortDescription;
    const path = `/producto/${product.id}`;

    const graph = generateSchemaGraph({
        type: "product",
        title,
        description,
        canonicalUrl: path,
        ogImage: product.image,
        productData: {
            ...product,
            lowPrice: product.basePrice,
            highPrice: Math.max(...(product.promos || []).map((p: any) => p.price), product.basePrice),
            faqs: product.seoFaqs,
            reviews: product.testimonials
        }
    });

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
            <div style="margin-bottom: 30px; padding: 20px; background: #fafaf9; border-radius: 24px; font-size: 0.8rem; color: #a8a29e;">
                <p style="font-weight: bold; color: #78716c; margin-bottom: 10px;">Envíos a Domicilio con Pago Contra Entrega:</p>
                <p>Bogotá, Medellín, Cali, Barranquilla, Cartagena, Cúcuta, Bucaramanga, Pereira, Ibagué, Santa Marta, Valledupar, Villavicencio, Montería, Pasto, Neiva, Popayán y ciudades intermedias.</p>
            </div>
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
        title,
        description,
        path,
        content,
        product.image,
        graph
    );
};

const generateComboHTML = (combo: any) => {
    const title = combo.seoTitle || combo.name;
    const description = combo.seoDescription || combo.description;
    const path = `/combo/${combo.id}`;

    const graph = generateSchemaGraph({
        type: "product",
        title,
        description,
        canonicalUrl: path,
        ogImage: combo.image,
        productData: {
            ...combo,
            lowPrice: combo.price,
            highPrice: combo.originalPrice || combo.price,
            faqs: combo.seoFaqs,
            reviews: combo.testimonials
        }
    });

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
        title,
        description,
        path,
        content,
        combo.image,
        graph
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
    const graph = generateSchemaGraph({
        type: "website",
        title,
        description,
        canonicalUrl: canonical,
        ogImage: '/assets/logo/logo-icon.webp'
    });
    return template(title, description, canonical, content, '/assets/logo/logo-icon.webp', graph);
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
const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
        return c;
    });
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url><loc>${BASE_URL}/</loc><priority>1.0</priority><changefreq>daily</changefreq></url>
    ${CATEGORIES.map(c => `<url><loc>${BASE_URL}/categoria/${c.id}</loc><priority>0.8</priority></url>`).join('\n    ')}
    ${PRODUCTS.map(p => `
    <url>
        <loc>${BASE_URL}/producto/${p.id}</loc>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${BASE_URL}${p.image}</image:loc>
            <image:title>${escapeXml(p.name)}</image:title>
        </image:image>
    </url>`).join('')}
    ${PROMOTIONS.map(c => `
    <url>
        <loc>${BASE_URL}/combo/${c.id}</loc>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${BASE_URL}${c.image}</image:loc>
            <image:title>${escapeXml(c.name)}</image:title>
        </image:image>
    </url>`).join('')}
    <url>
        <loc>${BASE_URL}/combo/${COMBO_OF_THE_MONTH.id}</loc>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${BASE_URL}${COMBO_OF_THE_MONTH.image}</image:loc>
            <image:title>${escapeXml(COMBO_OF_THE_MONTH.name)}</image:title>
        </image:image>
    </url>
    ${pages.map(p => `<url><loc>${BASE_URL}/${p.id}</loc><priority>0.5</priority></url>`).join('\n    ')}
</urlset>`;

fs.writeFileSync('dist/sitemap.xml', sitemap);
fs.writeFileSync('public/sitemap.xml', sitemap); // Sincronizar con public para el servidor de desarrollo
console.log('Generado: dist/sitemap.xml y public/sitemap.xml');

// 8. Generar Robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;

fs.writeFileSync('dist/robots.txt', robots);
console.log('Generado: dist/robots.txt');

