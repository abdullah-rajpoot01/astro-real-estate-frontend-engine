import { execSync } from "node:child_process";

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

    if (!response.ok || !data.success) {
      const isNotFound = data.errors?.some(err => err.code === 8000007 || err.message.includes("not found"));
      if (isNotFound || response.status === 404) {
        return null; 
      }

      throw new Error(
        data.errors?.map((error) => error.message).join(', ') ||
        `Failed to check Cloudflare project "${projectName}".`
      );
    }

    return data.result?.subdomain || null;
  } catch (error) {
    if (error.message.includes("Failed to check Cloudflare project")) {
      throw error;
    }
    return null;
  }
}

async function deployToCloudflare() {
  try {
    console.log("🚀 Starting Cloudflare Pages deployment...");

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN;
    const projectName = process.env.CLOUDFLARE_PROJECT_NAME;
    
    // Auth and database configuration values
    const token = process.env.AUTH_TOKEN;
    const apiSiteUrl = process.env.API_SITE_URL; 
    const siteName = process.env.SITE_NAME;

    // Read status checks
    const websiteCreatedEnv = process.env.WEBSITE_CREATED;
    const siteUrlEnv = process.env.SITE_URL;
    
    // Condition: Check if BOTH the flag is true and the site URL actually exists
    const isSiteAlreadyExist = (websiteCreatedEnv === "true" && siteUrlEnv && siteUrlEnv.trim() !== "");

    // ------------------------------------------
    // Validate Configurations
    // ------------------------------------------
    if (!accountId || !cloudflareApiToken || !projectName) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and CLOUDFLARE_PROJECT_NAME are required"
      );
    }

    if (!token || !apiSiteUrl) {
      throw new Error(
        "AUTH_TOKEN and API_SITE_URL environment variables are required"
      );
    }

    // ------------------------------------------
    // OPTIMIZED FLOW: Conditional Subdomain Check & Deployment
    // ------------------------------------------
    if (isSiteAlreadyExist) {
      // Fast path: Skip fetching subdomain completely, just run the deployment directly
      console.log("ℹ️ Site already exists in DB. Skipping subdomain verification. Pushing deployment updates...");
      
      execSync(
        `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            CLOUDFLARE_ACCOUNT_ID: accountId,
            CLOUDFLARE_API_TOKEN: cloudflareApiToken,
          },
          encoding: "utf8",
        }
      );
      
      console.log("🚀 Cloudflare Pages deployment completed successfully!");
      console.log("ℹ️ Skipping database PATCH sync because site configuration metadata is already tracked.");
      
    } else {
      // Normal path: We need the subdomain to verify project state and save to DB later
      console.log("🔍 Site metadata missing. Fetching subdomain information from Cloudflare...");
      
      const subdomain = await getCloudflarePagesSubdomain(
        accountId,
        siteName,
        cloudflareApiToken
      );

      console.log("📦 Deploying ./dist to Cloudflare Pages...");
      
      if (subdomain !== null) {
        // Project exists on Cloudflare but isn't marked in our DB yet
        execSync(
          `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
          {
            cwd: process.cwd(),
            env: {
              ...process.env,
              CLOUDFLARE_ACCOUNT_ID: accountId,
              CLOUDFLARE_API_TOKEN: cloudflareApiToken,
            },
            encoding: "utf8",
          }
        );
      } else {
        // Project completely missing from Cloudflare. Provision a new one first
        console.log(`ℹ️ Project does not exist. Creating new Pages project: "${projectName}"...`);
        execSync(
          `npx wrangler pages project create "${projectName}" --production-branch="main"`,
          {
            cwd: process.cwd(),
            env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: cloudflareApiToken },
            encoding: "utf8",
          }
        );

        console.log(`📦 Running initial production deployment for "${projectName}"...`);
        execSync(
          `npx wrangler pages deploy "./dist" --project-name="${projectName}"`,
          {
            cwd: process.cwd(),
            env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: cloudflareApiToken },
            encoding: "utf8",
          }
        );
      }
      
      console.log("🚀 Cloudflare Pages deployment completed successfully!");
      
      // Fetch the updated live subdomain context to register it in your DB
      console.log("🔄 Synchronizing new site status to database API...");
      const finalSubdomain = subdomain || await getCloudflarePagesSubdomain(accountId, siteName, cloudflareApiToken);
      
      if (!finalSubdomain) {
        // Soft logging error instead of throwing a hard error exception context breaking execution
        console.error("⚠️ Warning: Unable to locate live subdomain reference for database registration tracking context.");
      } else {
        const absoluteSubdomainUrl = finalSubdomain.startsWith("http") ? finalSubdomain : `https://${finalSubdomain}`;

        try {
          // Update Next.js backend with new flags
          const updateResponse = await fetch(`${apiSiteUrl.replace(/\/$/, "")}/api/users/update`, { 
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              website_created: true,
              subdomain_url: absoluteSubdomainUrl
            }),
          });

          const updateResult = await updateResponse.json();

          if (!updateResponse.ok || !updateResult.success) {
            // Soft failure tracking, execution will still succeed out normally
            console.error(`⚠️ Database patch sync error logged: ${updateResult.error || "Unknown update failure configuration"}`);
          } else {
            console.log("✅ Database metrics successfully updated!");
          }
        } catch (apiFetchError) {
          console.error("⚠️ Failed to reach database update API during deployment sync stage:", apiFetchError.message);
        }
      }
    }

  } catch (error) {
    console.error("❌ Cloudflare deployment failed:", error.message);
    process.exit(1);
  }
}

deployToCloudflare();
