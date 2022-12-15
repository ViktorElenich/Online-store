/* eslint-disable no-plusplus */
import starFullIcon from "../assets/star-icon_full.png";
import starHalfIcon from "../assets/star-icon_half.png";
import starEmptyIcon from "../assets/star-icon_empty.png";

const ratingVisualizationFn = (itemRating: number) => {

    const rating = Math.floor(itemRating)
    const tail = itemRating - rating

    let fullStars = 0; let emptyStars = 0; let halfStars = 0;
    if (tail < 0.3) [fullStars, halfStars, emptyStars] = [rating, 0, (5 - rating)];
    else if (tail >= 0.3 && tail <= 0.75) [fullStars, halfStars, emptyStars] = [rating, 1, (4 - rating)];
    else[fullStars, halfStars, emptyStars] = [(rating + 1), 0, (5 - rating - 1)]

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
    return starsArray;
}

export default ratingVisualizationFn;