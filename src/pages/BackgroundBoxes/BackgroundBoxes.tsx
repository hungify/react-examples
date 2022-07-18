import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  overflow: hidden;
`;
const Button = styled.button`
  background-color: #f9ca24;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  border: 0;
  border-radius: 3px;
  font-size: 16px;
  padding: 12px 20px;
  cursor: pointer;
  top: 20px;
  letter-spacing: 1px;
  box-shadow: 0 3px rgb(249 202 36 / 50%);
  z-index: 100;
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`;

interface BoxesStyled {
  showOriginal: boolean;
}
const Boxes = styled.div<BoxesStyled>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  transition: 0.4s ease;
  width: ${({ showOriginal }) => (showOriginal ? '600px' : '500px')};
  height: ${({ showOriginal }) => (showOriginal ? '600px' : '500px')};

  div {
    transform: ${({ showOriginal }) => (showOriginal ? 'rotateZ(360deg)' : 'none')};
  }
`;
const Box = styled.div`
  background-image: url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif');
  background-repeat: no-repeat;
  background-size: 500px 500px;
  position: relative;
  height: 125px;
  width: 125px;
  transition: 0.4s ease;

  &::after {
    content: '';
    background-color: #f6e58d;
    position: absolute;
    top: 8px;
    right: -15px;
    height: 100%;
    width: 15px;
    transform: skewY(45deg);
  }

  &::before {
    content: '';
    background-color: #f9ca24;
    position: absolute;
    bottom: -15px;
    left: 8px;
    height: 15px;
    width: 100%;
    transform: skewX(45deg);
  }
`;

const boxes: JSX.Element[] = [];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    boxes.push(
      <Box
        key={i}
        style={{
          backgroundPosition: `${-j * 125}px ${-i * 125}px`,
        }}
      />
    );
  }
}

export default function BackgroundBoxes() {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <Wrapper>
      <Button onClick={() => setShowOriginal(!showOriginal)}>Magic 🎩</Button>
      <Boxes showOriginal={showOriginal}>{boxes}</Boxes>
    </Wrapper>
  );
}
