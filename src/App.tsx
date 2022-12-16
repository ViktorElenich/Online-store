import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';
import { RoutesEnum } from './enums';
import Footer from "./components/Footer/Footer";
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path={RoutesEnum.Home} element={<ProductsContainer />} />
          <Route path={RoutesEnum.Error404} element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
