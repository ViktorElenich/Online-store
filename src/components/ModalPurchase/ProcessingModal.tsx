import './ModalPurchasePage.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { IOpenHideModal } from '../../interfaces';

const ProcessingModal: FC<IOpenHideModal> = ({ handleClose, show }) => {
  const [countSec, setCountSec] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountSec((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (countSec < 0) {
    handleClose();
    navigate('/');
  }

  return (
    <div
      className={
        show ? 'modal-darkbg-redirect modal-show' : 'modal-darkbg-redirect'
      }
    >
      <div className='processing-wrapper'>
        <span className='processing__message'>
          Thanks for your order. Redirect in {countSec}{' '}
          {countSec === 1 ? 'second' : 'seconds'}
        </span>
      </div>
    </div>
  );
};

export default ProcessingModal;
