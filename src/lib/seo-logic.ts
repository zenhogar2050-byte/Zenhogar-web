const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    // Limpieza de URL para evitar el error de duplicidad de dominio
    const path = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`;

    if (type === "product" && productData) {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            // Usamos una URL limpia como ID único
            "@id": `${fullUrl}#product`,
            "name": productData.name,
            "description": description,
            "image": [finalImage],
            "sku": String(productData.id || "zen-001"),
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            // UN SOLO BLOQUE DE RATING: Valores numéricos estrictos
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.9,
                "reviewCount": 520,
                "bestRating": 5,
                "worstRating": 1
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "COP",
                "lowPrice": productData.lowPrice || productData.basePrice,
                "highPrice": productData.highPrice || productData.basePrice,
                "availability": "https://schema.org/InStock",
                "url": fullUrl
            }
        };
    }

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        "url": fullUrl,
        "name": title,
        "description": description
    };
};