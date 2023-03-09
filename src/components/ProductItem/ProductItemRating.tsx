import './ProductItem.scss';
import React /* , { FC } */ from 'react';
import { v4 as uuidv4 } from 'uuid';
import ratingVisualizationFn from '../../utils/ratingVisualizationFn';

class ItemRating extends React.Component<{ itemRating: number }> {
  itemRating;

  starsArray;

  constructor(props: { itemRating: number }) {
    super(props);
    this.itemRating = props.itemRating;
    this.starsArray = ratingVisualizationFn(this.itemRating);
  }

  render() {
    return (
      <div className='rating-wrapper'>
        {this.starsArray.map((imgSrc) => (
          <img key={uuidv4()} src={imgSrc} alt='Raiting' />
        ))}
      </div>
    );
  }
}

export default ItemRating;
