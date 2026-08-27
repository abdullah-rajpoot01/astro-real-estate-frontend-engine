import type { CollectionFile } from "@sveltia/cms";

export const aboutCtaSectionConfig: CollectionFile = {
    name: "ctaSection",
    label: "CTA (Call to Action) Section",
    file: "src/content/about-page/cta.json",
    format: "json",
    fields: [
        { 
            name: "enabled", 
            label: "Enable Section", 
            widget: "boolean", 
            default: true, 
            required: true 
        },
        { 
            name: "title", 
            label: "Main Title", 
            widget: "string", 
            required: true 
        },
        { 
            name: "description", 
            label: "Description Text", 
            widget: "text", 
            required: true 
        },
        { 
            name: "buttonText", 
            label: "Button Display Label", 
            widget: "string", 
            required: true 
        },
        { 
            name: "buttonUrl", 
            label: "Button Redirect Destination", 
            widget: "string", 
            required: true 
        }
    ]
};
