import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './index.css';

import Layout, { ScreenSizes } from './layout/Layout';
import useDarkMode from './hooks/useDarkMode';
import CheckAuth from './auth/CheckAuth';
import LoginPage from './pages/auth/LoginPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/auth/SignupPage';
import FavoritesPage from './pages/FavoritesPage';
import { useAppSelector } from './hooks/useRedux';

function App() {
  useDarkMode();

  const { screenSize } = useAppSelector(state => state.ui);

  return (
    <BrowserRouter>
      <ToastContainer
        position={
          screenSize === ScreenSizes.LARGE
            ? toast.POSITION.TOP_RIGHT
            : toast.POSITION.BOTTOM_CENTER
        }
      />
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
