import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/features/icons/map.static";
import { buttonsOptions } from "@/features/reusable";

export const heroConfig: CollectionFile = {
    name: "hero",
    label: "Hero Section",
    file: "home-page/hero.json",
    format: "json",
    fields: [
        { name: "heading", label: "Main Heading", widget: "string", required: false },
        { name: "subHeading1", label: "Sub-Heading 1", widget: "string", required: true },
        { name: "subHeading2", label: "Sub-Heading 2", widget: "string", required: true },
        { name: "description", label: "Description Text", widget: "text", required: false },

        // --- Carousel Images Setup (Array of Objects, min 1, max 10) ---
        {
            name: "images",
            label: "Carousel Images Slideshow",
            widget: "list",
            summary: "{{fields.image}}",
            max: 10,
            min: 1,
            fields: [
                { name: "image", label: "Slide Image Asset", widget: "image", required: true },
                {
                    name: "link",
                    label: "Slide Redirect URL (Optional)",
                    widget: "string",
                    required: false // Optional field satisfies your Zod object union rules
                }
            ]
        },

        // --- Call-To-Action Buttons Setup ---
        {
            name: "buttons",
            label: "Action Buttons",
            widget: "list",
            required: false,
            max: 2,
            fields: [
                {
                    name: "type",
                    label: "Button Variant Type",
                    widget: "select",
                    options: buttonsOptions,
                    required: true
                },
                { name: "text", label: "Button Display Label", widget: "string", required: true },
                { name: "link", label: "Target Destination URL", widget: "string", required: true },
                {
                    name: "icon",
                    label: "Action Icon Symbol",
                    widget: "select",
                    options: AvailableIcons,
                    required: true
                }
            ]
        }
    ]
};
