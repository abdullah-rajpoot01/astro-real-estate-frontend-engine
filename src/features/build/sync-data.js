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
  
    // Resolve structural path targets inside the project workspace
    const projectRootDir = process.cwd();
    const contentDir = path.join(projectRootDir, 'src', 'content');
    const targetPublicMediaDir = path.join(projectRootDir, 'public', 'media');
    const configFilePath = path.join(projectRootDir, 'src', 'config', 'central-config.json');
    
   // 2. Read and parse the JSON file manually (Safest method across all Node versions)
    const configRawData = await fs.readFile(configFilePath, 'utf-8');
    const configs = JSON.parse(configRawData);

    // 2. Extract the targeted database node tracking config
    const siteConfig = configs.find(item => item.id === siteId);
    if (!siteConfig) {
      throw new Error(`Mapping verification exception: No registry entry mapped for SITE_ID: ${siteId}`);
    }
    console.log(`[SYNC-DATA] Matching configuration identified: ${siteConfig.storeName}`);

  
    // 3. Wipe out structural default schemas pre-baked into the template repo
    console.log('[SYNC-DATA] Flushing baseline template placeholder paths...');
    await fs.rm(contentDir, { recursive: true, force: true });

    // 4. Clone targeted asset data repository shallow block right into src/content
    const fullDataUrl = siteConfig.repositoryConfig.repoUrl;
    const dataBranch = siteConfig.repositoryConfig.repoBranch || 'main';

    console.log(`[SYNC-DATA] Shallow cloning [${dataBranch}] data assets directly into src/content...`);
    execSync(`git clone --branch ${dataBranch} --depth 1 ${fullDataUrl} "${contentDir}"`, { stdio: 'inherit' });

    // ==========================================
    // 📸 MEDIA ASSETS EXTRACTION ROUTINE
    // ==========================================
    const clonedDataMediaSrc = path.join(contentDir, 'media');

    // Remove any previous target folder from root-level public/media if it exists
    console.log('[SYNC-DATA] Purging existing target media allocations...');
    await fs.rm(targetPublicMediaDir, { recursive: true, force: true });

    // Verify if the newly cloned data repository contains incoming media assets
    const hasIncomingMedia = await fs.stat(clonedDataMediaSrc).then(() => true).catch(() => false);

    if (hasIncomingMedia) {
      console.log('[SYNC-DATA] Extracting and migrating fresh media structure to root public/media...');
      // Ensure the parent /public directory structure exists before attempting a hard copy
      await fs.mkdir(path.dirname(targetPublicMediaDir), { recursive: true });
      await fs.cp(clonedDataMediaSrc, targetPublicMediaDir, { recursive: true });
    } else {
      console.log('[SYNC-DATA NOTICE] No active public/media directory discovered inside the incoming cloned data repo.');
    }
    // ==========================================

    console.log('[SYNC-DATA] Content repository synced successfully. Preparing Astro workspace build...');
  } catch (error) {
    console.error('[SYNC-DATA FATAL ERROR]:', error.message);
    process.exit(1);
  }
}

syncDataRepository();
