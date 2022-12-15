import './ProductItem.scss';

import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ratingVisualizationFn from '../../utils/ratingVisualizationFn';

const ItemRating: FC<{ itemRating: number }> = (props) => {
  const { itemRating } = props;
  const starsArray = ratingVisualizationFn(itemRating);

  return (
    <div className='rating-wrapper'>
      {starsArray.map((imgSrc) => (
        <img key={uuidv4()} src={imgSrc} alt='Raiting' />
      ))}
    </div>
  );
};
export default ItemRating;