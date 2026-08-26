import type { Collection } from "@sveltia/cms";
import { propertiesPageConfig } from "./page-config";


export const propertiesPageCollection: Collection = {
    name: "properties-page",
    label: "Properties Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        {
    name: "propertiesPageConfig",
    label: "Properties Page Settings",
    file: "src/content/sections/properties-page.json",
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
}
    ]
};