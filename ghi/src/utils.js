export async function tryFetch(url, options) {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(
                `Fetch Error - ${response.status} - ${response.statusText}`
            )
        }
        const data = await response.json()
        return data
    } catch (e) {
        if (e instanceof Error) {
            return e
        }
        return new Error('Unknown error while fetching')
    }
}
