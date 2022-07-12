import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FormWave.module.css';

const cx = classNames.bind(styles);

export default function FormWave() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSubmit} className={cx('inner')}>
        <h1>Please login</h1>
        <div className={cx('form-control')}>
          <input type="email" name="email" value={email} onChange={handleEmailChange} required />
          <label>
            {'Email'.split('').map((word, index) => (
              <span
                key={word + index}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </label>
        </div>

        <div className={cx('form-control')}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>
            {'Password'.split('').map((word, index) => (
              <span
                key={word + index}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </label>
        </div>

        <div className={cx('form-control', 'form-submit')}>
          <button className={cx('form-btn')}>
            <span>Login</span>
          </button>
        </div>

        <div className={cx('form-control', 'form-forgot')}>
          <p>Don't have an account?</p>
          <Link to="/">Register</Link>
        </div>
      </form>
    </div>
  );
}
