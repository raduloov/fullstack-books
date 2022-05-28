import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

import Layout from './layout/Layout';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
