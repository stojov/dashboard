import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
