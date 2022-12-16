import './ProductsFilter.scss';
import { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Nouislider from 'nouislider-react';
import 'nouislider-react/node_modules/nouislider/distribute/nouislider.css';
import { productsData } from '../../data/data';
import { IFilterBrand, IProductData } from '../../interfaces';

const ProductsFilter:FC<IFilterBrand> = ({onClick}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [showMenuButton1, setShowMenuButton1] = useState(false);
  const [showMenuButton2, setShowMenuButton2] = useState(false);

  const toggleButton1 = () => {
    setShowMenuButton1(!showMenuButton1);
  };
  const toggleButton2 = () => {
    setShowMenuButton2(!showMenuButton2);
  };

  useEffect(() => {
    const arrCategory: string[] = [];
    const arrBrand: string[] = [];
    productsData.products.forEach((product: IProductData) => {
      arrCategory.push(product.category);
      arrBrand.push(product.brand);
    });
    setCategories(
      arrCategory.filter((el, idx, self) => idx === self.indexOf(el)),
    );
    setBrands(arrBrand.filter((el, idx, self) => idx === self.indexOf(el)));
  }, []);
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
            {categories.map((cat) => (
              <li key={uuidv4()}>
                <label htmlFor={cat}>{cat}</label>
                <input id={cat} type='checkbox' />
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
            {brands.map((brand) => (
              <li key={uuidv4()}>
                <label htmlFor={brand}>{brand}</label>
                <input id={brand} type='checkbox' onClick={onClick} />
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
