import { FC, useState } from 'react';
import './Search.scss';
import { ISearch } from '../../interfaces';

const Search: FC<ISearch> = ({ value, onChange }) => {
  const [focus, setFocus] = useState(false);

  const clickLabel = () => {
    setFocus(!focus);
  };
  return (
    <label
      className={focus ? 'search active' : 'search'}
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
