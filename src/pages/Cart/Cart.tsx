import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Cart.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  calculatePrice,
  calculateTotalQuantity,
  decreaseCartProduct,
  removeCartProduct,
  setCartProducts,
  clearCart,
} from '../../redux/slices/cartSlice';
import { IProductData } from '../../interfaces';
import { PRODUCTS_PER_PAGE, TH } from '../../constants';
import { RoutesEnum } from '../../enums';
import Pagination from '../../components/Pagination/Pagination';
import OrderSummary from './Oredrsummary/OrderSummary';
import { getLocalStorage, setLocalStorage } from '../../utils';
import ModalPurchasePage from '../../components/ModalPurchase/ModalPurchasePage';

const Cart = () => {
  const cartProducts = useAppSelector((state) => state.cart);
  const { products: cartItems, cartTotalAmount } = cartProducts;
  const modalState = useLocation();
  let openModal = false;
  if (modalState.state) openModal = modalState.state.openModal;
  const [open, setOpen] = useState(openModal);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(
    getLocalStorage(PRODUCTS_PER_PAGE) || 3,
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = cartItems.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const increaseCountProduct = (cart: IProductData) => {
    dispatch(setCartProducts(cart));
  };
  const decreaseCountProduct = (cart: IProductData) => {
    dispatch(decreaseCartProduct(cart));
  };
  const removeItemFromCart = (cart: IProductData) => {
    dispatch(removeCartProduct(cart));
  };
  const changeShowItems = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    let { value } = event.target as HTMLInputElement;
    if (!value) {
      setProductPerPage(productsPerPage);
    }
    if (Number.isNaN(Number(value))) {
      value = `${productsPerPage}`;
    }
    setProductPerPage(Number(value));
    setLocalStorage(PRODUCTS_PER_PAGE, value);
  };

  const clearCartAction = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculatePrice());
    dispatch(calculateTotalQuantity());
  }, [dispatch, cartItems]);

  return (
    <>
      {' '}
      <ModalPurchasePage
        handleClose={() => {
          setOpen(false);
        }}
        show={open}
      />
      <div className='cart-wrapper'>
        <div className='cart'>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className='cart__empty'>
              <p>Your cart is currently empty.</p>
              <br />
              <div>
                <Link to={RoutesEnum.Home}>&larr; Continue shopping</Link>
              </div>
            </div>
          ) : (
            <>
              <div className='cart-items__limit'>
                <p>Items</p>
                <input
                  type='text'
                  value={productsPerPage}
                  onInput={changeShowItems}
                />
              </div>
              <div className='cart__table'>
                <table>
                  <thead>
                    <tr>
                      {TH.map((item) => (
                        <th key={uuidv4()}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((item, index) => {
                      const { id, title, thumbnail, price } = item.product;
                      const { productQuantity } = item;
                      return (
                        <tr key={id}>
                          <td>
                            {index + 1 + (currentPage - 1) * productsPerPage}
                          </td>
                          <td>
                            <p>
                              <b>{title}</b>
                            </p>
                            <img
                              className='cart__img'
                              src={thumbnail}
                              alt={title}
                            />
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className='table__count'>
                              <button
                                className='btn cart__btn'
                                type='button'
                                onClick={() =>
                                  decreaseCountProduct(item.product)
                                }
                              >
                                -
                              </button>
                              <p>
                                <b>{productQuantity}</b>
                              </p>
                              <button
                                className={
                                  item.product.stock <= item.productQuantity
                                    ? 'btn cart__btn disabled'
                                    : 'btn cart__btn'
                                }
                                type='button'
                                onClick={() =>
                                  increaseCountProduct(item.product)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>{(price * productQuantity).toFixed(2)}</td>
                          <td className='table__icons'>
                            <FaTrashAlt
                              size={19}
                              color='red'
                              onClick={() => removeItemFromCart(item.product)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                productsPerPage={productsPerPage || 3}
                totalProducts={cartItems.length}
              />
              <div className='cart__summary'>
                <button
                  className='btn btn__clear'
                  type='button'
                  onClick={clearCartAction}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
        {cartTotalAmount > 0 ? (
          <OrderSummary cartProducts={cartProducts} />
        ) : (
          ''
        )}
      </div>{' '}
    </>
  );
};

export default Cart;
