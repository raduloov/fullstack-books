import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useDarkMode from './hooks/useDarkMode';
import './index.css';

import Layout from './layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignupPage from './pages/auth/SignupPage';

function App() {
  useDarkMode();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
