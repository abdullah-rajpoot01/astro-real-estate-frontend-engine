import { execSync } from "node:child_process";

async function deployToCloudflare() {
  try {
    console.log("🚀 Starting Cloudflare Pages deployment...");

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const projectName = process.env.CLOUDFLARE_PROJECT_NAME;
    const token = process.env.AUTH_TOKEN;
    const siteUrl = process.env.API_SITE_URL;

    // Check deployment prerequisites
    if (!accountId || !apiToken || !projectName) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and CLOUDFLARE_PROJECT_NAME are required"
      );
    }

    // Check API prerequisites
    if (!token || !siteUrl) {
      throw new Error(
        "AUTH_TOKEN and API_SITE_URL environment variables are required for synchronizing the subdomain."
      );
    }

    console.log("Deploying ./dist to Cloudflare Pages...");

    // Capture the standard output instead of inheriting stdio so we can use it as a robust extraction fallback
    const deployOutput = execSync(
      `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          CLOUDFLARE_ACCOUNT_ID: accountId,
          CLOUDFLARE_API_TOKEN: apiToken,
        },
      }
    );

    // Print output to console logs so you don't lose pipeline visibility
    console.log(deployOutput.toString());
    console.log("🚀 Cloudflare Pages deployment completed successfully!");

    // ==========================================
    // EXTRACT SUBDOMAIN & UPDATE REMOTE API
    // ==========================================
    let subdomain = null;

    console.log("🔍 Fetching project data from Cloudflare to extract subdomain...");

    try {
      // Execute wrangler project query returning JSON layout structure
      const projectListRaw = execSync(
        `npx wrangler pages project list --json`,
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            CLOUDFLARE_ACCOUNT_ID: accountId,
            CLOUDFLARE_API_TOKEN: apiToken,
          },
        }
      );

      const parsedData = JSON.parse(projectListRaw.toString());
      // Support cases where wrangler wraps array elements under a result field
      const projects = Array.isArray(parsedData) ? parsedData : (parsedData.result || []);
      
      // Fixed line: Defensively use optional chaining to safely traverse missing or null names
      const activeProject = projects.find(
        (p) => p?.name?.toLowerCase() === projectName.toLowerCase()
      );

      if (activeProject && activeProject.subdomain) {
        subdomain = activeProject.subdomain;
      }
    } catch (apiErr) {
      console.warn("⚠️ Cloudflare List API matching failed, attempting fallback terminal string parsing...", apiErr.message);
    }

    // FALLBACK STRATEGY: Parse from stdout if API payload failed or went missing
    if (!subdomain) {
      const outputStr = deployOutput.toString();
      // Matches strings like "Take a peek over at https://xxxxxx.pages.dev"
      const urlMatch = outputStr.match(/https:\/\/([a-zA-Z0-9-]+\.pages\.dev)/);
      if (urlMatch && urlMatch[1]) {
        subdomain = urlMatch[1];
      }
    }

    if (!subdomain) {
      throw new Error(
        `Failed to locate Cloudflare project metadata, subdomain assignment, or console fallback URL pattern for "${projectName}".`
      );
    }

    console.log(`✅ Extracted Subdomain: ${subdomain}`);

    // Clean base API endpoint strings to avoid slash collision mismatches
    const cleanSiteUrl = siteUrl.replace(/\/+\$/, "");
    const targetApiRoute = `${cleanSiteUrl}/api/users/update-tokens`;

    console.log(`📡 Synchronizing configurations with target API endpoint: ${targetApiRoute}...`);

    const response = await fetch(targetApiRoute, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        subdomain: subdomain,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error || `Server responded with an unexpected status code: ${response.status}`
      );
    }

    console.log("🎉 Remote database records sync completed successfully!");
    console.log("Response Details:", responseData.message || responseData);

  } catch (error) {
    console.error("❌ Cloudflare deployment or synchronization routine failed:", error.message);
    process.exit(1);
  }
}

deployToCloudflare();
