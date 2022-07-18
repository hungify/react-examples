import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './CustomRangeSlider.module.scss';

const cx = classNames.bind(styles);

export default function CustomRangeSlider() {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(Number(value));
  };

  return (
    <div className={cx('wrapper')}>
      <h1>CSS Range Slider</h1>
      <input type="range" defaultValue={0} value={value} onChange={handleSliderChange} />
      <div className={cx('thumb-container')}>
        <div className={cx('thumb-sub-container')}>
          <h4
            style={{
              left: `${value}%`,
            }}
          >
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
}
