/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { FC, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../enums';
import IProductItemProp from '../../interfaces/IProductItemProp';
import ItemRating from '../Item/ItemRating';
import './ItemInformation.scss';

const ItemInformation:FC<IProductItemProp> = ({item, isInTheCart}) =>{

const itemImages = (item.images).filter(x => !x.includes("thumbnail"))

const [inCart, setInCart] = useState(isInTheCart);
const mainImage = useRef<null | HTMLImageElement>(null)
const changeFoto = (event:React.MouseEvent) => {
    const {target} = event;
    if(mainImage.current){
        mainImage.current.src = (target as HTMLImageElement).src;
    }   
    
}
return <div className = "item-information__wrapper">
            <div className = "breadcrumbs">
                 <span>
                 <NavLink to = {Routes.Home}>store</NavLink>
                    </span>
                 <div className = "arrow-right" />
                 <span>{item.category}</span>
                 <div className = "arrow-right" />
                 <span>{item.brand}</span>
                 <div className = "arrow-right" />
                 <span>{item.title}</span>
            </div>
                <div className = "item-information">
                    <div className = "item-information__main">
                        <h2 className = "item-information__title">{item.title}</h2>
                        <div className = "item-information__images-block">
                           
                            <div className = "images-block__main-foto">
                                <img src = {itemImages[0]} alt = {item.title} ref = {mainImage}/>
                            </div>
                            <div className = "images-block__alt-fotos" onClick = {changeFoto}>                           
                                {itemImages.map(imgurl=><img src = {imgurl} alt = "Other foto" />)}
                            </div>
                        </div>
                    </div>
                    <div className = "item-information__details">
                    <ItemRating itemRating = {item.rating}/>
                        <h3 className = "item-information__brand">{item.brand}</h3>
                        <p className = "item-information__category">{item.category}</p>
                        <p className = "item-information__description">{item.description}</p>                        
                        <p className = "item-information__stock">Stock: {item.stock}</p>
                        <p className = "item-information__discount">Discount: {item.discountPercentage}%</p>
                        <p className = "item-information__price">Price: ${item.price}.00</p>
                        <div className = "colored-bg" />
                        <div className = "item-information__btns">
                            <button className = "item-information__cartBtn btn" type = "button" onClick = {()=>inCart? setInCart(false): setInCart(true)} >{inCart? "Add to cart":"Added to cart"}</button>
                            <button className = "item-information__buyNow btn" type = "button">Buy now</button>
                        </div>
                    </div>
                </div>
        </div>
}
export default ItemInformation;