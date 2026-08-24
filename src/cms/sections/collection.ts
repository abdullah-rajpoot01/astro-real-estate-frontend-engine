import { footerConfig } from "./footer";
import { navigationBarConfig } from "./navbar";
import type { Collection } from "@sveltia/cms";

export const sectionsCollection: Collection = {
    name: "sections",
    label: "Sections",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        navigationBarConfig,
        footerConfig
    ]
};
