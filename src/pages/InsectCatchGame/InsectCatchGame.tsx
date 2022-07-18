import { insect } from 'mocks';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
  background-color: #516dff;
  color: #fff;
  font-family: 'Press Start 2P', sans-serif;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  text-align: center;
`;

interface ScreenStyled {
  screen: number;
}
const Screen = styled.div<ScreenStyled>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  transition: margin 0.5s ease-out;
  h1 {
    line-height: 1.4;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: #fff;
  color: #516dff;
  padding: 15px 20px;
  font-family: inherit;
  cursor: pointer;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;
const Item = styled.li`
  margin: 10px;
  button {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    width: 150px;
    height: 150px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;
const GameContainer = styled(Screen)`
  position: relative;
`;

const Time = styled.h2`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const Score = styled.h2`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const WrapInsect = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.3s ease-in-out;
`;

interface Insect {
  name: string;
  img: string;
}
export default function InsectCatchGame() {
  const [screen, setScreen] = useState(0);
  const [insect, setInsect] = useState<Insect | undefined>(undefined);
  const [score, setScore] = useState(0);

  const handleNextClick = (screen: number) => {
    setScreen(screen);
  };

  const handleChoiceClick = (insect: Insect) => {
    setInsect(insect);
    setScreen(screen + 1);
  };

  const handleCatchInsect = () => {
    setScore(score + 1);
  };

  return (
    <Wrapper>
      {screen === 0 && <IntroductionScreen onNext={handleNextClick} screen={screen} />}
      {screen === 1 && <ChoiceScreen screen={screen} onChoice={handleChoiceClick} />}
      {screen === 2 && (
        <GameScreen score={score} screen={screen} insect={insect} onCatch={handleCatchInsect} />
      )}
    </Wrapper>
  );
}

interface IntroductionScreenProps {
  onNext: (screen: number) => void;
  screen: number;
}
function IntroductionScreen({ onNext, screen }: IntroductionScreenProps) {
  return (
    <Screen screen={screen}>
      <h1>Catch The Insect</h1>
      <Button onClick={() => onNext(screen + 1)}>Play Game</Button>
    </Screen>
  );
}

interface ChoiceScreenProps {
  screen: number;
  onChoice: (insect: Insect) => void;
}
function ChoiceScreen({ screen, onChoice }: ChoiceScreenProps) {
  return (
    <Screen screen={screen}>
      <h1>What is your "favorite" insect?</h1>
      <List>
        {insect.map(({ name, img }) => (
          <Item key={name}>
            <button onClick={() => onChoice({ name, img })}>
              <p>{name}</p>
              <Image src={img} alt={name} />
            </button>
          </Item>
        ))}
      </List>
    </Screen>
  );
}

interface GameScreenProps {
  score: number;
  screen: number;
  insect?: Insect;
  onCatch: () => void;
}
function GameScreen({ score, screen, insect, onCatch }: GameScreenProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [second, setSecond] = useState<number>(0);
  const timeRef = useRef<string>('00:00');
  const [catchInsect, setCatchInsect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor(second / 60);
      const seconds = second % 60;
      const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const newSeconds = seconds < 10 ? `0${seconds}` : seconds;

      timeRef.current = `${newMinutes}:${newSeconds}`;
      setSecond(second + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [second]);

  useEffect(() => {
    const randomInsect = () => {
      const { x, y } = getRandomLocation();
      const insectContainer = wrapperRef.current;
      if (insectContainer) {
        insectContainer.style.left = `${x}px`;
        insectContainer.style.top = `${y}px`;
      }
    };

    const timer = setTimeout(() => {
      if (catchInsect) {
        randomInsect();
        setCatchInsect(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [catchInsect]);

  const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
  };

  const onCatchInsect = () => {
    onCatch();
    setCatchInsect(true);
  };

  return (
    <GameContainer screen={screen}>
      <Time>{timeRef.current}</Time>
      <Score>{score}</Score>
      {insect && (
        <WrapInsect
          ref={wrapperRef}
          onClick={onCatchInsect}
          style={{
            transform: catchInsect
              ? 'translate(-50%, -50%) scale(0)'
              : 'translate(-50%, -50%) scale(1)',
          }}
        >
          <Image
            src={insect.img}
            alt={insect.name}
            style={{
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </WrapInsect>
      )}
    </GameContainer>
  );
}
