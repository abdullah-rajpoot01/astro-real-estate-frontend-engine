import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the schema exactly as you provided
export const addressSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  country: z.string(),
  location: z.object({ 
    latitude: z.number(), 
    longitude: z.number() 
  })
});

// Infer the TypeScript type directly from your schema rules
export type AddressData = z.infer<typeof addressSchema>;

/**
 * Fetches and parses the store address JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getAddress(): AddressData {
  try {
    // Construct the absolute path pointing exactly to /src/content/store-config/address.json
    const filePath = path.join(process.cwd(), "src/content/config/address.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Address configuration file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'address.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = addressSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Address JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside address.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load store address structure:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
