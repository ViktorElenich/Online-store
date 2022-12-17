/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from '../Select/Select';

import { IProductsProps } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { SEARCH_INPUT, SORT_SELECT } from '../../constants';
import './Products.scss';


const Products: FC<IProductsProps> = ({ products }) => {
  const [searchInput, setSearchInput] = useState(
    getLocalStorage(SEARCH_INPUT) || '',
  );
  const [sortSelect, setSortSelect] = useState(
    getLocalStorage(SORT_SELECT) || '',
  );

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

  return (
    <div className='products'>
      <aside className='products-filter'>
        <ProductsFilter  searchSort={{products, search: searchInput,
        sort: sortSelect}} />
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select value={sortSelect} onChange={handleSortParams} />
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
