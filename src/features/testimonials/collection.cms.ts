
import type { Collection, CollectionFile } from "@sveltia/cms";

const testimonialsPageConfig: CollectionFile = {
    name: "testimonialsPageConfig",
    label: "Testimonials Page Settings",
    file: "pages/testimonials.json",
    format: "json",
    fields: [
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
            name: "limit",
            label: "Display Limit",
            widget: "number",
            value_type: "int", // Restricts input to integers only
            min: 1,            // Enforces minimum value constraint
            required: false    
        }
    ]
};


export const testimonialsPageCollection: Collection = {
    name: "testimonialsPage",
    label: "Testimonials Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        testimonialsPageConfig
    ]
};
