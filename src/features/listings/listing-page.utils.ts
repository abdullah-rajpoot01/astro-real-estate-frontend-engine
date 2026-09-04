import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// 1. Define the schema matching your JSON structure exactly
export const propertiesPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  listingPerPage: z.number()
});

// 2. Infer the TypeScript type from the schema
export type PropertiesPageData = z.infer<typeof propertiesPageSchema>;

/**
 * Fetches and parses the properties catalog index page configuration.
 * Throws an error to halt the build if the file is missing or invalid.
 */
export function getPropertiesPageConfig(): PropertiesPageData {
  return loadAndValidateFile(
    "src/content/pages/properties.json", 
    propertiesPageSchema
  );
}
