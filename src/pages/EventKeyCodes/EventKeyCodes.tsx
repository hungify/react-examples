import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const Box = css`
  border: 1px solid #999;
  background-color: #fff;
  padding: 10px;
  font-size: 20px;
  padding: 20px;
  font-weight: bold;
  min-width: 150px;
  display: inline-flex;
  justify-content: center;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
  margin: 10px;
`;

const BoxEmpty = styled.div`
  ${Box}
`;

const EventKey = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    ${Box}
    text-transform: capitalize;
  }
  span {
    font-size: 14px;
    color: #555;
    text-align: center;
    font-weight: 600;
  }
`;
const EventKeyCode = styled.div`
  display: flex;
  flex-direction: column;
  div {
    ${Box}
    text-transform: capitalize;
  }
  span {
    font-size: 14px;
    color: #555;
    text-align: center;
    font-weight: 600;
  }
`;
const EventCode = styled.div`
  display: flex;
  flex-direction: column;
  div {
    ${Box}
    text-transform: capitalize;
  }
  span {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    text-align: center;
  }
`;

export default function EventKeyCodes() {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyCode, setEventKeyCode] = useState<number>();
  const [eventCode, setEventCode] = useState('');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    setEventKey(e.key);
    setEventKeyCode(e.which);
    setEventCode(e.code);
  };

  return (
    <Wrapper>
      {eventKey ? (
        <>
          <EventKey>
            <span>event.key</span>
            <div>{eventKey}</div>
          </EventKey>

          <EventKeyCode>
            <span>event.keyCode</span>
            <div>{eventKeyCode}</div>
          </EventKeyCode>

          <EventCode>
            <span>event.code</span>
            <div>{eventCode}</div>
          </EventCode>
        </>
      ) : (
        <BoxEmpty>Please any key to get the keycode</BoxEmpty>
      )}
    </Wrapper>
  );
}
