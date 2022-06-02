import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';

import Layout from './layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/auth/SignupPage';
import useDarkMode from './hooks/useDarkMode';
import CheckAuth from './auth/CheckAuth';

function App() {
  const { darkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <CheckAuth />
      <ToastContainer theme={darkMode ? 'dark' : 'light'} />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
