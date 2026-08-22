import fs from "fs";
import path from "path";

import { getAllListings } from "./listings";
import { z } from "astro/zod";

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string(),
  count: z.number().optional(), // Changed to number to match your injected layout logic
  featured: z.boolean()
})

export type PropertyType = z.infer<typeof schema>;

// Single consolidated function to fetch property types and inject the listing counts
export function getAllPropertyTypes(): PropertyType[] {
  try {
    const typesDir = path.join(process.cwd(), "src/content/property-types");

    if (!fs.existsSync(typesDir)) {
      console.error(`❌ [CMS ERROR] Required directory missing: Property types directory not found: ${typesDir}`);
      throw new Error(`Cloudflare build stopped: The directory "${typesDir}" is missing.`);
    }

    // 1. Read all property type files from the directory
    const files = fs
      .readdirSync(typesDir)
      .filter((file) => file.endsWith(".json"));

    const propertyTypes = files.flatMap((file) => {
      try {
        const filePath = path.join(typesDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);

        // Validate the individual configuration file structure
        const validationResult = schema.safeParse(rawJson);

        if (!validationResult.success) {
          console.error(`❌ [CMS VALIDATION ERROR] Invalid property type in file [${file}]:`);
          console.error(JSON.stringify(validationResult.error.format(), null, 2));
          // Crash the Cloudflare build to block bad deployment
          throw new Error(`Build failed: Malformed property type configuration found in ${file}.`);
        }

        return [validationResult.data];
      } catch (error) {
        console.error(`Failed to execute parser framework on file: ${file}`, error);
        throw error; // Re-throw to halt deployment pipeline
      }
    });

    // 2. Fetch all listings to calculate counts
    const listings = getAllListings();

    // 3. Create a dictionary to count listings matching each property type name
    const countsByPropertyType: Record<string, number> = {};
    listings.forEach((listing) => {
      const typeKey = listing.propertyType;
      if (typeKey) {
        countsByPropertyType[typeKey] = (countsByPropertyType[typeKey] || 0) + 1;
      }
    });

    // 4. Return the categories array with the calculated count field injected
    return propertyTypes.map((type) => {
      const typeKey = type.id;
      return {
        ...type,
        count: countsByPropertyType[typeKey] || 0, // Injected count property (defaults to 0)
      };
    });

  } catch (error) {
    console.error("Critical error in property types validation workflow:", error);
    throw error; // Propagate exception to halt Cloudflare compilation
  }
}
