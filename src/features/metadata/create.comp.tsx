import React from 'react';

interface SEOProps {
    title: string;
    description: string;
    image: string;
    siteName: string; // Always provided
    url?: string;
}

export const SEOMETADATAComp: React.FC<SEOProps> = ({
    title,
    description,
    image,
    siteName,
    url,
}) => {
    // 1. Helper function to replace the {{name}} template with the siteName
    const parseTemplate = (text: string, replacement: string): string => {
        if (!text) return "";
        return text.replace(/\{\{\s*name\s*\}\}/g, replacement);
    };


    // 3. Resolve final values using provided props or defaults, then parse templates
    const finalTitle = parseTemplate(title, siteName);

    const finalDescription = parseTemplate(description, siteName)

    const finalImage = image ;

    return (
        <>
            {/* Standard HTML Tags */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />

            {/* Open Graph / Facebook Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />
            {url && <meta property="og:url" content={url} />}

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />
        </>
    );
};
