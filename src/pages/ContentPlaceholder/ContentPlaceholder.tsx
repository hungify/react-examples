import styles from 'pages/ContentPlaceholder/ContentPlaceholder.module.css';
import { useEffect, useState } from 'react';
import classes from 'classnames/bind';

const cx = classes.bind(styles);

export default function ContentPlaceholder() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 20000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('card')}>
          <div
            className={cx('card-header', {
              'animated-bg': showSkeleton,
            })}
          >
            {!showSkeleton ? (
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2102&amp;q=80"
                alt=""
              />
            ) : null}
          </div>

          <div className={cx('card-content')}>
            <h3
              className={cx('card-title', {
                'animated-bg-text animated-bg': showSkeleton,
              })}
            >
              {!showSkeleton ? 'Lorem ipsum dolor sit amet' : null}
            </h3>
            <p
              className={cx('card-desc', 'card-excerpt', {
                'animated-bg-text': showSkeleton,
              })}
            >
              {!showSkeleton ? (
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis'
              ) : (
                <>
                  <span className="animated-bg animated-bg-text">&nbsp;</span>
                  <span className="animated-bg animated-bg-text">&nbsp;</span>
                  <span className="animated-bg animated-bg-text">&nbsp;</span>
                </>
              )}
            </p>
            <div className={cx('card-author')}>
              <div
                className={cx('card-profile', {
                  'animated-bg': showSkeleton,
                })}
              >
                {!showSkeleton ? (
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />
                ) : null}
              </div>
              <div className={cx('card-info')}>
                <strong
                  className={cx({
                    'animated-bg-text animated-bg': showSkeleton,
                  })}
                >
                  {!showSkeleton ? 'John Doe' : null}
                </strong>
                <small
                  className={cx({
                    'animated-bg-text animated-bg': showSkeleton,
                  })}
                >
                  {!showSkeleton ? 'Oct 08, 2020' : null}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
