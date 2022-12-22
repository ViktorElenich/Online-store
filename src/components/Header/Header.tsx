import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { RoutesEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  calculatePrice,
  calculateTotalQuantity,
} from '../../redux/slices/cartSlice';

const Header = () => {
  const totalAmount = useAppSelector((state) => state.cart.cartTotalAmount);
  const totalQuantity = useAppSelector((state) => state.cart.cartTotalQuantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculatePrice());
  }, []);

  return (
    <header className='header'>
      <div className='header__burger'>
        <div id='burger'>
          <div className='bar topBar' />
          <div className='bar btmBar' />
        </div>
      </div>
      <div className='header__logo'>
        <h1>Online-Store</h1>
      </div>
      <nav className='header__navigation'>
        <ul className='navigation_menu'>
          <li className='menu__item'>
            <NavLink to={RoutesEnum.Home}>Home</NavLink>
          </li>
          <li className='menu__item'>
            <NavLink to={RoutesEnum.About}>About Us</NavLink>
          </li>
        </ul>
      </nav>
      <div className='header-user'>
        <span className='total-payment'>${totalAmount}</span>
        <div className='header-user__cart'>
          <NavLink to={RoutesEnum.Cart}>
            {totalQuantity ? <span>{totalQuantity}</span> : null}
          </NavLink>
        </div>
        <div className='header-user__login'>
          <div className='header-user'>
            <div className='header-user__login'>
              Login
              <NavLink to={RoutesEnum.Login} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
