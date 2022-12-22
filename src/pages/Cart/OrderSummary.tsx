/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FC, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalPurchasePage from '../../components/ModalPurchase/ModalPurchasePage';
import ProcessingModal from '../../components/ModalPurchase/ProcessingModal';
import { RoutesEnum } from '../../enums';
import { ICart } from '../../interfaces';
import Discount from './Discount';

import './OrderSummary.scss';

type ICartProp = { cartProducts: ICart };

const OrderSummary: FC<ICartProp> = ({ cartProducts }) => {
  const { cartTotalQuantity, cartTotalAmount } = cartProducts;
  const [RSSdiscount, EPMdiscount] = [10, 20];
  const navigate = useNavigate();
  const [openRedirect, setOpenRedirect] = useState(false);

  const [discRSS, setDiscRSS] = useState({ found: false, applied: false });
  const [discEPM, setDiscEPM] = useState({ found: false, applied: false });

  const [lastAppliedRSS, setLastAppliedRSS] = useState(0);
  const [lastAppliedEPM, setLastAppliedEPM] = useState(0);
  const [totalPayment, setTotalPayment] = useState(cartTotalAmount);
  const [openBuyNow, setOpenBuyNow] = useState(false);

  const checkDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.toUpperCase() === 'RSS') {
      setDiscRSS({ ...discRSS, found: true });
    } else if (target.value.toUpperCase() === 'EPM') {
      setDiscEPM({ ...discEPM, found: true });
    } else {
      setDiscRSS({ ...discRSS, found: false });
      setDiscEPM({ ...discEPM, found: false });
    }
  };
  const applyRSSDicsount = () => {
    if (!discRSS.applied) {
      setLastAppliedRSS(Math.floor((totalPayment / 100) * RSSdiscount));
      setDiscRSS({ ...discRSS, applied: true });

      setTotalPayment(
        totalPayment - Math.floor((totalPayment / 100) * RSSdiscount),
      );
    } else {
      setDiscRSS({ found: true, applied: false });
      setTotalPayment(totalPayment + lastAppliedRSS);

      if (discEPM.found && !discEPM.applied)
        setDiscEPM({ applied: false, found: false });
    }
  };
  const applyEPMDicsount = () => {
    if (!discEPM.applied) {
      setLastAppliedEPM(Math.floor((totalPayment / 100) * EPMdiscount));
      setDiscEPM({ ...discEPM, applied: true });

      setTotalPayment(
        totalPayment - Math.floor((totalPayment / 100) * EPMdiscount),
      );
    } else {
      setDiscEPM({ found: true, applied: false });
      setTotalPayment(totalPayment + lastAppliedEPM);

      if (discRSS.found && !discRSS.applied)
        setDiscRSS({ applied: false, found: false });
    }
  };

  useEffect(() => {
    if (!discEPM.applied && !discRSS.applied) {
      setTotalPayment(cartTotalAmount);
      setLastAppliedRSS(0);
      setLastAppliedEPM(0);
    }
  }, [discRSS, discEPM]);
  useEffect(() => {
    setTotalPayment(cartTotalAmount);
    if (discEPM.applied)
      setTotalPayment(
        totalPayment - Math.floor((totalPayment / 100) * EPMdiscount),
      );
    if (discRSS.applied)
      setTotalPayment(
        totalPayment - Math.floor((totalPayment / 100) * RSSdiscount),
      );
  }, [cartTotalAmount]);

  return (
    <>
      {openBuyNow ? (
        <ModalPurchasePage
          handleClose={() => {
            setOpenBuyNow(false);
            setOpenRedirect(true);
            navigate('/');
          }}
          show={openBuyNow}
        />
      ) : (
        ''
      )}
      {openRedirect ? (
        <ProcessingModal
          handleClose={() => setOpenRedirect(false)}
          show={openRedirect}
        />
      ) : (
        ''
      )}
      <div className='continue-shopping'>
        <Link to={RoutesEnum.Home}>&larr; Continue shopping</Link>
      </div>
      <div className='order-summary-wrapper'>
        <p className='order-summary__quantity'>
          Products: <span>{cartTotalQuantity}</span>
        </p>

        <p className='order-summary__total '>
          Total:{' '}
          <span>
            {' '}
            $
            {totalPayment !== cartTotalAmount
              ? Math.floor(totalPayment)
              : cartTotalAmount}
            .00
          </span>
        </p>
        <p
          className={
            totalPayment !== cartTotalAmount &&
            (discEPM.applied || discRSS.applied)
              ? 'order-summary__total-cancelled'
              : 'order-summary__total-cancelled  hidden-block'
          }
        >
          Total: ${cartTotalAmount}.00
        </p>

        <div className='order-summary__applied-codes'>
          {discEPM.applied || discRSS.applied ? 'Applied codes:' : ''}
          {discRSS.applied && (
            <Discount
              message='Rolling Scopes School'
              quantity={RSSdiscount}
              applied={discRSS.applied}
              handleApply={applyRSSDicsount}
            />
          )}
          {discEPM.applied && (
            <Discount
              message='EPAM Systems'
              quantity={EPMdiscount}
              applied={discEPM.applied}
              handleApply={applyEPMDicsount}
            />
          )}
        </div>
        <label htmlFor='order-summary__input' className='order-summary__label'>
          Promo code
          <input
            type='text'
            id='order-summary__input'
            placeholder='Enter promo code'
            onChange={checkDiscount}
          />
        </label>

        <div className='order-summary__found-codes'>
          {discRSS.found && !discRSS.applied && (
            <Discount
              message='Rolling Scopes School'
              quantity={RSSdiscount}
              applied={discRSS.applied}
              handleApply={applyRSSDicsount}
            />
          )}
          {discEPM.found && !discEPM.applied && (
            <Discount
              message='EPAM Systems'
              quantity={EPMdiscount}
              applied={discEPM.applied}
              handleApply={applyEPMDicsount}
            />
          )}
        </div>

        <button
          type='button'
          className='order-summary__btn btn '
          onClick={() => setOpenBuyNow(true)}
        >
          Buy now
        </button>
      </div>
    </>
  );
};
export default OrderSummary;
