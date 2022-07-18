import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  height: 440px;
  width: 300px;
  background: url(https://images.unsplash.com/photo-1504215680853-026ed2a45def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80)
    no-repeat center center/cover;
  margin: 0 auto;
  cursor: pointer;
  max-width: 100%;
  position: relative;
  box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
`;

const Heart = styled.svg`
  position: absolute;
  animation: grow 0.6s linear;
  transform: translate(-50%, -50%) scale(0);
  color: rgb(239 68 68);
  @keyframes grow {
    to {
      transform: translate(-50%, -50%) scale(10);
      opacity: 0;
    }
  }
`;

export default function DoubleClickHeart() {
  const [clickedCount, setClickedCount] = useState(0);
  const heartRef = useRef<SVGSVGElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const heart = heartRef.current;

    if (heart) {
      heart.style.left = `${offset.x}px`;
      heart.style.top = `${offset.y}px`;
    }
  }, [offset.x, offset.y]);

  const handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClickedCount(clickedCount + 1);
    setIsLiked(true);

    const x = evt.clientX;
    const y = evt.clientY;

    const buttonTop = evt.currentTarget.getBoundingClientRect().top;
    const buttonLeft = evt.currentTarget.getBoundingClientRect().left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    setOffset({
      x: xInside,
      y: yInside,
    });
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

  return (
    <Wrapper>
      <h3 className="font-bold">
        Double click on the image to
        <BsFillSuitHeartFill className="inline-block m-1 text-red-500" />
        it
      </h3>

      <small className="block mb-5 font-medium">
        You liked it <span>{clickedCount}</span> times
      </small>
      <Card onClick={handleClick}>
        {isLiked && (
          <Heart
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            ref={heartRef}
          >
            <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
          </Heart>
        )}
      </Card>
    </Wrapper>
  );
}
