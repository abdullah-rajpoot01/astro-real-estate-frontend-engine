import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const API_URL = "https://webmanager-seven.vercel.app";


async function getCurrentUser(token) {
  const response = await fetch(
    `${API_URL}/api/users/me`,
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
      data.error || "Failed to fetch user details."
    );
  }
  return data.user;
}


async function getCloudflareAccount(cloudflareToken) {
  const response = await fetch(
    "https://api.cloudflare.com/client/v4/accounts",
    {
      headers: {
        Authorization: `Bearer ${cloudflareToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.errors?.map(error => error.message).join(", ") ||
      "Failed to get Cloudflare account"
    );
  }

  const account = data.result?.[0];

  if (!account) {
    throw new Error("No Cloudflare account found");
  }

  return account;
}

async function getGitHubUsername(token) {
  const response = await fetch(
    "https://api.github.com/user",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get GitHub account: ${await response.text()}`
    );
  }

  const user = await response.json();

  return {
    id: user.id,
    username: user.login,
  };
}

async function getFrontendToken(authToken) {
  if (!authToken) {
    throw new Error("AUTH_TOKEN is required.");
  }

  const response = await fetch(
    `${API_URL}/api/frontend/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: authToken,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to get frontend repository token."
    );
  }

  if (!data.token) {
    throw new Error(
      "Frontend repository token was not returned by API."
    );
  }

  return data.token;
}

async function prepareBuildEnvironment() {
  const authToken = process.env.AUTH_TOKEN;

  if (!authToken) {
    throw new Error("AUTH_TOKEN must be provided.");
  }

  const user = await getCurrentUser(authToken);

  const {
    site_id,
    site_name,
    cloudflare_token,
    github_token,
    subdomain_url,
    website_created
  } = user;

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

  const cloudflareAccount =
    await getCloudflareAccount(cloudflare_token);

  // Get frontend repository token
  // const frontendRepoToken =
  //   await getFrontendToken(authToken);

  const githubAccount =
    await getGitHubUsername(github_token);

  process.env.FRONTEND_REPO_TOKEN =
    github_token;

  process.env.SITE_ID = String(site_id);

  process.env.SITE_NAME = site_name;

  process.env.CLOUDFLARE_API_TOKEN =
    cloudflare_token;

  process.env.CLOUDFLARE_ACCOUNT_ID =
    cloudflareAccount.id;

  process.env.CLOUDFLARE_PROJECT_NAME =
    site_name;

  process.env.GITHUB_TOKEN =
    github_token;

  process.env.GITHUB_USERNAME =
    githubAccount.username;

  if (subdomain_url) {
    process.env.SITE_URL = subdomain_url;
  }

  process.env.WEBSITE_CREATED = website_created;

  process.env.API_SITE_URL = "https://webmanager-seven.vercel.app";
  console.log("Build environment prepared.");
}

async function runBuildPipeline() {

  console.log("Starting build orchestration sequence...");

  const frontendRepoToken = process.env.FRONTEND_REPO_TOKEN;

  if (!frontendRepoToken) {
    throw new Error(
      "FRONTEND_REPO_TOKEN must be provided."
    );
  }

  const rootDir = process.cwd();

  // Dedicated frontend workspace
  const frontendDir = path.join(
    rootDir,
    "frontend"
  );

  const frontendRepoUrl =
    "https://github.com/abdullah-rajpoot01/astro-real-estate-frontend-engine";

  // Remove previous frontend workspace if it exists
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

  // Clone frontend repository
  console.log(
    "Shallow cloning frontend repository..."
  );


  // Construct authenticated URL: https://<token>@github.com/...
  const authenticatedRepoUrl = frontendRepoUrl.replace(
    "https://",
    `https://${frontendRepoToken}@`
  );

  execSync(
    `git clone --depth 1 "${authenticatedRepoUrl}" "${frontendDir}"`,
    {
      stdio: "inherit",
    }
  );


  // Install dependencies
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

  // Build
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

async function main() {
  try {
    // 1. Get client information and prepare environment
    await prepareBuildEnvironment();

    await runBuildPipeline();


  } catch (error) {
    console.error(
      "Fatal Pipeline Execution Error:",
      error.message
    );

    process.exit(1);
  }
}

main();