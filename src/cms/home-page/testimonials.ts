import type { CollectionFile } from "@sveltia/cms";

export const testimonialsSectionConfig: CollectionFile = {
    name: "testimonialsSection",
    label: "Testimonials Section",
    file: "src/content/home-page/testimonials.json",
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
