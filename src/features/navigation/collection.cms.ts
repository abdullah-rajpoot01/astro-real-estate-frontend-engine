import { footerConfig } from "./footer.cms";
import { navigationBarConfig } from "./navbar.cms";
import type { Collection } from "@sveltia/cms";

export const navigationCollection: Collection = {
    name: "sections",
    label: "Sections",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        navigationBarConfig,
        footerConfig
    ]
};
