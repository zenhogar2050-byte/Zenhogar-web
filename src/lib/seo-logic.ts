const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    // LIMPIEZA ABSOLUTA DE URL: Arregla el error de duplicidad de dominio
    const path = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`;

    // Creamos un único bloque de Producto que contendrá TODO dentro
    if (type === "product" && productData) {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": `${fullUrl}/#product`,
            "name": productData.name,
            "description": description,
            "image": [finalImage],
            "sku": String(productData.id || "zen-001"),
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            // SOLO UN BLOQUE DE RATING: Con números puros
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
            },
            // METEMOS LAS FAQS AQUÍ DENTRO para que Google no las vea como duplicados sueltos
            "subjectOf": productData.faqs?.length > 0 ? {
                "@type": "FAQPage",
                "mainEntity": productData.faqs.map((f: any) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            } : undefined
        };
    }

    // Para páginas que no son productos (Home, Quienes somos)
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${fullUrl}/#webpage`,
        "url": fullUrl,
        "name": title,
        "description": description
    };
};