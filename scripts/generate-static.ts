import fs from 'fs';
import path from 'path';
import { PRODUCTS, PROMOTIONS, CATEGORIES, COMBO_OF_THE_MONTH } from '../src/constants';

async function generate() {
    const serverDir = path.resolve(process.cwd(), 'dist/server');
    
    if (!fs.existsSync(serverDir)) {
        console.error('ERROR: No se encontró el directorio dist/server.');
        process.exit(1);
    }
    
    // Buscamos primero el archivo esperado directamente, si no, buscamos recursivamente
    let serverModulePath = path.resolve(serverDir, 'main-server.js');
    
    if (!fs.existsSync(serverModulePath)) {
        let bundlePath = '';
        let maxFileSize = 0;

        function searchBundle(dir: string) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    searchBundle(fullPath);
                } else if (file.endsWith('.js')) {
                    const size = fs.statSync(fullPath).size;
                    if (size > maxFileSize) {
                        maxFileSize = size;
                        bundlePath = fullPath;
                    }
                }
            }
        }
        
        searchBundle(serverDir);
        serverModulePath = bundlePath;
    }
    
    if (!serverModulePath || !fs.existsSync(serverModulePath)) {
        console.error('ERROR: No se encontró el bundle de servidor (.js) en dist/server/.');
        process.exit(1);
    }
    
    console.log('Bundle de servidor encontrado en:', serverModulePath);

    const module = await import(serverModulePath as any);
    console.log('Module exports:', Object.keys(module));
    
    const render = module.render || module.default?.render || module.default;
    
    if (typeof render !== 'function') {
        console.error('ERROR: render no es una función.');
        process.exit(1);
    }
    const BASE_URL = 'https://zenhogar.live';
    const distIndexHtml = fs.readFileSync(path.join(process.cwd(), 'dist/index.html'), 'utf-8');

    const ensureDir = (dir: string) => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    };

    const routes = [
        { path: '/', id: 'index' },
        { path: '/404', id: '404' },
        ...PRODUCTS.map(p => ({ path: `/producto/${p.id}`, id: `producto-${p.id}` })),
        ...PROMOTIONS.map(c => ({ path: `/combo/${c.id}`, id: `combo-${c.id}` })),
        ...CATEGORIES.map(cat => ({ path: `/categoria/${cat.id}`, id: `categoria-${cat.id}` })),
        { path: `/combo/${COMBO_OF_THE_MONTH.id}`, id: `combo-${COMBO_OF_THE_MONTH.id}` },
        { path: '/quienes-somos', id: 'quienes-somos' },
        { path: '/politica-privacidad', id: 'politica-privacidad' },
        { path: '/politica-reembolso', id: 'politica-reembolso' },
        { path: '/terminos-servicio', id: 'terminos-servicio' },
        { path: '/condiciones-entrega', id: 'condiciones-entrega' },
        { path: '/devoluciones-garantia', id: 'devoluciones-garantia' }
    ];

    console.log(`--- Iniciando Generación de Sitio Estático (Manual SSR) ---`);
    console.log(`- index.html length: ${distIndexHtml.length}`);
    const rootSearch = distIndexHtml.includes('<div id="root"></div>') ? 'ID-ROOT-FOUND' : 'ID-ROOT-NOT-FOUND';
    console.log(`- root check: ${rootSearch}`);

    for (const route of routes) {
        const helmetContext: any = {};
        let appHtml = '';
        try {
            appHtml = render(route.path, helmetContext);
            console.log(`  - Renderizado OK (${appHtml.length} bytes)`);
        } catch (e) {
            console.error(`  - ERROR renderizando ${route.path}:`, e);
        }
        
        const { helmet } = helmetContext;

        let html = distIndexHtml;
        
        const rootRegex = /<div[^>]*id=["']?root["']?[^>]*>[\s\S]*?<\/div>/;
        const titleRegex = /<title>[\s\S]*?<\/title>/;
        const headRegex = /<\/head>/;

        if (rootRegex.test(html)) {
            html = html.replace(rootRegex, `<div id="root">${appHtml}</div>`);
            console.log(`  - Root div inyectado OK (${appHtml.length} bytes)`);
        } else {
            console.warn(`  - ADVERTENCIA: No se encontró el div root en index.html`);
        }

        // Limpieza de meta tags estáticos base de index.html para evitar duplicaciones en SSG
        html = html.replace(/<meta\s+[^>]*name=["']description["'][^>]*>/gi, '');
        html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, '');
        html = html.replace(/<meta\s+[^>]*property=["']og:[^"']+["'][^>]*>/gi, '');

        if (titleRegex.test(html)) {
            html = html.replace(titleRegex, helmet?.title?.toString() || '<title>Zenhogar</title>');
        }
        
        html = html.replace(headRegex, `
                ${helmet?.meta?.toString() || ''}
                ${helmet?.link?.toString() || ''}
                ${helmet?.script?.toString() || ''}
                <style id="ssg-styles">.lazy-load-placeholder { min-height: 100px; }</style>
                </head>
            `);

        const filePath = route.path === '/' ? 'dist/index.html' : `dist${route.path}.html`;
        ensureDir(path.dirname(filePath));
        fs.writeFileSync(filePath, html);
        console.log(`✓ Generado: ${filePath}`);
    }

    // Sitemap
    const today = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>${routes.filter(r => r.path !== '/' && r.path !== '/404').map(r => {
        const isProductOrCombo = r.path.startsWith('/producto/') || r.path.startsWith('/combo/');
        const isCategory = r.path.startsWith('/categoria/');
        const freq = isProductOrCombo ? 'weekly' : (isCategory ? 'weekly' : 'monthly');
        const prio = isProductOrCombo ? '0.9' : (isCategory ? '0.8' : '0.5');
        return `
    <url>
        <loc>${BASE_URL}${r.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${prio}</priority>
    </url>`;
    }).join('')}
</urlset>`.trim();

    fs.writeFileSync('dist/sitemap.xml', sitemap);
    
    // Robots
    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync('dist/robots.txt', robots);

    // Google Merchant Feed XML
    const ALL_PROMOTIONS = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
    const googleFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title><![CDATA[Zenhogar - Salud y Bienestar]]></title>
  <link>${BASE_URL}</link>
  <description><![CDATA[Tu aliado en salud natural, suplementos y bienestar integral en Colombia.]]></description>
  ${PRODUCTS.map(p => `
  <item>
    <g:id><![CDATA[${p.masterId}]]></g:id>
    <g:title><![CDATA[${p.name}]]></g:title>
    <g:description><![CDATA[${(p.description || p.shortDescription).replace(/<[^>]*>?/gm, '').trim().substring(0, 1000)}]]></g:description>
    <g:link>${encodeURI(`${BASE_URL}/producto/${p.id}`)}</g:link>
    <g:image_link>${encodeURI(`${BASE_URL}${p.image}`)}</g:image_link>
    <g:condition><![CDATA[${p.condition || 'new'}]]></g:condition>
    <g:availability><![CDATA[in stock]]></g:availability>
    <g:price><![CDATA[${p.basePrice} COP]]></g:price>
    <g:google_product_category><![CDATA[${p.googleCategory || 'Health & Beauty > Health Care > Fitness & Nutrition'}]]></g:google_product_category>
    <g:brand><![CDATA[Zenhogar]]></g:brand>
    <g:mpn><![CDATA[${p.masterId}]]></g:mpn>
    <g:identifier_exists><![CDATA[no]]></g:identifier_exists>
    <g:shipping>
      <g:country><![CDATA[CO]]></g:country>
      <g:service><![CDATA[Envío Gratis]]></g:service>
      <g:price><![CDATA[0 COP]]></g:price>
    </g:shipping>
  </item>`).join('')}
  ${ALL_PROMOTIONS.map(p => `
  <item>
    <g:id><![CDATA[${p.id}]]></g:id>
    <g:title><![CDATA[${p.name}]]></g:title>
    <g:description><![CDATA[${p.description.replace(/<[^>]*>?/gm, '').trim().substring(0, 1000)}]]></g:description>
    <g:link>${encodeURI(`${BASE_URL}/combo/${p.id}`)}</g:link>
    <g:image_link>${encodeURI(`${BASE_URL}${p.image}`)}</g:image_link>
    <g:condition><![CDATA[${p.condition || 'new'}]]></g:condition>
    <g:availability><![CDATA[in stock]]></g:availability>
    <g:price><![CDATA[${p.price} COP]]></g:price>
    <g:google_product_category><![CDATA[${p.googleCategory || 'Health & Beauty > Health Care > Fitness & Nutrition'}]]></g:google_product_category>
    <g:brand><![CDATA[Zenhogar]]></g:brand>
    <g:identifier_exists><![CDATA[no]]></g:identifier_exists>
    <g:shipping>
      <g:country><![CDATA[CO]]></g:country>
      <g:service><![CDATA[Envío Gratis]]></g:service>
      <g:price><![CDATA[0 COP]]></g:price>
    </g:shipping>
  </item>`).join('')}
</channel>
</rss>`.trim();

    fs.writeFileSync('dist/google-feed.xml', googleFeedXml);
    if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
    fs.writeFileSync('public/google-feed.xml', googleFeedXml);

    console.log('--- SSG y Google Merchant Feed Completado ---');
}

generate().catch(err => {
    console.error('Error crítico:', err);
    process.exit(1);
});
