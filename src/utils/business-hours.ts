import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// 1. Define the internal schema rule for an individual schedule block
const dayScheduleSchema = z.object({
  open: z.string(),
  close: z.string(),
  closed: z.boolean()
})

// 2. Wrap it with z.record() to allow any dynamic string key configurations
export const businessHoursSchema = z.record(z.string(), dayScheduleSchema);

// Infer the TypeScript type directly from your schema rules
export type BusinessHoursData = z.infer<typeof businessHoursSchema>;

/**
 * Fetches and parses the business hours configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getBusinessHours(): BusinessHoursData {
  try {
    // Construct the absolute path pointing exactly to /src/content/config/business-hours.json
    const filePath = path.join(process.cwd(), "src/content/config/business-hours.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Business hours configuration file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'business-hours.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = businessHoursSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Business hours JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside business-hours.json.");
    }

    // Return the strongly-typed record successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load business hours structure:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
