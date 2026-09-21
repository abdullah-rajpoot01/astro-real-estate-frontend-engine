import { z } from "astro/zod";
import { loadAndValidateFile } from "../reusable/load-file-folder";

// 1. Define the schema matching your JSON structure exactly
export const testimonialsPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  limit: z.number().optional().nullable()
});

// 2. Infer the TypeScript type from the schema
export type TestimonialsPageDataType = z.infer<typeof testimonialsPageSchema>;

/**
 * Fetches and parses the testimonials page configuration metadata.
 * Throws an error to halt the build if the file is missing or invalid.
 */
export function getTestimonialsPageConfig(): TestimonialsPageDataType {
  return loadAndValidateFile(
    "src/content/pages/testimonials.json",
    testimonialsPageSchema
  );
}
