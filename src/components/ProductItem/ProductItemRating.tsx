import { v4 as uuid } from 'uuid';
import './ProductItem.scss';
import starFullIcon from '../../assets/star-icon_full.png';
import starHalfIcon from '../../assets/star-icon_half.png';
import starEmptyIcon from '../../assets/star-icon_empty.png';

const ProductItemRating = (props: { itemRating: number; }) => {
  const { itemRating } = props;
  const rating = Math.floor(itemRating);
  const tail = itemRating % rating;

  let fullStars = 0;
  let emptyStars = 0;
  let halfStars = 0;
  if (tail < 0.35) [fullStars, halfStars, emptyStars] = [rating, 0, 5 - rating];
  else if (tail >= 0.35 && tail <= 0.65)
    [fullStars, halfStars, emptyStars] = [rating, 1, 4 - rating];
  else [fullStars, halfStars, emptyStars] = [rating + 1, 0, 5 - rating - 1];

  const starsArray = [];

  for (let i = 1; i <= fullStars; i++) {
    starsArray.push(starFullIcon);
  }
  for (let i = 1; i <= halfStars; i++) {
    starsArray.push(starHalfIcon);
  }
  for (let i = 1; i <= emptyStars; i++) {
    starsArray.push(starEmptyIcon);
  }

  return (
    <div className='rating-wrapper'>
      {starsArray.map((x) => (
        <img key={uuid()} src={x} alt='Raiting' />
      ))}
    </div>
  );
};
export default ProductItemRating;
