import fs from "fs";
import path from "path";
import { z } from "astro/zod";

// Define the schema with strict Shadcn UI variant options
export const navbarSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  image: z.string(),
  quickLinks: z.array(
    z.object({ 
      label: z.string(), 
      url: z.string(), 
      icon: z.string() 
    })
  ),
  buttons: z.array(
    z.object({
      type: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]),
      text: z.string(),
      link: z.string(),
      icon: z.string().optional()
    })
  )
});

// Infer the TypeScript type directly from your schema rules
export type NavbarData = z.infer<typeof navbarSchema>;

/**
 * Fetches and parses the navbar section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getNavbarSection(): NavbarData {
  try {
    // Construct the absolute path pointing exactly to /src/content/sections/navbar.json
    const filePath = path.join(process.cwd(), "src/content/sections/navbar.json");

    // Check if the file actually exists on the drive
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [CMS ERROR] Required file missing: Navbar section file not found at: ${filePath}`);
      throw new Error("Cloudflare build stopped: The required file 'navbar.json' is missing.");
    }

    // Read the text contents of the file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    // Convert plain text string to a JavaScript object
    const rawJson = JSON.parse(fileContent);

    // Validate the data structure layout using your schema requirements
    const validationResult = navbarSchema.safeParse(rawJson);

    if (!validationResult.success) {
      console.error("❌ [CMS VALIDATION ERROR] Navbar section JSON formatting is invalid:");
      console.error(JSON.stringify(validationResult.error.format(), null, 2));
      
      // Throw an error to intentionally crash the Cloudflare Pages build pipeline
      throw new Error("Cloudflare build stopped: Malformed configuration inside navbar.json.");
    }

    // Return the strongly-typed data successfully
    return validationResult.data;

  } catch (error) {
    console.error("Failed to load navbar section structure:", error);
    // Re-throw the error so it bubbles up and stops the deployment build execution
    throw error;
  }
}
