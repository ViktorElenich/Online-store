import './ProductsFilter.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  DelimitedArrayParam,
} from 'use-query-params';
import { v4 as uuidv4 } from 'uuid';
import Nouislider from 'nouislider-react';
import 'nouislider-react/node_modules/nouislider/distribute/nouislider.css';
import { IFilterBrand } from '../../interfaces';
import { SHOW_BRANDS, SHOW_CATEGORIES } from '../../constants';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filtersProducts } from '../../redux/slices/filterSlice';

const ProductsFilter: FC<IFilterBrand> = ({ searchSort }) => {
  const { products, sort, search } = searchSort;

  const minStockInit = Math.min(...products.map((x) => x.stock));
  const maxStockInit = Math.max(...products.map((x) => x.stock));
  const minPriceInit = Math.min(...products.map((x) => x.price));
  const maxPriceInit = Math.max(...products.map((x) => x.price));
  let currentMaxStock = maxStockInit;
  let currentMinStock = minStockInit;
  let currentMinPrice = minPriceInit;
  let currentMaxPrice = maxPriceInit;

  const [searchQuery, setSearchQuery] = useQueryParams({
    search: StringParam,
    sort: StringParam,
    brands: DelimitedArrayParam,
    categories: DelimitedArrayParam,
    minStock: NumberParam,
    maxStock: NumberParam,
    minPrice: NumberParam,
    maxPrice: NumberParam,
  });
  const dispatch = useAppDispatch();
  const filtered = useAppSelector((state) => state.filter.filterProducts);

  const categoriesChecked = Array.from(
    new Set(products.map((item) => item.category)),
  ).sort();
  const brandsChecked = Array.from(
    new Set(products.map((item) => item.brand)),
  ).sort();

  const currCategories =
    !searchQuery.categories ||
    searchQuery.categories.includes(null) ||
    searchQuery.categories[0] === 'All'
      ? categoriesChecked
      : searchQuery.categories;
  const currBrands =
    !searchQuery.brands ||
    searchQuery.brands.includes(null) ||
    searchQuery.brands[0] === 'All'
      ? brandsChecked
      : searchQuery.brands;

  const [minStockQuantity, setMinStockQuantity] = useState(
    searchQuery.minStock || minStockInit,
  );
  const [maxStockQuantity, setMaxStockQuantity] = useState(
    searchQuery.maxStock || maxStockInit,
  );
  const [minPriceQuantity, setMinPriceQuantity] = useState(
    searchQuery.minPrice || minPriceInit,
  );
  const [maxPriceQuantity, setMaxPriceQuantity] = useState(
    searchQuery.maxPrice || maxPriceInit,
  );
  const [currentMinStockQuantity, setCurrentMinStockQuantity] = useState(
    searchQuery.minStock || minStockInit,
  );
  const [currentMaxStockQuantity, setCurrentMaxStockQuantity] = useState(
    searchQuery.maxStock || maxStockInit,
  );
  const [currentMinPriceQuantity, setCurrentMinPriceQuantity] = useState(
    searchQuery.minPrice || minPriceInit,
  );
  const [currentMaxPriceQuantity, setCurrentMaxPriceQuantity] = useState(
    searchQuery.maxPrice || maxPriceInit,
  );

  const [copied, setCopied] = useState(false);
  const [showMenuButton1, setShowMenuButton1] = useState(
    getLocalStorage(SHOW_CATEGORIES) &&
      JSON.parse(getLocalStorage(SHOW_CATEGORIES)),
  );
  const [showMenuButton2, setShowMenuButton2] = useState(
    getLocalStorage(SHOW_BRANDS) && JSON.parse(getLocalStorage(SHOW_BRANDS)),
  );

  const [brandFilter, setBrandFilter] = useState<(string | null)[]>(currBrands);
  const [categoryFilter, setCategoryFilter] =
    useState<(string | null)[]>(currCategories);

  const toggleButton1 = () => {
    setShowMenuButton1(!showMenuButton1);
    setLocalStorage(SHOW_CATEGORIES, JSON.stringify(!showMenuButton1));
  };
  const toggleButton2 = () => {
    setShowMenuButton2(!showMenuButton2);
    setLocalStorage(SHOW_BRANDS, JSON.stringify(!showMenuButton2));
  };

  const handleBrandFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;
    if (checked) {
      if (brandFilter.length < brandsChecked.length)
        setBrandFilter([...brandFilter, id]);
      else setBrandFilter([id]);
    } else {
      if (brandFilter.length === 0) setBrandFilter(brandsChecked);
      setBrandFilter(brandFilter.filter((x) => x !== id));
    }
    setSearchQuery({ brands: brandFilter }, 'pushIn');
  };
  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;

    if (checked) {
      if (categoryFilter.length < categoriesChecked.length)
        setCategoryFilter([...categoryFilter, id]);
      else setCategoryFilter([id]);
    } else {
      if (categoryFilter.length === 0) setCategoryFilter(categoriesChecked);
      setCategoryFilter(categoryFilter.filter((x) => x !== id));
    }

    setSearchQuery({ categories: categoryFilter }, 'pushIn');
  };

  const categoryIsChecked = (name: string) => {
    if (
      categoryFilter.length === 0 ||
      categoryFilter.length === categoriesChecked.length ||
      (searchQuery.categories && searchQuery.categories[0] === 'All')
    )
      return false;
    return categoryFilter.includes(name);
  };
  const brandIsChecked = (name: string) => {
    if (
      brandFilter.length === 0 ||
      brandFilter.length === brandsChecked.length ||
      (searchQuery.brands && searchQuery.brands[0] === 'All')
    )
      return false;
    return brandFilter.includes(name);
  };

  const changeCurrentStockRange = (event: Array<number>) => {
    setCurrentMinStockQuantity(event[0]);
    setCurrentMaxStockQuantity(event[1]);
  };
  const changeCurrentPriceRange = (event: Array<number>) => {
    setCurrentMinPriceQuantity(event[0]);
    setCurrentMaxPriceQuantity(event[1]);
  };
  const changeStockRange = (event: Array<number>) => {
    setMinStockQuantity(event[0]);
    setMaxStockQuantity(event[1]);
  };
  const changePriceRange = (event: Array<number>) => {
    setMinPriceQuantity(event[0]);
    setMaxPriceQuantity(event[1]);
  };

  const handleResetFilters = () => {
    setMinStockQuantity(minStockInit);
    setMaxStockQuantity(maxStockInit);
    setMinPriceQuantity(minPriceInit);
    setMaxPriceQuantity(maxPriceInit);
    setBrandFilter(brandsChecked);
    setCategoryFilter(categoriesChecked);
    setSearchQuery(
      {
        brands: brandFilter,
        categories: categoryFilter,
      },
      'pushIn',
    );
  };

  const handleCopyLink = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  useEffect(() => {
    setSearchQuery({
      brands: brandFilter,
      categories: categoryFilter,
      minStock: minStockQuantity,
      maxStock: maxStockQuantity,
      minPrice: minPriceQuantity,
      maxPrice: maxPriceQuantity,
    });

    if (categoryFilter.length === categoriesChecked.length) {
      setSearchQuery({ categories: ['All'] }, 'replaceIn');
    }
    if (categoryFilter.length === 0) setCategoryFilter(categoriesChecked);

    if (brandFilter.length === brandsChecked.length) {
      setSearchQuery(
        {
          brands: ['All'],
        },
        'replaceIn',
      );
    }
    if (brandFilter.length === 0) setBrandFilter(brandsChecked);
  }, [searchQuery, brandFilter, categoryFilter]);
  useEffect(() => {
    dispatch(
      filtersProducts({
        products,
        search,
        sort,
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
    search,
    sort,
    brandFilter,
    categoryFilter,
    minStockQuantity,
    maxStockQuantity,
    minPriceQuantity,
    maxPriceQuantity,
  ]);
  useEffect(() => {
    setSearchQuery({
      minStock: minStockQuantity,
      maxStock: maxStockQuantity,
      minPrice: minPriceQuantity,
      maxPrice: maxPriceQuantity,
    });
    if (minStockQuantity === minStockInit) {
      setSearchQuery({ minStock: undefined }, 'replaceIn');
    }
    if (maxStockQuantity === maxStockInit) {
      setSearchQuery({ maxStock: undefined }, 'replaceIn');
    }
    if (minPriceQuantity === minPriceInit) {
      setSearchQuery({ minPrice: undefined }, 'replaceIn');
    }
    if (maxPriceQuantity === maxPriceInit) {
      setSearchQuery({ maxPrice: undefined }, 'replaceIn');
    }
  }, [minStockQuantity, maxStockQuantity, minPriceQuantity, maxPriceQuantity]);

  useEffect(() => {
    currentMaxStock = Math.max(...filtered.map((x) => x.stock));
    currentMinStock = Math.min(...filtered.map((x) => x.stock));
    currentMinPrice = Math.min(...filtered.map((x) => x.price));
    currentMaxPrice = Math.max(...filtered.map((x) => x.price));

    if (currentMaxStock === -Infinity) currentMaxStock = maxStockQuantity;
    if (currentMinStock === Infinity) currentMinStock = minStockQuantity;
    if (currentMinPrice === Infinity) currentMinPrice = minPriceQuantity;
    if (currentMaxPrice === -Infinity) currentMaxPrice = maxPriceQuantity;

    changeCurrentPriceRange([currentMinPrice, currentMaxPrice]);

    changeCurrentStockRange([currentMinStock, currentMaxStock]);
  }, [filtered]);

  return (
    <>
      <div className='filter__priceStock'>
        <div className='stock'>
          <span>Stock</span>
          <Nouislider
            range={{ min: 2, max: 150 }}
            start={[currentMinStockQuantity, currentMaxStockQuantity]}
            step={1}
            tooltips
            format={{
              to: (value) => Math.ceil(value),
              from: (value) => Math.floor(value as number),
            }}
            onChange={changeStockRange}
          />
        </div>
        <div className='price'>
          <span>Price</span>
          <Nouislider
            range={{ min: 10, max: 1749 }}
            start={[currentMinPriceQuantity, currentMaxPriceQuantity]}
            step={10}
            tooltips
            format={{
              to: (value) => Math.ceil(value),
              from: (value) => Math.floor(value as number),
            }}
            onChange={changePriceRange}
          />
        </div>
      </div>
      <ul className='filter-dropdown'>
        <li className='dropdown'>
          <button
            className='btn__dropdown'
            type='button'
            data-toggle='dropdown'
            onClick={toggleButton1}
          >
            Category{' '}
            <i className={showMenuButton1 ? 'arrow active' : 'arrow'} />
          </button>
          <ul
            className={
              showMenuButton1 ? 'dropdown-menu show' : 'dropdown-menu hide'
            }
          >
            {categoriesChecked.map((cat) => (
              <li key={uuidv4()}>
                <label
                  htmlFor={cat}
                  className={
                    filtered.filter((x) => x.category === cat).length === 0
                      ? 'menu-item-disabled'
                      : 'menu-item-standart'
                  }
                >
                  {cat}
                </label>
                <span
                  className={
                    filtered.filter((x) => x.category === cat).length === 0
                      ? 'menu-item menu-item-disabled'
                      : 'menu-item menu-item-standart'
                  }
                >
                  {filtered.filter((x) => x.category === cat).length}/
                  {products.filter((x) => x.category === cat).length}
                </span>
                <input
                  id={cat}
                  type='checkbox'
                  checked={categoryIsChecked(cat)}
                  onChange={handleCategoryFilter}
                />
              </li>
            ))}
          </ul>
        </li>
        <li className='dropdown'>
          <button
            className='btn__dropdown'
            type='button'
            data-toggle='dropdown'
            onClick={toggleButton2}
          >
            Brand <i className={showMenuButton2 ? 'arrow active' : 'arrow'} />
          </button>
          <ul
            className={
              showMenuButton2 ? 'dropdown-menu show' : 'dropdown-menu hide'
            }
          >
            {brandsChecked.map((brand) => (
              <li key={uuidv4()}>
                <label
                  htmlFor={brand}
                  className={
                    filtered.filter((x) => x.brand === brand).length === 0
                      ? 'menu-item-disabled'
                      : 'menu-item-standart'
                  }
                >
                  {brand}
                </label>
                <span
                  className={
                    filtered.filter((x) => x.brand === brand).length === 0
                      ? 'menu-item menu-item-disabled'
                      : 'menu-item menu-item-standart'
                  }
                >
                  {filtered.filter((x) => x.brand === brand).length}/
                  {products.filter((x) => x.brand === brand).length}
                </span>
                <input
                  id={brand}
                  type='checkbox'
                  checked={brandIsChecked(brand)}
                  onChange={handleBrandFilter}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <div className='filter__buttons'>
        <button
          className='filter__btn'
          type='button'
          onClick={handleResetFilters}
        >
          Reset
        </button>
        <button className='filter__btn' type='button' onClick={handleCopyLink}>
          {!copied ? 'Copy Link' : 'Copied'}
        </button>
      </div>
    </>
  );
};

export default ProductsFilter;
