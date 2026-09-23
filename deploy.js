import { execSync } from "node:child_process";

async function deployToCloudflare() {
  try {
    console.log("🚀 Starting Cloudflare Pages deployment...");

    // --------------------------------------------------
    // Get configuration from environment
    // --------------------------------------------------

    const accountId =
      process.env.CLOUDFLARE_ACCOUNT_ID;

    const cloudflareApiToken =
      process.env.CLOUDFLARE_API_TOKEN;

    const projectName =
      process.env.CLOUDFLARE_PROJECT_NAME;

    // --------------------------------------------------
    // Validate required environment variables
    // --------------------------------------------------

    if (!accountId) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID is required."
      );
    }

    if (!cloudflareApiToken) {
      throw new Error(
        "CLOUDFLARE_API_TOKEN is required."
      );
    }

    if (!projectName) {
      throw new Error(
        "CLOUDFLARE_PROJECT_NAME is required."
      );
    }

    // --------------------------------------------------
    // Deploy existing dist folder
    // --------------------------------------------------

    console.log(
      `📦 Deploying ./dist to Cloudflare Pages project "${projectName}"...`
    );

    execSync(
      `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
      {
        cwd: process.cwd(),

        env: {
          ...process.env,

          CLOUDFLARE_ACCOUNT_ID:
            accountId,

          CLOUDFLARE_API_TOKEN:
            cloudflareApiToken,
        },

        stdio: "inherit",
      }
    );

    console.log(
      "🚀 Cloudflare Pages deployment completed successfully!"
    );
  } catch (error) {
    console.error(
      "❌ Cloudflare deployment failed:",
      error instanceof Error
        ? error.message
        : error
    );

    process.exit(1);
  }
}

deployToCloudflare();