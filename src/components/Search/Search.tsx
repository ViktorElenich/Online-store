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
    >
      <input
        id='input_search'
        type='text'
        onClick={clickLabel}
      />
    </label>
  );
};
export default Search;
