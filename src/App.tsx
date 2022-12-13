import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';
import ItemBlockCard from './components/Item/ItemBlockCard';
import IProductItem from './interfaces/IProductItem';



/* test item */
const item:IProductItem = {
  id: 1,
  title: "Samsung Galaxy Book",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 3.6,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
  ]
}
/* test item end */

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <ItemBlockCard item={item} isInTheCart={false}/> 
      </div>
    </BrowserRouter>
  );
}

export default App;
