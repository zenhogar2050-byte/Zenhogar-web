import { Helmet } from 'react-helmet-async';
import { formatCurrency } from '../utils';
import { generateSchemaGraph } from '../lib/seo-logic';

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

    const schemaData = generateSchemaGraph({
        type,
        title,
        description,
        canonicalUrl,
        ogImage: finalImage,
        productData
    });

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
            
            <script type="application/ld+json" id="main-schema" data-rh="true">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEOManager;
