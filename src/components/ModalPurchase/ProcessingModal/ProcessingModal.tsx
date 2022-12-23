import '../ModalPurchasePage.scss';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { clearCart } from '../../../redux/slices/cartSlice';
import { IOpenHideModal } from '../../../interfaces';

const ProcessingModal: FC<IOpenHideModal> = ({ handleClose, show }) => {
  const [countSec, setCountSec] = useState(3);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountSec((prev) => prev - 1);
    }, 1000);
    if (countSec === 0) {
      handleClose();
      dispatch(clearCart());
      navigate('/');
    }
    return () => clearInterval(interval);
  }, [countSec]);

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
