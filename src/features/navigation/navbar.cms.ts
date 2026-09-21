import { AvailableIcons } from "@/features/icons/map.static";
import type { CollectionFile } from '@sveltia/cms'
import { buttonsOptions } from "@/features/reusable/static";

export const navigationBarConfig: CollectionFile = {
    name: "navbar",
    label: "Navigation Bar ",
    file: "sections/navbar.json",
    // Enforce JSON parsing rules matching your z.object schema layout
    format: "json",
    fields: [
        { name: "title", label: "Title", widget: "string", required: false },
        { name: "subtitle", label: "Subtitle", widget: "string", required: false },
        { name: "image", label: "Header Image Asset", widget: "image", required: false },

        // --- Quick Links Setup (Array of Objects) ---
        {
            name: "quickLinks",
            label: "Quick Navigation Links",
            widget: "list",
            fields: [
                { name: "label", label: "Link Label", widget: "string", required: true },
                { name: "url", label: "Target URL Destination", widget: "string", required: true },
                {
                    name: "icon",
                    label: "Navigation Icon Symbol",
                    widget: "select",
                    options: AvailableIcons,
                    required: true
                }
            ]
        },

        // --- Call-To-Action Buttons Setup (Array of Objects with Enums) ---
        {
            name: "buttons",
            label: "Action Buttons",
            widget: "list",
            required: false,
            fields: [
                {
                    name: "type",
                    label: "Button Variant Type",
                    widget: "select",
                    // Strict mirror of your z.enum validation rules
                    options: buttonsOptions,
                    required: true
                },
                { name: "text", label: "Button Display Label", widget: "string", required: true },
                { name: "link", label: "Target Destination URL", widget: "string", required: true },
                {
                    name: "icon",
                    label: "Leading Icon Symbol (Optional)",
                    widget: "select",
                    options: AvailableIcons,
                    required: false // Marked as optional to reflect your .optional() Zod validation
                }
            ]
        }
    ]
}
