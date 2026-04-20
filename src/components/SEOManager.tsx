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
    const defaultImage = `${baseUrl}/assets/logo/og-image.png`;
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
                "description": "Tienda líder en productos naturales originales y suplementos con registro INVIMA en Colombia.",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+57-302-410-2568",
                    "contactType": "customer service",
                    "areaServed": "CO",
                    "availableLanguage": "Spanish"
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Barranquilla",
                    "addressRegion": "Atlántico",
                    "addressCountry": "CO"
                },
                "sameAs": [
                    "https://instagram.com/zenhogar2050",
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
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                "url": baseUrl,
                "name": "Zenhogar",
                "publisher": { "@id": `${baseUrl}/#organization` },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/categoria/salud-bienestar?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            type === "product" && productData ? {
                "@type": "Product",
                "@id": `${fullUrl}/#product`,
                "name": productData.name,
                "description": description,
                "image": [finalImage],
                "sku": productData.id || productData.name.toLowerCase().replace(/\s+/g, '-'),
                "mpn": productData.id || productData.name.toLowerCase().replace(/\s+/g, '-'),
                "category": productData.category || "Salud y Bienestar",
                "brand": {
                    "@type": "Brand",
                    "name": "Zenhogar"
                },
                "manufacturer": {
                    "@type": "Organization",
                    "name": "Fabricante Certificado con Registro INVIMA"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": productData.reviewCount || "520",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": productData.lowPrice,
                    "highPrice": productData.highPrice,
                    "priceCurrency": "COP",
                    "offerCount": productData.offerCount || 3,
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
                        "name": "Origen",
                        "value": "Colombia"
                    }
                ],
                "review": (productData.reviews || [
                    {
                        "author": "Cliente Verificado",
                        "rating": 5,
                        "text": "Excelente producto, 100% original y efectivo."
                    }
                ]).map((rev: any) => ({
                    "@type": "Review",
                    "author": { "@type": "Person", "name": rev.author || rev.name },
                    "reviewRating": { "@type": "Rating", "ratingValue": rev.rating.toString() },
                    "reviewBody": rev.text
                }))
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
            
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEOManager;
