import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import ModalPurchasePage from '../../../components/ModalPurchase/ModalPurchasePage';

import { RoutesEnum } from '../../../enums';
import { ICart } from '../../../interfaces';
import Discount from '../Discount/Discount';

import './OrderSummary.scss';

type ICartProp = { cartProducts: ICart };

const OrderSummary: FC<ICartProp> = ({ cartProducts }) => {
  const { cartTotalQuantity, cartTotalAmount } = cartProducts;
  const [RSSdiscount, EPMdiscount] = [0.1, 0.2];

  const [slideUp, setSlideUp] = useState(false);
  const [slideDown, setSlideDown] = useState(false);

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
      setSlideUp(true);
      setTimeout(() => {
        setDiscRSS({ ...discRSS, applied: true });
        setTotalPayment(totalPayment - cartTotalAmount * RSSdiscount);
        setSlideUp(false);
      }, 200);
    } else {
      setSlideDown(true);
      setTimeout(() => {
        setDiscRSS({ found: true, applied: false });
        setTotalPayment(totalPayment + cartTotalAmount * RSSdiscount);
        setSlideDown(false);
      }, 200);
      if (discEPM.found && !discEPM.applied)
        setDiscEPM({ ...discEPM, found: false });
    }
  };
  const applyEPMDicsount = () => {
    if (!discEPM.applied) {
      setSlideUp(true);
      setTimeout(() => {
        setDiscEPM({ ...discEPM, applied: true });
        setTotalPayment(totalPayment - cartTotalAmount * EPMdiscount);
        setSlideUp(false);
      }, 200);
    } else {
      setSlideDown(true);
      setTimeout(() => {
        setDiscEPM({ found: true, applied: false });
        setTotalPayment(totalPayment + cartTotalAmount * EPMdiscount);
        setSlideDown(false);
      }, 200);
      if (discRSS.found && !discRSS.applied)
        setDiscEPM({ ...discRSS, found: false });
    }
  };

  useEffect(() => {
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
      <ModalPurchasePage
        handleClose={() => {
          setOpenBuyNow(false);
        }}
        show={openBuyNow}
      />
      <div className='continue-shopping'>
        <Link to={RoutesEnum.Products}>&larr; Continue shopping</Link>
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
          <CSSTransition in={slideDown} timeout={200} classNames='rss-goDown'>
            <span className='rss-goDown'>
              {discRSS.applied && (
                <Discount
                  message='Rolling Scopes School'
                  quantity={RSSdiscount * 100}
                  applied={discRSS.applied}
                  handleApply={applyRSSDicsount}
                />
              )}
            </span>
          </CSSTransition>
          <CSSTransition in={slideDown} timeout={200} classNames='rss-goDown'>
            <span className='rss-goDown'>
              {discEPM.applied && (
                <Discount
                  message='EPAM Systems'
                  quantity={EPMdiscount * 100}
                  applied={discEPM.applied}
                  handleApply={applyEPMDicsount}
                />
              )}
            </span>
          </CSSTransition>
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
          <CSSTransition in={slideUp} timeout={200} classNames='rss-goUp'>
            <span className='rss-goUp'>
              {discRSS.found && !discRSS.applied && (
                <Discount
                  message='Rolling Scopes School'
                  quantity={RSSdiscount * 100}
                  applied={discRSS.applied}
                  handleApply={applyRSSDicsount}
                />
              )}
            </span>
          </CSSTransition>
          <CSSTransition in={slideUp} timeout={200} classNames='rss-goUp'>
            <span className='rss-goUp'>
              {discEPM.found && !discEPM.applied && (
                <Discount
                  message='EPAM Systems'
                  quantity={EPMdiscount * 100}
                  applied={discEPM.applied}
                  handleApply={applyEPMDicsount}
                />
              )}
            </span>
          </CSSTransition>
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
