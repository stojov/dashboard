const API_URL = process.env.API_URL ?? 'https://localhost:5000'

export function request(endpoint, method, data) {
    let options = {
        method: method ?? 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    if (data) {
        options = { ...options, data: JSON.stringify(data) }
    }

    const res = await fetch(endpoint, options)
    return res.json()
}