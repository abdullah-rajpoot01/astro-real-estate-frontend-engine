import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

async function runBuildPipeline() {
  try {
    // 1. Read SITE_ID from environment variables
    const siteId = process.env.SITE_ID;
    if (!siteId) {
      throw new Error('Environment variable SITE_ID is not defined.');
    }
    console.log(`Checking configurations for SITE_ID: ${siteId}`);

    // 2. Fetch the config.json file
    // const configUrl = 'https://mydomain.com';
    // const response = await fetch(configUrl);

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch config from ${configUrl}. Status: ${response.status}`);
    // }

    // const configs = await response.json();
    const configs = [
      {
        "storeName": "al_rehman_realtors",
        "id": "usr_98431024",
        "status": "active",
        "domainConfig": {
          "customDomain": "www.alrehmanrealtors.pk",
          "cloudflareSubdomain": "al-rehman.pages.dev"
        },
        "repositoryConfig": {
          "repoName": "abdullah-rajpoot01/real_estate_config_default_data",
          "repoUrl": "https://github.com/abdullah-rajpoot01/real_estate_config_default_data",
          "repoBranch": "main"
        },
        "billingInfo": {
          "planTier": "basic",
          "currency": "PKR",
          "monthlyRate": 300,
          "nextPaymentDue": "2026-09-15T00:00:00Z"
        },
        "metaData": {
          "createdAt": "2026-08-31T07:15:00Z"
        }
      }
    ];

    // 3. Find the matching configuration block
    const siteConfig = configs.find(item => item.id === siteId);
    if (!siteConfig) {
      throw new Error(`No matching configuration found for SITE_ID: ${siteId}`);
    }
    console.log(`Configuration found for store: ${siteConfig.storeName}`);

    // Define target directories
    const frontendDir = path.resolve('frontend');
    const dataDir = path.resolve('data');

    // Clean up any stale directories from previous build environments
    await fs.rm(frontendDir, { recursive: true, force: true });
    await fs.rm(dataDir, { recursive: true, force: true });

    // 4. Clone frontend with depth 1 for lightning-fast performance
    const frontendRepoUrl = 'https://github.com/abdullah-rajpoot01/astro-ecommerce-template';
    console.log(`Shallow cloning frontend repository (depth=1)...`);
    execSync(`git clone --depth 1 ${frontendRepoUrl} "${frontendDir}"`, { stdio: 'inherit' });

    // 5. Clone data repository directly using the complete URL and branch config
    const fullDataUrl = siteConfig.repositoryConfig.repoUrl;
    const dataBranch = siteConfig.repositoryConfig.repoBranch || 'main';

    console.log(`Shallow cloning data repository branch [${dataBranch}] (depth=1)...`);
    execSync(`git clone --branch ${dataBranch} --depth 1 ${fullDataUrl} "${dataDir}"`, { stdio: 'inherit' });

    // 6. Set up content sync parameters
    const frontendContentDir = path.join(frontendDir, 'src', 'content');
    const frontendMediaDir = path.join(frontendDir, 'public', 'media');
    const dataMediaSrcDir = path.join(dataDir, 'public', 'media');

    // WIPE OUT existing frontend/src/content folder entirely before copying
    console.log('Purging existing frontend content schemas...');
    await fs.rm(frontendContentDir, { recursive: true, force: true });

    // Create the frontend/src/content folder
    await fs.mkdir(frontendContentDir, { recursive: true });

    // 7. Copy everything from data/ into frontend/src/content except public/media
    console.log('Syncing structural content schemas...');
    const dataItems = await fs.readdir(dataDir);
    for (const item of dataItems) {
      if (item === '.git') continue; // Skip git metadata

      const itemPath = path.join(dataDir, item);
      const targetPath = path.join(frontendContentDir, item);

      if (item === 'public') {
        const publicItems = await fs.readdir(itemPath).catch(() => []);
        for (const pubItem of publicItems) {
          if (pubItem !== 'media') {
            const pubItemSrc = path.join(itemPath, pubItem);
            const pubItemDest = path.join(frontendContentDir, 'public', pubItem);
            await fs.mkdir(path.dirname(pubItemDest), { recursive: true });
            await fs.cp(pubItemSrc, pubItemDest, { recursive: true });
          }
        }
      } else {
        await fs.cp(itemPath, targetPath, { recursive: true });
      }
    }

    // 8. Safely swap media folder blocks inside public/
    console.log('Purging existing media allocations...');
    await fs.rm(frontendMediaDir, { recursive: true, force: true });

    // Verify if data repository contains incoming media assets before copying
    const hasIncomingMedia = await fs.stat(dataMediaSrcDir).then(() => true).catch(() => false);
    if (hasIncomingMedia) {
      console.log('Deploying updated media structures...');
      await fs.cp(dataMediaSrcDir, frontendMediaDir, { recursive: true });
    } else {
      console.log('Notice: No active media directory discovered inside data repo.');
    }

    // 9. Execute target Astro engine compiler sequence
    console.log('Initiating dependencies provisioning engine...');
    execSync('npm ci --prefer-offline --no-audit --progress=false', { cwd: frontendDir, stdio: 'inherit' });

    console.log('Running static compilation production architecture...');
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

    console.log('Pipeline compilation finished successfully!');

  } catch (error) {
    console.error('Fatal Pipeline Execution Error:', error.message);
    process.exit(1);
  }
}

runBuildPipeline();
// Add this variable to create site
// SITE_ID=yourstoreid

// Add this variable to skip auto install dependencies
// SKIP_DEPENDENCY_INSTALL = true

// Build Command
// curl -sSL https://eligodigital.pages.dev/build.js | node && mv frontend/dist ./dist

// Output Directory
// dist


//Enable cloudflare build cache
//Navigate to your project dashboard inside the Cloudflare Dashboard.Select Settings → Builds & deployments.Scroll down to the Build cache configuration panel.Toggle the option to Enabled.