import { Helmet } from 'react-helmet-async';
import { formatCurrency } from '../utils';

const SEOManager = ({ 
    title, 
    description, 
    canonicalUrl, 
    ogImage = '', 
    type = "website", 
    productData = null 
}) => {
    const baseUrl = "https://zenhogar.live";
    const fullUrl = `${baseUrl}${canonicalUrl}`;
    const fullTitle = title.includes('Zenhogar') ? title : `${title} | Zenhogar`;
    const defaultImage = `${baseUrl}/assets/logo/logo.png`;
    const finalImage = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage || ''}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${baseUrl}/#organization`,
                "name": "Zenhogar",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/assets/logo/logo.png`,
                    "width": "512",
                    "height": "512"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+57-302-410-2568",
                    "contactType": "customer service",
                    "areaServed": "CO",
                    "availableLanguage": "Spanish"
                },
                "sameAs": [
                    "https://instagram.com/zenhogar",
                    "https://www.facebook.com/HomeIdeas0812"
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${fullUrl}/#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Inicio",
                        "item": baseUrl
                    },
                    type === "product" ? {
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
                "sku": productData.id || productData.name.toLowerCase().replace(/\s+/g, '-'),
                "mpn": productData.id || productData.name.toLowerCase().replace(/\s+/g, '-'),
                "brand": {
                    "@type": "Brand",
                    "name": "Zenhogar"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "520"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": productData.lowPrice,
                    "highPrice": productData.highPrice,
                    "priceCurrency": "COP",
                    "offerCount": productData.offerCount,
                    "availability": "https://schema.org/InStock",
                    "url": fullUrl,
                    "priceValidUntil": "2027-12-31",
                    "itemCondition": "https://schema.org/NewCondition",
                    "shippingDetails": {
                        "@type": "OfferShippingDetails",
                        "shippingRate": {
                            "@type": "MonetaryAmount",
                            "value": "0",
                            "currency": "COP"
                        },
                        "shippingDestination": {
                            "@type": "DefinedRegion",
                            "addressCountry": "CO"
                        },
                        "deliveryTime": {
                            "@type": "ShippingDeliveryTime",
                            "handlingTime": {
                                "@type": "QuantitativeValue",
                                "minValue": "0",
                                "maxValue": "1",
                                "unitCode": "DAY"
                            },
                            "transitTime": {
                                "@type": "QuantitativeValue",
                                "minValue": "2",
                                "maxValue": "5",
                                "unitCode": "DAY"
                            }
                        }
                    },
                    "hasMerchantReturnPolicy": {
                        "@type": "MerchantReturnPolicy",
                        "applicableCountry": "CO",
                        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                        "merchantReturnDays": 2,
                        "returnMethod": "https://schema.org/ReturnByMail",
                        "returnFees": "https://schema.org/FreeReturn"
                    }
                },
                "additionalProperty": [
                    {
                        "@type": "PropertyValue",
                        "name": "Registro INVIMA",
                        "value": "Vigente y Verificado"
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "Modo de Uso",
                        "value": "Según indicación en etiqueta. Generalmente 10-20 gotas o 1 cucharada diaria."
                    }
                ],
                "review": [
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "Cliente Verificado" },
                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                        "reviewBody": "Excelente producto, 100% original y efectivo."
                    }
                ]
            } : {
                "@type": "WebPage",
                "@id": `${fullUrl}/#webpage`,
                "url": fullUrl,
                "name": fullTitle,
                "isPartOf": { "@id": `${baseUrl}/#organization` },
                "breadcrumb": { "@id": `${fullUrl}/#breadcrumb` }
            },
            type === "product" && productData?.faqs ? {
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

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />
            <meta name="robots" content="index, follow, max-image-preview:large" />

            <meta property="og:locale" content="es_CO" />
            <meta property="og:type" content={type === "product" ? "og:product" : "website"} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Zenhogar" />
            <meta property="og:image" content={finalImage || defaultImage} />
            <meta property="og:image:secure_url" content={finalImage || defaultImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={finalImage || defaultImage} />
            <meta name="twitter:label1" content="Precio" />
            <meta name="twitter:data1" content={productData ? formatCurrency(productData.lowPrice) : "Ofertas exclusivas"} />
        </Helmet>
    );
};

export default SEOManager;
