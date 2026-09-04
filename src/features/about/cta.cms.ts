import { AvailableIcons } from "@/features/icons/map.static";
import type { CollectionFile } from "@sveltia/cms";

export const aboutCtaSectionConfig: CollectionFile = {
    name: "ctaSection",
    label: "CTA (Call to Action) Section",
    file: "about-page/cta.json",
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
            required: false
        },
        {
            name: "buttonUrl",
            label: "Button Redirect Destination",
            widget: "string",
            required: true
        }
    ]
};
