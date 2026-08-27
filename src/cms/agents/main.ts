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
            required: true,
            pattern: [
                "^\\+?[1-9]\\d{1,14}$",
                "Please enter a valid phone number in standard international format (e.g., +1234567890)"
            ]
        }
        ,
        {
            name: "email",
            label: "Email Address",
            widget: "string",
            required: true,
            pattern: [
                "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                "Please enter a valid email address (e.g., name@example.com)"
            ]
        },
        {
            name: "whatsapp",
            label: "WhatsApp Number",
            widget: "string",
            pattern: [
                "^\\+?[1-9]\\d{1,14}$",
                "Please enter a valid phone number in standard international format (e.g., +1234567890)"
            ],
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
