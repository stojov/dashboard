import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Full() {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
      <Navbar />
      <main
        role="main"
        className="w-full h-full p-3 flex content-center justify-center overflow-auto"
      >
        <Outlet />
      </main>
    </div>
  )
}
