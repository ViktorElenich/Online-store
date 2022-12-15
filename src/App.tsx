import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';
import Products from './components/Products/Products';
import { RoutesEnum } from './enums';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path={RoutesEnum.Home} element={<Products />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
