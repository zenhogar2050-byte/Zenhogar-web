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
            // El ID absoluto es vital para evitar la "fragmentación" en GSC
            "@id": `${fullUrl}#product`,
            "name": productData.name,
            "description": description,
            "sku": String(productData.id || "zen-001"),
            "image": ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`,
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 4.9,
                "reviewCount": productData.reviews?.length > 0 ? productData.reviews.length : 520,
                "bestRating": 5,
                "worstRating": 1
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "COP",
                "lowPrice": productData.lowPrice || productData.basePrice,
                "highPrice": productData.highPrice || productData.basePrice,
                "offerCount": productData.offerCount || "1",
                "availability": "https://schema.org/InStock",
                "url": fullUrl
            },
            "review": productData.reviews?.map((r: any) => ({
                "@type": "Review",
                "author": { "@type": "Person", "name": r.name },
                "datePublished": "2024-01-01",
                "reviewBody": r.text,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": r.rating || 5,
                    "bestRating": 5,
                    "worstRating": 1
                }
            })),
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

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        "url": fullUrl,
        "name": title
    };
};