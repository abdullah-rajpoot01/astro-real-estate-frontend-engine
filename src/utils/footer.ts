import fs from "fs";
import path from "path";
import { z } from "astro/zod";

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
  try {
    // Construct the absolute path pointing exactly to /src/content/sections/footer.json
    const filePath = path.join(process.cwd(), "src/content/sections/footer.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Footer section file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'footer.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = footerSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Footer section JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside footer.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load footer section structure:", error);
    throw error;
  }
}
