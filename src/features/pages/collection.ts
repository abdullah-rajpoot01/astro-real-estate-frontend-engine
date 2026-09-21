import type { Collection } from "@sveltia/cms";
import { contactPageConfig } from "../contact/contact.cms";
import { testimonialsPageConfig } from "../testimonials/collection.cms";
import { categoriesPageConfig } from "../categories/categories-page.cms";
import { listingsPageConfig } from "../listings/listings-page.cms";


export const pagesCollection: Collection = {
    name: "pages-config",
    label: "Pages",
    files: [
        contactPageConfig,
        testimonialsPageConfig,
        categoriesPageConfig,
        listingsPageConfig
    ]
};