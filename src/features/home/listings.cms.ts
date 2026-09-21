import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/features/icons/map.static";

export const homeListingsSectionConfig: CollectionFile = {
    name: "listingsSection",
    label: "Featured Listings Section",
    file: "home-page/listings.json",
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
            name: "buttonIcon",
            label: "Button Icon Symbol",
            widget: "select",
            options: AvailableIcons,
            required: true
        },
        {
            name: "maxItems",
            label: "Maximum Listings to Show (Optional)",
            widget: "number",
            value_type: "int", // Enforces integers only
            min: 1,            // Ensures at least 1 must be input if provided
            required: false    // Keeps the field fully optional
        }
    ]
};
