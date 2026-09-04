import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// 1. Define the schema matching your contact page JSON structure exactly
export const contactPageSchema = z.object({
  pageTitle: z.string(),
  title: z.string(),
  description: z.string()
});

// 2. Infer the TypeScript type from the schema
export type ContactPageData = z.infer<typeof contactPageSchema>;

/**
 * Fetches and parses the contact page configuration.
 * Throws an error to halt the build if the file is missing or invalid.
 */
export function getContactPageConfig(): ContactPageData {
  return loadAndValidateFile(
    "src/content/pages/contact.json", 
    contactPageSchema
  );
}
