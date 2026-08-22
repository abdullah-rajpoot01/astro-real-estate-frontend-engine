import { z } from "astro/zod";
import fs from "fs";
import path from "path";

export const heroSchema = z.object({
    heading: z.string(),
    subHeading1: z.string(),
    subHeading2: z.string(),
    description: z.string(),
    carouselImages: z.array(
        z.union([
            z.object({ image: z.string(), link: z.string() }),
            z.object({ image: z.string() })
        ])
    ).max(10).min(1),
    buttons: z.array(
        z.object({
            type: z.string(),
            text: z.string(),
            link: z.string(),
            icon: z.string()
        })
    )
})

// 2. Infer the TypeScript type directly from your schema
export type HeroData = z.infer<typeof heroSchema>;

/**
 * Fetches and parses the hero section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data is invalid.
 */
export function getHeroSection(): HeroData {
  try {
    // Construct the absolute path pointing to /src/content/sections/hero.json
    const filePath = path.join(process.cwd(), "src/content/sections/hero.json");

    // Check if the file actually exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Hero section file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'hero.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert text to a plain JS object
    const rawJson = JSON.parse(fileContent);

    // Validate the data layout using your schema
    const validationResult = heroSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Hero section JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare build
      throw new Error("Cloudflare build stopped: Malformed configuration inside hero.json.");
    }

    // Return the strongly-typed data successfully (no longer returns null)
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load hero section:", error);
    // Re-throw the error so it bubbles up and stops the execution pipeline
    throw error;
  }
}
