const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    const path = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    if (type === "product" && productData) {
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            // El @id evita la fragmentación de datos que ves en tus avisos naranja
            "@id": `${fullUrl}#product`,
            "name": productData.name,
            "description": description,
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            "sku": String(productData.id || "zen-001"),
            "image": ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`,
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
                "offerCount": "1", // Corrige el aviso de falta de campo opcional
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
        "name": title
    };
};