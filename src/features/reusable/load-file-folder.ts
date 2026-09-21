import fs from "fs";
import path from "path";
import { z } from "astro/zod";

/**
 * Universal, type-safe loader helper for JSON files
 */
export function loadAndValidateFile<T extends z.ZodTypeAny>(
  relativeFilePath: string, 
  schema: T
): z.infer<T> {
    try {
        const filePath = path.join(process.cwd(), relativeFilePath);
        const fileName = path.basename(filePath);

        if (!fs.existsSync(filePath)) {
            console.error(`❌ [CMS ERROR] Required file missing at: ${filePath}`);
            throw new Error(`Build stopped: The required file '${fileName}' is missing.`);
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);
        const validationResult = schema.safeParse(rawJson);

        if (!validationResult.success) {
            console.error(`❌ [CMS VALIDATION ERROR] ${fileName} formatting is invalid:`);
            console.error(JSON.stringify(validationResult.error.format(), null, 2));
            throw new Error(`Build stopped: Malformed configuration inside ${fileName}.`);
        }

        return validationResult.data;
    } catch (error) {
        console.error(`Failed to parse file structural layouts at: ${relativeFilePath}`, error);
        throw error;
    }
}
 
/**
 * Universal, type-safe loader helper for an entire directory of JSON files
 */
export function loadAndValidateDirectory<T extends z.ZodTypeAny>(
  relativeDir: string,
  schema: T
): z.infer<T>[] {
    try {
        const targetDir = path.join(process.cwd(), relativeDir);

        if (!fs.existsSync(targetDir)) {
            console.error(`❌ [CMS ERROR] Required directory missing at: ${targetDir}`);
            throw new Error(`Cloudflare build stopped: The directory "${relativeDir}" is missing.`);
        }

        // Read all files from the directory and filter for .json extensions
        const files = fs.readdirSync(targetDir).filter((file) => file.endsWith(".json"));

        return files.map((file) => {
            try {
                const filePath = path.join(targetDir, file);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const rawJson = JSON.parse(fileContent);

                const validationResult = schema.safeParse(rawJson);

                if (!validationResult.success) {
                    console.error(`❌ [CMS VALIDATION ERROR] Invalid layout structure in file [${file}]:`);
                    console.error(JSON.stringify(validationResult.error.format(), null, 2));
                    throw new Error(`Build failed: Malformed configuration found in ${file}.`);
                }

                return validationResult.data;
            } catch (error) {
                console.error(`Failed to execute parser framework on file: ${file}`, error);
                throw error;
            }
        });
    } catch (error) {
        console.error(`Critical error in directory validation workflow at: ${relativeDir}`, error);
        throw error;
    }
}
