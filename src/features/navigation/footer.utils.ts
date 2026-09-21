import { z } from "astro/zod";
import { loadAndValidateFile } from "@/features/reusable";

// Helper schema for the toggleable sections
const footerSectionSchema = z.object({
  enabled: z.boolean(),
  title: z.string().optional().optional().nullable() 
});

// Define the core footer schema structure
export const footerSchema = z.object({
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
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
export type FooterDataType = z.infer<typeof footerSchema>;

/**
 * Fetches and parses the footer configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getFooterData(): FooterDataType {
    return loadAndValidateFile("src/content/sections/footer.json", footerSchema);

}
