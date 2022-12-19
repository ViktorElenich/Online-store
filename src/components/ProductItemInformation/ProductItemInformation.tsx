import {FC, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import ItemRating from '../ProductItem/ProductItemRating';
import './ProductItemInformation.scss';
import useFetchCollection from '../../hooks/useFetchCollection';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../hooks';
import { RoutesEnum } from '../../enums';

const ProductItemInformation: FC = () => {
  const { isLoading } = useFetchCollection('products');
  const products = useAppSelector((state) => state.products.products);
  const dataID = window.location.pathname.split('/').pop();
  const item = products.filter((x) => x.id === Number(dataID))[0];
  const itemImages = item.images.filter((x) => !x.includes('thumbnail'));

  //const [inCart, setInCart] = useState(isInTheCart);
  const mainImage = useRef<null | HTMLImageElement>(null);
  const changePhoto = (event: React.MouseEvent) => {
    const { target } = event;
    if (mainImage.current) {
      mainImage.current.src = (target as HTMLImageElement).src;
    }
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className='item-information__wrapper'>
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
            <div className='images-block__alt-fotos' onClick={changePhoto}>
              <div
                role='presentation'
                className='images-block__alt-fotos'
                onClick={changePhoto}
              >
                {itemImages.map((imgUrl) => (
                  <img src={imgUrl} alt='Other foto' />
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
                onClick={() => {}}
              >
                {true ? 'Add to cart' : 'Added to cart'}
              </button>
              <button className='item-information__buyNow btn' type='button'>
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemInformation;
