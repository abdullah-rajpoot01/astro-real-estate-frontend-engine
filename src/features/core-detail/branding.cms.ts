import type { CollectionFile } from "@sveltia/cms";
import { themeConfig } from "@/features/reusable";

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
            options: themeConfig,
            required: true
        },
        {
            name: "mode",
            label: "Theme Mode",
            widget: "select",
            options: [
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
            ],
            default: "dark",
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
