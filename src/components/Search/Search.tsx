import { FC, useState } from 'react';
import { ISearch } from '../../interfaces';
import './Search.scss';

const Search: FC<ISearch> = ({ value, onChange }) => {
  const [focus, setFocus] = useState(false);

  const clickLabel = () => {
    setFocus(!focus);
  };
  return (
    <label
      className={focus || value ? 'search active' : 'search'}
      htmlFor='input_search'
    >
      <input
        value={value}
        id='input_search'
        type='text'
        onFocus={clickLabel}
        onChange={onChange}
      />
    </label>
  );
};
export default Search;
