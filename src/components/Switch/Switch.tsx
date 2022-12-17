import { BsFillGridFill } from 'react-icons/bs';
import { FaListAlt } from 'react-icons/fa';
import { FC } from 'react';
import { ISwitch } from '../../interfaces';
import './Switch.scss';
import { setLocalStorage } from '../../utils';
import { GRID_STYLE } from '../../constants';

const Switch: FC<ISwitch> = ({ products, changeStyle }) => (
  <div className='icons'>
    <BsFillGridFill
      size={22}
      color='#424242'
      onClick={() => {
        changeStyle(false);
        setLocalStorage(GRID_STYLE, JSON.stringify(false));
      }}
    />
    <FaListAlt
      size={24}
      color='#424242'
      onClick={() => {
        changeStyle(true);
        setLocalStorage(GRID_STYLE, JSON.stringify(true));
      }}
    />
    <p>
      <b>{products.length}</b> Products found.
    </p>
  </div>
);

export default Switch;
