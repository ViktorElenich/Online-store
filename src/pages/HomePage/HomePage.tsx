import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from '../../data/sliderData';
import { RoutesEnum } from '../../enums';
import './HomePage.scss';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoScroll = true;
  let sliderInterval: NodeJS.Timer;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1,
    );
  };
  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1,
    );
  };

  const auto = () => {
    sliderInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(sliderInterval);
  }, [currentSlide]);

  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
      {sliderData.map((item) => (
        <div
          key={item.id}
          className={item.id === currentSlide ? 'slide current' : 'slide'}
        >
          {item.id === currentSlide && (
            <>
              <img src={item.image} alt={item.heading} />
              <div className='content'>
                <h2>{item.heading}</h2>
                <p>{item.desc}</p>
                <hr />
                <Link to={RoutesEnum.Products} className='btn__link btn-primary'>
                  Shop Now
                </Link>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
