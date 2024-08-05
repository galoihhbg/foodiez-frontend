import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Carousel.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)
function ControlledCarousel({data = [], state = 0}) {
  const [index, setIndex] = useState(state);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {
            data.map((data, index) => {
                return  <Carousel.Item key={index}>
                          <picture className={cx('picture-item')}>
                            <img src={data} alt='restaurent review' className={cx('img-item')} />
                          </picture>
                        </Carousel.Item>
            })
        }
    </Carousel>
  );
}

export default ControlledCarousel;