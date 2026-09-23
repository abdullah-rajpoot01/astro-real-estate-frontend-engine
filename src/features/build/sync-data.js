import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

async function generateContentMetadata(
  contentDir,
  projectRootDir
) {
  console.log(
    "[SYNC-METADATA] Scanning content files..."
  );

  const files = [];

  /**
   * Recursively read every file inside a directory.
   */
  async function scanDirectory(directory) {
    const entries = await fs.readdir(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      if (entry.name === ".git" || entry.name ===".github") {
        continue;
      }

      const fullPath = path.join(
        directory,
        entry.name
      );

      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (entry.isFile()) {
        // Get path relative to src/content
        const relativePath = path.relative(
          contentDir,
          fullPath
        );

        // Convert Windows "\" to "/"
        const normalizedPath = relativePath.replace(
          /\\/g,
          "/"
        );

        // Create public URL
        const fileUrl = `/content/${normalizedPath}`;

        files.push(fileUrl);
      }
    }
  }

  // Scan everything inside src/content
  await scanDirectory(contentDir);

  // Sort files for predictable output
  files.sort();

  // ==========================================
  // CREATE METADATA FILE
  // ==========================================

  const metadataPath = path.join(
    contentDir,
    "metadata.json"
  );

  const metadata = {
    files,
  };

  await fs.writeFile(
    metadataPath,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  console.log(
    `[SYNC-METADATA] Created metadata.json with ${files.length} files.`
  );

  // ==========================================
  // COPY CONTENT TO PUBLIC
  // ==========================================

  const publicContentDir = path.join(
    projectRootDir,
    "public",
    "content"
  );

  console.log(
    "[SYNC-CONTENT] Purging existing public/content..."
  );

  await fs.rm(publicContentDir, {
    recursive: true,
    force: true,
  });

  console.log(
    "[SYNC-CONTENT] Copying content to public/content..."
  );

  await fs.mkdir(publicContentDir, {
    recursive: true,
  });

  await fs.cp(
    contentDir,
    publicContentDir,
    {
      recursive: true,
    }
  );

  console.log(
    "[SYNC-CONTENT] Content copied successfully."
  );

  console.log(
    "[SYNC-CONTENT] Content metadata and public files generated successfully."
  );
}


async function syncDataRepository() {
  try {
    // 1. Read repository configuration from environment variables

    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_USERNAME;
    const repoName = process.env.GITHUB_REPO_NAME || "data-1";
    const repoBranch = process.env.REPO_BRANCH || "main";

    if (!githubToken) {
      throw new Error(
        "Environment variable GITHUB_TOKEN must be provided."
      );
    }

    if (!repoOwner) {
      throw new Error(
        "Environment variable REPO_OWNER must be provided."
      );
    }

    if (!repoName) {
      throw new Error(
        "Environment variable REPO_NAME must be provided."
      );
    }

    console.log(
      `[SYNC-DATA] Initializing data repository sync: ${repoOwner}/${repoName}`
    );

    // 2. Resolve project paths

    const projectRootDir = process.cwd();

    const contentDir = path.join(
      projectRootDir,
      "src",
      "content"
    );

    const targetPublicMediaDir = path.join(
      projectRootDir,
      "public",
      "media"
    );

    // 3. Remove template content

    console.log(
      "[SYNC-DATA] Flushing baseline template content..."
    );

    await fs.rm(contentDir, {
      recursive: true,
      force: true,
    });

    // 4. Clone client data repository using inline authentication tokens
    // Format: https://<token>@://github.com
    const authenticatedRepoUrl = `https://${githubToken}@github.com/${repoOwner}/${repoName}.git`;

    console.log(
      `[SYNC-DATA] Shallow cloning [${repoBranch}] data repository...`
    );

    execSync(
      `git clone --branch "${repoBranch}" --depth 1 "${authenticatedRepoUrl}" "${contentDir}"`,
      {
        stdio: "inherit",
      }
    );

    // ==========================================
    // MEDIA ASSETS EXTRACTION
    // ==========================================

    const clonedDataMediaSrc = path.join(
      contentDir,
      "media"
    );

    console.log(
      "[SYNC-DATA] Purging existing target media..."
    );

    await fs.rm(targetPublicMediaDir, {
      recursive: true,
      force: true,
    });

    // 5. Check for media directory

    const hasIncomingMedia = await fs
      .stat(clonedDataMediaSrc)
      .then(() => true)
      .catch(() => false);

    if (hasIncomingMedia) {
      console.log(
        "[SYNC-DATA] Extracting media assets..."
      );

      await fs.mkdir(
        path.dirname(targetPublicMediaDir),
        {
          recursive: true,
        }
      );

      await fs.cp(
        clonedDataMediaSrc,
        targetPublicMediaDir,
        {
          recursive: true,
        }
      );
    } else {
      console.log(
        "[SYNC-DATA NOTICE] No media directory found in data repository."
      );
    }

    console.log(
      "[SYNC-DATA] Content repository synced successfully."
    );

    // ==========================================
    // GENERATE CONTENT METADATA
    // ==========================================

    await generateContentMetadata(
      contentDir,
      projectRootDir
    );
  } catch (error) {
    console.error(
      "[SYNC-DATA FATAL ERROR]:",
      error.message
    );

    process.exit(1);
  }
}

syncDataRepository();
