import { useEffect } from 'react';
import { setStoreProducts } from '../../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useFetchCollection from '../../hooks/useFetchCollection';
import Products from '../Products/Products';
import Loader from '../Loader/Loader';

const ProductsContainer = () => {
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
    <div className='container-products'>
      {isLoading ? <Loader /> : <Products products={products} />}
    </div>
  );
};

export default ProductsContainer;
