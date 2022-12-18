/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Switch from "../Switch/Switch";
import Select from '../Select/Select';
import { IProductsProps } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { GRID_STYLE, SEARCH_INPUT, SORT_SELECT } from '../../constants';
import './Products.scss';
import Loader from '../Loader/Loader';



const Products: FC<IProductsProps> = ({ products }) => {
  let gridStatus: string | boolean = getLocalStorage(GRID_STYLE);
  if (gridStatus === '0') {
    gridStatus = false;
  } else {
    gridStatus = true;
  }
  const [grid, setGrid] = useState<boolean>(gridStatus || false);
  const [searchInput, setSearchInput] = useState(
    getLocalStorage(SEARCH_INPUT) || '',
  );
  const [sortSelect, setSortSelect] = useState(
    getLocalStorage(SORT_SELECT) || '',
  );

  const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
if(products.length>0)setIsLoading(false)
},[products])

  const filterProducts = useAppSelector((state) => state.filter.filterProducts);
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams({
      search: searchInput,
      sort: sortSelect,
      list: JSON.stringify(grid),
    });
  }, [searchParams, searchInput, sortSelect, grid]);
  return (
    <div className='products'>
      <aside className='products-filter'>
      {isLoading ? <Loader /> : 
        <ProductsFilter  searchSort={{products, search: searchInput,
        sort: sortSelect}} />}
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select value={sortSelect} onChange={handleSortParams} />
          <Switch products={filterProducts} changeStyle={setGrid} />
          <Search value={searchInput} onChange={handleSearchParams} />
        </div>
        <div className='products-items'>
          <TransitionGroup
            className={grid ? 'products-animation list' : 'products-animation'}
          >
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
