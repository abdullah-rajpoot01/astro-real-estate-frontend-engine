import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// 1. Separate schemas to isolate parameters explicitly
const gridSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonIcon: z.string(),
  maxItems: z.number(), // Strictly required only for your grid sections
  enabled: z.boolean()
});

const ctaSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonUrl: z.string(), 
  enabled: z.boolean()
});

const simpleSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  enabled: z.boolean()
});

// 2. Wrap them into the main home layout schema
export const homePageSchema = z.object({
  categoriesSection: gridSectionSchema,
  listingsSection: gridSectionSchema,
  featuresSection: simpleSectionSchema,
  testimonialsSection: simpleSectionSchema,
  ctaSection: ctaSectionSchema
});

// Infer the TypeScript type directly from your schema rules
export type HomePageData = z.infer<typeof homePageSchema>;

/**
 * Fetches and parses the home page layout structural configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data structure is corrupt.
 */
export function getHomePageConfig(): HomePageData {
  try {
    // Construct the absolute path pointing exactly to /src/content/pages/home.json
    const filePath = path.join(process.cwd(), "src/content/pages/home.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Home page layout file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'home.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = homePageSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Home page JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside home.json.");
    }

    // Return the strongly-typed layout configuration successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load home page sections layout:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
