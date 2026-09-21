/**
 * Checks if a Cloudflare Pages domain is taken by fetching it.
 * @param input - The raw string name (e.g., "Prime Builder")
 * @returns Promise<boolean> - Returns true if the domain is AVAILABLE (not found), 
 *                             and false if it is TAKEN (exists).
 */
export async function isCloudflareDomainAvailable(input: string): Promise<boolean> {
  // 1. Clean and normalize the string
  // Removes spaces, special characters, and converts to lowercase
  const cleanSubdomain = input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Keep only letters, numbers, and hyphens
    .replace(/^-+|-+$/g, '');   // Trim hyphens from start or end

  // 2. Create the standard Cloudflare Pages URL
  const url = `https://${cleanSubdomain}.pages.dev`;

  try {
    // 3. Try to fetch the URL
    const response = await fetch(url, { method: 'HEAD' });

    // If the status is 404, the page does not exist yet (Domain is Available!)
    if (response.status === 404) {
      return true;
    }

    // If it returns a successful status (200) or redirect, it means it is taken
    return false;
  } catch (error) {
    // If the fetch fails entirely (like a network error because the domain doesn't exist), 
    // it usually means the domain is available.
    return true;
  }
}
