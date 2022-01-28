import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./pages/Layout"
import { JobList, JobForm } from "./pages/jobs"
import { QueryClient, QueryClientProvider } from "react-query"

function App() {
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/job" />}></Route>
            <Route path="/" element={<Layout />}>
              <Route path="job" element={<JobList />}></Route>
              <Route path="job/form" element={<JobForm />}></Route>
              <Route path="job/edit/:id" element={<JobForm />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
