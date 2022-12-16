import './Select.scss';

const Select = () => (
  <div className='select'>
    <select name='sort' className='sort-select'>
      <option defaultValue=''>Select a Sort...</option>
      <option value='price-ASC'>Sort by price ASC</option>
      <option value='price-DESC'>Sort by price DESC</option>
      <option value='rating-ASC'>Sort by rating ASC</option>
      <option value='rating-DESC'>Sort by rating DESC</option>
      <option value='discount-ASC'>Sort by discount ASC</option>
      <option value='discount-DESC'>Sort by discount DESC</option>
    </select>
  </div>
);

export default Select;
