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
    const fullUrl = `${BASE_URL}${canonicalUrl}`;
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
                "@type": "LocalBusiness",
                "@id": `${BASE_URL}/#localbusiness`,
                "name": "Zenhogar",
                "image": `${BASE_URL}/assets/logo/logo.png`,
                "url": BASE_URL,
                "telephone": "+57-302-410-2568",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Barranquilla",
                    "addressLocality": "Barranquilla",
                    "addressRegion": "Atlántico",
                    "postalCode": "080001",
                    "addressCountry": "CO"
                }
            },
            {
                "@type": "WebSite",
                "@id": `${BASE_URL}/#website`,
                "url": BASE_URL,
                "name": "Zenhogar",
                "publisher": { "@id": `${BASE_URL}/#organization` },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${BASE_URL}/categoria/salud-bienestar?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": `${fullUrl}/#webpage`,
                "url": fullUrl,
                "name": fullTitle,
                "description": description,
                "isPartOf": { "@id": `${BASE_URL}/#website` },
                "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` },
                "mainEntity": type === "product" ? { "@id": `${fullUrl}/#product` } : 
                              (type === "category" ? { "@id": `${fullUrl}/#collection` } : 
                              (canonicalUrl === "/" ? { "@id": `${BASE_URL}/#localbusiness` } : undefined))
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
            type === "product" && productData ? {
                "@type": "Product",
                "@id": `${fullUrl}/#product`,
                "name": productData.name,
                "description": description,
                "image": [finalImage],
                "sku": String(productData.id || productData.name.toLowerCase().replace(/\s+/g, '-')),
                "mpn": String(productData.id || productData.name.toLowerCase().replace(/\s+/g, '-')),
                "brand": { "@type": "Brand", "name": "Zenhogar" },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "worstRating": "1",
                    "reviewCount": String(productData.reviewCount || "520")
                },
                "review": (productData.reviews || [
                    {
                        "author": "Cliente Verificado",
                        "rating": 5,
                        "text": "Excelente producto, 100% original y efectivo."
                    }
                ]).map((rev: any) => ({
                    "@type": "Review",
                    "author": { "@type": "Person", "name": String(rev.author || rev.name) },
                    "reviewRating": { 
                        "@type": "Rating", 
                        "ratingValue": String(rev.rating),
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "reviewBody": rev.text
                })),
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": productData.lowPrice || productData.basePrice,
                    "highPrice": productData.highPrice || productData.basePrice,
                    "priceCurrency": "COP",
                    "offerCount": String(productData.offerCount || 1),
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl,
                    "seller": { "@id": `${BASE_URL}/#organization` },
                    "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "COP" },
                        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "CO" }
                    }
                }
            } : null,
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
