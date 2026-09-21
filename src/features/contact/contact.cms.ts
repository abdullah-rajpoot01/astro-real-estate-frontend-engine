import type { CollectionFile } from "@sveltia/cms";

export const contactPageConfig: CollectionFile = {
    name: "contactPageConfig",
    label: "Contact",
    file: "pages/contact.json",
    format: "json",
    fields: [
        {
            name: "title",
            label: "Main Title",
            widget: "string",
            required: true
        },
        {
            name: "subTitle",
            label: "Sub Title",
            widget: "string",
            required: true
        },
        {
            name: "description",
            label: "Description Text",
            widget: "text",
            required: true
        }
    ]
};



