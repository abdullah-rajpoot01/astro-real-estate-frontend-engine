import type { CollectionFile } from "@sveltia/cms";

export const brandingConfig: CollectionFile = {
    name: "branding_settings",
    label: "Branding & Theme Settings",
    file: "core-detail/branding.json",
    format: "json",
    fields: [
        {
            name: "theme",
            label: "Active Site Theme",
            widget: "select",
            // Restriced strictly to one option per your requirement
            options: [
                { label: "Default Theme", value: "default" }
            ],
            default: "default",
            required: true
        },
        { 
            name: "favico", 
            label: "Favicon Image Asset (Icon)", 
            widget: "image", 
            required: true 
        }
    ]
};
