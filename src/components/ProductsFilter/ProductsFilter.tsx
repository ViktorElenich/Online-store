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
import {
  BRAND_ALL_FILTERS,
  BRAND_FILTERS,
  CATEGORY_ALL_FILTERS,
  CATEGORY_FILTERS,
  SHOW_BRANDS,
  SHOW_CATEGORIES,
} from '../../constants';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { filtersProducts } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../hooks';

const ProductsFilter: FC<IFilterBrand> = ({ filters }) => {
  const dispatch = useAppDispatch();
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
  const { products, searchInput, sortSelect } = filters;
  const minStockInit = 2;
  const maxStockInit = 150;
  const minPriceInit = 10.0;
  const maxPriceInit = 1749.0;
  const [copied, setCopied] = useState(false);
  const [showMenuButton1, setShowMenuButton1] = useState(
    getLocalStorage(SHOW_CATEGORIES)
      ? getLocalStorage(SHOW_CATEGORIES) === '1'
      : false,
  );
  const [showMenuButton2, setShowMenuButton2] = useState(
    getLocalStorage(SHOW_BRANDS) ? getLocalStorage(SHOW_BRANDS) === '1' : false,
  );
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
  const categoriesChecked = Array.from(
    new Set(products.map((item) => item.category)),
  ).sort();
  const brandsChecked = Array.from(
    new Set(products.map((item) => item.brand)),
  ).sort();

  const searchQueryBrand = searchQuery.brands as string[];
  const searchQueryCategory = searchQuery.brands as string[];
  const [brandFilter, setBrandFilter] = useState(
    searchQueryBrand.includes('All') ? brandsChecked : searchQuery.brands,
  );
  const [categoryFilter, setCategoryFilter] = useState(
    searchQueryCategory.includes('All') ? categoriesChecked : searchQuery.categories,
  );

  const [categoryShowAllChecked, setCategoryShowAllChecked] = useState(
    getLocalStorage(CATEGORY_ALL_FILTERS)
      ? getLocalStorage(CATEGORY_ALL_FILTERS) === '1'
      : true,
  );
  const [brandsShowAllChecked, setBrandsShowAllChecked] = useState(
    getLocalStorage(BRAND_ALL_FILTERS)
      ? getLocalStorage(BRAND_ALL_FILTERS) === '1'
      : true,
  );

  const toggleButton1 = () => {
    setShowMenuButton1(!showMenuButton1);
  };
  const toggleButton2 = () => {
    setShowMenuButton2(!showMenuButton2);
  };

  const handleBrandFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;
    if (checked) {
      setBrandFilter([...(brandFilter as string[]), id]);
    } else {
      setBrandFilter((brandFilter as string[]).filter((x) => x !== id));
      setBrandsShowAllChecked(false);
    }
    if ((brandFilter as string[]).length === 0) {
      setBrandsShowAllChecked(false);
    }
    if ((brandFilter as string[]).length === brandsChecked.length)
      setSearchQuery({ brands: ['all'] });
    else setSearchQuery({ brands: brandFilter });
  };
  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;
    if (checked) {
      setCategoryFilter([...(categoryFilter as string[]), id]);
    } else {
      setCategoryFilter((categoryFilter as string[]).filter((x) => x !== id));
      setCategoryShowAllChecked(false);
    }
    if ((categoryFilter as string[]).length === 0) {
      setCategoryShowAllChecked(false);
    }
    setSearchQuery({ categories: categoryFilter }, 'pushIn');
  };
  const isChecked = (arr: string[], name: string) => arr.includes(name);

  const handleShowAllCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { checked } = target;
    if (checked) {
      setCategoryShowAllChecked(true);
      setCategoryFilter(categoriesChecked);
      setSearchQuery({ categories: categoriesChecked }, 'pushIn');
    } else {
      setCategoryShowAllChecked(false);
      setCategoryFilter([]);
    }
  };
  const handleShowAllBrands = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { checked } = target;
    if (checked) {
      setBrandsShowAllChecked(true);
      setBrandFilter(brandsChecked);
      setSearchQuery({ brands: brandsChecked }, 'pushIn');
    } else {
      setBrandsShowAllChecked(false);
      setBrandFilter([]);
    }
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
    setMinStockQuantity(2);
    setMaxStockQuantity(150);
    setMinPriceQuantity(10.0);
    setMaxPriceQuantity(1749.0);
    setCategoryShowAllChecked(true);
    setBrandsShowAllChecked(true);
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
    setLocalStorage(CATEGORY_ALL_FILTERS, categoryShowAllChecked ? '1' : '0');
    setLocalStorage(BRAND_ALL_FILTERS, brandsShowAllChecked ? '1' : '0');
    setLocalStorage(
      CATEGORY_FILTERS,
      categoryShowAllChecked
        ? JSON.stringify(categoriesChecked)
        : JSON.stringify(categoryFilter),
    );
    setLocalStorage(
      BRAND_FILTERS,
      brandsShowAllChecked
        ? JSON.stringify(brandsChecked)
        : JSON.stringify(brandFilter),
    );
  }, [
    categoryShowAllChecked,
    brandsShowAllChecked,
    categoryFilter,
    brandFilter,
  ]);

  useEffect(() => {
    setLocalStorage(SHOW_CATEGORIES, showMenuButton1 ? '1' : '0');
    setLocalStorage(SHOW_BRANDS, showMenuButton2 ? '1' : '0');
  }, [showMenuButton1, showMenuButton2]);

  useEffect(() => {
    setSearchQuery({
      brands: brandFilter,
      categories: categoryFilter,
      minStock: minStockQuantity,
      maxStock: maxStockQuantity,
      minPrice: minPriceQuantity,
      maxPrice: maxPriceQuantity,
    });
    if ((brandFilter as string[]).length === 0) {
      setSearchQuery(
        {
          brands: null,
        },
        'replaceIn',
      );
    }
    if ((categoryFilter as string[]).length === 0) {
      setSearchQuery(
        {
          categories: null,
        },
        'replaceIn',
      );
    }
    if ((brandFilter as string[]).length === brandsChecked.length) {
      setBrandsShowAllChecked(true);
      setSearchQuery({
        brands: ['All'],
      });
    }
    if ((categoryFilter as string[]).length === categoriesChecked.length) {
      setCategoryShowAllChecked(true);
      setSearchQuery({
        categories: ['All'],
      });
    }
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
  }, [
    searchQuery,
    brandFilter,
    categoryFilter,
    minStockQuantity,
    maxStockQuantity,
    minPriceQuantity,
    maxPriceQuantity,
  ]);

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

  return (
    <>
      <div className='filter__priceStock'>
        <div className='stock'>
          <span>Stock</span>
          <Nouislider
            range={{ min: 2, max: 150 }}
            start={[minStockQuantity, maxStockQuantity]}
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
            start={[minPriceQuantity, maxPriceQuantity]}
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
            <li key={uuidv4()} className='additional-checkbox'>
              <label htmlFor='categoryShowAll'>
                Show all
                <input
                  type='checkbox'
                  id='categoryShowAll'
                  checked={categoryShowAllChecked}
                  onChange={handleShowAllCategories}
                />
              </label>
            </li>

            {categoriesChecked.map((cat) => (
              <li key={uuidv4()}>
                <label htmlFor={cat}>{cat}</label>
                <input
                  id={cat}
                  type='checkbox'
                  checked={
                    categoryShowAllChecked || isChecked((categoryFilter as string[]), cat)
                  }
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
            <li key={uuidv4()} className='additional-checkbox'>
              <label htmlFor='brandsShowAll'>
                Show all
                <input
                  type='checkbox'
                  id='brandsShowAll'
                  checked={brandsShowAllChecked}
                  onChange={handleShowAllBrands}
                />
              </label>
            </li>

            {brandsChecked.map((brand) => (
              <li key={uuidv4()}>
                <label htmlFor={brand}>{brand}</label>
                <input
                  id={brand}
                  type='checkbox'
                  checked={
                    brandsShowAllChecked || isChecked((brandFilter as string[]), brand)
                  }
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
