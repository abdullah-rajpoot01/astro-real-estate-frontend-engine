import type { CollectionFile } from "@sveltia/cms";

export const socialConfig: CollectionFile = {
    name: "social_media",
    label: "Social Media Settings",
    file: "src/content/core-detail/social.json",
    format: "json",
    fields: [
        { name: "facebook", label: "Facebook Page URL", widget: "string", required: false },
        { name: "instagram", label: "Instagram Profile URL", widget: "string", required: false },
        { name: "tiktok", label: "TikTok Profile URL", widget: "string", required: false },
        { name: "youtube", label: "YouTube Channel URL", widget: "string", required: false },
        { name: "x", label: "X (formerly Twitter) URL", widget: "string", required: false },
        { name: "linkedin", label: "LinkedIn Profile/Page URL", widget: "string", required: false }
    ]
};
