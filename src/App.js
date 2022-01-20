import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import { JobList, JobForm} from './pages/jobs'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='job' element={<JobList />}></Route>
            <Route path='job/form' element={<JobForm />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
