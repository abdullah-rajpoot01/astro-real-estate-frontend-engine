import type { CollectionFile } from "@sveltia/cms";

export const listingsPageConfig: CollectionFile = {
    name: "listings-page-config",
    label: "Properties Page Settings",
    file: "pages/listings.json",
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
