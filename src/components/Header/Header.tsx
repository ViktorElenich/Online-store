import { NavLink } from 'react-router-dom';
import './Header.scss';
import { RoutesEnum } from '../../enums';

const Header = () => (
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
      <span className="total-payment">$0</span>
      <div className='header-user__cart'>
        <NavLink to={RoutesEnum.Cart} />
      </div>
      <div className='header-user__login'>
        Login
        <NavLink to={RoutesEnum.Login} />
      </div>
    </div>
  </header>
);

export default Header;
