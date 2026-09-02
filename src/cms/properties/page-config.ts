import type { CollectionFile } from "@sveltia/cms";

export const propertiesPageConfig: CollectionFile = {
    name: "propertiesPageConfig",
    label: "Properties Page Settings",
    file: "pages/properties.json",
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
            name: "listingPerPage",
            label: "Listings Per Page",
            widget: "number",
            value_type: "int", // Restricts input to integers only
            min: 1,            // Enforces minimum value constraint
            required: true    
        }
    ]
};
