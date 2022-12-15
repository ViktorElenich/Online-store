import { useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from '../Select/Select';
import useFetchCollection from '../../hooks/useFetchCollection';
import Loader from '../Loader/Loader';
import { setStoreProducts } from '../../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Products.scss';

const Products = () => {
  const { data, isLoading } = useFetchCollection('products');
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setStoreProducts({
        products: data,
      }),
    );
  }, [dispatch, data]);
  return (
    <div className='products'>
      <aside className='products-filter'>
        <ProductsFilter />
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select />
          <Search />
        </div>
        <div className='products-items'>
          {isLoading ? (
            <Loader />
          ) : (
            products.map((product) => (
              <ProductItem
                key={product.id}
                item={product}
                isInTheCart={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
