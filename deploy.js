import { execSync } from "node:child_process";

async function deleteOldDeployments(accountId, cloudflareToken) {
  let projectName = "gym-leads";
  try {
    console.log("🧹 Checking for deployments to clean up...");

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}/deployments`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cloudflareToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.warn("⚠️ Could not fetch deployments for cleanup.");
      return;
    }

    const deployments = data.result || [];
    if (deployments.length === 0) {
      console.log("ℹ️ No deployments found to delete.");
      return;
    }

    console.log(`🗑️ Found ${deployments.length} deployments. Cleaning up...`);

    for (const deployment of deployments) {
      // NOTE: Cloudflare will naturally reject deleting the active "production" 
      // deployment if you are trying to delete a project, but it will clear out all previews.
      try {
        const deleteResponse = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}/deployments/${deployment.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${cloudflareToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const deleteData = await deleteResponse.json();
        if (deleteResponse.ok && deleteData.success) {
          console.log(`✅ Deleted deployment: ${deployment.id}`);
        } else {
          console.warn(`⚠️ Skipped/Failed deployment ${deployment.id}: ${deleteData.errors?.[0]?.message || 'Unknown error'}`);
        }
      } catch (err) {
        console.error(`❌ Network error deleting deployment ${deployment.id}:`, err.message);
      }
    }
    console.log("✨ Deployment cleanup finished.");
  } catch (error) {
    console.error("❌ Failed during deployment cleanup loop:", error.message);
  }
}

async function getCloudflarePagesSubdomain(
  accountId,
  projectName,
  cloudflareToken
) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${encodeURIComponent(projectName)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cloudflareToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    // If project is not found, Cloudflare API usually returns 404 or success: false with specific error code
    if (!response.ok || !data.success) {
      const isNotFound = data.errors?.some(err => err.code === 8000007 || err.message.includes("not found"));
      if (isNotFound || response.status === 404) {
        return null; // Return null so the deploy script knows to create it
      }

      throw new Error(
        data.errors?.map((error) => error.message).join(', ') ||
        `Failed to check Cloudflare project "${projectName}".`
      );
    }

    return data.result?.subdomain || null;
  } catch (error) {
    // If it's a known "not found" scenario handled above, rethrow other unexpected network errors
    if (error.message.includes("Failed to check Cloudflare project")) {
      throw error;
    }
    return null;
  }
}

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

    const siteName = process.env.SITE_NAME;

    // ------------------------------------------
    // Validate Cloudflare configuration
    // ------------------------------------------

    // if (!accountId || !apiToken || !projectName) {
    //   throw new Error(
    //     "CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and CLOUDFLARE_PROJECT_NAME are required"
    //   );
    // }

    // // ------------------------------------------
    // // Validate API configuration
    // // ------------------------------------------

    // if (!token || !siteUrl) {
    //   throw new Error(
    //     "AUTH_TOKEN and API_SITE_URL environment variables are required"
    //   );
    // }

    // // -----------------------------------------
    // // Get Pages project subdomain
    // // -----------------------------------------

    // const subdomain =
    //   await getCloudflarePagesSubdomain(
    //     accountId,
    //     siteName,
    //     apiToken
    //   )

    // // ------------------------------------------
    // // Deploy
    // // ------------------------------------------

    // console.log(
    //   "📦 Deploying ./dist to Cloudflare Pages..."
    // );
    // if (subdomain !== null) {
    //   execSync(
    //     `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
    //     {
    //       cwd: process.cwd(),

    //       env: {
    //         ...process.env,
    //         CLOUDFLARE_ACCOUNT_ID: accountId,
    //         CLOUDFLARE_API_TOKEN: apiToken,
    //       },

    //       encoding: "utf8",
    //     }
    //   );
    // } else {
    //   console.log(`ℹ️ Project does not exist. Creating new Pages project: "${projectName}"...`);
    //   // Step 1: Create the empty project framework
    //   execSync(
    //     `npx wrangler pages project create "${projectName}" --production-branch="main"`,
    //     {
    //       cwd: process.cwd(),
    //       env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: apiToken },
    //       encoding: "utf8",
    //     }
    //   );

    //   // Step 2: Deploy the compiled contents to the freshly created project
    //   console.log(`📦 Running initial production deployment for "${projectName}"...`);
    //   execSync(
    //     `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
    //     {
    //       cwd: process.cwd(),
    //       env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: apiToken },
    //       encoding: "utf8",
    //     }
    //   );
    // }
    // console.log(
    //   "🚀 Cloudflare Pages deployment completed successfully!"
    // );
    await deleteOldDeployments(accountId, apiToken);

  } catch (error) {
    console.error(
      "❌ Cloudflare deployment failed:",
      error.message
    );

    process.exit(1);
  }
}

deployToCloudflare();

