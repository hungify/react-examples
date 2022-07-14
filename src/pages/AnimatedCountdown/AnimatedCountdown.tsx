import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './AnimatedCountdown.module.css';

const cx = classNames.bind(styles);

export default function AnimatedCountdown() {
  const [active, setActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleReplay = () => {
    setActive(true);
    setTimeout(() => {
      setActiveIdx(activeIdx + 1);
    }, 3000);
  };

  return (
    <div className={cx('wrapper')}>
      {active && (
        <div
          className={cx('counter', {
            hide: !active,
          })}
        >
          <div className={cx('nums')}>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <span
                  className={cx('in', {
                    out: i !== activeIdx,
                  })}
                >
                  {i}
                </span>
              ))}
          </div>
          <h4>Get Ready</h4>
        </div>
      )}
      <div
        className={cx('final', {
          show: !active,
        })}
      >
        <h1>GO</h1>
        <button onClick={handleReplay}>
          <span>Replay</span>
        </button>
      </div>
    </div>
  );
}
