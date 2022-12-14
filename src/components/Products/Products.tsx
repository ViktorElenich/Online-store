import ProductItem from '../ProductItem/ProductItem';
import { productsData } from '../../data/data';
import './Products.scss';
import ProductsFilter from "../ProductsFilter/ProductsFilter";

const Products = () => (
  <div className='products'>
    <aside className='products-filter'>
      <ProductsFilter />
    </aside>
    <div className='products-items'>
      {productsData.products.map((product) => (
        <ProductItem key={product.id} item={product} isInTheCart={false} />
      ))}
    </div>
  </div>
);

export default Products;
