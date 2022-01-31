import { request } from "../../utils/network"

export async function fetchJobs() {
  return await request("job")
}

export function fetchJob(id) {
  return () => request(`job/${id}`)
}

export async function postJobs(data) {
  return await request("job", "POST", data)
}

export async function updateJobStatus({ id, status }) {
  return await request(`job/${id}/status`, "PUT", { status })
}

export async function deleteJob(id) {
  return request(`job/${id}`, "DELETE")
}
