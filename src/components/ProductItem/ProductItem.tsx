import { FC, useState } from 'react';
import ItemRating from './ProductItemRating';

import './ProductItem.scss';
import cartIconFull from '../../assets/cart-icon_full.png';
import cartIconEmpty from '../../assets/cart-icon_empty.png';
import IProductItemProp from '../../interfaces/index';

const ItemBlockCard: FC<IProductItemProp> = ({ item, isInTheCart }) => {
  const [inCart, setInCart] = useState(isInTheCart);
  const changeInCart = (): void =>
    inCart ? setInCart(false) : setInCart(true);
  return (
    <div className='block-card' id={`${item.id}`}>
      <div
        className='block-card__image'
        style={{ backgroundImage: `url(${item.images[0]})` }}
      />
      <div className='discount-line'>
        Discount: {item.discountPercentage}%
      </div>
      <div className='block-card__details'>
        <div className='block-card__description'>
          <span>{item.description}</span>
        </div>
        <span className='block-card__item-title'>{item.title}</span>
        <ItemRating itemRating={item.rating} />
        <span className='block-card__item-brand'>{item.brand}</span>
        <button
          className='block-card__cart'
          type='button'
          onClick={changeInCart}
        >
          <img
            src={inCart ? cartIconFull : cartIconEmpty}
            alt={inCart ? 'Item is in the cart' : 'Add to cart'}
          />
        </button>
        <span className='block-card__price'>${item.price}.00</span>
      </div>
    </div>
  );
};
export default ItemBlockCard;
