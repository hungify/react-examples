import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Heebo:300&display=swap');
  font-family: 'Heebo', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
`;

interface SwitchThemeStyled {
  theme: 'Dark' | 'Light';
}
const SwitchTheme = styled.button<SwitchThemeStyled>`
  cursor: pointer;
  background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
  color: ${({ theme }) => (theme === 'Dark' ? '#000' : '#fff')};
  border: 0;
  border-radius: 4px;
  padding: 8px 12px;
  top: 100px;
`;

const ClockInner = styled.div`
  width: 400px;
  height: 400px;
  max-width: 90vw;
  max-height: 90vw;
  border-radius: 50%;
  margin: auto;
  position: relative;
`;

const Clock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Needle = styled.div`
  width: 3px;
  position: absolute;
  transform-origin: bottom center;
  transition: all 0.5s ease-in;
  top: 50%;
  left: 50%;
`;

const Hours = styled(Needle)`
  height: 80px;
  background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
`;
const Minutes = styled(Needle)`
  height: 100px;
  background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
`;
const Seconds = styled(Needle)`
  height: 120px;
  width: 2px;
  background-color: #e74c3c;
`;
const CenterPoint = styled.div`
  background-color: #e74c3c;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  ::after {
    content: '';
    background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
    width: 5px;
    height: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;
const TimeView = styled.div`
  margin-top: 100px;
  span {
    font-size: 60px;
  }
`;
const DateView = styled.div`
  span {
    color: #aaa;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  span:last-child {
    background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
    color: ${({ theme }) => (theme === 'Dark' ? '#000' : '#fff')};
    border-radius: 50%;
    height: 18px;
    width: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 18px;
    transition: all 0.5s ease-in;
    font-size: 12px;
  }
`;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface ThemeClockProps {
  theme: 'Dark' | 'Light';
  onSwitchTheme: () => void;
}

export default function ThemeClock({ onSwitchTheme, theme }: ThemeClockProps) {
  const [now, setNow] = useState(new Date());

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setNow(now);
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondsDegrees = (seconds / 60) * 360;
      const minutesDegrees = (minutes / 60 + seconds / 60 / 60) * 360;
      const hoursDegrees =
        (hours / 12 + minutes / 60 / 12 + seconds / 60 / 60 / 12) * 360;

      setHours(hoursDegrees);
      setMinutes(minutesDegrees);
      setSeconds(secondsDegrees);
    }, 1000);

    return () => clearInterval(interval);
  }, [now]);

  return (
    <Wrapper>
      <SwitchTheme onClick={onSwitchTheme} theme={theme}>
        <span>{theme} mode</span>
      </SwitchTheme>
      <ClockInner>
        <Clock>
          <Hours
            theme={theme}
            style={{ transform: `translate(-50%, -100%) rotate(${hours}deg)` }}
          />
          <Minutes
            theme={theme}
            style={{
              transform: ` translate(-50%, -100%) rotate(${minutes}deg)`,
            }}
          />
          <Seconds
            theme={theme}
            style={{
              transform: `translate(-50%, -100%) rotate(${seconds}deg)`,
            }}
          />
          <CenterPoint theme={theme} />
        </Clock>
      </ClockInner>

      <ClockInner>
        <ClockFace
          theme={theme}
          hours={hours}
          seconds={seconds}
          minutes={minutes}
        />
      </ClockInner>

      <TimeView>
        <span>
          {now.getHours() > 10 ? now.getHours() : `0${now.getHours()}`}
        </span>
        <span>&nbsp;:&nbsp;</span>
        <span>
          {now.getMinutes() > 10 ? now.getMinutes() : `0${now.getMinutes()}`}
        </span>
        <span>&nbsp;{now.getHours() > 12 ? 'PM' : 'AM'}</span>
      </TimeView>

      <DateView theme={theme}>
        <span>{dayNames[now.getDay()]}</span>
        <span>,&nbsp;</span>
        <span>{monthNames[now.getMonth()]}&nbsp;</span>
        <span>{now.getDate()}</span>
      </DateView>
    </Wrapper>
  );
}

const ClockWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TickMinute = styled.div`
  width: 2%;
  height: 50%;
  position: absolute;
  left: calc(50% - (2% / 2));
  transform-origin: 50% 100%;
  transition: all 2s;
`;

const TickMark = styled.div`
  width: 18%;
  height: 8%;
  position: relative;
  background-color: #555;
  margin: auto;

  &.bold {
    width: 70%;
    background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
  }
`;

const NeedleFace = styled.div`
  width: 1.2%;
  height: 50%;
  background: #999;
  border-radius: 3px;
  position: absolute;
  transform-origin: 50% 100%;
  left: calc(50% - 1.2% / 2);
  transition: all 0.1s;
  cursor: pointer;
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
`;

const HourFace = styled(NeedleFace)`
  height: 30%;
  top: calc(50% - 30%);
`;
const MinuteFace = styled(NeedleFace)`
  height: 40%;
  top: calc(50% - 40%);
`;

const SecondFace = styled(NeedleFace)`
  height: 50%;
  width: 0.5%;
  top: calc(50% - 50%);
  left: calc(50% - (0.5% / 2));
  background-color: #ff0000;
`;

const CenterPointFace = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'Dark' ? '#fff' : '#000')};
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  border-radius: 50%;
`;

interface ClockFaceProps {
  theme: 'Dark' | 'Light';
  hours: number;
  minutes: number;
  seconds: number;
}

function ClockFace({ theme, hours, minutes, seconds }: ClockFaceProps) {
  return (
    <ClockWrapper>
      <div>
        {Array.from({ length: 60 }, (_, i) => (
          <TickMinute
            key={i}
            style={{
              transform: `rotate(${i * 6}deg)`,
            }}
          >
            <TickMark
              className={`${i % 5 === 0 ? 'bold' : ''}`}
              theme={theme}
            />
          </TickMinute>
        ))}
      </div>
      <HourFace style={{ transform: `rotate(${hours}deg` }} />
      <MinuteFace style={{ transform: `rotate(${minutes}deg` }} />
      <SecondFace style={{ transform: `rotate(${seconds}deg` }} />
      <CenterPointFace theme={theme} />
    </ClockWrapper>
  );
}
