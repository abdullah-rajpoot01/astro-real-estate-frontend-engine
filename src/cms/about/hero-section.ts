import type { CollectionFile } from "@sveltia/cms";
import { AvailableIcons } from "@/components/icons/icons-map";

export const aboutHeroConfig: CollectionFile = {
    name: "aboutHeroSection",
    label: "About / Intro Hero Section",
    file: "about-page/hero.json",
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
            required: false
        },
        {
            name: "description",
            label: "Description Text",
            widget: "text",
            required: false
        },
        {
            name: "image",
            label: "Section Image Asset",
            widget: "image",
            required: false
        },
        {
            name: "button",
            label: "Action Button",
            widget: "object",
            required: false, // Following our strategy to keep parent configs bulletproof
            fields: [
                {
                    name: "text",
                    label: "Button Display Label",
                    widget: "string",
                    required: true
                },
                {
                    name: "icon",
                    label: "Button Icon Symbol",
                    widget: "select",
                    options: AvailableIcons,
                    required: true
                },
                {
                    name: "url",
                    label: "Button Redirect Destination",
                    widget: "string",
                    required: true
                }
            ]
        }
    ]
};
