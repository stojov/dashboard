import { request } from "../../utils/network";

export async function fetchJobs() {
    const res = await request('/job')
    return res
}