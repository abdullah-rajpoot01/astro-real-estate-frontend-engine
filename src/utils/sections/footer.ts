import fs from "fs";
import path from "path";
import { z } from "astro/zod";
import { loadAndValidateFile } from "../load-file-folder";

// Helper schema for the toggleable sections
const footerSectionSchema = z.object({
  enabled: z.boolean(),
  title: z.string().optional() // Made optional as requested
});

// Define the core footer schema structure
export const footerSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  image: z.string(),
  description: z.string(),
  quickLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
      icon: z.string().optional()
    })
  ),
  sections: z.object({
    quickLinks: footerSectionSchema,
    contact: footerSectionSchema,
    businessHours: footerSectionSchema,
    social: footerSectionSchema,
    copyRight: footerSectionSchema,
    siteMap: footerSectionSchema
  })
});

// Infer the TypeScript type directly from your schema rules
export type FooterData = z.infer<typeof footerSchema>;

/**
 * Fetches and parses the footer configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getFooterSection(): FooterData {
    return loadAndValidateFile("src/content/sections/footer.json", footerSchema);

}
