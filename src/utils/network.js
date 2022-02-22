const API_URL =  process.env.REACT_APP_API_URL ?? "http://localhost:5000/api"

export async function request(endpoint, method, data) {
  let options = {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  if (data) {
    options = { ...options, body: JSON.stringify(data) }
  }

  const response = await fetch(`${API_URL}/${endpoint}`, options)
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json")
  const responseData = isJson ? await response.json() : null

  if (!response.ok) {
    const error = (responseData && responseData.message) || response.statusText
    return Promise.reject(error)
  }

  return Promise.resolve(responseData)
}
