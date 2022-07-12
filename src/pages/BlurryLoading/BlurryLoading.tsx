import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

interface Background {
  $blur: number;
}
const BackgroundOverlay = styled.div<Background>`
  background-image: url('https://images.unsplash.com/photo-1651058336212-7cd8d8f8f7b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2104&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  ${({ $blur }) => `
    filter: blur(${$blur}px);
  `}

  transition: filter 0.5s ease-in;
`;

const TextOverlay = styled.div<Background>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-size: 50px;
  color: #fff;
  transition: opacity 0.5s ease-in-out;
  ${({ $blur }) => `
    opacity: ${$blur > 5 ? 1 : 0};
  `}
`;

export default function BlurryLoading() {
  const [blur, setBlur] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlur((blur) => blur - 1);
    }, 100);
    if (blur === 0) {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [blur]);

  return (
    <Wrapper>
      <BackgroundOverlay $blur={blur} />
      <TextOverlay $blur={blur}>{blur}%</TextOverlay>
    </Wrapper>
  );
}
