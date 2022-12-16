import { FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from '../Select/Select';
import { filterSearch } from '../../redux/slices/filterSlice';
import { IProductsProps } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { SEARCH_INPUT } from '../../constants';
import './Products.scss';

const Products: FC<IProductsProps> = ({ products }) => {
  const [searchInput, setSearchInput] = useState(
    getLocalStorage(SEARCH_INPUT) || '',
  );
  const filterProducts = useAppSelector((state) => state.filter.filterProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSearchParams = (e: FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
    setLocalStorage(SEARCH_INPUT, e.currentTarget.value);
    setSearchParams({ search: searchInput });
  };

  useEffect(() => {
    dispatch(
      filterSearch({
        products,
        search: searchInput,
      }),
    );
  }, [dispatch, products, searchInput]);

  useEffect(() => {
    setSearchParams({ search: searchInput });
  }, [searchParams]);
  return (
    <div className='products'>
      <aside className='products-filter'>
        <ProductsFilter />
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select />
          <Search value={searchInput} onChange={handleSearchParams} />
        </div>
        <div className='products-items'>
          <TransitionGroup className='products-animation'>
            {filterProducts.map((product) => (
              <CSSTransition key={product.id} timeout={500} classNames='item'>
                <ProductItem item={product} isInTheCart={false} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Products;
