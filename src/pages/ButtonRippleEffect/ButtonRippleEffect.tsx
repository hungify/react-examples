import React from 'react';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  outline: none;
  border-radius: 10px;
  border: none;
  padding: 20px;
  display: block;
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #5c34a4;
  color: #ccc;
  .circle {
    position: absolute;
    background-color: #fff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ${scale} 0.8s ease-out;
  }
`;

export default function ButtonRippleEffect() {
  const handleClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const x = evt.clientX;
    const y = evt.clientY;

    const buttonTop = evt.currentTarget.getBoundingClientRect().top;
    const buttonLeft = evt.currentTarget.getBoundingClientRect().left;

    const xPos = x - buttonLeft;
    const yPos = y - buttonTop;

    const circleRef = document.createElement('span');
    circleRef.style.top = `${yPos}px`;
    circleRef.style.left = `${xPos}px`;
    circleRef.className = 'circle';
    evt.currentTarget.appendChild(circleRef);

    setTimeout(() => {
      circleRef.remove();
    }, 500);
  };
  return (
    <Wrapper>
      <Button onClick={handleClick}>Click me</Button>
    </Wrapper>
  );
}
