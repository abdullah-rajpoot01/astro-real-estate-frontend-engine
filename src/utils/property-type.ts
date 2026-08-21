import fs from "fs";
import path from "path";

import type { PropertyType } from "@/types/listing";
import { getAllListings } from "./listings";



// Single consolidated function to fetch property types and inject the listing counts
export function getAllPropertyTypes(): PropertyType[] {
  try {
    const typesDir = path.join(process.cwd(), "src/content/property-types");

    if (!fs.existsSync(typesDir)) {
      console.error(`Property types directory not found: ${typesDir}`);
      return [];
    }

    // 1. Read all property type files from the directory
    const files = fs
      .readdirSync(typesDir)
      .filter((file) => file.endsWith(".json"));

    const propertyTypes = files.flatMap((file) => {
      try {
        const filePath = path.join(typesDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return [JSON.parse(fileContent) as PropertyType];
      } catch (error) {
        console.error(`Failed to read property type file: ${file}`, error);
        return [];
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
    console.error("Failed to load property types:", error);
    return [];
  }
}
