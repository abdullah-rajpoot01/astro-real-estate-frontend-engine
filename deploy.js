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

    execSync(
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

    console.log(
      "🚀 Cloudflare Pages deployment completed successfully!"
    );

  } catch (error) {
    console.error(
      "❌ Cloudflare deployment failed:",
      error.message
    );

    process.exit(1);
  }
}

deployToCloudflare();