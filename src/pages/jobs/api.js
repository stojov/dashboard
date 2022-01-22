import { request } from "../../utils/network";

export function fetchJobs() {
    const res = await request('/job')
    return res
}