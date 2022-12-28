import { FC, FormEvent, useEffect, useState } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { StringParam, BooleanParam, useQueryParams } from 'use-query-params';
import { MdSettingsSuggest } from 'react-icons/md';
import { BsXLg } from 'react-icons/bs';
import { useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import { IProductsProps } from '../../interfaces';

import './Products.scss';
import Loader from '../Loader/Loader';

import Pagination from '../Pagination/Pagination';

const Products: FC<IProductsProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useQueryParams({
    search: StringParam,
    sort: StringParam,
    list: BooleanParam,
  });

  const gridStatus: boolean = searchQuery.list ? searchQuery.list : true;

  const [grid, setGrid] = useState<boolean>(gridStatus || false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchInput, setSearchInput] = useState(searchQuery.search || '');
  const [sortSelect, setSortSelect] = useState(searchQuery.sort || '');

  const [isLoading, setIsLoading] = useState(true);
  const filterProducts = useAppSelector((state) => state.filter.filterProducts);

  const handleSearchParams = (e: FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);

    setSearchQuery({ search: searchInput }, 'pushIn');
  };
  const handleSortParams = (e: FormEvent<HTMLSelectElement>) => {
    setSortSelect(e.currentTarget.value);

    setSearchQuery({ sort: sortSelect }, 'pushIn');
  };

  const toggleBurgerMenu = () => {
    setShowFilters(!showFilters);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  useEffect(() => {
    if (products.length > 0) setIsLoading(false);
  }, [products]);

  useEffect(() => {
    setSearchQuery({
      search: searchInput,
      sort: sortSelect,
      list: grid,
    });
    if (searchInput.length === 0) {
      setSearchQuery({ search: undefined }, 'replaceIn');
    }
    if (sortSelect.length === 0) {
      setSearchQuery({ sort: undefined }, 'replaceIn');
    }
  }, [searchQuery, searchInput, sortSelect, grid]);
  return (
    <div className='products'>
      <div
        className='filters__burger'
        role='presentation'
        onClick={toggleBurgerMenu}
      >
        {!showFilters ? <MdSettingsSuggest size={24} /> : <BsXLg size={22} />}
      </div>
      <aside
        className={!showFilters ? 'products-filter' : 'products-filter active'}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsFilter
            searchSort={{
              products,
              search: searchInput,
              sort: sortSelect,
            }}
          />
        )}
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
            {currentProducts.map((product) => (
              <CSSTransition key={product.id} timeout={500} classNames='item'>
                <ProductItem item={product} isInTheCart={grid} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filterProducts.length}
        />
      </div>
    </div>
  );
};

export default Products;
