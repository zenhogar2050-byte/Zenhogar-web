const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    const normalizedPath = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const finalPath = normalizedPath === "" ? "/" : normalizedPath;
    const fullUrl = `${BASE_URL}${finalPath.startsWith('/') ? finalPath : `/${finalPath}`}`;

    const graph: any[] = [];

    // 1. Entidad WebSite (Global)
    graph.push({
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "Zenhogar",
        "publisher": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": "es-CO"
    });

    // 2. Entidad Organization (Global)
    graph.push({
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        "name": "Zenhogar",
        "url": BASE_URL,
        "logo": {
            "@type": "ImageObject",
            "inLanguage": "es-CO",
            "@id": `${BASE_URL}/#logo`,
            "url": `${BASE_URL}/assets/logo/logo-icon.webp`,
            "contentUrl": `${BASE_URL}/assets/logo/logo-icon.webp`,
            "width": 512,
            "height": 512,
            "caption": "Zenhogar"
        },
        "image": { "@id": `${BASE_URL}/#logo` }
    });

    // 3. Entidad WebPage (Específica de la URL)
    const webPage: any = {
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        "url": fullUrl,
        "name": title,
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "description": description,
        "inLanguage": "es-CO",
        "potentialAction": [{
            "@type": "ReadAction",
            "target": [fullUrl]
        }]
    };

    if (ogImage) {
        webPage.primaryImageOfPage = { "@id": `${fullUrl}#primaryimage` };
        graph.push({
            "@type": "ImageObject",
            "@id": `${fullUrl}#primaryimage`,
            "inLanguage": "es-CO",
            "url": ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
            "contentUrl": ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
        });
    }
    graph.push(webPage);

    // 4. Entidad Específica (Product, FAQPage, etc)
    if (type === "product" && productData) {
        const productEntity: any = {
            "@type": "Product",
            "@id": `${fullUrl}#product`,
            "mainEntityOfPage": { "@id": `${fullUrl}#webpage` },
            "name": productData.name,
            "description": description,
            "sku": String(productData.id || "zen-001"),
            "image": ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`,
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            "aggregateRating": {
                "@type": "AggregateRating",
                "@id": `${fullUrl}#rating`,
                "ratingValue": 4.9,
                "reviewCount": productData.reviews?.length > 0 ? productData.reviews.length : 520,
                "bestRating": 5,
                "worstRating": 1
            },
            "offers": {
                "@type": "AggregateOffer",
                "@id": `${fullUrl}#offer`,
                "priceCurrency": "COP",
                "lowPrice": productData.lowPrice || productData.basePrice,
                "highPrice": productData.highPrice || productData.basePrice,
                "offerCount": productData.offerCount || "1",
                "availability": "https://schema.org/InStock",
                "url": fullUrl
            }
        };

        if (productData.reviews?.length > 0) {
            productEntity.review = productData.reviews.map((r: any, idx: number) => ({
                "@type": "Review",
                "@id": `${fullUrl}#review-${idx}`,
                "author": { "@type": "Person", "name": r.name },
                "datePublished": "2024-01-01",
                "reviewBody": r.text,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": r.rating || 5,
                    "bestRating": 5,
                    "worstRating": 1
                }
            }));
        }

        if (productData.faqs?.length > 0) {
            productEntity.subjectOf = { "@id": `${fullUrl}#faq` };
        }

        graph.push(productEntity);

        // FAQs separadas pero vinculadas al producto vía @id o mainEntity
        if (productData.faqs?.length > 0) {
            graph.push({
                "@type": "FAQPage",
                "@id": `${fullUrl}#faq`,
                "mainEntity": productData.faqs.map((f: any) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            });
        }
    }

    // 5. Entidad Colección (Categoría)
    if (type === "category" && productData?.categoryProducts) {
        graph.push({
            "@type": "CollectionPage",
            "@id": `${fullUrl}#collection`,
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": productData.categoryProducts.map((p: any, index: number) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `${BASE_URL}/producto/${p.id}`,
                    "name": p.name,
                    "image": `${BASE_URL}${p.image}`
                }))
            }
        });
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    };
};