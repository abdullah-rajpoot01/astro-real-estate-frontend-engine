import { execSync } from "node:child_process";

async function deployToCloudflare() {
  try {
    console.log("🚀 Starting Cloudflare Pages deployment...");

    const accountId =
      process.env.CLOUDFLARE_ACCOUNT_ID;

    const apiToken =
      process.env.CLOUDFLARE_API_TOKEN;

    const projectName =
      process.env.CLOUDFLARE_PROJECT_NAME;

    const token =
      process.env.AUTH_TOKEN;

    const siteUrl =
      process.env.API_SITE_URL;

    // ------------------------------------------
    // Validate Cloudflare configuration
    // ------------------------------------------

    if (!accountId || !apiToken || !projectName) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and CLOUDFLARE_PROJECT_NAME are required"
      );
    }

    // ------------------------------------------
    // Validate API configuration
    // ------------------------------------------

    if (!token || !siteUrl) {
      throw new Error(
        "AUTH_TOKEN and API_SITE_URL environment variables are required"
      );
    }

    // ------------------------------------------
    // Deploy
    // ------------------------------------------

    console.log(
      "📦 Deploying ./dist to Cloudflare Pages..."
    );

    const deployOutput = execSync(
      `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
      {
        cwd: process.cwd(),

        env: {
          ...process.env,
          CLOUDFLARE_ACCOUNT_ID: accountId,
          CLOUDFLARE_API_TOKEN: apiToken,
        },

        encoding: "utf8",
      }
    );

    console.log(deployOutput);

    console.log(
      "🚀 Cloudflare Pages deployment completed successfully!"
    );

    // ------------------------------------------
    // Get project metadata directly from API
    // ------------------------------------------

    console.log(
      "🔍 Fetching Cloudflare Pages project metadata..."
    );

    const projectResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const projectData =
      await projectResponse.json();

    if (
      !projectResponse.ok ||
      !projectData.success
    ) {
      throw new Error(
        projectData.errors
          ?.map((error) => error.message)
          .join(", ") ||
          `Failed to fetch Cloudflare project "${projectName}".`
      );
    }

    const project =
      projectData.result;

    if (!project) {
      throw new Error(
        `Cloudflare project "${projectName}" was not found.`
      );
    }

    // ------------------------------------------
    // Extract subdomain
    // ------------------------------------------

    const subdomain =
      project.subdomain;

    if (!subdomain) {
      throw new Error(
        `Cloudflare project "${projectName}" exists, but no subdomain was returned.`
      );
    }

    console.log(
      `✅ Cloudflare project: ${project.name}`
    );

    console.log(
      `✅ Cloudflare subdomain: ${subdomain}`
    );

    // ------------------------------------------
    // Synchronize with your API
    // ------------------------------------------

    const cleanSiteUrl =
      siteUrl.replace(/\/+$/, "");

    const targetApiRoute =
      `${cleanSiteUrl}/api/users/update-tokens`;

    console.log(
      `📡 Synchronizing with: ${targetApiRoute}`
    );

    const response = await fetch(
      targetApiRoute,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token,
          subdomain,
        }),
      }
    );

    const responseData =
      await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error ||
        `Server responded with status ${response.status}`
      );
    }

    console.log(
      "🎉 Remote database records sync completed successfully!"
    );

    console.log(
      "Response Details:",
      responseData.message ||
        responseData
    );

  } catch (error) {
    console.error(
      "❌ Cloudflare deployment or synchronization routine failed:",
      error.message
    );

    process.exit(1);
  }
}

deployToCloudflare();