import fs from "fs";
import path from "path";

import type { Agent } from "@/types/listing";
import { getAllListings } from "./listings";


// Single consolidated function to fetch agents and inject their active listing counts
export function getAllAgents(): Agent[] {
  try {
    const agentsDir = path.join(process.cwd(), "src/content/agents");

    if (!fs.existsSync(agentsDir)) {
      console.error(`Agents directory not found: ${agentsDir}`);
      return [];
    }

    // 1. Read all agent files from the directory
    const files = fs
      .readdirSync(agentsDir)
      .filter((file) => file.endsWith(".json"));

    const agents = files.flatMap((file) => {
      try {
        const filePath = path.join(agentsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return [JSON.parse(fileContent) as Agent];
      } catch (error) {
        console.error(`Failed to read agent file: ${file}`, error);
        return [];
      }
    });

    // 2. Fetch all listings to match against agent IDs
    const listings = getAllListings();

    // 3. Create a dictionary to count listings matching each agentId
    const countsByAgent: Record<string, number> = {};
    listings.forEach((listing) => {
      if (listing.agentId) {
        countsByAgent[listing.agentId] = (countsByAgent[listing.agentId] || 0) + 1;
      }
    });

    // 4. Return the agents array with the calculated count field injected
    return agents.map((agent) => {
      return {
        ...agent,
        count: countsByAgent[agent.id] || 0, // Injected count property (defaults to 0)
      };
    });

  } catch (error) {
    console.error("Failed to load agents:", error);
    return [];
  }
}
