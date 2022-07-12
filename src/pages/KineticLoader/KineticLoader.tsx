import styled, { keyframes } from 'styled-components';

const rotateFirst = keyframes`
  0%, 25% {
    transform: rotate(0deg);
  }
  50%, 75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateSecond = keyframes`
  0%, 25% {
    transform: rotate(90deg);
  }
  50%, 75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(450deg);
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const Kinetic = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 50px solid transparent;
    border-bottom-color: #fff;
    animation: ${rotateFirst} 2s linear infinite 0.5s;
  }
  &:before {
    transform: rotate(90deg);
    animation: ${rotateSecond} 2s linear infinite;
  }
`;

export default function KineticLoader() {
  return (
    <Wrapper>
      <Kinetic></Kinetic>
    </Wrapper>
  );
}
