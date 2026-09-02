import { AvailableIcons } from "@/components/icons/icons-map";
import type { Collection } from "@sveltia/cms";

export const featuresCollection: Collection = {
    name: "features",
    label: "Features",
    label_singular: "Feature",
    folder: "features",
    format: "json",
    create: true,
    slug: "{{id}}", // File names will be derived from a clean slug of the title (e.g., wifi-access.json)
    fields: [
        {
            name: "id",
            label: "ID",
            widget: "hidden",
            default: "{{uuid_short}}"
        },
        {
            name: "title",
            label: "Feature Title",
            widget: "string",
            required: true
        },
        {
            name: "description",
            label: "Description",
            widget: "text",
            required: true
        },
        {
            name: "icon",
            label: "Select Icon",
            widget: "select", // Configured as requested
            options: AvailableIcons,
            required: true
        }
    ]
};
