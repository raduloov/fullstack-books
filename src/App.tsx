import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from './apis/googleBooks';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import './index.css';
import MainPage from './pages/MainPage';

function App() {
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${BASE_URL}/?q=subject:it&startIndex=0&maxResults=40`
      );
      console.log(data);
    };

    getData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <MainPage />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
