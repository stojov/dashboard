import Navbar from "../components/Navbar";
import { JobList } from "./jobs";

export default function Full() {
    return (
        <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
            <Navbar />
            <main role="main" className="w-full h-full p-3 content-center overflow-auto">
                <JobList />
            </main>
        </div>
    )
}