import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import Layout from './layout/Layout';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
