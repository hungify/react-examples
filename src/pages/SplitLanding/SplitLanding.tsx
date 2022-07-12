import 'pages/SplitLanding/SplitLanding.css';
import { useState } from 'react';

export default function SplitLanding() {
  const [isHoverLeft, setIsHoverLeft] = useState(false);
  const [isHoverRight, setIsHoverRight] = useState(false);

  return (
    <div
      className={`wrapper-split  ${isHoverLeft ? 'hover-left' : isHoverRight ? 'hover-right' : ''}`}
    >
      <div
        className="left split"
        onMouseEnter={() => setIsHoverLeft(true)}
        onMouseLeave={() => setIsHoverLeft(false)}
      >
        <h1>Playstation 5</h1>
        <a href="go" className="btn">
          Buy now
        </a>
      </div>
      <div
        className="right split"
        onMouseEnter={() => setIsHoverRight(true)}
        onMouseLeave={() => setIsHoverRight(false)}
      >
        <h1>XBox Series X</h1>
        <a href="go" className="btn">
          Buy now
        </a>
      </div>
    </div>
  );
}
