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

    execSync(
      `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          CLOUDFLARE_ACCOUNT_ID: accountId,
          CLOUDFLARE_API_TOKEN: apiToken,
        },
        stdio: "inherit",
      }
    );

    console.log("🚀 Cloudflare Pages deployment completed successfully!");

    // ==========================================
    // EXTRACT SUBDOMAIN & UPDATE REMOTE API
    // ==========================================
    console.log("🔍 Fetching project data from Cloudflare to extract subdomain...");

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

    const projects = JSON.parse(projectListRaw.toString());
    
    // Locate the matching project structure by name string
    const activeProject = projects.find(
      (p) => p.name.toLowerCase() === projectName.toLowerCase()
    );

    if (!activeProject || !activeProject.subdomain) {
      console.warn(
        `Failed to locate Cloudflare project metadata or subdomain assignment for "${projectName}".`
      );
    }

    const subdomain = activeProject.subdomain;
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
      console.warn(
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
