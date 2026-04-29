const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, title: string, description: string, canonicalUrl: string, ogImage?: string, productData?: any 
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData } = params;
    
    const path = canonicalUrl.replace(BASE_URL, "").replace(/\/$/, "");
    const fullUrl = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

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
        // Establecer priceValidUntil dinámicamente al 31 de diciembre del año actual o futuro (ej. 2026)
        const currentYear = new Date().getFullYear();
        const validUntilYear = currentYear > 2026 ? currentYear + 1 : 2026;
        const dynamicPriceValidUntil = `${validUntilYear}-12-31`;

        // Limpiar valores de precios para asegurar que siempre sean números sanos (sin decimales para COP)
        const lowPriceClean = Math.round(Number(productData.lowPrice || productData.basePrice || 0));
        const highPriceClean = Math.round(Number(productData.highPrice || productData.basePrice || 0));
        const offerCountNum = Number(productData.offerCount || 1);

        const offers = offerCountNum > 1 ? {
            "@type": "AggregateOffer",
            "@id": `${fullUrl}#offer`,
            "priceCurrency": "COP",
            "lowPrice": lowPriceClean,
            "highPrice": highPriceClean,
            "offerCount": offerCountNum,
            "availability": "https://schema.org/InStock",
            "priceValidUntil": dynamicPriceValidUntil,
            "url": fullUrl
        } : {
            "@type": "Offer",
            "@id": `${fullUrl}#offer`,
            "priceCurrency": "COP",
            "price": lowPriceClean,
            "availability": "https://schema.org/InStock",
            "priceValidUntil": dynamicPriceValidUntil,
            "url": fullUrl
        };

        const productEntity: any = {
            "@type": "Product",
            "@id": `${fullUrl}#product`,
            "mainEntityOfPage": { "@id": `${fullUrl}#webpage` },
            "name": productData.name,
            "description": description,
            "sku": String(productData.id || "zen-001"),
            "image": ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`,
            "brand": { "@type": "Brand", "name": "Zenhogar" },
            "offers": offers
        };

        if (productData.reviews && productData.reviews.length > 0) {
            // Calcular el rating real basado en los datos
            const totalRating = productData.reviews.reduce((acc: number, r: any) => acc + (r.rating || 5), 0);
            const avgRating = (totalRating / productData.reviews.length).toFixed(1);

            productEntity.aggregateRating = {
                "@type": "AggregateRating",
                "@id": `${fullUrl}#rating`,
                "ratingValue": avgRating,
                "reviewCount": productData.reviews.length,
                "bestRating": 5,
                "worstRating": 1
            };

            const currentDate = new Date();
            productEntity.review = productData.reviews.map((r: any, idx: number) => {
                // Generar una fecha dinámica pasada para las reseñas basada en el índice
                const reviewDate = new Date(currentDate);
                reviewDate.setDate(reviewDate.getDate() - (idx * 3 + 2)); 

                return {
                    "@type": "Review",
                    "@id": `${fullUrl}#review-${idx}`,
                    "author": { "@type": "Person", "name": r.name },
                    "datePublished": r.date || reviewDate.toISOString().split('T')[0],
                    "reviewBody": r.text,
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": r.rating || 5,
                        "bestRating": 5,
                        "worstRating": 1
                    }
                };
            });
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