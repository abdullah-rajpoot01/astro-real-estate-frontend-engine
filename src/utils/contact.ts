import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the contact schema matching your JSON structure exactly
export const contactSchema = z.object({
  whatsapp: z.string(),
  phone: z.string(),
  email: z.email() // Ensures it validates as a proper email format
});

// Infer the TypeScript type directly from your schema rules
export type ContactData = z.infer<typeof contactSchema>;

/**
 * Fetches and parses the store contact configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getContact(): ContactData {
  try {
    // Construct the absolute path pointing exactly to /src/content/config/contact.json
    const filePath = path.join(process.cwd(), "src/content/config/contact.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Contact configuration file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'contact.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = contactSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Contact JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside contact.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load store contact structure:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
