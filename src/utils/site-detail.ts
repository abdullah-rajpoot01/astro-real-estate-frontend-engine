import fs from "fs";
import path from "path";
import { z } from "astro/zod";

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
  try {
    // Construct the absolute path pointing exactly to /src/content/config/store-detail.json
    const filePath = path.join(process.cwd(), "src/content/config/site-detail.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Store details configuration file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'store-detail.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = storeDetailSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Store details JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside store-detail.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load store details structure:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
