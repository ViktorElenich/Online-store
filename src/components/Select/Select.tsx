import { FC } from 'react';
import './Select.scss';
import { ISelect } from '../../interfaces';

const Select: FC<ISelect> = ({ value, onChange }) => (
  <div className='select'>
    <select
      value={value}
      name='sort'
      className='sort-select'
      onChange={onChange}
    >
      <option defaultValue=''>Select a Sort...</option>
      <option value='lowest-price'>Lowest Price</option>
      <option value='highest-price'>Highest Price</option>
      <option value='lowest-rating'>Lowest Rating</option>
      <option value='highest-rating'>Highest Rating</option>
      <option value='lowest-discount'>Lowest Discount</option>
      <option value='highest-discount'>Highest Discount</option>
    </select>
  </div>
);

export default Select;
