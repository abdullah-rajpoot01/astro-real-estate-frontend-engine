
import type { Collection } from "@sveltia/cms";
import { testimonialsPageConfig } from "./page-config";


export const testimonialsPageCollection: Collection = {
    name: "testimonialsPage",
    label: "Testimonials Page",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        testimonialsPageConfig
    ]
};
