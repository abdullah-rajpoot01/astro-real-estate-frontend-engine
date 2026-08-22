import fs from "fs";
import path from "path";

import { getAllListings } from "./listings";
import { z } from "astro/zod";

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  title: z.string().optional(),
  image: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  whatsapp: z.string().optional(),
  bio: z.string().optional(),
  count: z.number().optional(),
  featured: z.boolean(),
})

export type Agent = z.infer<typeof agentSchema>

export function getAllAgents(): Agent[] {
  try {
    const agentsDir = path.join(process.cwd(), "src/content/agents");

    if (!fs.existsSync(agentsDir)) {
      console.error(`Agents directory not found: ${agentsDir}`);
      return [];
    }

    const files = fs
      .readdirSync(agentsDir)
      .filter((file) => file.endsWith(".json"));

    const agents = files.flatMap((file) => {
      try {
        const filePath = path.join(agentsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);

        const validationResult = agentSchema.safeParse(rawJson);

        if (!validationResult.success) {
          console.error(`❌ [CMS VALIDATION ERROR] Invalid agent structure in: ${file}`);
          console.error(JSON.stringify(validationResult.error.format(), null, 2));
          // Crash the Cloudflare build to block bad deployment
          throw new Error(`Build failed: Malformed agent configuration found in ${file}.`);
        }

        return [validationResult.data];
      } catch (error) {
        console.error(`Failed to execute parser framework on file: ${file}`, error);
        throw error;
      }
    });

    // Cross-reference listings data to calculate agent inventory volumes
    const listings = getAllListings();
    const countsByAgent: Record<string, number> = {};

    listings.forEach((listing) => {
      if (listing.agentId) {
        countsByAgent[listing.agentId] = (countsByAgent[listing.agentId] || 0) + 1;
      }
    });

    return agents.map((agent) => {
      return {
        ...agent,
        count: countsByAgent[agent.id] || 0,
      };
    });

  } catch (error) {
    console.error("Critical error in agent validation workflow:", error);
    throw error;
  }
}