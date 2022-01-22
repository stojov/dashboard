import { request } from "../../utils/network";

export async function fetchJobs() {
    try {
        const res = await request('job')
        return res
    } catch (error) {
        throw error
    }
}

export async function postJobs(data) {
    try {
        const res = await request('job', 'POST', data)
        return res
    } catch (error) {
        throw error
    }
}