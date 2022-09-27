import classnames from 'classnames/bind';
import { useIntersectionObserver } from '~/hooks';
import styles from './ScrollAnimation.module.css';
import { useRef } from 'react';

const cx = classnames.bind(styles);

function Card({ title }: { title: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return (
    <div className={cx('card')} ref={ref}>
      <h3 className={cx('heading')}>ScrollAnimation</h3>
      <div className={cx('box-container')}>
        <div className={cx('box', `${isVisible ? 'show' : 'hide'}`)}>
          <span>Content {title}</span>
        </div>
      </div>
    </div>
  );
}

export default function ScrollAnimation() {
  return (
    <div className={cx('wrapper')}>
      {Array.from({ length: 20 }).map((_, index) => (
        <Card key={index} title={index} />
      ))}
    </div>
  );
}
