/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ProductsFilter.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Nouislider, { NouisliderProps } from 'nouislider-react';
import 'nouislider-react/node_modules/nouislider/distribute/nouislider.css';
import { useSearchParams } from 'react-router-dom';
import { productsData } from '../../data/data';
import { IFilterBrand, IProductData } from '../../interfaces';
import { useAppDispatch } from '../../hooks';
import { filtersProducts } from '../../redux/slices/filterSlice';
import { BRAND_FILTERS, CATEGORY_FILTERS } from '../../constants';
import { setLocalStorage } from '../../utils';

const ProductsFilter:FC<IFilterBrand> = ({searchSort}) => {

  const [showMenuButton1, setShowMenuButton1] = useState(false);
  const [showMenuButton2, setShowMenuButton2] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {products, sort, search} = searchSort;
  const categoriesChecked = Array.from(new Set(products.map(item => item.category))).sort();
  const brandsChecked = Array.from(new Set(products.map(item => item.brand))).sort();

  const[brandFilter, setBrandFilter] = useState<string[]>(brandsChecked);
  const[categoryFilter, setCategoryFilter] = useState<string[]>(categoriesChecked);
  const [categoryShowAllChecked, setCategoryShowAllChecked] = useState(true)
  const [brandsShowAllChecked, setBrandsShowAllChecked] = useState(true)
 
  const dispatch = useAppDispatch();

  const toggleButton1 = () => {
    setShowMenuButton1(!showMenuButton1);
  };
  const toggleButton2 = () => {
    setShowMenuButton2(!showMenuButton2);
  };

  const handleBrandFilter = (e: ChangeEvent<HTMLInputElement>)=>{
    const target = e.target as HTMLInputElement;
    const {id, checked} = target;     
    if(checked){
      setBrandFilter([...brandFilter, id])      
    } else{
      setBrandFilter(brandFilter.filter((x)=> x!==id));   
    }
    setSearchParams({brands:brandFilter})
    setLocalStorage(BRAND_FILTERS, JSON.stringify([...brandFilter, id]));
  }
  const handleCategoryFilter = (e: ChangeEvent<HTMLInputElement>)=>{
    const target = e.target as HTMLInputElement;
    const {id, checked} = target;     
    if(checked){
      setCategoryFilter([...categoryFilter, id])      
    } else{
      setCategoryFilter(categoryFilter.filter((x)=> x!==id));   
    }
    setSearchParams({categories:categoryFilter})
    setLocalStorage(CATEGORY_FILTERS,  JSON.stringify([...categoryFilter, id]));
  }
  const isChecked = (arr:string[], name:string) =>arr.includes(name)

  const handleShowAllCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const {checked} = target; 
    if(checked){
      setCategoryShowAllChecked(true)
      setCategoryFilter(categoriesChecked)
      setSearchParams({categories:"all"})
      setLocalStorage(CATEGORY_FILTERS,  JSON.stringify(categoriesChecked))
    }
    else {
      setCategoryShowAllChecked(false)
      setCategoryFilter([])
      setSearchParams({categories:""})
      setLocalStorage(CATEGORY_FILTERS,  "")
    }
  }
  const handleShowAllbrands = (e: ChangeEvent<HTMLInputElement>) =>{
    const target = e.target as HTMLInputElement;
    const {checked} = target; 
    if(checked){
      setBrandsShowAllChecked(true)
      setBrandFilter(brandsChecked)
      setSearchParams({Brands:"all"})
      setLocalStorage(BRAND_FILTERS,  JSON.stringify(brandsChecked))
    }
    else {
      setBrandsShowAllChecked(false)
      setBrandFilter([])
      setSearchParams({Brands:""})
      setLocalStorage(BRAND_FILTERS,  "")
    }
  }
  
  useEffect(()=>{
    dispatch(
      filtersProducts({
      products,
      search,
      sort,
      brands:brandFilter,
      categories:categoryFilter
      }))
 } , [dispatch,products, search, sort, brandFilter,categoryFilter]);

 useEffect(() => {
  setSearchParams({  search, sort, brands:  JSON.stringify(brandFilter), categories: JSON.stringify(categoryFilter) });
}, [searchParams]);

 
  return (
    <>
      <div className='filter__priceStock'>
        <div className='stock'>
          <span>Stock</span>
          <Nouislider
            range={{ min: 0, max: 100 }}
            start={[0, 100]}
            step={1}
            tooltips
            format={{
              to: (value) => value,
              from: (value) => value as number,
            }}
           // onUpdate={changePriceRange}
          />
        </div>
        <div className='price'>
          <span>Price</span>
          <Nouislider
            range={{ min: 0, max: 1800 }}
            start={[0, 1800]}
            tooltips
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
                 <li key={uuidv4()} className="additional-checkbox">
                  
                      <label htmlFor="categoryShowAll">Show all
                      <input type="checkbox" id="categoryShowAll" checked={categoryShowAllChecked} onChange={handleShowAllCategories}/></label>
                 </li>
                  
            {categoriesChecked.map((cat) => (             
              <li key={uuidv4()}>
                <label htmlFor={cat}>{cat}</label>
                <input id={cat} type='checkbox' checked = {isChecked(categoryFilter, cat)} onChange={handleCategoryFilter}/>
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

              <li key={uuidv4()} className="additional-checkbox">                  
                  <label htmlFor="brandsShowAll">Show all
                  <input type="checkbox" id="brandsShowAll" checked={brandsShowAllChecked} onChange={handleShowAllbrands}/></label>
             </li>

            {brandsChecked.map((brand) => (
              <li key={uuidv4()}>
                <label htmlFor={brand} >{brand}</label>
                <input id={brand} type='checkbox' checked={isChecked(brandFilter, brand)} onChange={handleBrandFilter} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <div className='filter__buttons'>
        <button className='filter__btn' type='button'>
          Reset
        </button>
        <button className='filter__btn' type='button'>
          Copy Link
        </button>
      </div>
    </>
  );
};

export default ProductsFilter;
