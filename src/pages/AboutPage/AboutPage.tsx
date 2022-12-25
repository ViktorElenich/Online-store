import { BsGithub } from 'react-icons/bs';
import './AboutPage.scss';

const AboutPage = () => (
  <div className='about__page'>
    <div className='member__card'>
      <div className='info__section'>
        <div className='info__section-member__team'>
          <h1>Viktor Elenich</h1>
          <h2>Junior Frontend Developer</h2>
        </div>
        <div className='info__section-text__about'>
          <p className='text'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            accusamus aspernatur at blanditiis cumque dolore eius, eveniet fuga
            illum iure molestias necessitatibus placeat praesentium quia quo
            recusandae unde, veniam? Aliquid atque commodi consequatur corporis
            culpa cum cumque cupiditate debitis distinctio, ducimus eligendi
            error excepturi, facere harum impedit inventore laborum libero
            maxime obcaecati officia optio perferendis porro provident qui
            quibusdam quidem ratione reiciendis repellendus temporibus velit
            vero voluptas, voluptates voluptatibus. Perspiciatis.
          </p>
        </div>
        <div className='info__section-social'>
          <ul>
            <li>
              <a href='https://github.com/ViktorElenich' rel='noreferrer'>
                <BsGithub size={26} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='member__photo photo' />
    </div>
    <div className='member__card'>
      <div className='info__section'>
        <div className='info__section-member__team'>
          <h1>Ekaterina Ekalape</h1>
          <h2>Junior Frontend Developer</h2>
        </div>
        <div className='info__section-text__about'>
          <p className='text'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            accusamus aspernatur at blanditiis cumque dolore eius, eveniet fuga
            illum iure molestias necessitatibus placeat praesentium quia quo
            recusandae unde, veniam? Aliquid atque commodi consequatur corporis
            culpa cum cumque cupiditate debitis distinctio, ducimus eligendi
            error excepturi, facere harum impedit inventore laborum libero
            maxime obcaecati officia optio perferendis porro provident qui
            quibusdam quidem ratione reiciendis repellendus temporibus velit
            vero voluptas, voluptates voluptatibus. Perspiciatis.
          </p>
        </div>
        <div className='info__section-social'>
          <ul>
            <li>
              <a href='https://github.com/ekalape' rel='noreferrer'>
                <BsGithub size={26} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='member__photo photo1' />
    </div>
  </div>
);

export default AboutPage;
