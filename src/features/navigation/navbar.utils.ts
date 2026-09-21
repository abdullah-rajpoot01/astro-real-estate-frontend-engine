import { z } from "astro/zod";
import { loadAndValidateFile } from "../reusable/load-file-folder";

// Define the schema with strict Shadcn UI variant options
export const navbarSchema = z.object({
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
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
  ).optional().nullable()
});

// Infer the TypeScript type directly from your schema rules
export type NavbarDataType = z.infer<typeof navbarSchema>;

/**
 * Fetches and parses the navbar section JSON configuration.
 * Throws a fatal error to halt the build if the file is missing OR if the data layout is invalid.
 */
export function getNavbarData(): NavbarDataType {
    return loadAndValidateFile("src/content/sections/navbar.json", navbarSchema);

}
