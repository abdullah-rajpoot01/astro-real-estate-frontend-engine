import { execSync } from "child_process";

async function deployToCloudflare() {
  try {
    console.log("🚀 Starting Cloudflare Pages deployment...");

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const projectName = process.env.CLOUDFLARE_PROJECT_NAME;

    if (!accountId || !apiToken || !projectName) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and CLOUDFLARE_PROJECT_NAME are required"
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
  } catch (error) {
    console.error(
      "❌ Cloudflare deployment failed:",
      error.message
    );

    process.exit(1);
  }
}

deployToCloudflare();