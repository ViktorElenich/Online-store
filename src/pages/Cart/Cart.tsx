import { Link } from 'react-router-dom';
import './Cart.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { useAppSelector } from '../../hooks';

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.products);
  const cartTotalQuantity = useAppSelector(
    (state) => state.cart.cartTotalQuantity,
  );
  const cartTotalAmount = useAppSelector((state) => state.cart.cartTotalAmount);
  console.log(cartItems);
  return (
    <div className='cart'>
      <h2>Shopping Cart</h2>
      <div className='cart__table'>
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              const { id, title, thumbnail, price } = item.product;
              const { productQuantity } = item;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <p>
                      <b>{title}</b>
                    </p>
                    <img className='cart__img' src={thumbnail} alt={title} />
                  </td>
                  <td>{price}</td>
                  <td>
                    <div className='table__count'>
                      <button className='btn cart__btn' type='button'>
                        -
                      </button>
                      <p>
                        <b>{productQuantity}</b>
                      </p>
                      <button className='btn cart__btn' type='button'>
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(price * productQuantity).toFixed(2)}</td>
                  <td className='table__icons'>
                    <FaTrashAlt size={19} color='red' />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='cart__summary'>
        <button className='btn btn__clear' type='button'>
          Clear Cart
        </button>
        <div className='cart__checkout'>
          <div>
            <Link to='/'>&larr; Continue shopping</Link>
          </div>
          <br />
          <div className='cart__card'>
            <p>
              <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className='cart__text'>
              <h4>Subtotal:</h4>
              <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
            </div>
            <p>Tax an shipping calculated at checkout</p>
            <button className='btn btn_check' type='button'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
