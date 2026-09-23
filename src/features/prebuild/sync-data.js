import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

async function generateContentMetadata(contentDir) {
  console.log("[SYNC-METADATA] Scanning content files...");

  const files = [];

  async function scanDirectory(directory) {
    const entries = await fs.readdir(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      // Never include Git directories.
      if (
        entry.name === ".git" ||
        entry.name === ".github"
      ) {
        continue;
      }

      const fullPath = path.join(
        directory,
        entry.name
      );

      if (entry.isDirectory()) {
        await scanDirectory(fullPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      // metadata.json should not include itself.
      if (entry.name === "metadata.json") {
        continue;
      }

      const relativePath = path
        .relative(contentDir, fullPath)
        .replace(/\\/g, "/");

      files.push(`/content/${relativePath}`);
    }
  }

  await scanDirectory(contentDir);

  files.sort();

  const metadata = {
    files,
  };

  const metadataPath = path.join(
    contentDir,
    "metadata.json"
  );

  await fs.writeFile(
    metadataPath,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  console.log(
    `[SYNC-METADATA] Created metadata.json with ${files.length} files.`
  );
}


async function syncDataRepository() {
  try {
    // ==================================================
    // 1. Environment variables
    // ==================================================

    const githubToken =
      process.env.GITHUB_TOKEN?.trim();

    const repoOwner =
      process.env.GITHUB_USERNAME?.trim();

    const repoName =
      process.env.GITHUB_REPO_NAME?.trim() ||
      "data-1";

    const repoBranch =
      process.env.REPO_BRANCH?.trim() ||
      "main";

    if (!githubToken) {
      throw new Error(
        "GITHUB_TOKEN environment variable is required."
      );
    }

    if (!repoOwner) {
      throw new Error(
        "GITHUB_USERNAME environment variable is required."
      );
    }

    // ==================================================
    // 2. Project paths
    // ==================================================

    const projectRoot = process.cwd();

    const contentDir = path.join(
      projectRoot,
      "src",
      "content"
    );

    const publicDir = path.join(
      projectRoot,
      "public"
    );

    const publicContentDir = path.join(
      publicDir,
      "content"
    );

    const publicMediaDir = path.join(
      publicDir,
      "media"
    );

    const dataMediaDir = path.join(
      contentDir,
      "media"
    );

    // ==================================================
    // 3. Clean old content
    // ==================================================

    console.log(
      "[SYNC-DATA] Removing existing content..."
    );

    await fs.rm(contentDir, {
      recursive: true,
      force: true,
    });

    console.log(
      "[SYNC-DATA] Removing existing public content..."
    );

    await fs.rm(publicContentDir, {
      recursive: true,
      force: true,
    });

    console.log(
      "[SYNC-DATA] Removing existing public media..."
    );

    await fs.rm(publicMediaDir, {
      recursive: true,
      force: true,
    });

    // ==================================================
    // 4. Clone client data repository
    // ==================================================

    const repositoryUrl =
      `https://${githubToken}@github.com/` +
      `${repoOwner}/${repoName}.git`;

    console.log(
      `[SYNC-DATA] Cloning ${repoOwner}/${repoName}...`
    );

    execSync(
      `git clone --branch "${repoBranch}" --depth 1 "${repositoryUrl}" "${contentDir}"`,
      {
        stdio: "inherit",
      }
    );

    // ==================================================
    // 5. Remove Git metadata
    // ==================================================

    const gitDir = path.join(
      contentDir,
      ".git"
    );

    const githubDir = path.join(
      contentDir,
      ".github"
    );

    await fs.rm(gitDir, {
      recursive: true,
      force: true,
    });

    await fs.rm(githubDir, {
      recursive: true,
      force: true,
    });

    console.log(
      "[SYNC-DATA] Git metadata removed."
    );

    // ==================================================
    // 6. Generate metadata
    // ==================================================

    await generateContentMetadata(
      contentDir
    );

    // ==================================================
    // 7. Copy entire content to public/content
    // ==================================================

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

    // ==================================================
    // 8. Copy media to public/media
    // ==================================================

    const mediaExists = await fs
      .stat(dataMediaDir)
      .then((stat) => stat.isDirectory())
      .catch(() => false);

    if (mediaExists) {
      console.log(
        "[SYNC-MEDIA] Copying media assets..."
      );

      await fs.mkdir(publicMediaDir, {
        recursive: true,
      });

      await fs.cp(
        dataMediaDir,
        publicMediaDir,
        {
          recursive: true,
        }
      );

      console.log(
        "[SYNC-MEDIA] Media assets copied successfully."
      );
    } else {
      console.log(
        "[SYNC-MEDIA] No media directory found."
      );
    }

    // ==================================================
    // 9. Complete
    // ==================================================

    console.log(
      "[SYNC-DATA] Data repository synchronization completed successfully."
    );
  } catch (error) {
    console.error(
      "[SYNC-DATA FATAL ERROR]",
      error instanceof Error
        ? error.message
        : error
    );

    process.exit(1);
  }
}

syncDataRepository();