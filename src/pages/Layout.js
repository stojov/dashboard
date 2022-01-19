import Navbar from "../components/Navbar";

export default function Full() {
    return (
        <div className="w-full h-full flex flex-col sm:flex-row flex-grow overflow-hidden">
            <Navbar />
            <main role="main" className="w-full h-full flex-grow p-3 overflow-auto">

            </main>
        </div>
    )
}