import { useEffect, useState } from 'react';
import { setStoreProducts } from '../../redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useFetchCollection from '../../hooks/useFetchCollection';
import Products from '../Products/Products';
import Loader from '../Loader/Loader';

const ProductsContainer = () => {
  const { data } = useFetchCollection('products');
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(
      setStoreProducts({
        products: data,
      }),
    );
  }, [dispatch, data]);

  useEffect(() => {
    if (products.length > 0) setReady(true);
  }, [products]);
  return (
    <div className='container-products'>
      {!ready ? <Loader /> : <Products products={products} />}
    </div>
  );
};

export default ProductsContainer;
