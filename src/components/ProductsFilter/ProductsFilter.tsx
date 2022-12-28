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
import { getLocalStorage } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { filtersProducts } from '../../redux/slices/filterSlice';

const ProductsFilter: FC<IFilterBrand> = ({ searchSort }) => {
  const minStockInit = 2;
  const maxStockInit = 150;
  const minPriceInit = 10.0;
  const maxPriceInit = 1749.0;

  const { products, sort, search } = searchSort;

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

  const categoriesChecked = Array.from(
    new Set(products.map((item) => item.category)),
  ).sort();
  const brandsChecked = Array.from(
    new Set(products.map((item) => item.brand)),
  ).sort();

  const currCategories =
    !searchQuery.categories || searchQuery.categories[0] === 'All'
      ? categoriesChecked
      : searchQuery.categories;
  const currBrands =
    !searchQuery.brands || searchQuery.brands[0] === 'All'
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
  const [copied, setCopied] = useState(false);
  const [showMenuButton1, setShowMenuButton1] = useState(
    getLocalStorage(SHOW_CATEGORIES)
      ? getLocalStorage(SHOW_CATEGORIES) === '1'
      : false,
  );
  const [showMenuButton2, setShowMenuButton2] = useState(
    getLocalStorage(SHOW_BRANDS) ? getLocalStorage(SHOW_BRANDS) === '1' : false,
  );

  const [brandFilter, setBrandFilter] = useState<string[]>(
    (currBrands as string[]) || brandsChecked,
  );
  const [categoryFilter, setCategoryFilter] = useState<string[]>(
    (currCategories as string[]) || categoriesChecked,
  );

  const [categoryShowAllChecked, setCategoryShowAllChecked] = useState(
    !!(!searchQuery.categories || searchQuery.categories[0] === 'All'),
  );

  const [brandsShowAllChecked, setBrandsShowAllChecked] = useState(
    !!(!searchQuery.brands || searchQuery.brands[0] === 'All'),
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
    if (brandFilter.length === 0) {
      setBrandsShowAllChecked(false);
    }
    if (brandFilter.length === brandsChecked.length)
      setSearchQuery({ brands: ['all'] });
    else setSearchQuery({ brands: brandFilter });
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
    if (categoryFilter.length === 0) {
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
    setSearchQuery({
      brands: brandFilter,
      categories: categoryFilter,
    });
    if (brandFilter.length === 0) {
      setSearchQuery(
        {
          brands: null,
        },
        'replaceIn',
      );
    }
    if (categoryFilter.length === 0) {
      setSearchQuery(
        {
          categories: null,
        },
        'replaceIn',
      );
    }
    if (brandFilter.length === brandsChecked.length) {
      setBrandsShowAllChecked(true);
      setSearchQuery({
        brands: ['All'],
      });
    }
    if (categoryFilter.length === categoriesChecked.length) {
      setCategoryShowAllChecked(true);
      setSearchQuery({
        categories: ['All'],
      });
    }
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
