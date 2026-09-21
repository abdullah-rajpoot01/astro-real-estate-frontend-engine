async function getCurrentUser(token) {
    try {
        const response = await fetch('/api/users/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user details.')
        }

        return data.user
    } catch (error) {
        console.error('Get current user error:', error)
        throw error
    }
}