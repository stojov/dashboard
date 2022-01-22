import { HomeIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="sm:w-1/4 w-full flex-shrink p-4">
      <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full h-full">
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
          <li className="py-2 hover:bg-indigo-300 rounded">
            <Link className="truncate" to="/job">
              <HomeIcon className="w-7 sm:mx-2 mx-4 inline" />
              <span className="hidden sm:inline">Jobs</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
