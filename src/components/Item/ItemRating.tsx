import './Item.scss';

import { FC } from 'react';
import ratingVisualizationFn from '../../utils/ratingVisualizationFn';

const ItemRating: FC<{ itemRating: number }> = (props) => {
  const { itemRating } = props;
  const starsArray = ratingVisualizationFn(itemRating);

  return (
    <div className='rating-wrapper'>
      {starsArray.map((imgSrc) => (
        <img src={imgSrc} alt='Raiting' />
      ))}
    </div>
  );
};
export default ItemRating;
