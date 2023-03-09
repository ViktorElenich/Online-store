import { useEffect, useState } from 'react';
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
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState(false);

  const toggleBurgerMenu = () => {
    setIsShowBurgerMenu(!isShowBurgerMenu);
  };

  useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculatePrice());
  }, []);

  return (
    <header className='header'>
      <div className='header__burger'>
        <button className={!isShowBurgerMenu ? 'burger' : 'burger active'} type='button' onClick={toggleBurgerMenu}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <NavLink to='/' className='header__logo'>
        <h1>Online-Store</h1>
      </NavLink>
      <nav className='header__navigation'>
        <ul className={!isShowBurgerMenu ? 'navigation_menu' : 'navigation_menu active'}>
          <li className='menu__item' onClick={toggleBurgerMenu} role='menuitem'>
            <NavLink to={RoutesEnum.Home}>Home</NavLink>
          </li>
          <li className='menu__item' onClick={toggleBurgerMenu} role='menuitem'>
            <NavLink to={RoutesEnum.Products}>Products</NavLink>
          </li>
          <li className='menu__item' onClick={toggleBurgerMenu} role='menuitem'>
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
        {/* <div className='header-user__login'>
          <div className='header-user'>
            <div className='header-user__login'>
              Login
              <NavLink to={RoutesEnum.Login} />
            </div>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
