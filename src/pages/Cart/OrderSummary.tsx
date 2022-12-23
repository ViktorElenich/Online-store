import { ChangeEvent, FC, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalPurchasePage from '../../components/ModalPurchase/ModalPurchasePage';

import { RoutesEnum } from '../../enums';
import { ICart } from '../../interfaces';
import Discount from './Discount';

import './OrderSummary.scss';

type ICartProp = { cartProducts: ICart };

const OrderSummary: FC<ICartProp> = ({ cartProducts }) => {
  const { cartTotalQuantity, cartTotalAmount } = cartProducts;
  const [RSSdiscount, EPMdiscount] = [0.1, 0.2];

  const [discRSS, setDiscRSS] = useState({ found: false, applied: false });
  const [discEPM, setDiscEPM] = useState({ found: false, applied: false });

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
      setDiscRSS({ ...discRSS, applied: true });
      setTotalPayment(totalPayment - cartTotalAmount * RSSdiscount);
    } else {
      setDiscRSS({ found: true, applied: false });
      setTotalPayment(totalPayment + cartTotalAmount * RSSdiscount);

      if (discEPM.found && !discEPM.applied)
        setDiscEPM({ ...discEPM, found: false });
    }
  };
  const applyEPMDicsount = () => {
    if (!discEPM.applied) {
      setDiscEPM({ ...discEPM, applied: true });

      setTotalPayment(totalPayment - cartTotalAmount * EPMdiscount);
    } else {
      setDiscEPM({ found: true, applied: false });
      setTotalPayment(totalPayment + cartTotalAmount * EPMdiscount);

      if (discRSS.found && !discRSS.applied)
        setDiscEPM({ ...discRSS, found: false });
    }
  };

  useLayoutEffect(() => {
    if (!discEPM.applied && !discRSS.applied) {
      setTotalPayment(cartTotalAmount);
    } else if (discEPM.applied && discRSS.applied) {
      setTotalPayment(
        cartTotalAmount -
          Math.floor(cartTotalAmount * RSSdiscount) -
          Math.floor(cartTotalAmount * EPMdiscount),
      );
    } else if (discEPM.applied && !discRSS.applied)
      setTotalPayment(
        cartTotalAmount - Math.floor(cartTotalAmount * EPMdiscount),
      );
    else
      setTotalPayment(
        cartTotalAmount - Math.floor(cartTotalAmount * RSSdiscount),
      );
  }, [cartTotalAmount]);

  return (
    <>
      {openBuyNow ? (
        <ModalPurchasePage
          handleClose={() => {
            setOpenBuyNow(false);
          }}
          show={openBuyNow}
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
              quantity={RSSdiscount * 100}
              applied={discRSS.applied}
              handleApply={applyRSSDicsount}
            />
          )}
          {discEPM.applied && (
            <Discount
              message='EPAM Systems'
              quantity={EPMdiscount * 100}
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
              quantity={RSSdiscount * 100}
              applied={discRSS.applied}
              handleApply={applyRSSDicsount}
            />
          )}
          {discEPM.found && !discEPM.applied && (
            <Discount
              message='EPAM Systems'
              quantity={EPMdiscount * 100}
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
