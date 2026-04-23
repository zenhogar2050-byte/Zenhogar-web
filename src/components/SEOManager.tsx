import { Helmet } from 'react-helmet-async';
import { formatCurrency } from '../utils';
import { generateSchemaGraph } from '../lib/seo-logic';

const SEOManager = ({ 
    title, 
    description, 
    canonicalUrl, 
    ogImage = '', 
    type = "website", 
    productData = null 
}) => {
    const baseUrl = "https://zenhogar.live";
    
    // 1. Normalización de URL para evitar errores de redirección
    // Eliminamos barras finales y aseguramos el slash inicial
    const cleanPath = canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`;
    const normalizedPath = cleanPath.replace(/\/$/, '');
    const fullUrl = `${baseUrl}${normalizedPath}`;
    
    const fullTitle = title.includes('Zenhogar') ? title : `${title} | Zenhogar`;
    const defaultImage = `${baseUrl}/assets/logo/og-image.png`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage || ''}`;

    // 2. Generación del Grafo de Esquema Único
    const schemaData = generateSchemaGraph({
        type,
        title,
        description,
        canonicalUrl: fullUrl,
        ogImage: finalImage,
        productData
    });

    return (
        <Helmet>
            {/* Metadatos Básicos */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />
            <meta name="robots" content="index, follow, max-image-preview:large" />

            {/* Open Graph (Facebook / WhatsApp) */}
            <meta property="og:locale" content="es_CO" />
            <meta property="og:type" content={type === "product" ? "og:product" : "website"} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
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
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage || defaultImage} />
            
            {/* Datos de Producto para Twitter si aplican */}
            {productData && (
                <>
                    <meta name="twitter:label1" content="Precio" />
                    <meta name="twitter:data1" content={formatCurrency(productData.lowPrice)} />
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