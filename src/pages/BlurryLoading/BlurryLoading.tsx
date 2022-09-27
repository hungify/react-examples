import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
  ${({ $blur }) => `
    filter: blur(${$blur}px);
  `}

  transition: filter 0.5s ease-in;
`;

interface Text {
  $opacity: number;
}
const TextOverlay = styled.div<Text>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-size: 50px;
  color: #fff;
  transition: opacity 0.5s ease-in-out;
  ${({ $opacity }) => `
    opacity: ${$opacity};
  `}
`;

function scale(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default function BlurryLoading() {
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlur((blur) => blur + 1);
    }, 30);
    if (blur === 100) {
      clearInterval(interval);
      return;
    }
    return () => clearInterval(interval);
  }, [blur]);

  const scaleValue = useMemo(() => {
    const opacity = scale(blur, 0, 100, 1, 0);
    const filter = scale(blur, 0, 100, 30, 0);
    return { filter, opacity };
  }, [blur]);

  return (
    <Wrapper>
      <BackgroundOverlay $blur={scaleValue.filter} />
      <TextOverlay $opacity={scaleValue.opacity}>{blur}%</TextOverlay>
    </Wrapper>
  );
}
