import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/components/icons/icons-map";

export const categoriesSectionConfig: CollectionFile = {
    name: "categories-section",
    label: "Categories Section",
    file: "src/content/home/categories-section.json",
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
            label: "Maximum Items to Show (Optional)",
            widget: "number",
            value_type: "int", // Restricts input to integers only
            min: 1,            // Enforces minimum value constraint
            required: false    // Makes the field entirely optional
        }
    ]
};
