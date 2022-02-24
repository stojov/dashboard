import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import Alert from "../../components/Alert"
import { deleteJob, fetchJobs, updateJobStatus } from "./api"
import cronstrue from "cronstrue"
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"

export function JobList() {
  const navigate = useNavigate()
  const { isError, data, error } = useQuery("jobs", fetchJobs, {
    retry: false,
  })
  const queryClient = useQueryClient()

  const jobDeleteMutation = useMutation(deleteJob, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const jobStatusUpdateMutation = useMutation(updateJobStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return (
    <div className="w-full">
      {isError && <Alert message={error.message} />}
      <div className="flex flex-row-reverse w-full py-4">
        <button
          type="button"
          onClick={() => navigate("/job/form")}
          className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    S.N
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rss Url
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Schedule
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((job, index) => {
                  const schedule = job.schedule.slice(0, -2)
                  return (
                    <tr key={index}>
                      <td className="px-6 text-left py-4 whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="px-6 text-left py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.name}
                        </div>
                      </td>

                      <td className="px-6 text-left py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <a href={job.rssUrl}>{job.rssUrl}</a>
                        </div>
                      </td>

                      <td className="px-6 text-left py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {cronstrue.toString(schedule)}
                        </div>
                      </td>
                      <td className="px-6 text-left py-4 whitespace-nowrap">
                        <div
                          onClick={() =>
                            jobStatusUpdateMutation.mutate({
                              id: job.id,
                              status: !job.active,
                            })
                          }
                          className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
                        >
                          <input
                            onChange={() => {}}
                            type="checkbox"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer delay-50"
                            checked={job.active}
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </td>
                      <td className="px-6 text-left py-4 cursor-pointer">
                        <PencilIcon
                          className="w-7 sm:mx-2 mx-4 inline"
                          onClick={() => {
                            navigate(`/job/edit/${job.id}`)
                          }}
                        />
                        <TrashIcon
                          className="w-7 sm:mx-2 mx-4 inline"
                          onClick={() => {
                            if (window.confirm("Delete a job")) {
                              jobDeleteMutation.mutate(job.id)
                            }
                          }}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
