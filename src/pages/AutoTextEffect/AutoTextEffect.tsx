import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: darksalmon;
`;

const Speed = styled.div`
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  font-size: 18px;
  span {
    margin-right: 10px;
  }
  input {
    width: 50px;
    padding: 5px;
    font-size: 18px;
    background-color: darksalmon;
    border: none;
    text-align: center;
    outline: none;
  }
`;

export default function AutoTextEffect() {
  const [speed, setSpeed] = useState(1);
  const [text, setText] = useState('');
  const [fullText] = useState('Hello world');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index <= fullText.length) {
      setTimeout(() => {
        setText(text + fullText.charAt(index));
        setIndex(index + 1);
      }, 500 / speed);
    } else {
      setText('');
      setIndex(0);
    }
  }, [fullText, index, text, speed]);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <Wrapper>
      <h1>{text}</h1>
      <Speed>
        <span>Speed:</span>
        <input
          type='number'
          value={speed}
          onChange={handleSpeedChange}
          min={1}
          max={10}
        />
      </Speed>
    </Wrapper>
  );
}
