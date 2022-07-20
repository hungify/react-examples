import { Link } from 'react-router-dom';
import styles from 'pages/StickyNavbar/StickyNavbar.module.css';
import classNames from 'classnames/bind';
import useScrollPosition from 'hooks/useScrollPosition';

const cx = classNames.bind(styles);

export default function StickyNavbar() {
  const offsetY = useScrollPosition();
  return (
    <>
      <nav
        className={cx('nav', {
          active: offsetY > 15,
        })}
      >
        <div
          className={cx('container', {
            active: offsetY > 150,
          })}
        >
          <h1 className={cx('logo')}>
            <Link to="#">My Website</Link>
          </h1>
          <ul>
            <li>
              <Link to="#" className={cx('current')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Services</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={cx('hero')}>
        <div className={cx('container')}>
          <h1>Welcome To My Website</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, consequuntur?</p>
        </div>
      </div>
      <section className={cx('container', 'content')}>
        <h2>Content One</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolorem voluptates
          eveniet tempora ut cupiditate magnam, sapiente, hic quo in ipsum iste soluta eaque
          perferendis nihil recusandae dolore officia aperiam corporis similique. Facilis quos
          tempore labore totam! Consectetur molestiae iusto ducimus error reiciendis aspernatur
          dolor, modi dolorem sit architecto, voluptate magni sunt unde est quas? Voluptates a
          dolorum voluptatum quo perferendis aut sit. Aspernatur libero laboriosam ab eligendi omnis
          delectus earum labore, placeat officiis sint illum rem voluptas ipsum repellendus iste
          eius recusandae quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et
          iste dolorum obcaecati minus odio eligendi!
        </p>
        <h3>Content Two</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur provident nostrum
          possimus inventore nisi laboriosam consequatur modi nulla eos, commodi, omnis distinctio!
          Maxime distinctio impedit provident, voluptates illo odio nostrum minima beatae similique
          a sint sapiente voluptatum atque optio illum est! Tenetur tempora doloremque quae iste
          aperiam hic cumque repellat?
        </p>
      </section>
    </>
  );
}
