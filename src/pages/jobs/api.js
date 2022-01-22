import { request } from "../../utils/network"

export async function fetchJobs() {
  return await request("job")
}

export async function postJobs(data) {
  return await request("job", "POST", data)
}

export async function deleteJob(id) {
  return request(`job/${id}`, "DELETE")
}
