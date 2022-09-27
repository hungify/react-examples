import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './AnimatedCountdown.module.css';

const cx = classNames.bind(styles);

export default function AnimatedCountdown() {
  const [active, setActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(3);
  const [size] = useState(4);

  const handleReplay = () => {
    setActive(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (active && currentIdx >= 0) {
      timer = setTimeout(() => {
        setCurrentIdx(currentIdx - 1);
      }, 1000);
    } else {
      setActive(false);
      setCurrentIdx(3);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, currentIdx]);

  const handleAnimationEnd =
    (idx: number) => (evt: React.AnimationEvent<HTMLDivElement>) => {
      const currentItem = evt.currentTarget;
      if (evt.animationName === 'goIn' && idx !== size - 1) {
        currentItem.classList.remove('in');
        currentItem.classList.add('out');
      } else if (
        evt.animationName === 'goOut' &&
        currentItem.nextElementSibling
      ) {
        currentItem.nextElementSibling.classList.add('in');
      }
    };

  return (
    <div className={cx('wrapper')}>
      {active ? (
        <div className={cx('counter')}>
          <div className={cx('nums')}>
            {Array(size)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className={cx({
                    in: currentIdx === i,
                  })}
                  onAnimationEnd={handleAnimationEnd(i)}
                >
                  {i}
                </span>
              ))}
          </div>
          <h4>Get Ready</h4>
        </div>
      ) : (
        <div className={cx('final')}>
          <h1>GO</h1>
          <button onClick={handleReplay}>
            <span>Replay</span>
          </button>
        </div>
      )}
    </div>
  );
}
