async function updateCloudflareProject(token, cf_account_id, cf_project_id) {
    try {
        const response = await fetch('/api/users/cloudflare-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                cf_account_id,
                cf_project_id,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update Cloudflare project.')
        }

        return data
    } catch (error) {
        console.error('Cloudflare project update error:', error)
        throw error
    }
}