import type { CollectionFile } from "@sveltia/cms";

export const featuresSectionConfig: CollectionFile = {
    name: "featuresSection",
    label: "Features Section (Why Work With Us)",
    file: "src/content/home/features-section.json",
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
        }
    ]
};
