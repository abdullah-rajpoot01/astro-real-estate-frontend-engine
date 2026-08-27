import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Define the core store detail schema structure
export const storeDetailSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  tagline: z.string(),
  description: z.string(),
  logo: z.url(), // Ensures the logo path is a fully qualified URL link
  currency: z.object({
    code: z.string(),
    symbol: z.string(),
    position: z.enum(["before", "after"]) // Limits placement choices to before or after values
  })
});

// Infer the TypeScript type directly from your schema rules
export type StoreDetailData = z.infer<typeof storeDetailSchema>;

/**
 * Fetches and parses the store details configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getSiteDetails(): StoreDetailData {
    return loadAndValidateFile("src/content/core-detail/site-detail.json", storeDetailSchema);

}
