import { FC, FormEvent, useEffect, useState } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  StringParam,
  BooleanParam,
  useQueryParams,
  NumberParam,
} from 'use-query-params';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import { IProductsProps } from '../../interfaces';
import { getLocalStorage, setLocalStorage } from '../../utils';
import {
  BRAND_FILTERS,
  CATEGORY_FILTERS,
  GRID_STYLE,
  MAX_PRICE,
  MAX_STOCK,
  MIN_PRICE,
  MIN_STOCK,
  SEARCH_INPUT,
  SORT_SELECT,
} from '../../constants';
import './Products.scss';
import Loader from '../Loader/Loader';
import { filtersProducts } from '../../redux/slices/filterSlice';
import Pagination from '../Pagination/Pagination';

const Products: FC<IProductsProps> = ({ products }) => {
  let gridStatus: string | boolean = getLocalStorage(GRID_STYLE);
  if (gridStatus === '0') {
    gridStatus = false;
  } else {
    gridStatus = true;
  }
  const [grid, setGrid] = useState<boolean>(gridStatus || false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [searchInput, setSearchInput] = useState(
    getLocalStorage(SEARCH_INPUT) || '',
  );
  const [sortSelect, setSortSelect] = useState(
    getLocalStorage(SORT_SELECT) || '',
  );
  const [isLoading, setIsLoading] = useState(true);
  const filterProducts = useAppSelector((state) => state.filter.filterProducts);
  const [searchQuery, setSearchQuery] = useQueryParams({
    search: StringParam,
    sort: StringParam,
    list: BooleanParam,
    minStock: NumberParam,
    maxStock: NumberParam,
    minPrice: NumberParam,
    maxPrice: NumberParam,
  });
  const [minStockQuantity, setMinStockQuantity] = useState(
    JSON.parse(getLocalStorage(MIN_STOCK)) || 2,
  );
  const [maxStockQuantity, setMaxStockQuantity] = useState(
    JSON.parse(getLocalStorage(MAX_STOCK)) || 150,
  );
  const [minPriceQuantity, setMinPriceQuantity] = useState(
    JSON.parse(getLocalStorage(MIN_PRICE)) || 10.00,
  );
  const [maxPriceQuantity, setMaxPriceQuantity] = useState(
    JSON.parse(getLocalStorage(MAX_PRICE)) || 1749.00,
  );
  const dispatch = useAppDispatch();
  const categoriesChecked = Array.from(
    new Set(products.map((item) => item.category)),
  ).sort();
  const brandsChecked = Array.from(
    new Set(products.map((item) => item.brand)),
  ).sort();

  const [brandFilter, setBrandFilter] = useState<string[]>(
    getLocalStorage(BRAND_FILTERS) || brandsChecked,
  );
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    getLocalStorage(CATEGORY_FILTERS) || categoriesChecked,
  );

  const handleSearchParams = (e: FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
    setLocalStorage(SEARCH_INPUT, e.currentTarget.value);
    setSearchQuery({ search: searchInput }, 'pushIn');
  };
  const handleSortParams = (e: FormEvent<HTMLSelectElement>) => {
    setSortSelect(e.currentTarget.value);
    setLocalStorage(SORT_SELECT, e.currentTarget.value);
    setSearchQuery({ sort: sortSelect }, 'pushIn');
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(
      filtersProducts({
        products,
        search: searchInput,
        sort: sortSelect,
        brands: brandFilter,
        categories: categoryFilter,
        minStock: minStockQuantity,
        maxStock: maxStockQuantity,
        minPrice: minPriceQuantity,
        maxPrice: maxPriceQuantity,
      }),
    );
  }, [
    dispatch,
    products,
    searchInput,
    sortSelect,
    brandFilter,
    categoryFilter,
    minStockQuantity,
    maxStockQuantity,
    minPriceQuantity,
    maxPriceQuantity,
  ]);

  useEffect(() => {
    if (products.length > 0) setIsLoading(false);
  }, [products]);

  useEffect(() => {
    setSearchQuery({
      search: searchInput,
      sort: sortSelect,
      list: grid,
      minStock: minStockQuantity,
      maxStock: maxStockQuantity,
      minPrice: minPriceQuantity,
      maxPrice: maxPriceQuantity,
    });
  }, [
    searchQuery,
    searchInput,
    sortSelect,
    grid,
    minStockQuantity,
    maxStockQuantity,
    minPriceQuantity,
    maxPriceQuantity,
  ]);
  return (
    <div className='products'>
      <aside className='products-filter'>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsFilter
            searchSort={{
              brandFilter,
              categoryFilter,
              categoriesChecked,
              brandsChecked,
              minStockQuantity,
              maxStockQuantity,
              minPriceQuantity,
              maxPriceQuantity,
              setMinStockQuantity,
              setMaxStockQuantity,
              setMinPriceQuantity,
              setMaxPriceQuantity,
              setBrandFilter,
              setCategoryFilter,
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
