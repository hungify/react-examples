import classNames from 'classnames/bind';
import { verticalSliders } from '~/mocks';
import { useRef, useState } from 'react';
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi';
import styles from './DoubleVerticalSlider.module.css';

const cx = classNames.bind(styles);

export default function DoubleVerticalSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideContainer = useRef<HTMLDivElement>(null);
  const slideRight = useRef<HTMLDivElement>(null);
  const slideLeft = useRef<HTMLDivElement>(null);

  const changeSlide = (direction: string) => () => {
    const sliderHeight =
      slideContainer.current && slideContainer.current.clientHeight;

    if (direction === 'down') {
      setActiveIndex(activeIndex - 1);
      if (activeIndex === 0) {
        setActiveIndex(verticalSliders.length - 1);
      }
    } else if (direction === 'up') {
      setActiveIndex(activeIndex + 1);
      if (activeIndex === verticalSliders.length - 1) {
        setActiveIndex(0);
      }
    }
    if (slideRight.current && slideLeft.current && sliderHeight) {
      slideRight.current.style.transform = `translateY(-${
        activeIndex * sliderHeight
      }px)`;
      slideLeft.current.style.transform = `translateY(${
        activeIndex * sliderHeight
      }px)`;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('slider-container')} ref={slideContainer}>
        <div
          className={cx('left-slide')}
          ref={slideLeft}
          style={{
            top: `-${(verticalSliders.length - 1) * 100}vh`,
          }}
        >
          {verticalSliders.map((slider) => (
            <div
              style={{ backgroundColor: `${slider.background}` }}
              key={slider.id}
            >
              <h1>{slider.title}</h1>
              <p>{slider.desc}</p>
            </div>
          ))}
        </div>
        <div className={cx('right-slide')} ref={slideRight}>
          {verticalSliders.map((slider) => (
            <div
              key={slider.id}
              style={{
                backgroundImage: `url(${slider.img})`,
              }}
            />
          ))}
        </div>
        <div className={cx('action-buttons')}>
          <button className={cx('down-button')} onClick={changeSlide('up')}>
            <HiOutlineArrowSmDown />
          </button>
          <button className={cx('up-button')} onClick={changeSlide('down')}>
            <HiOutlineArrowSmUp />
          </button>
        </div>
      </div>
    </div>
  );
}
