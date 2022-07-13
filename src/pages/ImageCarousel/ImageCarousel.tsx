import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ImageCarousel.module.css';

const cx = classNames.bind(styles);

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      if (currentIndex === 3) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 2000);
    return () => clearInterval(timer);
  });

  const prev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(3);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const next = () => {
    if (currentIndex === 3) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('carousel')}>
        <div
          className={cx('image-container')}
          style={{
            transform: `translateX(${-currentIndex * 500}px)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1599394022918-6c2776530abb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1458&q=80"
            alt="first-slider"
          />
          <img
            src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
            alt="second-slider"
          />
          <img
            src="https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
            alt="third-slider"
          />
          <img
            src="https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1492&q=80"
            alt="fourth-slider"
          />
        </div>
        <div className={cx('buttons-container')}>
          <button id="left" className={cx('btn')} onClick={prev}>
            Prev
          </button>
          <button id="right" className={cx('btn')} onClick={next}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
