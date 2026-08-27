import type { CollectionFile } from "@sveltia/cms";

export const siteMetadataConfig: CollectionFile = {
    name: "site_metadata",
    label: "Site Metadata Settings",
    file: "src/content/core-detail/site-metadata.json",
    format: "json",
    fields: [
        { name: "title", label: "SEO Title Tag", widget: "string", required: true },
        { name: "description", label: "SEO Description Text", widget: "text", required: true },
        {
            name: "keywords",
            label: "Keywords List",
            widget: "list",
            field: { name: "keyword", label: "Keyword Tag", widget: "string" },
            required: false
        },
        { name: "image", label: "Default OpenGraph Banner Image", widget: "image", required: true },
        { name: "siteUrl", label: "Website URL", widget: "string", required: true }
    ]
};
