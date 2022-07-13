import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function GoodCheapFast() {
  return (
    <Wrapper>
      <h2>How do you want your project to be?</h2>
      <Switch />
    </Wrapper>
  );
}

function Switch() {
  const [checked, setChecked] = useState(false);

  const handleSwitch = () => {
    setChecked(!checked);
  };
  return (
    <Switcher onClick={handleSwitch}>
      <Circle checked={checked} />
    </Switcher>
  );
}

const Switcher = styled.div`
  position: relative;
  background-color: #d0d0d0;
  border-radius: 50px;
  cursor: pointer;
  display: inline-block;
  margin: 0 15px 0;
  width: 80px;
  height: 40px;
`;

interface CircleProps {
  checked: boolean;
}

const slideOn = keyframes`
 0% {
    transform: translateX(0) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(40px) scale(1);
  }
`;

const slideOff = keyframes`
   0% {
    transform: translateX(40px) scale(1);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;
const Circle = styled.div<CircleProps>`
  background: #fff;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  align-items: center;
  justify-content: center;
  ${({ checked }) => `
    animation: ${checked} ?  ${slideOn} 0.3s linear forwards : ${slideOff} 0.3s linear forwards;
  `}
`;
