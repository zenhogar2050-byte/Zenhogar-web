const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string;
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage?: string;
    productData?: any;
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    // 1. LIMPIEZA RADICAL DE URL: 
    // Extraemos solo la ruta (path) sin importar si canonicalUrl ya trae el dominio o no.
    const pathOnly = canonicalUrl
        .replace("https://zenhogar.live", "")
        .replace("http://zenhogar.live", "")
        .replace(/\/$/, ""); // Quita barra final si existe
    
    const normalizedPath = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
    const fullUrl = `${BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
    
    const fullTitle = title.includes('Zenhogar') ? title : `${title} | Zenhogar`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${BASE_URL}/#organization`,
                "name": "Zenhogar",
                "url": BASE_URL,
                "logo": {
                    "@type": "ImageObject",
                    "@id": `${BASE_URL}/#logo`,
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
                }
            },
            {
                "@type": "WebSite",
                "@id": `${BASE_URL}/#website`,
                "url": BASE_URL,
                "name": "Zenhogar",
                "publisher": { "@id": `${BASE_URL}/#organization` }
            },
            {
                "@type": "WebPage",
                "@id": `${fullUrl}/#webpage`,
                "url": fullUrl,
                "name": fullTitle,
                "description": description,
                "isPartOf": { "@id": `${BASE_URL}/#website` },
                "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` },
                "mainEntity": type === "product" ? { "@id": `${fullUrl}/#product` } : undefined
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${fullUrl}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Inicio",
                        "item": BASE_URL
                    },
                    (type === "product" || type === "category") ? {
                        "@type": "ListItem",
                        "position": 2,
                        "name": productData?.name || title,
                        "item": fullUrl
                    } : null
                ].filter(Boolean)
            },
            // BLOQUE DE PRODUCTO: Asegura que AggregateRating use strings
            type === "product" && productData ? {
                "@type": "Product",
                "@id": `${fullUrl}/#product`,
                "name": productData.name,
                "description": description,
                "image": [finalImage],
                "sku": String(productData.id || productData.name.toLowerCase().replace(/\s+/g, '-')),
                "brand": { "@type": "Brand", "name": "Zenhogar" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": String(productData.ratingValue || "4.9"),
                    "bestRating": "5",
                    "worstRating": "1",
                    "reviewCount": String(productData.reviewCount || "520")
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": String(productData.lowPrice || productData.basePrice),
                    "highPrice": String(productData.highPrice || productData.basePrice),
                    "priceCurrency": "COP",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl,
                    "seller": { "@id": `${BASE_URL}/#organization` }
                }
            } : null,
            // BLOQUE FAQ: Con ID corregido basado en la normalización anterior
            type === "product" && productData?.faqs && productData.faqs.length > 0 ? {
                "@type": "FAQPage",
                "@id": `${fullUrl}/#faq`, 
                "mainEntity": productData.faqs.map((faq: any) => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            } : null
        ].filter(Boolean)
    };
};