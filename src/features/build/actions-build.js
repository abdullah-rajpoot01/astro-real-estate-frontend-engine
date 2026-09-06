import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

// Static Credentials Configuration (Handles Cloudflare Upload Parameters)
const credentialsConfig = {
    CLOUDFLARE_ACCOUNT_ID: "your_static_account_id_here",
    CLOUDFLARE_API_TOKEN: "your_static_api_token_here",
    CLOUDFLARE_PROJECT_NAME: "your_static_project_name_here"
};

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

        // 🚀 NEW ADDITION: Deploy compiled build directory directly to Cloudflare Pages via Wrangler CLI execution
        console.log('Initiating Cloudflare Pages deployment sequence via Wrangler...');
        const distFolder = path.join(rootDir, 'dist');

        // Pass authentication tokens securely into Wrangler's execution memory array
        const wranglerEnv = {
            ...process.env,
            CLOUDFLARE_ACCOUNT_ID: credentialsConfig.CLOUDFLARE_ACCOUNT_ID,
            CLOUDFLARE_API_TOKEN: credentialsConfig.CLOUDFLARE_API_TOKEN
        };

        execSync(
            `npx wrangler pages deploy "${distFolder}" --project-name="${credentialsConfig.CLOUDFLARE_PROJECT_NAME}"`,
            { cwd: rootDir, env: wranglerEnv, stdio: 'inherit' }
        );

        console.log('🚀 Wrangler sync completed successfully! Site is live.');


    } catch (error) {
        console.error('Fatal Pipeline Execution Error:', error.message);
        process.exit(1);
    }
}

runBuildPipeline();
