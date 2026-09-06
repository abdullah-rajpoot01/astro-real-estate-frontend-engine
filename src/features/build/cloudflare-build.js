import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

// Dummy for test only changed by a remote api call
async function isValidUser(siteId, password) {
  return siteId === "test" && password === "1234";
}


async function runBuildPipeline() {
  try {
    console.log('Starting deployment orchestration sequence...');
    const siteId = process.env.SITE_ID;
    const password = process.env.PASSWORD;

    if (!siteId || !password) {
      throw new Error("Site ID and Password must be provided")
    }

    const isValid = await isValidUser(siteId, password);

    if (!isValid) {
      throw new Error("Site ID and password must be valid");
    }
    const rootDir = process.cwd();
    const tempFrontendDir = path.join(rootDir, 'temp_frontend');

    // 1. Shallow clone frontend template into a temporary folder
    const frontendRepoUrl = 'https://github.com/abdullah-rajpoot01/astro-real-estate-frontend-engine';
    console.log(`Shallow cloning frontend repository (depth=1)...`);
    execSync(`git clone --depth 1 ${frontendRepoUrl} "${tempFrontendDir}"`, { stdio: 'inherit' });

    // 2. Distribute files directly to the root execution path
    console.log('Moving frontend codebase architecture to root execution environment...');
    const frontendFiles = await fs.readdir(tempFrontendDir);
    for (const file of frontendFiles) {
      if (file === '.git') continue; // Skip git operational files
      const srcPath = path.join(tempFrontendDir, file);
      const destPath = path.join(rootDir, file);
      await fs.cp(srcPath, destPath, { recursive: true, force: true });
    }

    // Clean up temporary workspace directory footprint
    await fs.rm(tempFrontendDir, { recursive: true, force: true });

    // 3. Provision project dependencies at workspace root
    console.log('Initiating root dependencies provisioning engine...');
    execSync('npm ci --prefer-offline --no-audit --progress=false', { cwd: rootDir, stdio: 'inherit' });

    // 4. Fire build execution sequence (This runs prebuild hook natively)
    console.log('Running static compilation production architecture...');
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

    console.log('Pipeline compilation completed successfully!');

  } catch (error) {
    console.error('Fatal Pipeline Execution Error:', error.message);
    process.exit(1);
  }
}

runBuildPipeline();
