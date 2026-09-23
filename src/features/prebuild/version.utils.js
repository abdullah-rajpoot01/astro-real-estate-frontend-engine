import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const publicDir = path.join(rootDir, 'public')
const targetFile = path.join(publicDir, 'version.json')

const siteUrl = process.env.SITE_URL ;

async function generateDynamicVersionFile() {
    let buildCount = 1

    try {
        if (siteUrl) {
            const response = await fetch(`https://${siteUrl}/version.json`, {
                cache: 'no-store',
            })

            if (response.ok) {
                const liveJson = await response.json()

                if (typeof liveJson.buildCount === 'number') {
                    buildCount = liveJson.buildCount + 1
                }
            }
        }
    } catch {
        // First deployment or site unavailable
    }

    const versionData = {
        date: new Date().toISOString(),
        buildCount,
    }

    try {
        fs.mkdirSync(publicDir, { recursive: true })

        fs.writeFileSync(
            targetFile,
            JSON.stringify(versionData, null, 2)
        )
    } catch (error) {
        console.error('Failed to create version.json:', error.message)
        process.exit(1)
    }
}

generateDynamicVersionFile()