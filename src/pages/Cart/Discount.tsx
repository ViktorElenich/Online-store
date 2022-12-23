import { useState } from 'react';

import crossIcon from '../../assets/plus-icon.png';

const Discount = (prop: {
  message: string;
  quantity: number;
  applied: boolean;
  handleApply: () => void;
}) => {
  const { message, quantity, applied, handleApply } = prop;
  const [appl, setAppl] = useState(applied);

  return (
    <div
      className='discount-message'
      role='presentation'
      onClick={() => {
        handleApply();
        setAppl(!appl);
      }}
    >
      {message} - {quantity}%
      <img
        src={crossIcon}
        alt={appl ? 'Remove discount' : 'Add discount'}
        className={
          appl
            ? 'discount-message__btn remove-discount'
            : 'discount-message__btn'
        }
      />
    </div>
  );
};
export default Discount;
