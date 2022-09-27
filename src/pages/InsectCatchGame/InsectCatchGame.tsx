import { insectList } from '~/mocks';
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
  isUp: boolean;
}

const ScreenUp = styled.div<ScreenStyled>`
  margin-top: ${({ isUp }) => (isUp ? '-100vh' : '0')};
  position: ${({ isUp }) => (isUp ? 'relative' : 'static')}; ;
`;

const Screen = styled(ScreenUp)`
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
  transition: transform 0.3s ease-in-out;
`;
const Message = styled.h5`
  line-height: 1.7;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  font-family: inherit;
  padding: 20px;
  z-index: 100;
  text-align: center;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  transition: transform 0.4s ease-in;
  &.show {
    transform: translate(-50%, 150%);
    opacity: 1;
  }
`;

interface Insect {
  name: string;
  img: string;
}

export default function InsectCatchGame() {
  const [screen, setScreen] = useState(0);
  const [score, setScore] = useState(0);
  const [insects, setInsects] = useState<Insect[]>([]);

  const handleNextClick = (screen: number) => {
    setScreen(screen);
  };

  const handleChoiceClick = (insect: Insect) => {
    const insectItem = insectList.find((item) => item.name === insect.name);
    if (insectItem) {
      setInsects([{ ...insectItem }]);
      setScreen(screen + 1);
    }
  };

  const handleCatchInsect = () => {
    setScore(score + 1);
    const firstInsect =
      insectList.find((insect) => insect.name === insects[0]!.name) ||
      insectList[0];
    firstInsect && setInsects([...insects, firstInsect]);
  };

  const handlePlayAgain = () => {
    setScreen(0);
    setScore(0);
    setInsects([]);
  };

  return (
    <Wrapper>
      <IntroductionScreen onNext={handleNextClick} screen={screen} />
      <ChoiceScreen screen={screen} onChoice={handleChoiceClick} />
      <GameScreen
        score={score}
        insects={insects}
        onCatch={handleCatchInsect}
        onPlayAgain={handlePlayAgain}
      />
    </Wrapper>
  );
}

interface IntroductionScreenProps {
  onNext: (screen: number) => void;
  screen: number;
}
function IntroductionScreen({ onNext, screen }: IntroductionScreenProps) {
  return (
    <Screen isUp={screen >= 1}>
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
    <Screen isUp={screen >= 2}>
      <h1>What is your &quot;favorite&quot; insect?</h1>
      <List>
        {insectList.map(({ name, img }) => (
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
  insects: Insect[];
  onCatch: () => void;
  onPlayAgain: () => void;
}
function GameScreen({ score, insects, onCatch, onPlayAgain }: GameScreenProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef('00:00');
  const [catchInsectIdx, setCatchInsectIdx] = useState(-1);
  const [second, setSecond] = useState(0);

  const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper) {
      const { x, y } = getRandomLocation();
      wrapper.style.left = `${x}px`;
      wrapper.style.top = `${y}px`;
      wrapper.style.transform = `rotate(${Math.random() * 360}deg)`;
    }
  }, [insects]);

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor(second / 60);
      const seconds = second % 60;
      const newMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const newSeconds = seconds < 10 ? `0${seconds}` : seconds;

      timeRef.current = `${newMinutes}:${newSeconds}`;
      setSecond(second + 1);
    }, 1000);

    if (score >= 20) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [second, score]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (catchInsectIdx >= 0) {
        setCatchInsectIdx(-1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [catchInsectIdx]);

  const onCatchInsect = (idx: number) => {
    onCatch();
    setCatchInsectIdx(idx);
  };

  return (
    <GameContainer isUp={false}>
      <Time>{timeRef.current}</Time>
      <Score>{score}</Score>
      {insects?.map((insect, idx) => (
        <WrapInsect
          key={`${insect.name}-${idx}`}
          ref={wrapperRef}
          onClick={() => onCatchInsect(idx)}
          style={{
            transform:
              catchInsectIdx === idx
                ? 'translate(-50%, -50%) scale(0)'
                : 'translate(-50%, -50%) scale(1)',
          }}
        >
          <Image src={insect.img} alt={insect.name} />
        </WrapInsect>
      ))}
      <FinishGameMessage score={score} onPlayAgain={onPlayAgain} />
    </GameContainer>
  );
}

interface FinishGameMessageProps {
  score: number;
  onPlayAgain: () => void;
}

function FinishGameMessage({ score, onPlayAgain }: FinishGameMessageProps) {
  return (
    <Message className={`${score >= 20 ? 'show' : ''}`}>
      Are you annoyed yet? <br />
      You are playing an impossible game!!
      <br />
      <Button onClick={onPlayAgain}>Play again</Button>
    </Message>
  );
}
