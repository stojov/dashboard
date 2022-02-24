import { request } from "../../utils/network"

export async function fetchJobs() {
  return await request("job")
}

export function fetchJob(id) {
  if (id) {
    return () => request(`job/${id}`)
  }
  return () => Promise.resolve({})
}

export async function postJobs(data) {
  data.schedule = "? " + data.schedule
  return await request("job", "POST", data)
}

export async function putJobs(data) {
  const schedule = data.schedule.split(" ")
  schedule.splice(4, 0, "?")
  data.schedule = schedule.join(" ")
  return await request(`job/${data.id}`, "PUT", data.payload)
}

export async function updateJobStatus({ id, status }) {
  return await request(`job/${id}/status`, "PUT", { status })
}

export async function deleteJob(id) {
  return request(`job/${id}`, "DELETE")
}
