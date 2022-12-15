import ProductItem from '../ProductItem/ProductItem';
import { productsData } from '../../data/data';
import './Products.scss';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from "../Select/Select";

const Products = () => (
  <div className='products'>
    <aside className='products-filter'>
      <ProductsFilter />
    </aside>
    <div className='products-wrapper'>
      <div className="products-wrapper__sortSearch">
        <Select />
        <Search />
      </div>
      <div className='products-items'>
        {productsData.products.map((product) => (
          <ProductItem key={product.id} item={product} isInTheCart={false} />
        ))}
      </div>
    </div>
  </div>
);

export default Products;
