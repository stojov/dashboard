import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { JobForm, JobList } from "./jobs";

export default function Layout() {
    return (
        <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
            <Navbar />
            <main role="main" className="w-full h-full p-3 content-center overflow-auto">
                <Routes>
                    <Route path='/' element={<JobList />}></Route>
                    <Route path='/job/form' element={<JobForm />}></Route>
                </Routes>
                
            </main>
        </div>
    )
}