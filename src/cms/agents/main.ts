import type { Collection } from "@sveltia/cms";

export const agentsCollection: Collection = {
    name: "agents",
    label: "Agents",
    label_singular: "Agent",
    folder: "src/content/agents",
    format: "json",
    create: true,
    slug: "{{name}}",
    fields: [
        {
            name: "id",
            label: "ID",
            widget: "hidden",
            default: "{{uuid_short}}"
        },
        {
            name: "name",
            label: "Full Name",
            widget: "string",
            required: true
        },
        {
            name: "title",
            label: "Title / Position (e.g., Senior Broker)",
            widget: "string",
            required: false
        },
        {
            name: "image",
            label: "Profile Image",
            widget: "image",
            required: false
        },
        {
            name: "phone",
            label: "Phone Number",
            widget: "string",
            required: true
        },
        {
            name: "email",
            label: "Email Address",
            widget: "string",
            required: true
        },
        {
            name: "whatsapp",
            label: "WhatsApp Number",
            widget: "string",
            required: true
        },
        {
            name: "bio",
            label: "Biography",
            widget: "text",
            required: false
        },
        {
            name: "featured",
            label: "Featured Agent",
            widget: "boolean",
            default: false,
            required: true
        }
    ]
};
