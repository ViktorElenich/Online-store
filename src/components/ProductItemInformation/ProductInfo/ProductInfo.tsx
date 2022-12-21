import React, { FC, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RoutesEnum } from '../../../enums';
import { IProductData, IPropItem } from '../../../interfaces';
import ModalPurchasePage from '../../ModalPurchase/ModalPurchasePage';
import ItemRating from '../../ProductItem/ProductItemRating';
import { useAppDispatch } from '../../../hooks';
import {
  calculatePrice,
  setCartProducts,
} from '../../../redux/slices/cartSlice';

const ProductInfo: FC<IPropItem> = ({ product }) => {
  const dispatch = useAppDispatch();
  const item = product[0];
  const itemImages = item.images.filter((x) => !x.includes('thumbnail'));

  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const mainImage = useRef<null | HTMLImageElement>(null);
  const changePhoto = (event: React.MouseEvent) => {
    const { target } = event;
    if (mainImage.current) {
      mainImage.current.src = (target as HTMLImageElement).src;
    }
  };
  const addToCart = (productItem: IProductData) => {
    dispatch(setCartProducts(productItem));
    dispatch(calculatePrice());
  };

  return (
    <>
      <div className='breadcrumbs'>
        <span>
          <NavLink to={RoutesEnum.Home}>store</NavLink>
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
              onClick={() => addToCart(item)}
            >
              {true ? 'Add to cart' : 'Added to cart'}
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
