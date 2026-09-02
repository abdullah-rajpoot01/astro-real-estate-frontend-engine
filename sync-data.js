import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

async function syncDataRepository() {
  try {
    // 1. Read SITE_ID from environment variables
    const siteId = process.env.SITE_ID;
    if (!siteId) {
      throw new Error('Environment variable SITE_ID must be provided to sync dynamic tenant data.');
    }
    console.log(`[SYNC-DATA] Initializing content pipeline sync for SITE_ID: ${siteId}`);

    // 2. Fetch config blocks from master mapping matrix
    // const configUrl = 'https://mydomain.com';
    // const response = await fetch(configUrl);

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch config registry layout. Status: ${response.status}`);
    // }

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

    // 3. Extract the targeted database node tracking config
    const siteConfig = configs.find(item => item.id === siteId);
    if (!siteConfig) {
      throw new Error(`Mapping verification exception: No registry entry mapped for SITE_ID: ${siteId}`);
    }
    console.log(`[SYNC-DATA] Matching configuration identified: ${siteConfig.storeName}`);

    // Resolve paths target boundaries inside the frontend project
    const projectRootDir = process.cwd();
    const contentDir = path.join(projectRootDir, 'src', 'content');

    // 4. Wipe out structural default schemas pre-baked into the template repo
    console.log('[SYNC-DATA] Flushing baseline template placeholder paths...');
    await fs.rm(contentDir, { recursive: true, force: true });

    // 5. Clone targeted asset data repository shallow block right into src/content
    const fullDataUrl = siteConfig.repositoryConfig.repoUrl;
    const dataBranch = siteConfig.repositoryConfig.repoBranch || 'main';

    console.log(`[SYNC-DATA] Shallow cloning [${dataBranch}] data assets directly into src/content...`);
    execSync(`git clone --branch ${dataBranch} --depth 1 ${fullDataUrl} "${contentDir}"`, { stdio: 'inherit' });

    console.log('[SYNC-DATA] Content repository synced successfully. Preparing Astro workspace build...');
  } catch (error) {
    console.error('[SYNC-DATA FATAL ERROR]:', error.message);
    process.exit(1);
  }
}

syncDataRepository();
