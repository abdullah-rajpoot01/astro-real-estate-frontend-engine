import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// 1. Define the schema matching your JSON structure exactly
export const categoriesPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  listingPerPage: z.number()
});

// 2. Infer the TypeScript type from the schema
export type CategoriesPageData = z.infer<typeof categoriesPageSchema>;

/**
 * Fetches and parses the categories overview index page configuration.
 * Throws an error to halt the build if the file is missing or invalid.
 */
export function getCategoriesPageConfig(): CategoriesPageData {
  return loadAndValidateFile(
    "src/content/pages/categories.json", 
    categoriesPageSchema
  );
}
