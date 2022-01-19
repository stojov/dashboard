import {CogIcon, HomeIcon} from '@heroicons/react/outline'

export default function Navbar() {
    return (
        <div className="sm:w-1/3 w-full flex-shrink flex-grow-0 p-4">
            <div className="sticky top-0 p-4 bg-gray-100 rounded-xl w-full h-full">
                <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
                    <li className="py-2 hover:bg-indigo-300 rounded">
                        <a className="truncate" href="#">
                            <HomeIcon className="w-7 sm:mx-2 mx-4 inline" />
                            <span className="hidden sm:inline">Home</span>
                        </a>
                    </li>
                    <li className="py-2 hover:bg-indigo-300 rounded">
                        <a className="truncate" href="#">
                            <CogIcon className="w-7 sm:mx-2 mx-4 inline" />
                            <span className="hidden sm:inline">Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}