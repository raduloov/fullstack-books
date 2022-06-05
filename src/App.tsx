import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';

import Layout from './layout/Layout';
import useDarkMode from './hooks/useDarkMode';
import CheckAuth from './auth/CheckAuth';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/auth/SignupPage';
import FavoritesPage from './pages/FavoritesPage';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  useDarkMode();

  const { width } = useWindowDimensions();
  const smallScreen = width <= 1320;

  return (
    <BrowserRouter>
      <ToastContainer position={smallScreen ? 'bottom-center' : 'top-right'} />
      <CheckAuth />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
