import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #686de0;
  padding: 20px;

  h3 {
    margin: 0;
    opacity: 0.5;
    letter-spacing: 2px;
  }
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 50px 20px;
  max-width: 800px;
  width: 100%;
  border-radius: 10px;
`;

const JokeView = styled.div`
  text-align: center;
  margin: 50px auto;
  letter-spacing: 1px;
  line-height: 40px;
  font-size: 30px;
  max-width: 600px;
  font-weight: 500;
`;
const Button = styled.button`
  background-color: #9f68e0;
  border: none;
  outline: none;
  padding: 14px 40px;
  cursor: pointer;
  display: inline-block;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
  &:active {
    transform: scale(0.98);
  }
  span {
    color: #fff;
  }
`;

export default function DadJokes() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    handleGenerateJoke();
  }, []);

  const handleGenerateJoke = async () => {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

    const res = await fetch('https://icanhazdadjoke.com', config);
    const data = await res.json();
    setJoke(data.joke);
  };

  return (
    <Wrapper>
      <Inner>
        <h3>Don&apos;t laugh challenge</h3>
        <JokeView>{joke ? joke : '// Joke  goes here'}</JokeView>
        <Button onClick={handleGenerateJoke}>
          <span>Get another joke</span>
        </Button>
      </Inner>
    </Wrapper>
  );
}
