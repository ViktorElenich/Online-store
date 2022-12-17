import { FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from '../Select/Select';
import Switch from "../Switch/Switch";
import { filtersProducts } from '../../redux/slices/filterSlice';
import { IProductsProps } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { SEARCH_INPUT, SORT_SELECT } from '../../constants';
import './Products.scss';

const Products: FC<IProductsProps> = ({ products }) => {
  const [grid, setGrid] = useState(false);
  const [searchInput, setSearchInput] = useState(
    getLocalStorage(SEARCH_INPUT) || '',
  );
  const [sortSelect, setSortSelect] = useState(
    getLocalStorage(SORT_SELECT) || '',
  );
  const filterProducts = useAppSelector((state) => state.filter.filterProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSearchParams = (e: FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
    setLocalStorage(SEARCH_INPUT, e.currentTarget.value);
    setSearchParams({ search: searchInput });
  };

  const handleSortParams = (e: FormEvent<HTMLSelectElement>) => {
    setSortSelect(e.currentTarget.value);
    setLocalStorage(SORT_SELECT, e.currentTarget.value);
    setSearchParams({ sort: sortSelect });
  };

  useEffect(() => {
    dispatch(
      filtersProducts({
        products,
        search: searchInput,
        sort: sortSelect
      }),
    );
  }, [dispatch, products, searchInput, sortSelect]);

  useEffect(() => {
    setSearchParams({ search: searchInput, sort: sortSelect });
  }, [searchParams]);
  return (
    <div className='products'>
      <aside className='products-filter'>
        <ProductsFilter />
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select value={sortSelect} onChange={handleSortParams} />
          <Switch products={filterProducts} changeStyle={setGrid} />
          <Search value={searchInput} onChange={handleSearchParams} />
        </div>
        <div className='products-items'>
          <TransitionGroup className={grid ? 'products-animation list' : 'products-animation'}>
            {filterProducts.map((product) => (
              <CSSTransition key={product.id} timeout={500} classNames='item'>
                <ProductItem item={product} isInTheCart={grid} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Products;
