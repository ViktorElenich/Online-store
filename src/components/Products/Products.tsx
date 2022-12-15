import { FC, FormEvent, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProductItem from '../ProductItem/ProductItem';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Search from '../Search/Search';
import Select from '../Select/Select';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Products.scss';
import { filterSearch } from '../../redux/slices/filterSlice';
import { IProductsProps } from '../../interfaces';

const Products: FC<IProductsProps> = ({ products }) => {
  const [search, setSearch] = useState('');
  const filterProducts = useAppSelector((state) => state.filter.filterProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      filterSearch({
        products,
        search,
      }),
    );
  }, [dispatch, products, search]);
  return (
    <div className='products'>
      <aside className='products-filter'>
        <ProductsFilter />
      </aside>
      <div className='products-wrapper'>
        <div className='products-wrapper__sortSearch'>
          <Select />
          <Search
            value={search}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setSearch(e.currentTarget.value)
            }
          />
        </div>
        <div className='products-items'>
          <TransitionGroup className='products-animation'>
            {filterProducts.map((product) => (
              <CSSTransition key={product.id} timeout={500} classNames='item'>
                <ProductItem
                  item={product}
                  isInTheCart={false}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Products;
