import { footerConfig } from "./footer.cms";
import { navigationBarConfig } from "./navbar.cms";
import type { Collection } from "@sveltia/cms";

export const navigationCollection: Collection = {
    name: "navigation",
    label: "Navigation",
    // A file collection manages specific configuration files rather than a folder layout
    files: [
        navigationBarConfig,
        footerConfig
    ]
};
