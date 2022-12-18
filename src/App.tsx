import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import './App.scss';
import { RoutesEnum } from './enums';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductsContainer from './components/ProductsContainer/ProductsContainer';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <div className='App'>
          <Header />
          <Routes>
            <Route path={RoutesEnum.Home} element={<ProductsContainer />} />
            <Route path={RoutesEnum.Error404} element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
