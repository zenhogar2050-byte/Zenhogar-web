import { Helmet } from 'react-helmet-async';
import { formatCurrency } from '../utils';
import { generateSchemaGraph } from '../lib/seo-logic';

const SEOManager = ({ 
    title, 
    description, 
    canonicalUrl, 
    ogImage = '', 
    type = "website", 
    productData = null,
    faqs = [],
    keywords = []
}) => {
    const baseUrl = "https://zenhogar.live";
    
    // 1. Normalización de URL para evitar errores de redirección
    // Mantenemos consistencia con el servidor (sin slash final excepto en Home)
    const cleanPath = canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`;
    let normalizedPath = cleanPath.replace(/\/+$/, '');
    
    // Si la ruta es vacía tras quitar slashes, es la Home. Google prefiere la versión con slash final para el dominio base.
    const fullUrl = normalizedPath === "" ? `${baseUrl}/` : `${baseUrl}${normalizedPath}`;
    
    // Para productos, usamos el título tal cual (como está en el feed) para evitar discrepancias
    const fullTitle = type === "product" ? title : (title.includes('Zenhogar') ? title : `${title} | Zenhogar`);
    const defaultImage = `${baseUrl}/assets/logo/og-image.png`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage || ''}`;

    const isPending = !productData?.invima || productData.invima.toLowerCase().includes('trámite');
    const invimaDisplay = isPending ? 'Verificación INVIMA' : productData.invima;
    
    const rawDescription = productData && productData.invima
        ? `${description} INVIMA: ${invimaDisplay}.` 
        : description;

    // Asegurar que la meta descripción se mantenga en el rango óptimo (<155 caracteres / ~950px)
    const finalDescription = rawDescription.length > 155 
        ? rawDescription.slice(0, 152).trim() + '...' 
        : rawDescription;
        
    // Consolidación de keywords
    const metaKeywords = [
        ...(keywords || []),
        ...(productData?.keywords || []),
        ...(productData?.longTailKeywords || [])
    ].filter(Boolean).join(', ');
 
    // 2. Generación del Grafo de Esquema Único
    const schemaData = generateSchemaGraph({
        type,
        title,
        description: finalDescription,
        canonicalUrl: fullUrl,
        ogImage: finalImage,
        productData,
        faqs
    });

    return (
        <Helmet>
            {/* Metadatos Básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            {metaKeywords && <meta name="keywords" content={metaKeywords} />}
            <link rel="canonical" href={fullUrl} />
            <meta name="robots" content="index, follow, max-image-preview:large" />

            {/* Open Graph (Facebook / WhatsApp) */}
            <meta property="og:locale" content="es_CO" />
            <meta property="og:type" content={type === "product" ? "og:product" : "website"} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Zenhogar" />
            <meta property="og:image" content={finalImage || defaultImage} />
            <meta property="og:image:secure_url" content={finalImage || defaultImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage || defaultImage} />
            
            {/* LCP Image Preload */}
            {finalImage && <link rel="preload" as="image" href={finalImage} fetchPriority="high" />}

            {/* Datos de Producto para Redes Sociales y Motores (Merchant Center, FB) */}
            {productData && (
                <>
                    <meta name="twitter:label1" content="Precio" />
                    <meta name="twitter:data1" content={formatCurrency(productData.lowPrice || productData.basePrice)} />
                    
                    <meta property="product:price:amount" content={String(Number(productData.lowPrice || productData.basePrice))} />
                    <meta property="product:price:currency" content="COP" />
                    <meta property="og:price:amount" content={String(Number(productData.lowPrice || productData.basePrice))} />
                    <meta property="og:price:currency" content="COP" />
                </>
            )}

            {/* CAMBIO CRÍTICO PARA GOOGLE SEARCH CONSOLE:
               Usamos un ID único y el atributo data-rh="true". 
               Esto le dice a react-helmet-async que REEMPLACE cualquier script previo
               en lugar de añadir uno nuevo, eliminando los "6 elementos no válidos".
            */}
            <script type="application/ld+json" data-rh="true" id="schema-main">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEOManager;