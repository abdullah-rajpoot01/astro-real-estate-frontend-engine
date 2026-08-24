import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/components/icons/icons-map";

export const aboutHeroConfig: CollectionFile = {
    name: "aboutHeroSection",
    label: "About / Intro Hero Section",
    file: "src/content/about/about-hero.json",
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
            name: "image", 
            label: "Section Image Asset", 
            widget: "image", 
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
            name: "buttonUrl", 
            label: "Button Redirect Destination", 
            widget: "string", 
            required: true 
        }
    ]
};
