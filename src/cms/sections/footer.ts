import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/components/icons/icons-map";

// Reusable fields schema helper for the toggleable footer sections
const footerSectionFields = [
    { name: "enabled", label: "Enable Section", widget: "boolean", default: true, required: true },
    { name: "title", label: "Custom Section Title (Optional)", widget: "string", required: false }
];

export const footerConfig: CollectionFile = {
    name: "footer",
    label: "Footer Layout",
    file: "src/content/sections/footer.json",
    format: "json",
    fields: [
        { name: "title", label: "Main Title", widget: "string", required: false },
        { name: "subtitle", label: "Subtitle", widget: "string", required: false },
        { name: "image", label: "Footer Logo/Image Asset", widget: "image", required: false },
        { name: "description", label: "Company Description Text", widget: "text", required: false },

        // --- Quick Links Setup (Array of Objects with Optional Icons) ---
        {
            name: "quickLinks",
            label: "Quick Footer Navigation Links",
            widget: "list",
            fields: [
                { name: "label", label: "Link Label", widget: "string", required: true },
                { name: "url", label: "Target URL Destination", widget: "string", required: true },
                {
                    name: "icon",
                    label: "Link Icon Symbol (Optional)",
                    widget: "select",
                    options: AvailableIcons,
                    required: false // Marked as optional to reflect your .optional() Zod validation
                }
            ]
        },

        // --- Nested Toggleable Sections Configuration Object ---
        {
            name: "sections",
            label: "Footer Content Block Toggles",
            widget: "object",
            fields: [
                {
                    name: "quickLinks",
                    label: "Quick Links Block Settings",
                    widget: "object",
                    fields: footerSectionFields
                },
                {
                    name: "contact",
                    label: "Contact Information Block Settings",
                    widget: "object",
                    fields: footerSectionFields
                },
                {
                    name: "businessHours",
                    label: "Business Hours Block Settings",
                    widget: "object",
                    fields: footerSectionFields
                },
                {
                    name: "social",
                    label: "Social Media Icons Block Settings",
                    widget: "object",
                    fields: footerSectionFields
                },
                {
                    name: "copyRight",
                    label: "Copyright Notice Bar Settings",
                    widget: "object",
                    fields: footerSectionFields
                },
                {
                    name: "siteMap",
                    label: "XML Sitemap Layout Settings",
                    widget: "object",
                    fields: footerSectionFields
                }
            ]
        }
    ]
};
