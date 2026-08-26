import type { CollectionFile } from "@sveltia/cms";

export const siteDetailConfig: CollectionFile = {
    name: "store_details",
    label: "Site & Store Details",
    file: "src/content/sections/store-details.json",
    format: "json",
    fields: [
        // --- Direct Root Level Fields ---
        { name: "title", label: "Store Title", widget: "string", required: true },
        { name: "subtitle", label: "Store Subtitle", widget: "string", required: true },
        { name: "tagline", label: "Store Tagline", widget: "string", required: true },
        { name: "description", label: "Store Description", widget: "text", required: true },
        
        // Maps to your z.url() rule by providing asset path options or raw inputs
        { name: "logo", label: "Logo URL / Image Asset", widget: "image", required: true },

        // --- Nested Currency Settings Object ---
        {
            name: "currency",
            label: "Currency Configurations",
            widget: "object",
            fields: [
                { name: "code", label: "Currency Code (e.g., USD, PKR)", widget: "string", required: true },
                { name: "symbol", label: "Currency Symbol (e.g., $, ₨)", widget: "string", required: true },
                {
                    name: "position",
                    label: "Symbol Display Position",
                    widget: "select",
                    // Enforces your z.enum(["before", "after"]) array restrictions inside the UI dropdown
                    options: [
                        { label: "Before Price", value: "before" },
                        { label: "After Price", value: "after" }
                    ],
                    default: "before",
                    required: true
                }
            ]
        }
    ]
};
