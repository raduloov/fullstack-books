import { BrowserRouter } from 'react-router-dom';
import './index.css';

import Layout from './layout/Layout';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainPage />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
