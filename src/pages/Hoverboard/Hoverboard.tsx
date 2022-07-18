import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './Hoverboard.module.css';

const cx = classNames.bind(styles);
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
export default function Hoverboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const square = e.currentTarget;
    const colorRand = colors[Math.floor(Math.random() * colors.length)];
    square.style.background = colorRand;
    square.style.boxShadow = `0 0 2px ${colorRand}, 0 0 10px ${colorRand}`;
  };
  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    const square = e.currentTarget;
    square.style.background = '#1d1d1d';
    square.style.boxShadow = '0 0 2px #000';
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')} ref={containerRef}>
        {Array(400)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cx('square')}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          ))}
      </div>
    </div>
  );
}
