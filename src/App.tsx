import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useDarkMode from './hooks/useDarkMode';
import './index.css';

import Layout from './layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/auth/SignupPage';
import CheckAuth from './auth/CheckAuth';

function App() {
  useDarkMode();

  return (
    <BrowserRouter>
      <Layout>
        <CheckAuth />
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
