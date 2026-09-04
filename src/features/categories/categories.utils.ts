import { getAllListings } from "@/features/listings";
import { z } from "astro/zod";
import { loadAndValidateDirectory } from "@/features/reusable";

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  description: z.string().nullable(),
  image: z.string(),
  count: z.number().optional().nullable(), // Changed to number to match your injected layout logic
  featured: z.boolean()
})

export type Category = z.infer<typeof schema>;

/**
 * Fetches categories using the unified directory validation utility,
 * then maps and dynamically injects active listing occurrence counts.
 */
export function getAllCategories(): Category[] {
  try {
    // 1. Fetch and structurally validate all raw category items via our global utility
    const categories = loadAndValidateDirectory("src/content/categories", schema);

    // 2. Fetch all listings to calculate active structural matches
    const listings = getAllListings().filter(l => l.status === "available");

    // 3. Populate a lookup dictionary tracking matching listings per category ID
    const countsByCategory: Record<string, number> = {};
    listings.forEach((listing) => {
      const typeKey = listing.category;
      if (typeKey) {
        countsByCategory[typeKey] = (countsByCategory[typeKey] || 0) + 1;
      }
    });

    // 4. Return categories array stream with calculated dynamic count property values injected
    return categories.map((category) => {
      const categoryId = category.id;
      return {
        ...category,
        count: countsByCategory[categoryId] || 0, // Fallback injection to zero
      };
    });

  } catch (error) {
    console.error("Critical error in categories listing count composition pipeline:", error);
    throw error; // Bubble up execution break to crash target build steps cleanly
  }
}