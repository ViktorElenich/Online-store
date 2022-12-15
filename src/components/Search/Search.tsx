import { useState } from 'react';
import './Search.scss';

const Search = () => {
  const [focus, setFocus] = useState(false);

  const clickLabel = () => {
    setFocus(!focus);
  };
  return (
    <label
      className={focus ? 'search active' : 'search'}
      htmlFor='input_search'
      onClick={clickLabel}
    >
      <input id='input_search' type='text' />
    </label>
  );
};
export default Search;
