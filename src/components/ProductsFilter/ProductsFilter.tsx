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
  MAX_PRICE,
  MAX_STOCK,
  MIN_PRICE,
  MIN_STOCK,
  SHOW_BRANDS,
  SHOW_CATEGORIES,
} from '../../constants';
import { getLocalStorage, setLocalStorage } from '../../utils';

const ProductsFilter: FC<IFilterBrand> = ({ searchSort }) => {
  const [searchQuery, setSearchQuery] = useQueryParams({
    search: StringParam,
    sort: StringParam,
    brands: DelimitedArrayParam,
    categories: DelimitedArrayParam,
    minStock: NumberParam,
    maxStock: NumberParam,
  });
  const [copied, setCopied] = useState(false);
  const [showMenuButton1, setShowMenuButton1] = useState(
    getLocalStorage(SHOW_CATEGORIES)
      ? getLocalStorage(SHOW_CATEGORIES) === '1'
      : false,
  );
  const [showMenuButton2, setShowMenuButton2] = useState(
    getLocalStorage(SHOW_BRANDS) ? getLocalStorage(SHOW_BRANDS) === '1' : false,
  );

  const {
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
  } = searchSort;

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
      setBrandFilter([...brandFilter, id]);
    } else {
      setBrandFilter(brandFilter.filter((x) => x !== id));
      setBrandsShowAllChecked(false);
    }
    if (brandFilter.length === 0) setBrandsShowAllChecked(false);
    setSearchQuery({ brands: brandFilter });
  };
  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { id, checked } = target;
    if (checked) {
      setCategoryFilter([...categoryFilter, id]);
    } else {
      setCategoryFilter(categoryFilter.filter((x) => x !== id));
      setCategoryShowAllChecked(false);
    }
    if (categoryFilter.length === 0) setCategoryShowAllChecked(false);
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
      setSearchQuery({ categories: [] }, 'pushIn');
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
      setSearchQuery({ brands: [] }, 'pushIn');
    }
  };

  const changeStockRange = (event: Array<number>) => {
    setMinStockQuantity(event[0]);
    setLocalStorage(MIN_STOCK, JSON.stringify(event[0]));
    setMaxStockQuantity(event[1]);
    setLocalStorage(MAX_STOCK, JSON.stringify(event[1]));
  };
  const changePriceRange = (event: Array<number>) => {
    setMinPriceQuantity(event[0]);
    setLocalStorage(MIN_PRICE, JSON.stringify(event[0]));
    setMaxPriceQuantity(event[1]);
    setLocalStorage(MAX_PRICE, JSON.stringify(event[1]));
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
    setSearchQuery({
      brands: brandFilter,
      categories: categoryFilter,
    }, 'pushIn');
  };

  const handleCopyLink = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
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
    });
    if (brandFilter.length === brandsChecked.length) setBrandsShowAllChecked(true);
    if (categoryFilter.length === categoriesChecked.length) setCategoryShowAllChecked(true);
  }, [searchQuery, brandFilter, categoryFilter]);

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
              to: (value) => value,
              from: (value) => value as number,
            }}
            onUpdate={changeStockRange}
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
              to: (value) => value,
              from: (value) => value as number,
            }}
            onUpdate={changePriceRange}
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
                    categoryShowAllChecked || isChecked(categoryFilter, cat)
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
                    brandsShowAllChecked || isChecked(brandFilter, brand)
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
