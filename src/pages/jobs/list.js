import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import Alert from "../../components/Alert"
import { fetchJobs } from "./api"

export function JobList() {
  const navigate = useNavigate()
  const { status, data, error } = useQuery('todos', fetchJobs)

  return (
    <div className="w-full">
      {status === 'error' && <Alert message={error.message} />}
      <div className="flex flex-row-reverse w-full py-4">
        <button type="button" onClick={() => navigate('/job/form')} className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
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
                {data.map((job, index) => (
                  <tr key={index}>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.rssUrl}</div>
                    </td>

                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.schedule}</div>
                    </td>
                    <td className="px-6 text-left py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-black-800 ${job.status ? 'bg-green-100' : 'bg-red-100'}`}>
                        {job.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
