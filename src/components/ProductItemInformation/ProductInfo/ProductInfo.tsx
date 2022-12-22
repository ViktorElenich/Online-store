import React, { FC, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import { IProductData, IPropItem } from '../../../interfaces';
import ModalPurchasePage from '../../ModalPurchase/ModalPurchasePage';
import ItemRating from '../../ProductItem/ProductItemRating';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  calculatePrice,
  calculateTotalQuantity,
  removeCartProduct,
  setCartProducts,
} from '../../../redux/slices/cartSlice';

const ProductInfo: FC<IPropItem> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const item = product[0];
  const itemImages = item.images.filter((x) => !x.includes('thumbnail'));

  const productsInCart = useAppSelector((state) => state.cart.products);

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isInTheCart, setIsInTheCart] = useState(
    productsInCart.some((x) => x.product.id === item.id),
  );

  const mainImage = useRef<null | HTMLImageElement>(null);
  const changePhoto = (event: React.MouseEvent) => {
    const { target } = event;
    if (mainImage.current) {
      mainImage.current.src = (target as HTMLImageElement).src;
    }
  };
  const addToCart = (productItem: IProductData) => {
    setIsInTheCart(true);
    dispatch(setCartProducts(productItem));
    dispatch(calculateTotalQuantity());
    dispatch(calculatePrice());
  };
  const removeItemFromCart = (productItem: IProductData) => {
    setIsInTheCart(false);
    dispatch(removeCartProduct(productItem));
  };

  const changeCurrentItemInCart = (productItem: IProductData) => {
    if (isInTheCart) removeItemFromCart(productItem);
    else addToCart(productItem);
  };

  return (
    <>
      <div className='breadcrumbs'>
        <span role='presentation' onClick={() => navigate('/')}>
          store
        </span>
        <div className='arrow-right' />
        <span>{item.category}</span>
        <div className='arrow-right' />
        <span>{item.brand}</span>
        <div className='arrow-right' />
        <span>{item.title}</span>
      </div>
      <div className='item-information'>
        <div className='item-information__main'>
          <h2 className='item-information__title'>{item.title}</h2>
          <div className='item-information__images-block'>
            <div className='images-block__main-foto'>
              <img src={itemImages[0]} alt={item.title} ref={mainImage} />
            </div>
            <div
              role='presentation'
              className='images-block__alt-fotos'
              onClick={changePhoto}
            >
              {itemImages.map((imgUrl) => (
                <img key={uuidv4()} src={imgUrl} alt='Other foto' />
              ))}
            </div>
          </div>
        </div>
        <div className='item-information__details'>
          <ItemRating itemRating={item.rating} />
          <h3 className='item-information__brand'>{item.brand}</h3>
          <p className='item-information__category'>{item.category}</p>
          <p className='item-information__description'>{item.description}</p>
          <p className='item-information__stock'>Stock: {item.stock}</p>
          <p className='item-information__discount'>
            Discount: {item.discountPercentage}%
          </p>
          <p className='item-information__price'>Price: ${item.price}.00</p>
          <div className='colored-bg' />
          <div className='item-information__btns'>
            <button
              className='item-information__cartBtn btn'
              type='button'
              onClick={() => changeCurrentItemInCart(item)}
            >
              {isInTheCart ? 'Remove from cart' : 'Add to cart'}
            </button>
            <button
              className='item-information__buyNow btn'
              type='button'
              onClick={() => setOpenPaymentModal(true)}
            >
              Buy now
            </button>
            <ModalPurchasePage
              handleClose={() => {
                setOpenPaymentModal(false);
              }}
              show={openPaymentModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
