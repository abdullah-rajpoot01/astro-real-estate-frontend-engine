import fs from "fs";
import path from "path";

import type { Listing } from "@/types/listing";

export function getAllListings(): Listing[] {
  try {
    const productsDir = path.join(process.cwd(), "src/content/listings");

    if (!fs.existsSync(productsDir)) {
      console.error(`Products directory not found: ${productsDir}`);
      return [];
    }

    const files = fs
      .readdirSync(productsDir)
      .filter((file) => file.endsWith(".json"));

    return files.flatMap((file) => {
      try {
        const filePath = path.join(productsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        return [JSON.parse(fileContent) as Listing];
      } catch (error) {
        console.error(`Failed to read product file: ${file}`, error);
        return [];
      }
    });
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}