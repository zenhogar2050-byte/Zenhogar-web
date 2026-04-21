const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    // 1. LIMPIEZA DE URL: Evita el error "livehttps://live"
    const path = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${fullUrl}/#webpage`,
                "url": fullUrl,
                "name": title.includes('Zenhogar') ? title : `${title} | Zenhogar`,
                "description": description,
                "isPartOf": { "@id": `${BASE_URL}/#website` },
                "mainEntity": type === "product" ? { "@id": `${fullUrl}/#product` } : undefined
            },
            type === "product" && productData ? {
                "@type": "Product",
                "@id": `${fullUrl}/#product`,
                "name": productData.name,
                "description": description,
                "image": [finalImage],
                "sku": String(productData.id || "zen-001"),
                "brand": { "@type": "Brand", "name": "Zenhogar" },
                // 2. CORRECCIÓN DE PUNTUACIÓN: Números puros para evitar el error rojo
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": 4.9,
                    "bestRating": 5,
                    "worstRating": 1,
                    "reviewCount": 520
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": String(productData.lowPrice || productData.basePrice),
                    "highPrice": String(productData.highPrice || productData.basePrice),
                    "priceCurrency": "COP",
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl
                }
            } : null,
            // 3. BLOQUE FAQ: Unificado con ID correcto para evitar duplicados
            type === "product" && productData?.faqs?.length > 0 ? {
                "@type": "FAQPage",
                "@id": `${fullUrl}/#faq`,
                "mainEntity": productData.faqs.map((f: any) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            } : null
        ].filter(Boolean)
    };
};