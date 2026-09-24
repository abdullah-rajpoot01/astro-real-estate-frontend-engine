import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const API_URL = "https://webmanager-seven.vercel.app";


// ======================================================
// Get current user
// ======================================================

async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/api/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to fetch user details."
    );
  }

  if (!data.user) {
    throw new Error("User data was not returned by API.");
  }

  return data.user;
}


// ======================================================
// Create website / prepare Cloudflare Pages
// ======================================================

async function createWebsite(token) {
  console.log("Website information is incomplete.");
  console.log("Calling create-website API...");

  const response = await fetch(
    `${API_URL}/api/users/create-website`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to create website."
    );
  }

  if (!data.user) {
    throw new Error(
      "Website API succeeded but user data was not returned."
    );
  }

  console.log(
    "Website information successfully prepared."
  );

  return data.user;
}


// ======================================================
// Prepare build environment
// ======================================================

async function prepareBuildEnvironment() {
  const authToken = process.env.AUTH_TOKEN
    ? process.env.AUTH_TOKEN.trim()
    : null;

  if (!authToken) {
    throw new Error("AUTH_TOKEN must be provided.");
  }

  // --------------------------------------------------
  // Get current user
  // --------------------------------------------------

  let user = await getCurrentUser(authToken);

  // --------------------------------------------------
  // Check whether website information exists
  //
  // If either cf_account_id OR subdomain_url is missing,
  // let the backend create/check everything.
  // --------------------------------------------------

  if (!user.cf_account_id || !user.subdomain_url) {
    console.log(
      "Cloudflare account ID or subdomain URL is missing."
    );

    user = await createWebsite(authToken);
  }

  // --------------------------------------------------
  // Extract user information
  // --------------------------------------------------

  const {
    site_id,
    site_name,
    cloudflare_token,
    github_token,
    github_username,
    cf_account_id,
    subdomain_url,
  } = user;

  // --------------------------------------------------
  // Validate required values
  // --------------------------------------------------

  if (!site_id) {
    throw new Error("site_id is required.");
  }

  if (!site_name) {
    throw new Error("site_name is required.");
  }

  if (!cloudflare_token) {
    throw new Error("cloudflare_token is required.");
  }

  if (!github_token) {
    throw new Error("github_token is required.");
  }

  if (!github_username) {
    throw new Error("github_username is required.");
  }

  if (!cf_account_id) {
    throw new Error("cf_account_id is required.");
  }

  if (!subdomain_url) {
    throw new Error("subdomain_url is required.");
  }

  // --------------------------------------------------
  // Set build environment
  // --------------------------------------------------

  process.env.FRONTEND_REPO_TOKEN = github_token;

  process.env.SITE_ID = String(site_id);

  process.env.SITE_NAME = site_name;

  process.env.CLOUDFLARE_API_TOKEN =
    cloudflare_token;

  process.env.CLOUDFLARE_ACCOUNT_ID =
    cf_account_id;

  process.env.CLOUDFLARE_PROJECT_NAME =
    site_name;

  process.env.GITHUB_TOKEN =
    github_token;

  process.env.GITHUB_USERNAME =
    github_username;

  process.env.SITE_URL =
    subdomain_url;

  process.env.API_SITE_URL =
    API_URL;

  console.log("Build environment prepared.");

  console.log({
    SITE_ID: "exists",
    SITE_NAME: "exists",
    CLOUDFLARE_API_TOKEN: "exists",
    CLOUDFLARE_ACCOUNT_ID: "exists",
    CLOUDFLARE_PROJECT_NAME: "exists",
    GITHUB_TOKEN: "exists",
    GITHUB_USERNAME: "exists",
    SITE_URL: "exists",
    API_SITE_URL: "exists",
  });

  return user;
}


// ======================================================
// Run build pipeline
// ======================================================

async function runBuildPipeline() {
  console.log(
    "Starting build orchestration sequence..."
  );

  const frontendRepoToken =
    process.env.FRONTEND_REPO_TOKEN;

  if (!frontendRepoToken) {
    throw new Error(
      "FRONTEND_REPO_TOKEN must be provided."
    );
  }

  const rootDir = process.cwd();

  // --------------------------------------------------
  // Frontend workspace
  // --------------------------------------------------

  const frontendDir = path.join(
    rootDir,
    "frontend"
  );

  const frontendRepoUrl =
    "https://github.com/abdullah-rajpoot01/astro-real-estate-frontend-engine";

  // --------------------------------------------------
  // Remove previous frontend workspace
  // --------------------------------------------------

  await fs.rm(frontendDir, {
    recursive: true,
    force: true,
  });

  console.log(
    "Creating frontend workspace..."
  );

  await fs.mkdir(frontendDir, {
    recursive: true,
  });

  // --------------------------------------------------
  // Clone frontend repository
  // --------------------------------------------------

  console.log(
    "Shallow cloning frontend repository..."
  );

  const authenticatedRepoUrl =
    frontendRepoUrl.replace(
      "https://",
      `https://${frontendRepoToken}@`
    );

  execSync(
    `git clone --depth 1 "${authenticatedRepoUrl}" "${frontendDir}"`,
    {
      stdio: "inherit",
    }
  );

  // --------------------------------------------------
  // Install dependencies
  // --------------------------------------------------

  console.log(
    "Installing frontend dependencies..."
  );

  execSync(
    "npm ci --prefer-offline --no-audit --progress=false",
    {
      cwd: frontendDir,
      stdio: "inherit",
    }
  );

  // --------------------------------------------------
  // Build
  // --------------------------------------------------

  console.log(
    "Running frontend build..."
  );

  execSync("npm run build", {
    cwd: frontendDir,
    stdio: "inherit",
  });

  console.log(
    "Pipeline completed successfully!"
  );
}


// ======================================================
// Main
// ======================================================

async function main() {
  try {
    // 1. Get user and prepare environment
    await prepareBuildEnvironment();

    // 2. Build frontend
    await runBuildPipeline();

  } catch (error) {
    console.error(
      "Fatal Pipeline Execution Error:",
      error instanceof Error
        ? error.message
        : error
    );

    process.exit(1);
  }
}

main();