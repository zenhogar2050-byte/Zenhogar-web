import fs from 'fs';
import path from 'path';
import { PRODUCTS, PROMOTIONS, CATEGORIES, COMBO_OF_THE_MONTH } from '../src/constants';

async function generate() {
    const serverModulePath = path.resolve(process.cwd(), 'dist/server/main-server.js');
    
    if (!fs.existsSync(serverModulePath)) {
        console.error('ERROR: No se encontró el bundle de servidor en dist/server/main-server.js.');
        process.exit(1);
    }

    const { render } = await import(serverModulePath as any);

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
        <priority>1.0</priority>
    </url>${routes.filter(r => r.path !== '/').map(r => `
    <url>
        <loc>${BASE_URL}${r.path}</loc>
        <lastmod>${today}</lastmod>
        <priority>0.8</priority>
    </url>`).join('')}
</urlset>`.trim();

    fs.writeFileSync('dist/sitemap.xml', sitemap);
    
    // Robots
    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync('dist/robots.txt', robots);

    console.log('--- SSG Completado ---');
}

generate().catch(err => {
    console.error('Error crítico:', err);
    process.exit(1);
});
