const BASE_URL = "https://zenhogar.live";

export const generateSchemaGraph = (params: {
    type: string, 
    title: string, 
    description: string, 
    canonicalUrl: string, 
    ogImage?: string, 
    productData?: any,
    faqs?: { q: string, a: string }[]
}) => {
    const { type, title, description, canonicalUrl, ogImage, productData, faqs } = params;
    
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

    // 4. BreadcrumbList
    const breadcrumbs: any[] = [{ "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE_URL }];
    if (path !== "") {
        const segments = path.split('/').filter(Boolean);
        let cumulativePath = "";
        segments.forEach((segment, index) => {
            cumulativePath += `/${segment}`;
            let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            if (segment === "categoria") label = "Categorías";
            if (segment === "producto") label = "Productos";
            if (segment === "combo") label = "Ofertas";

            breadcrumbs.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": label,
                "item": `${BASE_URL}${cumulativePath}`
            });
        });
    }
    graph.push({
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
        "itemListElement": breadcrumbs
    });

    // 5. FAQ Schema (FAQPage)
    if (faqs && faqs.length > 0) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${fullUrl}#faq`,
            "mainEntity": faqs.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                }
            }))
        });
    }

    // 6. Entidad Producto (si aplica)
    if (type === "product" && productData) {
        const currentYear = new Date().getFullYear();
        const validUntilYear = currentYear > 2026 ? currentYear + 1 : 2026;
        const dynamicPriceValidUntil = `${validUntilYear}-12-31`;

        const cleanPrice = (val: any) => {
            if (!val) return 0;
            const strVal = String(val).replace(/\./g, "").replace(/,/g, "").replace(/\u00a0/g, "").replace(/[^\d]/g, "");
            return Math.round(Number(strVal) || 0);
        };

        const lowPriceClean = cleanPrice(productData.lowPrice || productData.basePrice);
        const getSchemaCondition = (cond?: string) => {
            if (cond?.toLowerCase() === 'new') return "https://schema.org/NewCondition";
            return "https://schema.org/NewCondition";
        };

        const productEntity: any = {
            "@type": "Product",
            "@id": `${fullUrl}#product`,
            "name": productData.name,
            "description": productData.description || description,
            "sku": String(productData.masterId || productData.id).toUpperCase(),
            "mpn": String(productData.masterId || productData.id).toUpperCase(),
            "category": productData.googleCategory || productData.category,
            "image": ogImage?.startsWith('http') ? ogImage : `${BASE_URL}${ogImage || ''}`,
            "brand": { "@id": `${BASE_URL}/#organization` },
            "offers": {
                "@type": "Offer",
                "priceCurrency": "COP",
                "itemCondition": getSchemaCondition(productData.condition),
                "availability": "https://schema.org/InStock",
                "priceValidUntil": dynamicPriceValidUntil,
                "url": fullUrl,
                "price": lowPriceClean,
                "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "CO",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays": "30",
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn",
                    "url": `${BASE_URL}/devoluciones-garantia`
                },
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "COP" },
                    "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "CO" },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
                        "transitTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" }
                    }
                }
            }
        };

        if (productData.reviews && productData.reviews.length > 0) {
            const totalRating = productData.reviews.reduce((acc: number, r: any) => acc + (r.rating || 5), 0);
            const avgRating = (totalRating / productData.reviews.length).toFixed(1);

            productEntity.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": avgRating,
                "reviewCount": productData.reviews.length,
                "bestRating": 5,
                "worstRating": 1
            };

            const currentDate = new Date();
            productEntity.review = productData.reviews.map((r: any, idx: number) => {
                const reviewDate = new Date(currentDate);
                reviewDate.setDate(reviewDate.getDate() - (idx * 3 + 2)); 
                return {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": r.name },
                    "datePublished": reviewDate.toISOString().split('T')[0],
                    "reviewBody": r.text,
                    "reviewRating": { "@type": "Rating", "bestRating": 5, "ratingValue": r.rating || 5, "worstRating": 1 }
                };
            });
        }
        graph.push(productEntity);
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    };
};
