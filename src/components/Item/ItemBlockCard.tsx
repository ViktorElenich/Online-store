import React from 'react';
import IProductItem from '../../interfaces/IProductItem';
import ItemRating from './ItemRating';
import './Item.scss';

import cartIconFull from '../../assets/cart-icon_full.png';
import cartIconEmpty from '../../assets/cart-icon_empty.png';


interface IProductItemProp {
    item:IProductItem,
    isInTheCart:boolean
}

const ItemBlockCard = (props:IProductItemProp) =>{
    const {item, isInTheCart} = props;
    const [inCart, setInCart]= React.useState(isInTheCart);
    const changeInCart=():void=>inCart? setInCart(false): setInCart(true)

return (
    <div className="block-card">
        <div className="block-card__image" style={{backgroundImage:`url(${item.images[0]})`}}/>
        <div className="discount-line">Discount: {item.discountPercentage}%</div>
        <div className="block-card__details">
            <span className="block-card__item-title">{item.title}</span>
        
            <ItemRating itemRating={item.rating}/>

            <span className="block-card__item-brand">{item.brand}</span>
            
            <button className="block-card__cart" type="button" onClick={changeInCart}>
                <img src={isInTheCart? cartIconFull: cartIconEmpty} alt={isInTheCart? "Item is in the cart": "Add to cart"} />
            </button>
            <span className="block-card__price">${item.price}.00</span>

        </div>
    </div>
)
}
export default ItemBlockCard;