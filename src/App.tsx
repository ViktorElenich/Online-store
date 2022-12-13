import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
